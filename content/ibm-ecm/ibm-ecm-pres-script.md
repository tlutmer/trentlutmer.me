# Emptortoise — 20-Slide Presentation Script

*Emptoris Contract Manager — IBM · Presenter: Trent Lutmer*
*Target runtime: ~12 minutes plus Q&A. Time checks at slides 7, 14, and 20.*

---

## Slide 1 — Title

**On slide:** Emptortoise · Emptoris Contract Manager — IBM · Trent Lutmer, Interaction Designer

**Say:** This project's users had a nickname for the product I was brought in to redesign. They called it the Emptortoise — for how slowly it ran and how poorly it worked. This is the story of the Emptoris Contract Manager redesign, and how we got a fifteen-year-old product to answer first and ask questions later.

---

## Slide 2 — Cold open: Sarah

**On slide:** A search form with 52 required fields. One line: "She knows maybe three of them."

**Say:** Meet Sarah, a contract manager at a regional healthcare network. She has ten contracts in negotiation and needs exactly one — the master agreement she worked on yesterday. The search screen has fifty-two required fields. She knows maybe three. She fills in what she can, hits search, gets nothing. So she does what she always does: opens Outlook, where she keeps an encrypted Word copy of every contract — because at least her email search works.

---

## Slide 3 — What Emptoris Contract Manager is

**On slide:** Product shot. "Create, negotiate, approve, execute, and amend agreements — the full contract lifecycle."

**Say:** The product is Emptoris Contract Manager — IBM software that thousands of companies use to manage the full lifecycle of a legal contract: creating, negotiating, approving, executing, amending. For contract managers it's the system of record for every obligation. For their employers, it's how deals close on time and stay legally sound.

---

## Slide 4 — What users said

**On slide:**
- "I can't find anything!"
- "I hate how many clicks it takes to do anything."
- "There are several different interfaces, and I'm not sure if I trust it."
- "I want to see one place to type in and find what I'm looking for."

**Say:** By 2015 the product was fifteen years old with no serious redesign in its life, and the users didn't mince words. These are real quotes. That last one — "one place to type in and find what I'm looking for" — is a person begging for a search bar in 2015.

---

## Slide 5 — The problem

**On slide:**
- 52 required inputs to run a search
- ~5 minutes per attempt · succeeds 53% of the time
- Workarounds: Word copies in encrypted email — outside the system of record
- Renewals slipping across a Fortune 500 customer base

**Say:** Plainly: finding a contract meant filling out fifty-two required fields, spending about five minutes per attempt — and succeeding fifty-three percent of the time. A coin flip. So users built workarounds outside the system of record, and every workaround eroded the product's reason to exist. It showed in the business: renewals were slipping.

---

## Slide 6 — Goals

**On slide:**
- Find any active master agreement (incl. payment terms) within 4 clicks
- Reach 80% of daily work within 1 click of the homepage
- Cut time to find a contract and return to work by 55%

**Say:** We committed to three success metrics. Sarah can find any active master agreement — down to payment terms like Net 90 — within four clicks. She can reach eighty percent of her work within one click of the homepage. And overall, we cut the time to find a contract and get back to work by fifty-five percent.

---

## Slide 7 — The team, and the ask *(time check: ~3:00)*

**On slide:** 3 designers · 2 PMs · 45 developers — inside a 6-product suite. "It shouldn't take more than a month." → We negotiated 3, with an option to continue.

**Say:** The core team was three designers — I was the interaction designer on search and the homepage — with two product managers and forty-five developers, inside a larger six-product suite organization. The Emptoris team, riding the momentum of IBM's new design thinking program, told us it "shouldn't take more than a month to redesign." We negotiated three months, with an option to continue. Hold that thought.

---

## Slide 8 — Discovery

**On slide:** 25+ contract managers interviewed. Insights: no lifecycle visibility · 52 required search filters · no collaboration · weak integration across the suite

**Say:** We interviewed more than twenty-five contract managers. Four insights kept repeating: no visibility across the contract lifecycle, a search that demanded fifty-two precise inputs, no collaboration between users, and weak integration with the rest of the suite. To keep ourselves honest, the whole team met twice a week to adjust goals against what we were learning.

---

## Slide 9 — The baseline

**On slide:** Find one contract: 5 minutes · 52 required fields · 53% success

**Say:** And we measured the baseline, because you can't claim improvement without one. Five minutes to find a single contract. Fifty-two required fields. A fifty-three percent success rate. Every number that follows is against this.

---

## Slide 10 — How might we…?

**On slide:**
- How might we create a sense of progression across my contracts?
- How might we help users find their assigned contracts and begin working?

**Say:** We framed the work with two questions: how might we create a sense of progression across contracts — that's the visibility problem — and how might we help users find their assigned contracts and just begin working?

---

## Slide 11 — Ideation

**On slide:** Photos: affinity mapping, empathy maps, sketches, wireframes

**Say:** With the persona and those two questions, we ran the classic playbook — affinity mapping, empathy maps, individual sketching, then converging as a team into wireframes. Solid ideas, steady progress. And then the actual answer showed up somewhere else entirely.

---

## Slide 12 — The turn

**On slide:** "Every search Sarah uses outside work answers first, then refines. Ours asked 52 questions before showing anything."

