'use client'

// Requires: react
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type CSSProperties } from 'react'

export type ChromaLagFit = 'cover' | 'contain' | 'stretch'

export type ChromaLagSourceContext = {
  width: number
  height: number
  cssWidth: number
  cssHeight: number
  dpr: number
}

export type ChromaLagSourceFactory = (context: ChromaLagSourceContext) => CanvasImageSource | null

export type ChromaLagSourceDescriptor = {
  render: ChromaLagSourceFactory
  ready?: () => Promise<unknown>
  subscribe?: (invalidate: () => void) => () => void
}

/** A complete image, inline SVG, video, canvas, or full-frame source factory. */
export type ChromaLagSource = string | CanvasImageSource | ChromaLagSourceDescriptor

export type ChromaLagCells = {
  columns: number
  rows: number
}

export type ChromaLagEffectHandle = {
  activateCell: (index: number) => void
  deactivateCell: (index: number) => void
  triggerCell: (index: number) => void
  reset: () => void
  refresh: () => void
}

export type ChromaLagEffectProps = {
  source: ChromaLagSource
  cells?: ChromaLagCells
  fit?: ChromaLagFit
  position?: { x: number; y: number }
  className?: string
  style?: CSSProperties
}

type RendererEvents = {
  lost: () => void
  restored: () => void
}

type ChromaLagFrame = {
  cells: ChromaLagCells
  lock: Float32Array
}

type ChromaLagRenderer = {
  render: (frame: ChromaLagFrame, refreshSource?: boolean) => boolean
  dispose: (options?: { deleteResources?: boolean; loseContext?: boolean }) => void
}

type ChromaLagPlayer = {
  renderCurrent: (refreshSource?: boolean) => boolean
  invalidateSource: () => void
  activateCell: (index: number) => void
  deactivateCell: (index: number) => void
  triggerCell: (index: number) => void
  reset: () => void
  dispose: () => void
}

const CHROMA_LAG_WIDTH = 800
const CHROMA_LAG_HEIGHT = 320
const DPR_CAP = 2
const CELL_CAP = 10
const DEFAULT_CELLS: ChromaLagCells = { columns: 1, rows: 1 }

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 position = vec2(
    gl_VertexID == 2 ? 3.0 : -1.0,
    gl_VertexID == 1 ? 3.0 : -1.0
  );
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const PREPARE_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uSource;
uniform vec2 uResolution;
uniform float uDpr;
uniform float uTime;
uniform int uCols;
uniform int uRows;
uniform int uCellCount;
uniform float uLock[${CELL_CAP}];

layout(location = 0) out vec4 baseOutput;
layout(location = 1) out vec4 emissionOutput;

vec3 sourceAt(vec2 uv) {
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) return vec3(0.0);
  vec4 sampleColor = texture(uSource, clamp(uv, vec2(0.0), vec2(1.0)));
  return sampleColor.rgb * sampleColor.a;
}

vec2 curveUv(vec2 uv) {
  vec2 point = uv * 2.0 - 1.0;
  point *= vec2(1.0 + point.y * point.y * 0.022, 1.0 + point.x * point.x * 0.032);
  return point * 0.5 + 0.5;
}

vec3 rgbToYiq(vec3 color) {
  return vec3(
    dot(color, vec3(0.299, 0.587, 0.114)),
    dot(color, vec3(0.596, -0.274, -0.322)),
    dot(color, vec3(0.211, -0.523, 0.312))
  );
}

vec3 yiqToRgb(vec3 color) {
  return vec3(
    color.x + 0.956 * color.y + 0.621 * color.z,
    color.x - 0.272 * color.y - 0.647 * color.z,
    color.x - 1.106 * color.y + 1.703 * color.z
  );
}

