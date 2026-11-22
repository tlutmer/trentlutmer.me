# Three Versions of the Truth — 20-Slide Presentation Script

*Carbon for IBM Products — Figma Libraries · Presenter: Trent Lutmer*
*Target runtime: ~12 minutes plus Q&A. Time checks at slides 8, 14, and 20.*

---

## Slide 1 — Title

**On slide:** Three Versions of the Truth · Carbon for IBM Products — Figma Libraries · Trent Lutmer

**Say:** This is a story about a design system project where the hardest part wasn't building components — it was deciding which version of each component was actually true. This is the Carbon for IBM Products Figma libraries.

---

## Slide 2 — Cold open: Mara

**On slide:** A designer's screen with three tabs open — guidance site, Storybook, design kit. One line: "Her deadline doesn't care which one is right."

**Say:** I want to start with Mara, a product designer on an enterprise cloud team. She needs to drop an about modal into her design. She has three tabs open: the guidance website, the Storybook code demo, and the design kit. Three versions of the same component — different footers, different breakpoints, different themes. She checks the documentation to break the tie, and it disagrees with all three. Her deadline doesn't care which one is right. So she copies the kit version, hopes it matches what engineering builds, and moves on.

---

## Slide 3 — What Carbon is

**On slide:** Carbon Design System overview. "Components, patterns, guidance, and code — so thousands of builders don't reinvent buttons."

**Say:** The kit Mara is using belongs to the Carbon Design System — IBM's shared collection of components, patterns, guidance, and code. It's the thing that lets thousands of designers and developers across IBM build consistent products without reinventing the basics.

---

## Slide 4 — Carbon for IBM Products

**On slide:** Diagram: Carbon core → Carbon for IBM Products extension → Cloud Paks · Cloud Platform · SaaS · on-premise

**Say:** I contributed to its extension layer, Carbon for IBM Products — the components that are too product-specific for the core system, shared across Cloud Paks, the cloud platform, SaaS, and on-premise products. It's maintained by a guild: designers borrowed from product teams who build the library on top of their day jobs.

---

## Slide 5 — 2022: Sketch → Figma

**On slide:** "IBM design is moving to Figma. There is no Figma kit."

**Say:** In early 2022 the system picked up a new problem on top of the old one. IBM design was moving from Sketch to Figma — and no Figma kit existed. Designers were about to land in a new tool with nothing to design with.

---

## Slide 6 — The problem

**On slide:**
- Three sources of truth — website, code, Sketch kit — that don't agree
- Every team resolves contradictions privately, on deadline
- Every private fix compounds the drift the system exists to prevent
- The Figma migration will rebuild the gap into a new tool — or close it

**Say:** So here's the problem, plainly. Carbon for IBM Products had three sources of truth that didn't agree. People who came looking for certainty left with contradictions, and every team resolved them differently, in private, on deadline. Each of those private fixes compounds exactly the drift a design system exists to prevent. And the Figma migration meant we were either about to rebuild that gap into a brand-new tool — or use the move as the moment to close it.

---

## Slide 7 — Goals

**On slide:**
- Push Carbon adoption across IBM toward 100%
- A kit designers can trust on day one — light & dark themes, responsive
- Code, website, and libraries: identical
- Ease designer–developer handoff

**Say:** The goals were blunt. Push Carbon adoption across IBM toward one hundred percent. Give migrating designers a kit they could trust on day one — light and dark themes, responsive components. Make the code, the website, and the libraries look and feel identical. And ease the handoff between designers and developers.

---

## Slide 8 — The guild *(time check: ~3:00)*

**On slide:** 11 designers · 1–4 hours a week each · 8 weeks to launch · weekly check-ins

**Say:** Now the constraint that shaped everything: the team. Eleven designers, myself included, each borrowed from a product team, each with one to four hours a week to give. Laura, our lead, set an eight-week course to launch in April, with weekly status check-ins. At kickoff we each chose our components — I took the About modal, and a few others.

---

## Slide 9 — The audit

**On slide:** About modal, side by side by side: Sketch vs. Storybook vs. guidance site — variants, breakpoints, and themes all differ

**Say:** My first audit showed why the work mattered. The About modal's variants and documentation differed across Sketch, Storybook, and the website — right down to which breakpoints and themes were supposed to exist. This wasn't sloppiness in one place; it was three well-intentioned sources that had drifted apart.

---

## Slide 10 — Starting from scratch

**On slide:** "No Figma foundation. Borrowed: IBM Design Language color & type styles. Everything else: built new."

**Say:** And there was no Figma foundation to stand on. Figma was new to IBM — the core Carbon team had only just started their own kit. We borrowed color and typography styles from the IBM Design Language, and built everything else from scratch.

---

## Slide 11 — The turn

**On slide:** "I went looking for the correct spec. There wasn't one."

**Say:** The turn came when I tracked down the designer who built the original Sketch component. I went looking for the correct spec — and there wasn't one. Together we had to decide it: sizes, themes, footer, scroll behavior. Negotiating what the component should be, rather than copying what it was. That reframed the whole project. This wasn't a port from Sketch to Figma. It was arbitration. Every contradiction had to be resolved once, in the open — and the kit would become the place the agreement lived.

---

## Slide 12 — Deciding the new truth

**On slide:** About modal spec: small + mobile sizes · light & dark themes · scrolling · one singular footer (versions/tech list — cut) · auto layout & variants · docs links built in

