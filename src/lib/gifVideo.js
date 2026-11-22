// GIFs that were too large for GitHub/hosting (over ~20 MB) now ship as same-resolution H.264 MP4s
// beside the original GIF. Components call videoFor(src): it returns the MP4 path for these, else null,
// and the caller plays it as an always-on, always-looping video (see AutoplayVideo / useKeepPlaying).
const CONVERTED = new Set([
  '/media/mcsp-iam/MCSP_Roles_1080p_loop.gif',
  '/media/mcsp-iam/MCSP_Users_1080p_loop.gif',
  '/media/mcsp-iam/MCSP_UserGroups_1080p_loop.gif',
  '/media/mcsp-iam/MCSP_ServiceIDs_1080p_loop.gif',
  '/media/mcsp-iam/MCSP_APIKeys_1080p_loop.gif',
  '/media/hp-db/HPDB_Desktop_Dark_1024p30_loop.gif',
  '/media/hp-db/HPDB_Desktop_Light_1024p30_loop.gif',
  '/media/fedregs/FedRegs_DocumentViewer_1080p_loop.gif',
  '/media/fedregs/FedRegs_CommentThemes_1080p_loop.gif',
  '/media/hp-dc/HP_Color_1080p_loop.gif',
  '/media/hp-dc/HP_Input_1080p_loop.gif',
  '/media/hp-dc/HP_AudioCamera_1080p_loop.gif',
  '/media/hp-dc/HP_Display_1080p_loop.gif',
  '/media/kelor/kelor-sheet-1024-30.gif',
])

export function videoFor(src) {
  return typeof src === 'string' && CONVERTED.has(src) ? src.replace(/\.gif$/i, '.mp4') : null
}