float lumaWeight(int offset) {
  int distance = abs(offset);
  if (distance == 0) return 0.44;
  if (distance == 1) return 0.24;
  if (distance == 2) return 0.055;
  if (distance == 3) return -0.015;
  return 0.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 sampleUv = curveUv(uv);
  vec3 centerYiq = rgbToYiq(sourceAt(sampleUv));
  int column = min(int(floor(uv.x * float(uCols))), uCols - 1);
  int row = min(int(floor((1.0 - uv.y) * float(uRows))), uRows - 1);
  int cellIndex = min(row * uCols + column, uCellCount - 1);
  float lock = uLock[cellIndex];

  float filteredY = 0.0;
  for (int offset = -3; offset <= 3; offset++) {
    float distance = float(offset);
    vec3 yiq = rgbToYiq(sourceAt(sampleUv + vec2(distance / uResolution.x, 0.0)));
    filteredY += yiq.x * lumaWeight(offset);
  }

  float lumaTrail = 0.0;
  vec2 chromaTrail = vec2(0.0);
  vec2 chromaWeightSum = vec2(0.0);
  for (int offset = 1; offset <= 20; offset++) {
    float baseDistanceCss = float(offset) * 1.2;
    float distanceCss = baseDistanceCss * mix(1.0, 0.4, lock);
    vec2 trailingUv = sampleUv - vec2(distanceCss * uDpr / uResolution.x, 0.0);
    vec3 trailingYiq = rgbToYiq(sourceAt(trailingUv));
    float lumaEnvelope = exp(-(baseDistanceCss - 1.2) / 7.0);
    vec2 weight = exp(-baseDistanceCss / vec2(6.0, 8.0));
    lumaTrail = max(lumaTrail, max(trailingYiq.x - centerYiq.x, 0.0) * lumaEnvelope);
    chromaTrail += trailingYiq.yz * weight;
    chromaWeightSum += weight;
  }
  chromaTrail /= chromaWeightSum;
  filteredY += lumaTrail * mix(0.08, 0.035, lock);
  vec2 filteredChroma = centerYiq.yz * vec2(0.78, 0.72) + chromaTrail * vec2(0.78, 0.92);
  filteredChroma *= 1.0 + lock * 0.06;

  float rasterLine = floor(uv.y * 180.0);
  float frame = floor(uTime * 12.0);
  float carrierPhase = gl_FragCoord.x * 1.5707963 + rasterLine * 3.1415926 + frame * 1.5707963;
  filteredY +=
    (filteredChroma.x * sin(carrierPhase) + filteredChroma.y * cos(carrierPhase)) * 0.006;
  vec3 signal = max(yiqToRgb(vec3(filteredY, filteredChroma)), vec3(0.0));

  float luma = dot(signal, vec3(0.2126, 0.7152, 0.0722));
  float key = smoothstep(0.58, 0.9, luma);

  baseOutput = vec4(signal, 1.0);
  emissionOutput = vec4(signal * key, 1.0);
}
`

const HORIZONTAL_BLUR_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uSource;
uniform sampler2D uEmission;
uniform vec2 uTargetSize;
uniform float uDefocusSigma;
uniform float uBloomSigma;

layout(location = 0) out vec4 defocusOutput;
layout(location = 1) out vec4 bloomOutput;

void main() {
  vec2 uv = gl_FragCoord.xy / uTargetSize;
  vec2 texel = 1.0 / uTargetSize;
  float defocusSigma = max(uDefocusSigma, 0.001);
  float bloomSigma = max(uBloomSigma, 0.001);
  int defocusRadius = min(24, int(ceil(defocusSigma * 3.0)));
  int bloomRadius = min(24, int(ceil(bloomSigma * 3.0)));
  vec3 defocusSum = vec3(0.0);
  vec3 bloomSum = vec3(0.0);
  float defocusWeightSum = 0.0;
  float bloomWeightSum = 0.0;

  for (int offset = -24; offset <= 24; offset++) {
    int distanceInt = abs(offset);
    if (distanceInt > defocusRadius && distanceInt > bloomRadius) continue;
    float distance = float(offset);
    vec2 sampleUv = clamp(uv + vec2(distance * texel.x, 0.0), vec2(0.0), vec2(1.0));
    if (distanceInt <= defocusRadius) {
      float weight = exp(-(distance * distance) / (2.0 * defocusSigma * defocusSigma));
      defocusSum += texture(uSource, sampleUv).rgb * weight;
      defocusWeightSum += weight;
    }
    if (distanceInt <= bloomRadius) {
      float weight = exp(-(distance * distance) / (2.0 * bloomSigma * bloomSigma));
      bloomSum += texture(uEmission, sampleUv).rgb * weight;
      bloomWeightSum += weight;
    }
  }

  defocusOutput = vec4(defocusSum / max(defocusWeightSum, 0.0001), 1.0);
  bloomOutput = vec4(bloomSum / max(bloomWeightSum, 0.0001), 1.0);
}
`

const VERTICAL_BLUR_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uDefocusHorizontal;
uniform sampler2D uBloomHorizontal;
uniform vec2 uTargetSize;
uniform float uDefocusSigma;
uniform float uBloomSigma;

layout(location = 0) out vec4 defocusOutput;
layout(location = 1) out vec4 bloomOutput;

