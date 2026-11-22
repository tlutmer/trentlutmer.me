# The 55,000-Session Problem — 20-Slide Presentation Script

*Insight Timer (unsolicited redesign) — MICA graduate program · Presenter: Trent Lutmer*
*Target runtime: ~12 minutes plus Q&A. Time checks at slides 7, 13, and 20.*

---

## Slide 1 — Title

**On slide:** The 55,000-Session Problem · Insight Timer — unsolicited redesign, MICA graduate program · Trent Lutmer
*Footer: This work and its opinions are my own and do not reflect the views of Insight Timer.*

**Say:** This is a graduate-school project — an unsolicited redesign of Insight Timer, done end to end by myself: research, design, prototype, and testing. It's the story of a product whose proudest number turned out to be its biggest problem.

---

## Slide 2 — Cold open: Fynn

**On slide:** A phone screen mid-scroll. One line: "There's one session that works for him. Finding it is the workout."

**Say:** Meet Fynn, a career-focused project manager, finally off his last call of the day. There's one meditation session that works for him — the same one, every day; that's the point — and his streak depends on doing it tonight. He opens the app and starts navigating: past the featured content, past the new releases, past categories he's never touched, hunting for the session he already knows he wants. The app has fifty-five thousand meditations. Right now, that's the problem.

---

## Slide 3 — What Insight Timer is

**On slide:** Insight Timer: 10M Listeners · 5,000 professional Guides · 55,000+ free guided meditations

**Say:** Insight Timer is a mental-wellness platform: ten million Listeners, five thousand professional Guides — teachers who record and share guided meditations, bedtime stories, even prayer prompts — into a library of more than fifty-five thousand free sessions. The scale is genuinely impressive. Hold onto that thought.

---

## Slide 4 — Summer 2020

**On slide:** "COVID. Wildfires. An election. Therapy many can't afford." — meditation as the accessible option

**Say:** The context matters: this was July 2020. COVID, wildfires, an election on the way. In our interviews we heard directly about anxiety and panic attacks. Mental healthcare is expensive, and for a lot of people, a free meditation app is the accessible option. Which raises the stakes on whether that app actually works for them.

---

## Slide 5 — The problem

**On slide:**
- Consistency is where the mental-health benefit lives
- 55,000 sessions · no personal curation → choosing is tedious
- Daily-repeat users navigate to the same session every day
- Overwhelmed users drift to other apps

**Say:** Here's the problem, plainly. Listeners come to meditate consistently — consistency is where the benefit lives. But the library's abundance works against them. Choosing from fifty-five thousand sessions is tedious enough that people drift to other apps. And the most loyal users — the ones who repeat a favorite session daily — have to navigate to find it every single day. The people who arrive anxious leave overwhelmed.

---

## Slide 6 — The assignment, and the weird freedom

**On slide:** 8-week course, 6 working weeks · solo: research → design → prototype → validate · no product, dev, or marketing stakeholders

**Say:** My assignment: research and redesign Insight Timer, in an eight-week course with six working weeks, entirely solo. And a constraint that was really a luxury — no product, development, or marketing stakeholders. I never had to say no to anyone. The flip side: nobody was checking my rigor but me. So the bar was validating everything with real users.

---

## Slide 7 — Research *(time check: ~3:00)*

**On slide:** 15 interviews — Listeners + Guides → 2 audience types, 4 personas

**Say:** I started by interviewing fifteen Listeners and Guides about their stories, motivations, and pain points with meditation apps, and distilled what I heard into two audience types and four personas.

---

## Slide 8 — Two audiences

**On slide:** Guides: teach for joy, not money · post far beyond "typical" meditations. Listeners: love free content · would pay if it stays fresh · streaks and stats keep them accountable

**Say:** The Guides teach for the joy of helping people — not money — and post a huge variety of content to meet Listeners where they are. The Listeners love the free content and would pay for premium if it consistently felt fresh. They struggle to make meditation a habit — and the streaks and stats are what hold them accountable when motivation dips.

---

## Slide 9 — Fynn

**On slide:** Persona: Fynn, career-focused project manager. "We all live such busy lives it can be challenging to find time to meditate."

**Say:** I focused the work on Fynn: a career-focused Listener who needs to feel accountable and motivated without leaving his comfort zone. His line sums up the whole tension — "we all live such busy lives it can be challenging to find time to meditate." When time is that scarce, every minute spent searching is a minute not spent meditating.

---

## Slide 10 — Process

**On slide:** As-is / to-be scenarios · lightning demos · jobs-to-be-done · sprint map. Two guiding questions: What's the perfect meditation? What primary conditions need attention?

**Say:** I mapped as-is and to-be scenarios into a story, ran lightning demos and jobs-to-be-done to understand behavior and motivation, and built a sprint map of the current experience. Two questions kept the strategy honest: what's the perfect meditation — and what primary conditions need attention?

---

## Slide 11 — The turn

**On slide:** "55,000 sessions wasn't the asset. It was the obstacle."

**Say:** And that's where the project turned. Insight Timer's proudest number — fifty-five thousand free sessions — wasn't the asset. It was the obstacle. Adding more content doesn't increase retention; making it personal does. So the redesign stopped being about helping people explore the library, and became about making the library disappear — behind the one session that fits this person, right now.

---

## Slide 12 — Two ideas survive

**On slide:** Crazy 8s → two concepts wireframed → 2 iterations → connected mobile prototype