**Say:** It came to me over Christmas break, away from the office. Our search asked its fifty-two questions before showing you anything. Every search engine Sarah used outside of work — Amazon, Google — did the exact opposite: answer first, refine after. That flipped the whole project. This was never about building a better form. The product needed to answer first and ask questions later.

---

## Slide 13 — The search experience

**On slide:** Auto-complete search bar with recent & saved searches → full results page with filters and tags

**Say:** So the new search: start typing and auto-complete suggestions appear immediately, along with your recent and saved searches. Run it, and a full results page opens with filters and tagging to refine as deep as you need. The fifty-two fields still exist — as optional refinements, after you already have results in front of you.

---

## Slide 14 — The homepage *(time check: ~7:00)*

**On slide:** Dashboard of personal contracts — status and stage visible. Table capped at 5 user-configurable columns.

**Say:** The homepage followed the same logic: a dashboard of the contracts you're actually working on, each showing its status and stage — so Sarah, and her managers, can see where every negotiation stands and jump back in. One trade-off worth owning: users wanted every data column at once, and no pattern supports that. I capped the table at five columns and made them user-configurable, with defaults narrowed through testing.

---

## Slide 15 — The pushback

**On slide:** "The backend was already fragile. Dev didn't want to touch it." → Phased the search across releases

**Say:** The development team, staring at a backend they already knew was fragile, initially didn't want to build any of it. Fair. Instead of fighting, we worked with product management to phase the search experience across releases — version one didn't need everything. And when the visual design came, we pulled back from our early wilder concepts to flat, familiar data tables, closer to the e-commerce patterns users already trusted.

---

## Slide 16 — Testing

**On slide:**
- 32 users over 2 months
- 81% found a contract in <1 minute and <5 clicks (baseline: 5 min, 53%)
- 94% reached 80% of their work within 1 click of the homepage
- Clause review: 62% · Rating: 4 out of 5

**Say:** We tested with thirty-two users over two months. Eighty-one percent found a contract in under a minute and under five clicks — against that five-minute, coin-flip baseline. Ninety-four percent reached eighty percent of their work within one click of the homepage. Clause review lagged at sixty-two percent — honest evidence of work remaining — and users rated the new experience four out of five.

---

## Slide 17 — The extension

**On slide:** "Three more months. Six products. Six different front-end frameworks."

**Say:** Remember the option to continue? Emptoris exercised it — three more months, for the harder problem. The suite had six products, each on a different front-end framework, and development teams anxious to start with no front-end developers among them.

---

## Slide 18 — Scaling by shipping code

**On slide:** Style guide → coded components → CSS framework → migration plan across all 6 products

**Say:** So I took charge of the part I could control: I started coding components from our style guide myself, built them into a CSS framework with our visual designer, and worked with the development leads and PMs on a migration plan to carry the experience across all six products. Sometimes the way to scale a design is to ship it as code.

---

## Slide 19 — Impact

**On slide:**
- Renewal rate: 66% → 72% across 51 Fortune 500 customers
- 25 new customers
- $85M+ revenue in the first 6 months
- IBM Manager Award

**Say:** Within six months of release: the renewal rate rose from sixty-six to seventy-two percent across fifty-one Fortune 500 customers. Twenty-five new customers signed. The product earned more than eighty-five million dollars in revenue, and the work was recognized with an IBM Manager Award. And Sarah's morning now starts on a homepage that already knows her contracts — Outlook is just for email again.

---

## Slide 20 — Lessons *(time check: ~12:00)*

**On slide:**
- Scaling is hard
- Don't marry your designs
- Trust the design process

**Say:** Three lessons. Scaling is hard — designing one good experience took three months; carrying it across six products took everything after. Don't marry your designs — our early visual concepts were fun, and wrong, and letting them go made the product better. And trust the design process — the breakthrough looked like it came from a Christmas break, but it only landed because months of research told us exactly what it had to fix. Thank you — happy to take questions.

---

## Slide 21 — Q&A

**On slide:** Thank you · Questions?

**Prep — likely questions and answers:**

- **"$85 million in six months — was that your redesign?"** That's the product's revenue across renewals and new sales in the release window, so no single discipline owns it. The tighter attribution is the renewal rate: 66 to 72 percent across 51 Fortune 500 customers, in the cycle where the redesign was the headline change — and several lapsed clients came back.

- **"Clause review only hit 62% — what happened?"** It exposed a deeper information-architecture problem than search: clause content lived in dense legal structures our redesign hadn't yet touched. We reported it honestly and it topped the phase-two backlog rather than getting buried.

- **"What was your role versus the other designers?"** Interaction designer owning the search and homepage experiences end to end — and in the extension phase, the one coding the style guide into a CSS framework and driving the migration across the six-product suite.

- **"Would auto-complete search still be your answer today?"** The principle — answer first, refine after — absolutely. The implementation would change: today I'd reach for federated search and language-model query understanding instead of hand-tuned recents and saved searches.

- **"How did you get a resistant dev team to build it?"** By not asking for all of it. We phased the search experience across releases with product management, so version one fit inside the backend rebuild they already had to do.

---

*End of script. Slides 2–20 map onto the case study's six story beats: cold open (2), context and problem (3–6), evidence (7–9), the turn (10–12), the build (13–18), and the reckoning (19–20).*