void main() {
  vec2 uv = gl_FragCoord.xy / uTargetSize;
  vec2 texel = 1.0 / uTargetSize;
  float defocusSigma = max(uDefocusSigma, 0.001);
  float bloomSigma = max(uBloomSigma, 0.001);
  int defocusRadius = min(24, int(ceil(defocusSigma * 3.0)));
  int bloomRadius = min(24, int(ceil(bloomSigma * 3.0)));
  vec3 defocusSum = vec3(0.0);
  vec3 bloomSum = vec3(0.0);
  float defocusWeightSum = 0.0;
  float bloomWeightSum = 0.0;

  for (int offset = -24; offset <= 24; offset++) {
    int distanceInt = abs(offset);
    if (distanceInt > defocusRadius && distanceInt > bloomRadius) continue;
    float distance = float(offset);
    vec2 sampleUv = clamp(uv + vec2(0.0, distance * texel.y), vec2(0.0), vec2(1.0));
    if (distanceInt <= defocusRadius) {
      float weight = exp(-(distance * distance) / (2.0 * defocusSigma * defocusSigma));
      defocusSum += texture(uDefocusHorizontal, sampleUv).rgb * weight;
      defocusWeightSum += weight;
    }
    if (distanceInt <= bloomRadius) {
      float weight = exp(-(distance * distance) / (2.0 * bloomSigma * bloomSigma));
      bloomSum += texture(uBloomHorizontal, sampleUv).rgb * weight;
      bloomWeightSum += weight;
    }
  }

  defocusOutput = vec4(defocusSum / max(defocusWeightSum, 0.0001), 1.0);
  bloomOutput = vec4(bloomSum / max(bloomWeightSum, 0.0001), 1.0);
}
`

const COMPOSITE_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uSource;
uniform sampler2D uDefocusedSource;
uniform sampler2D uBloom;
uniform vec2 uResolution;
uniform float uDpr;
uniform float uTime;

out vec4 fragColor;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
}

vec3 linearToSrgb(vec3 color) {
  vec3 low = color * 12.92;
  vec3 high = 1.055 * pow(max(color, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return mix(low, high, step(vec3(0.0031308), color));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 source = texture(uSource, uv).rgb;
  vec3 defocusedSource = texture(uDefocusedSource, uv).rgb;
  vec3 bloom = texture(uBloom, uv).rgb;
  vec2 cssPoint = gl_FragCoord.xy / uDpr;
  vec3 beamColor = source * 0.72 + defocusedSource * 0.28;
  float luma = dot(beamColor, vec3(0.2126, 0.7152, 0.0722));

  float linePhase = fract(cssPoint.y / 3.0);
  float lineDistance = abs(linePhase - 0.5) * 2.0;
  float beamWidth = mix(0.32, 0.72, smoothstep(0.02, 0.75, luma));
  float beam = exp2(-2.2 * pow(lineDistance / beamWidth, 2.0));
  float scanline = mix(0.82, 1.0, beam);

  float maskRow = floor(cssPoint.y / 2.0);
  float maskIndex = mod(floor(cssPoint.x) + mod(maskRow, 2.0), 3.0);
  vec3 phosphorMask = vec3(0.965);
  if (maskIndex < 0.5) phosphorMask.r = 1.035;
  else if (maskIndex < 1.5) phosphorMask.g = 1.035;
  else phosphorMask.b = 1.035;

  vec3 color = beamColor * scanline * phosphorMask;
  color += bloom * 0.075;

  float humPosition = fract(uv.y + uTime * 0.035);
  float hum = exp(-pow((humPosition - 0.5) / 0.15, 2.0));
  float flicker = 0.997 + sin(uTime * 73.0) * 0.002 + sin(uTime * 17.0) * 0.001;
  color *= flicker * (1.0 - hum * 0.014);

  float signalNoise = hash(cssPoint + vec2(floor(uTime * 24.0) * 13.0, 0.0)) - 0.5;
  color += signalNoise * mix(0.003, 0.001, smoothstep(0.0, 0.5, luma));

  vec2 centered = uv * 2.0 - 1.0;
  float vignette = pow(max(0.0, 1.0 - dot(centered * vec2(0.78, 1.0), centered * vec2(0.78, 1.0)) * 0.38), 1.35);
  vec2 edgeDistance = min(uv, 1.0 - uv);
  float screenEdge = smoothstep(0.0, 0.018, min(edgeDistance.x, edgeDistance.y));
  color *= vignette * screenEdge * 1.12;
  color += vec3(0.0028, 0.0025, 0.0018);

  vec3 encoded = linearToSrgb(max(color, vec3(0.0)));
  fragColor = vec4(clamp(encoded, 0.0, 1.0), 1.0);
}
`

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('CHROMA_LAG shader allocation failed')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? 'unknown shader error'
    gl.deleteShader(shader)
    throw new Error(`CHROMA_LAG shader compilation failed: ${log}`)
  }
  return shader
}

function linkProgram(
  gl: WebGL2RenderingContext,
  vertex: WebGLShader,
  fragment: WebGLShader,
): WebGLProgram {
  const program = gl.createProgram()
  if (!program) throw new Error('CHROMA_LAG program allocation failed')
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? 'unknown link error'
    gl.deleteProgram(program)
    throw new Error(`CHROMA_LAG program linking failed: ${log}`)
  }
  return program
}