**Say:** From a Crazy 8s sprint I selected the two strongest ideas, wireframed them, folded them into the to-be stories, and after two iterations connected everything into a testable mobile prototype. Those two ideas were 'Today' and 'Stats.'

---

## Slide 13 — 'Today' *(time check: ~7:00)*

**On slide:** 'Today': a homepage that skips search. Curated by time of day · mood · past meditations. ML surfaces new Guides and categories.

**Say:** 'Today' is a homepage that skips the search-and-explore experience entirely. It curates sessions from three signals — time of day, mood, and your past meditations — so the right session is waiting when you open the app. Machine-learning recommendations surface new Guides and categories, so relevance doesn't calcify into a rut.

---

## Slide 14 — 'Stats'

**On slide:** 'Stats': streaks · progress · journey. Accountability made visible.

**Say:** 'Stats' is the accountability half: streaks, progress, and journey data that let a Listener see how far they've come, reflect, and adjust. Remember the research — streaks and stats are what hold Listeners accountable when motivation dips. This makes that visible.

---

## Slide 15 — The loop

**On slide:** Today → shapes what you do → feeds Stats → tunes Today. A system, not two features.

**Say:** And they're designed as a loop, not two separate features. What you do shapes Today. Today shapes what you do. Stats keeps score, and over time the data tunes the recommendations. Personal is not a screen — it's a feedback loop.

---

## Slide 16 — Testing

**On slide:** 5 remote usability tests · Aug 7–13, 2020 · 30–40 min each · experience from <6 months to 5+ years. Tasks: find a 'Loving Kindness' session from an 8am push · find your consecutive-day streak in Stats

**Say:** I tested with five participants in remote sessions over one week in August — thirty to forty minutes each, meditation experience ranging from under six months to over five years, on pandemic internet connections that tested everyone's mindfulness. Two core tasks: it's 8 a.m., you get a push notification — find a 'Loving Kindness' session. And after your session — find how many consecutive days you've meditated.

---

## Slide 17 — What worked

**On slide:** 100% satisfied with 'Last Session' · the streak card was the favorite. "I do the same session every day, and I have to navigate to find it."

**Say:** What worked: every participant was satisfied with the 'Last Session' feature — the direct fix for Fynn's nightly hunt. One tester said: "This is great. I spent a lot of time searching for a session. I do the same session every day, and I have to navigate to find it." And they loved the streak card. The strongest comment of all was that these features should be built today.

---

## Slide 18 — What didn't

**On slide:** 80% confused by 'Stats' data — "What did I unlock?" · wanted a more obvious Play action

**Say:** What didn't: eighty percent were confused by the information in Stats. Everyone liked the idea — but "unlocked"? "New sessions"? One tester asked, "What did I unlock?" They also wanted a more obvious way to just press play. Mixed results, honestly reported — and exactly what a prototype test is for.

---

## Slide 19 — The iteration

**On slide:** Splash-screen intro for new data · clearer Play placement · 'Good Morning' instead of 'Daytime' · richer metadata (tradition, music or none)

**Say:** So the design moved again. A splash screen introducing the new data points. Clearer button placement for Play. Warmer greetings — 'Good Morning' instead of 'Daytime,' because being greeted feels different from being labeled. And richer session metadata, like tradition and music-or-none. Fynn's evening now starts with a greeting and his session at the top of the screen — one tap from his streak's next day.

---

## Slide 20 — Lessons *(time check: ~12:00)*

**On slide:**
- Adding more content doesn't increase retention — making it personal can
- Long-term usefulness beats short-term perfection
- The process works, even solo — research to validation, from scratch

**Say:** Three lessons. First — adding more content doesn't increase retention; making it personal can. The library never needed to be bigger; it needed to know him. Second — a hard one about myself: my need for perfection can hinder my speed, and a product succeeds on long-term usefulness, not short-term perfection. And third — the process works, even when you're alone: from scratch, I researched, defined the problem, designed, prototyped, and validated with real users. Without that process, I'd have been much further off. Thank you — happy to take questions.

---

## Slide 21 — Q&A

**On slide:** Thank you · Questions?

**Prep — likely questions and answers:**

- **"Did Insight Timer ever see this?"** No — it's unsolicited graduate work, and I keep the disclaimer on it for exactly that reason. What I'd stand behind is the research finding: personalization beats catalog growth for retention, and their subsequent product direction hasn't contradicted that.

- **"Five test participants — is that enough?"** For qualitative usability at the prototype stage, yes — five users reliably surface the major issues, and they did. What five users can't give you is statistical confidence, so when I say 80 percent, I mean it plainly: four of the five participants. It found the problem; it doesn't project to the population, and I don't claim it does.

- **"How would you actually build the 'Today' recommendations?"** Three signals exist already — time of day, an explicit mood input, and session history. Start rule-based on those, use the Last Session behavior as the anchor, and let collaborative filtering earn its way in once there's data. Cold-start is handled by onboarding preferences.

- **"80% confused by your key feature — isn't that a failure?"** It's the reason you test a prototype instead of shipping it. The concept tested strong — everyone liked Stats and loved the streak — the labels failed. A splash-screen introduction and renamed data points were cheap fixes found before a single engineering hour was spent.

- **"What did this project change about how you work?"** It's where I learned my need for perfection can hinder my speed — that a product succeeds on long-term usefulness, not short-term polish. I've carried that trade-off consciously ever since.

---

*End of script. Slides 2–20 map onto the case study's six story beats: cold open (2), context and problem (3–6), evidence (7–10), the turn (11), the build (12–16), and the reckoning (17–20).*