**Say:** Here's what the new truth looked like for the About modal: small and mobile sizes, light and dark themes, scrolling — and one deliberate cut, a singular footer, dropping the versions-and-technologies list the old component had carried. Plus two Figma-native decisions: build on auto layout and variants, and embed documentation links directly in the component.

---

## Slide 13 — The wrong first build

**On slide:** "Week one: 28 versions of one modal."

**Say:** My first Figma build honored every requirement and still felt wrong: twenty-eight separate versions of a single modal. Technically complete, practically unusable. So I took it to critique.

---

## Slide 14 — Critique → 4 variants *(time check: ~7:00)*

**On slide:** 28 versions → 4 variants · 0.82 GB → 0.06 GB · ~420,000 layers → ~9,000

**Say:** I came out of that critique actually understanding Figma's variants feature, and rebuilt. Four variants instead of twenty-eight. The file dropped from point-eight-two gigabytes to point-oh-six, and from nearly four hundred twenty thousand layers to just over nine thousand. Same truth, a fraction of the weight.

---

## Slide 15 — Certainty, built in

**On slide:** Component panel showing description + links: "Guidance ↗ · Code ↗"

**Say:** And every component shipped with descriptions and links — designers routed to the guidance site, developers routed to the code, from inside the component itself. The whole point was that the next person like Mara shouldn't need three tabs to feel certain.

---

## Slide 16 — Launch: Carbon 10 kits

**On slide:** Grey 10 kit — April 1 · Grey 100 kit — April 27 · 70+ teams in the first 60 days

**Say:** We launched on schedule: the Grey 10 theme kit on April first, Grey 100 at the end of the month, then a week or so of bug fixes and critique follow-ups. In the first sixty days, more than seventy teams adopted the kits.

---

## Slide 17 — Then Carbon 11 arrived

**On slide:** "March: Carbon v11 ships. September: the guild reconvenes." Scope: new spacing (20% margin removed) · new type & color tokens · Figma booleans

**Say:** Meanwhile the core Carbon team had shipped version eleven. In late September, with their approval, the guild reconvened to migrate the whole library: better spacing — dropping the old twenty-percent margin — new typography and color tokens, and Figma's boolean feature.

---

## Slide 18 — Fix in the open

**On slide:** "One gradient token, wrong color and opacity → a documented exception, not a silent fix." File: 0.06 GB → 0.01 · ~9,000 layers → 932

**Say:** The migration was mostly incremental, with one headache: a gradient token shipped with the wrong color and opacity. I could have quietly corrected it in the kit — which is exactly the kind of private fix that caused the original drift. Instead I wrote it in as a documented exception, visible to everyone. And the file shrank again — to a hundredth of a gigabyte and nine hundred thirty-two layers. The Carbon 11 kits published in late October and mid-November.

---

## Slide 19 — Impact

**On slide:**
- C10 kits: 70+ teams in first 60 days
- C11 kits: ~50 teams · 6,000+ component inserts in first 60 days
- Carbon adoption across IBM: 75%+
- Front-end effort saved: ~half · Maintenance costs: down ~a third

**Say:** So where did it land? The Carbon 10 kits: seventy-plus teams in sixty days. The Carbon 11 kits: nearly fifty teams and more than six thousand component inserts in the same window — numbers that keep growing as teams migrate. Carbon now stands at more than three-quarters adoption across IBM, and the system is credited with saving nearly half of front-end development effort and cutting maintenance costs by roughly a third. And Mara's version of that morning now starts and ends in one place: three tabs, one answer.

---

## Slide 20 — Lessons *(time check: ~12:00)*

**On slide:**
- A design system is the agreement, not the components
- Go to critique before you're proud of it
- Fix in the open — a documented exception beats a silent fix

**Say:** Three lessons. First — a design system isn't the components; it's the agreement about what's true. The kit is just where the agreement lives. Second — go to critique before you're proud of the work: twenty-eight versions became four because I showed it early enough to be told it was wrong. And third — fix in the open. A documented exception beats a silent fix, because silent fixes are how three sources of truth happen in the first place. Thank you — happy to take questions.

---

## Slide 21 — Q&A

**On slide:** Thank you · Questions?

**Prep — likely questions and answers:**

- **"Eleven designers at one to four hours a week — how did anything ship on time?"** Structure. Laura's weekly status cadence, clear per-component ownership chosen at kickoff, and critique as the quality gate. Guild work fails when it's vague; ours was scoped like a product.

- **"How were the adoption numbers tracked?"** Figma's library analytics — team adoption and component inserts per kit. The broader figures — adoption across IBM, front-end efficiency, maintenance savings — are Carbon program measurements, and I quote them as system-wide outcomes, not personal ones.

- **"What does a 'documented exception' mean in practice?"** The gradient token shipped wrong upstream, so I wrote the correction into the component's documentation as a named exception rather than silently fixing it in the kit — the whole project existed because silent fixes are how three sources of truth happen.

- **"Why not wait for the core Carbon team's Figma kit to mature first?"** The Sketch-to-Figma migration had its own clock — designers were landing in Figma with nothing to use. We borrowed what was stable (IBM Design Language color and type styles) and built the product-specific layer ourselves.

- **"What would you do differently?"** Learn the variants feature before building, not after — the 28-version modal cost me a week. And push for a shared intake process with the website and Storybook owners from day one, so the kit's 'truth' stayed synchronized instead of depending on individual diligence.

---

*End of script. Slides 2–20 map onto the case study's six story beats: cold open (2), context and problem (3–7), evidence (8–10), the turn (11), the build (12–18), and the reckoning (19–20).*