function requiredUniform(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
): WebGLUniformLocation {
  const location = gl.getUniformLocation(program, name)
  if (!location) throw new Error(`CHROMA_LAG uniform is missing: ${name}`)
  return location
}

function createTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const texture = gl.createTexture()
  if (!texture) throw new Error('CHROMA_LAG texture allocation failed')
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

function allocateTarget(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  width: number,
  height: number,
): void {
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
}

function attachPair(
  gl: WebGL2RenderingContext,
  framebuffer: WebGLFramebuffer,
  first: WebGLTexture,
  second: WebGLTexture,
): void {
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, first, 0)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, second, 0)
  gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1])
}

function assertFramebuffer(gl: WebGL2RenderingContext): void {
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error(`CHROMA_LAG framebuffer is incomplete: ${status}`)
  }
}

function releaseContextAfterDetach(gl: WebGL2RenderingContext): void {
  const release = (): void => {
    if ('isConnected' in gl.canvas && gl.canvas.isConnected) return
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
  if (document.visibilityState !== 'visible') {
    window.setTimeout(release, 0)
    return
  }
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(release)
  })
}

function sourceDimensions(source: CanvasImageSource): { width: number; height: number } {
  const dimensions = source as {
    displayHeight?: number
    displayWidth?: number
    height?: number
    naturalHeight?: number
    naturalWidth?: number
    videoHeight?: number
    videoWidth?: number
    width?: number
  }
  return {
    width:
      dimensions.naturalWidth ??
      dimensions.videoWidth ??
      dimensions.displayWidth ??
      dimensions.width ??
      1,
    height:
      dimensions.naturalHeight ??
      dimensions.videoHeight ??
      dimensions.displayHeight ??
      dimensions.height ??
      1,
  }
}

function createFrameFactory(
  source: CanvasImageSource,
  fit: ChromaLagFit,
  position: { x: number; y: number },
): ChromaLagSourceFactory {
  return ({ width, height }) => {
    const frame = document.createElement('canvas')
    frame.width = width
    frame.height = height
    const context = frame.getContext('2d', { alpha: true })
    if (!context) return frame

    const dimensions = sourceDimensions(source)
    if (fit === 'stretch') {
      context.drawImage(source, 0, 0, width, height)
      return frame
    }

    const scale =
      fit === 'cover'
        ? Math.max(width / dimensions.width, height / dimensions.height)
        : Math.min(width / dimensions.width, height / dimensions.height)
    const drawWidth = dimensions.width * scale
    const drawHeight = dimensions.height * scale
    const x = (width - drawWidth) * Math.min(1, Math.max(0, position.x))
    const y = (height - drawHeight) * Math.min(1, Math.max(0, position.y))
    context.drawImage(source, x, y, drawWidth, drawHeight)
    return frame
  }
}

function waitForMedia<T extends HTMLImageElement | HTMLVideoElement>(
  media: T,
  readyEvent: 'load' | 'loadeddata',
  errorMessage: string,
  signal: AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const eventTarget: EventTarget = media
    const cleanup = (): void => {
      eventTarget.removeEventListener(readyEvent, onReady)
      eventTarget.removeEventListener('error', onError)
      signal.removeEventListener('abort', onAbort)
    }
    const onReady = (): void => {
      cleanup()
      resolve(media)
    }
    const onError = (): void => {
      cleanup()
      reject(new Error(errorMessage))
    }
    const onAbort = (): void => {
      cleanup()
      reject(new DOMException('CHROMA_LAG source resolution aborted', 'AbortError'))
    }
    if (signal.aborted) {
      onAbort()
      return
    }
    eventTarget.addEventListener(readyEvent, onReady, { once: true })
    eventTarget.addEventListener('error', onError, { once: true })
    signal.addEventListener('abort', onAbort, { once: true })
  })
}

function resolveSource(
  source: string | CanvasImageSource,
  signal: AbortSignal,
): Promise<CanvasImageSource> {
  if (signal.aborted) {
    return Promise.reject(new DOMException('CHROMA_LAG source resolution aborted', 'AbortError'))
  }
  if (typeof source !== 'string') {
    if (source instanceof HTMLVideoElement) {
      if (source.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve(source)
      return waitForMedia(source, 'loadeddata', 'CHROMA_LAG video failed to load', signal)
    }
    if (source instanceof HTMLImageElement && !source.complete) {
      return waitForMedia(source, 'load', 'CHROMA_LAG image failed to load', signal)
    }
    return Promise.resolve(source)
  }

  const image = new Image()
  if (!source.startsWith('data:') && !source.startsWith('blob:')) image.crossOrigin = 'anonymous'
  const imageUrl = source.trimStart().startsWith('<svg')
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`
    : source
  const resolved = waitForMedia(image, 'load', 'CHROMA_LAG source failed to load', signal)
  if (!signal.aborted) {
    image.src = imageUrl
  }
  return resolved
}

function markSourceError(canvas: HTMLCanvasElement, error: unknown): void {
  const message = error instanceof Error ? error.message : 'CHROMA_LAG source failed'
  canvas.setAttribute('data-render-error', message)
}

function isSourceDescriptor(source: ChromaLagSource): source is ChromaLagSourceDescriptor {
  return (
    typeof source === 'object' &&
    source !== null &&
    'render' in source &&
    typeof source.render === 'function'
  )
}

function createRenderer(
  canvas: HTMLCanvasElement,
  sourceFactory: ChromaLagSourceFactory,
  events: RendererEvents,
): ChromaLagRenderer {
  const context = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  })
  if (!context) throw new Error('WebGL2 is required for CHROMA_LAG')
  const gl: WebGL2RenderingContext = context

  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const prepareFragment = compileShader(gl, gl.FRAGMENT_SHADER, PREPARE_SHADER)
  const horizontalFragment = compileShader(gl, gl.FRAGMENT_SHADER, HORIZONTAL_BLUR_SHADER)
  const verticalFragment = compileShader(gl, gl.FRAGMENT_SHADER, VERTICAL_BLUR_SHADER)
  const compositeFragment = compileShader(gl, gl.FRAGMENT_SHADER, COMPOSITE_SHADER)
  const prepareProgram = linkProgram(gl, vertex, prepareFragment)
  const horizontalProgram = linkProgram(gl, vertex, horizontalFragment)
  const verticalProgram = linkProgram(gl, vertex, verticalFragment)
  const compositeProgram = linkProgram(gl, vertex, compositeFragment)
  const programs = [prepareProgram, horizontalProgram, verticalProgram, compositeProgram] as const
  const fragments = [
    prepareFragment,
    horizontalFragment,
    verticalFragment,
    compositeFragment,
  ] as const
  const vao = gl.createVertexArray()
  const framebuffer = gl.createFramebuffer()
  if (!vao || !framebuffer) throw new Error('CHROMA_LAG framebuffer allocation failed')

  const sourceTexture = createTexture(gl)
  const sourceLinearTexture = createTexture(gl)
  const emissionTexture = createTexture(gl)
  const defocusHorizontalTexture = createTexture(gl)
  const bloomHorizontalTexture = createTexture(gl)
  const defocusedSourceTexture = createTexture(gl)
  const bloomTexture = createTexture(gl)
  const textures = [
    sourceTexture,
    sourceLinearTexture,
    emissionTexture,
    defocusHorizontalTexture,
    bloomHorizontalTexture,
    defocusedSourceTexture,
    bloomTexture,
  ] as const

  const prepareUniforms = {
    source: requiredUniform(gl, prepareProgram, 'uSource'),
    resolution: requiredUniform(gl, prepareProgram, 'uResolution'),
    dpr: requiredUniform(gl, prepareProgram, 'uDpr'),
    time: requiredUniform(gl, prepareProgram, 'uTime'),
    cols: requiredUniform(gl, prepareProgram, 'uCols'),
    rows: requiredUniform(gl, prepareProgram, 'uRows'),
    cellCount: requiredUniform(gl, prepareProgram, 'uCellCount'),
    lock: requiredUniform(gl, prepareProgram, 'uLock[0]'),
  }
  const horizontalUniforms = {
    source: requiredUniform(gl, horizontalProgram, 'uSource'),
    emission: requiredUniform(gl, horizontalProgram, 'uEmission'),
    targetSize: requiredUniform(gl, horizontalProgram, 'uTargetSize'),
    defocusSigma: requiredUniform(gl, horizontalProgram, 'uDefocusSigma'),
    bloomSigma: requiredUniform(gl, horizontalProgram, 'uBloomSigma'),
  }
  const verticalUniforms = {
    defocusHorizontal: requiredUniform(gl, verticalProgram, 'uDefocusHorizontal'),
    bloomHorizontal: requiredUniform(gl, verticalProgram, 'uBloomHorizontal'),
    targetSize: requiredUniform(gl, verticalProgram, 'uTargetSize'),
    defocusSigma: requiredUniform(gl, verticalProgram, 'uDefocusSigma'),
    bloomSigma: requiredUniform(gl, verticalProgram, 'uBloomSigma'),
  }
  const compositeUniforms = {
    source: requiredUniform(gl, compositeProgram, 'uSource'),
    defocusedSource: requiredUniform(gl, compositeProgram, 'uDefocusedSource'),
    bloom: requiredUniform(gl, compositeProgram, 'uBloom'),
    resolution: requiredUniform(gl, compositeProgram, 'uResolution'),
    dpr: requiredUniform(gl, compositeProgram, 'uDpr'),
    time: requiredUniform(gl, compositeProgram, 'uTime'),
  }

  gl.bindVertexArray(vao)
  gl.disable(gl.BLEND)
  gl.disable(gl.DEPTH_TEST)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, sourceTexture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.SRGB8_ALPHA8,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(4),
  )

  let width = 0
  let height = 0
  let halfWidth = 0
  let halfHeight = 0
  let dpr = 1
  let source: CanvasImageSource | null = null
  const uploadFrame = document.createElement('canvas')
  const uploadContextValue = uploadFrame.getContext('2d', { alpha: true })
  if (!uploadContextValue) throw new Error('CHROMA_LAG source canvas allocation failed')
  const uploadContext: CanvasRenderingContext2D = uploadContextValue
  let disposed = false
  let contextLost = false
  const startedAt = performance.now()

  function resize(): boolean {
    const cssWidth = Math.max(1, canvas.clientWidth || canvas.width || 1)
    const cssHeight = Math.max(1, canvas.clientHeight || canvas.height || 1)
    const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, DPR_CAP))
    const nextWidth = Math.max(1, Math.round(cssWidth * nextDpr))
    const nextHeight = Math.max(1, Math.round(cssHeight * nextDpr))
    if (nextWidth === width && nextHeight === height && nextDpr === dpr) return false

    width = nextWidth
    height = nextHeight
    halfWidth = Math.max(1, Math.ceil(width / 2))
    halfHeight = Math.max(1, Math.ceil(height / 2))
    dpr = nextDpr
    canvas.width = width
    canvas.height = height
    allocateTarget(gl, sourceLinearTexture, width, height)
    allocateTarget(gl, emissionTexture, width, height)
    for (const texture of [
      defocusHorizontalTexture,
      bloomHorizontalTexture,
      defocusedSourceTexture,
      bloomTexture,
    ]) {
      allocateTarget(gl, texture, halfWidth, halfHeight)
    }
    attachPair(gl, framebuffer, sourceLinearTexture, emissionTexture)
    assertFramebuffer(gl)
    attachPair(gl, framebuffer, defocusHorizontalTexture, bloomHorizontalTexture)
    assertFramebuffer(gl)
    attachPair(gl, framebuffer, defocusedSourceTexture, bloomTexture)
    assertFramebuffer(gl)
    source = null
    return true
  }

  function uploadSource(): boolean {
    const cssWidth = Math.max(1, canvas.clientWidth || canvas.width || 1)
    const cssHeight = Math.max(1, canvas.clientHeight || canvas.height || 1)
    source = sourceFactory({ width, height, cssWidth, cssHeight, dpr })
    if (!source) return false
    uploadFrame.width = width
    uploadFrame.height = height
    uploadContext.clearRect(0, 0, width, height)
    uploadContext.drawImage(source, 0, 0, width, height)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, sourceTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.SRGB8_ALPHA8, gl.RGBA, gl.UNSIGNED_BYTE, uploadFrame)
    return true
  }

  function bindTexture(unit: number, texture: WebGLTexture): void {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, texture)
  }

  function render(frame: ChromaLagFrame, refreshSource = false): boolean {
    if (disposed || contextLost || gl.isContextLost()) return false
    const resized = resize()
    if (refreshSource || resized || !source) {
      source = null
      if (!uploadSource()) {
        canvas.removeAttribute('data-render-ready')
        canvas.style.opacity = '0'
        return false
      }
    }
    gl.bindVertexArray(vao)
    const time = (performance.now() - startedAt) / 1000

    attachPair(gl, framebuffer, sourceLinearTexture, emissionTexture)
    gl.viewport(0, 0, width, height)
    gl.useProgram(prepareProgram)
    bindTexture(0, sourceTexture)
    gl.uniform1i(prepareUniforms.source, 0)
    gl.uniform2f(prepareUniforms.resolution, width, height)
    gl.uniform1f(prepareUniforms.dpr, dpr)
    gl.uniform1f(prepareUniforms.time, time)
    gl.uniform1i(prepareUniforms.cols, frame.cells.columns)
    gl.uniform1i(prepareUniforms.rows, frame.cells.rows)
    gl.uniform1i(prepareUniforms.cellCount, frame.cells.columns * frame.cells.rows)
    gl.uniform1fv(prepareUniforms.lock, frame.lock)
    gl.drawArrays(gl.TRIANGLES, 0, 3)

    attachPair(gl, framebuffer, defocusHorizontalTexture, bloomHorizontalTexture)
    gl.viewport(0, 0, halfWidth, halfHeight)
    gl.useProgram(horizontalProgram)
    bindTexture(0, sourceLinearTexture)
    bindTexture(1, emissionTexture)
    gl.uniform1i(horizontalUniforms.source, 0)
    gl.uniform1i(horizontalUniforms.emission, 1)
    gl.uniform2f(horizontalUniforms.targetSize, halfWidth, halfHeight)
    gl.uniform1f(horizontalUniforms.defocusSigma, 0.75 * dpr * 0.5)
    gl.uniform1f(horizontalUniforms.bloomSigma, 3.0 * dpr * 0.5)
    gl.drawArrays(gl.TRIANGLES, 0, 3)

    attachPair(gl, framebuffer, defocusedSourceTexture, bloomTexture)
    gl.viewport(0, 0, halfWidth, halfHeight)
    gl.useProgram(verticalProgram)
    bindTexture(0, defocusHorizontalTexture)
    bindTexture(1, bloomHorizontalTexture)
    gl.uniform1i(verticalUniforms.defocusHorizontal, 0)
    gl.uniform1i(verticalUniforms.bloomHorizontal, 1)
    gl.uniform2f(verticalUniforms.targetSize, halfWidth, halfHeight)
    gl.uniform1f(verticalUniforms.defocusSigma, 0.55 * dpr * 0.5)
    gl.uniform1f(verticalUniforms.bloomSigma, 2.4 * dpr * 0.5)
    gl.drawArrays(gl.TRIANGLES, 0, 3)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.drawBuffers([gl.BACK])
    gl.viewport(0, 0, width, height)
    gl.useProgram(compositeProgram)
    bindTexture(0, sourceLinearTexture)
    bindTexture(1, defocusedSourceTexture)
    bindTexture(2, bloomTexture)
    gl.uniform1i(compositeUniforms.source, 0)
    gl.uniform1i(compositeUniforms.defocusedSource, 1)
    gl.uniform1i(compositeUniforms.bloom, 2)
    gl.uniform2f(compositeUniforms.resolution, width, height)
    gl.uniform1f(compositeUniforms.dpr, dpr)
    gl.uniform1f(compositeUniforms.time, time)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    canvas.removeAttribute('data-render-error')

    if (!canvas.hasAttribute('data-render-ready')) {
      gl.finish()
      canvas.setAttribute('data-render-ready', '')
      canvas.style.opacity = '1'
    }
    return source !== null
  }

  function onContextLost(event: Event): void {
    event.preventDefault()
    contextLost = true
    canvas.removeAttribute('data-render-ready')
    canvas.style.opacity = '0'
    events.lost()
  }

  function onContextRestored(): void {
    contextLost = false
    events.restored()
  }

  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  return {
    render,
    dispose(options): void {
      if (disposed) return
      disposed = true
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      if (options?.deleteResources !== false) {
        gl.deleteFramebuffer(framebuffer)
        textures.forEach((texture) => gl.deleteTexture(texture))
        programs.forEach((program) => gl.deleteProgram(program))
        fragments.forEach((fragment) => gl.deleteShader(fragment))
        gl.deleteShader(vertex)
        gl.deleteVertexArray(vao)
      }
      if (options?.loseContext !== false) releaseContextAfterDetach(gl)
    },
  }
}

function createPlayer(
  canvas: HTMLCanvasElement,
  sourceFactory: ChromaLagSourceFactory,
  cells: ChromaLagCells,
): ChromaLagPlayer {
  let renderer: ChromaLagRenderer
  let disposed = false
  let animationFrame = 0
  let previousFrame = -Infinity
  let sourceInvalidated = false
  const cellCount = cells.columns * cells.rows
  const lock = new Float32Array(CELL_CAP)
  const lockTarget = new Float32Array(CELL_CAP)
  const frame: ChromaLagFrame = { cells, lock }

  const isCellIndex = (index: number): boolean =>
    Number.isInteger(index) && index >= 0 && index < cellCount

  const advanceInteraction = (): void => {
    for (let index = 0; index < cellCount; index += 1) {
      const target = lockTarget[index] ?? 0
      const follow = target > (lock[index] ?? 0) ? 0.32 : 0.25
      lock[index] += (target - lock[index]) * follow
    }
  }

  const events: RendererEvents = {
    lost(): void {},
    restored(): void {
      if (disposed) return
      renderer.dispose({ deleteResources: false, loseContext: false })
      renderer = createRenderer(canvas, sourceFactory, events)
      renderer.render(frame, true)
    },
  }

  renderer = createRenderer(canvas, sourceFactory, events)
  const renderCurrent = (refreshSource = false): boolean => renderer.render(frame, refreshSource)
  const onResize = (): void => {
    renderCurrent(true)
  }
  const resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(canvas)
  window.addEventListener('resize', onResize)
  renderCurrent(true)
  const animate = (time: number): void => {
    if (disposed) return
    if (time - previousFrame >= 1000 / 30) {
      previousFrame = time
      advanceInteraction()
      renderCurrent(sourceInvalidated)
      sourceInvalidated = false
    }
    animationFrame = window.requestAnimationFrame(animate)
  }
  animationFrame = window.requestAnimationFrame(animate)

  return {
    renderCurrent,
    invalidateSource(): void {
      sourceInvalidated = true
    },
    activateCell(index): void {
      if (!isCellIndex(index)) return
      lockTarget.fill(0)
      lockTarget[index] = 1
    },
    deactivateCell(index): void {
      if (!isCellIndex(index)) return
      lockTarget[index] = 0
    },
    triggerCell(index): void {
      if (!isCellIndex(index)) return
      lockTarget.fill(0)
      lockTarget[index] = 1
    },
    reset(): void {
      lockTarget.fill(0)
    },
    dispose(): void {
      if (disposed) return
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    },
  }
}

function scheduleVideoFrames(video: HTMLVideoElement, render: () => void): () => void {
  let callback = 0
  const draw = (): void => {
    render()
    callback = video.requestVideoFrameCallback(draw)
  }
  callback = video.requestVideoFrameCallback(draw)
  return () => video.cancelVideoFrameCallback(callback)
}

export const ChromaLagEffect = forwardRef<ChromaLagEffectHandle, ChromaLagEffectProps>(
  function ChromaLagEffect(
    {
      source,
      cells = DEFAULT_CELLS,
      fit = 'cover',
      position = { x: 0.5, y: 0.5 },
      className,
      style,
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const playerRef = useRef<ChromaLagPlayer | undefined>(undefined)
    const positionX = position.x
    const positionY = position.y
    const columns = Number.isFinite(cells.columns) ? Math.max(1, Math.floor(cells.columns)) : 1
    const rows = Number.isFinite(cells.rows) ? Math.max(1, Math.floor(cells.rows)) : 1
    const cellCount = columns * rows

    if (cellCount > CELL_CAP) {
      throw new Error(`ChromaLagEffect supports at most ${CELL_CAP} cells`)
    }

    useImperativeHandle(
      ref,
      () => ({
        activateCell(index): void {
          playerRef.current?.activateCell(index)
        },
        deactivateCell(index): void {
          playerRef.current?.deactivateCell(index)
        },
        triggerCell(index): void {
          playerRef.current?.triggerCell(index)
        },
        reset(): void {
          playerRef.current?.reset()
        },
        refresh(): void {
          playerRef.current?.renderCurrent(true)
        },
      }),
      [],
    )

    useLayoutEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const cellGrid = { columns, rows }

      if (isSourceDescriptor(source)) {
        const player = createPlayer(canvas, source.render, cellGrid)
        playerRef.current = player
        let cancelled = false
        const unsubscribe = source.subscribe?.(() => player.renderCurrent(true))
        if (source.ready) {
          void source
            .ready()
            .then(() => {
              if (!cancelled) player.renderCurrent(true)
            })
            .catch((error: unknown) => {
              if (!cancelled) markSourceError(canvas, error)
            })
        }
        return () => {
          cancelled = true
          unsubscribe?.()
          player.dispose()
          if (playerRef.current === player) playerRef.current = undefined
        }
      }

      let resolvedFactory: ChromaLagSourceFactory | undefined
      let stopVideo: (() => void) | undefined
      let cancelled = false
      const controller = new AbortController()
      const player = createPlayer(canvas, (context) => resolvedFactory?.(context) ?? null, cellGrid)
      playerRef.current = player
      void resolveSource(source, controller.signal)
        .then((resolvedSource) => {
          if (cancelled) return
          resolvedFactory = createFrameFactory(resolvedSource, fit, {
            x: positionX,
            y: positionY,
          })
          player.renderCurrent(true)
          if (resolvedSource instanceof HTMLVideoElement) {
            stopVideo = scheduleVideoFrames(resolvedSource, player.invalidateSource)
          }
        })
        .catch((error: unknown) => {
          if (!cancelled && !(error instanceof DOMException && error.name === 'AbortError')) {
            markSourceError(canvas, error)
          }
        })
      return () => {
        cancelled = true
        controller.abort()
        stopVideo?.()
        player.dispose()
        if (playerRef.current === player) playerRef.current = undefined
      }
    }, [columns, fit, positionX, positionY, rows, source])

    return (
      <div
        className={className}
        style={{
          aspectRatio: `${CHROMA_LAG_WIDTH} / ${CHROMA_LAG_HEIGHT}`,
          backgroundColor: 'rgb(5, 5, 4)',
          height: '100%',
          position: 'relative',
          width: '100%',
          ...style,
        }}
      >
        <canvas
          aria-hidden="true"
          data-chroma-lag-canvas
          height={CHROMA_LAG_HEIGHT}
          ref={canvasRef}
          style={{
            display: 'block',
            height: '100%',
            inset: 0,
            opacity: 0,
            position: 'absolute',
            width: '100%',
          }}
          width={CHROMA_LAG_WIDTH}
        />
      </div>
    )
  },
)
