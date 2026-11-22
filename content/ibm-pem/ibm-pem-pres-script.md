# A Sigh of Relief After D-Day — 20-Slide Presentation Script

*IBM Partner Engagement Manager · Presenter: Trent Lutmer*
*Target runtime: ~12 minutes plus Q&A. Time checks at slides 7, 14, and 20.*

---

## Slide 1 — Title

**On slide:** A Sigh of Relief After D-Day · IBM Partner Engagement Manager · Trent Lutmer, Design Lead

**Say:** This project is named after something a user told us — that the only way they knew how a campaign went was the sigh of relief after D-day. This is IBM Partner Engagement Manager, and the story of replacing that sigh with a dashboard.

---

## Slide 2 — Cold open: Cindy

**On slide:** A calendar with a circled deadline. One line: "Somewhere out there, people are doing the tasks. Or they aren't."

**Say:** Meet Cindy, a line-of-business rep at a corporate bank. Weeks ago her team launched an onboarding campaign — a new trading partner, thirty-eight touchpoints, dozens of tasks spread across email, phone calls, faxes, and systems that don't talk to each other. Somewhere out there, people are watching training videos and updating certificates. Or they aren't. She has no way to know. All she knows is the deadline.

---

## Slide 3 — The quote

**On slide:** "Many times, we're not entirely sure how the campaign is currently going. We just heave a sigh of relief after D-day."

**Say:** This is a real user quote from our research, and it's the whole problem in two sentences. Not "the tool is slow." Not "I want more features." We ship work into a void and find out how it went when it's over. You can feel the uncertainty — and in corporate banking, uncertainty isn't just uncomfortable, it's expensive.

---

## Slide 4 — What PEM is

**On slide:** IBM Partner Engagement Manager: organize, track, and manage campaigns across partners, customers, and suppliers. (b. 2013)

**Say:** IBM Partner Engagement Manager is the product built to end that. It organizes, tracks, and manages a company's campaigns — onboarding programs, compliance pushes, SSL certificate updates — across its partners, customers, and suppliers. One place, instead of everyone's inbox. The design work began in 2013, and I led it.

---

## Slide 5 — The problem, in numbers

**On slide:**
- 25 days to onboard one corporate banking client
- ~1,500 new client setups per month
- One onboarding: 38 touchpoints, 60 extra services, millions of interactions
- "We use people to mask the time lag."

**Say:** The numbers explained the sighing. Twenty-five days to onboard a single client, at roughly fifteen hundred setups a month. One user counted thirty-eight touchpoints and sixty extra services on one onboarding. And my favorite admission from the interviews: "Onboarding takes too long, and we often use people to mask the time lag." Every manual step was an error waiting to happen — and in banking, errors become fines.

---

## Slide 6 — Goals

**On slide:**
- Monitoring that speeds campaign completion by 200%
- Find your tasks and start working in <60 seconds (from ~3 minutes)
- Self-service: maintain your own B2B system, not IBM Support

**Say:** We committed to three success metrics. Monitoring tools that speed campaign completion by two hundred percent. A trading partner finds their tasks and starts working in under sixty seconds — from a baseline of about three minutes. And self-service: companies maintain their own B2B systems without calling IBM Support.

---

## Slide 7 — The team, in 2013 *(time check: ~3:00)*

**On slide:** 4 designers (led) · 2 PMs · 45 developers. "This team had never worked with designers. IBM Design Thinking was in its infancy."

**Say:** I led a team of four designers, working with two product managers and a forty-five-person development organization — a team that had never worked with a design team before. This was 2013; IBM's design thinking program was brand new. So before anything else, we wrote a mantra together — PM, dev, and design: "Remove barriers by driving collaborative relationships." It described the product, and honestly, it described us.

---

## Slide 8 — Discovery

**On slide:** 14 users over 2 weeks. Insights: no visibility of progress · errors from too many entry points · no streamlined way to roll out or track work · scalability unresolved

**Say:** We got into discovery as early as possible — fourteen users over two weeks. The insights stacked up fast: no visibility into progress. Errors inherent to having so many entry points for information. No streamlined way to roll out, fill out, or track work. And scalability nobody had solved.

---

## Slide 9 — Two sides of one relationship

**On slide:** Cindy, LOB rep — tests every campaign before it ships, down to the quiz answers. Tyrone, trading partner — needs to know he's watched 4 of 6 videos in Chapter 9.

**Say:** The research settled into two personas — two sides of one relationship. Cindy, the line-of-business rep, wants to guarantee her partner's happiness herself: she tests every campaign before it ships, down to checking that the quiz answers are right. Tyrone, the trading partner, just needs to know what's his and what's left — that he's watched four of the six videos in chapter nine and can finish by Friday.

---

## Slide 10 — How might we…?

**On slide:**
- How might we automate their manual process to save time?
- How might we surface problems and help troubleshoot blocked tasks?

**Say:** Two questions framed the design work: how might we automate their manual process to save time — and how might we surface problems and help troubleshoot blocked tasks?

---

## Slide 11 — The pitch, and the pushback

**On slide:** The pitch: two experiences — a dashboard + an activity designer. The response: "What about…?" (more features)

**Say:** My answer was two experiences: a dashboard, and an activity designer. And at first, it did not go well. Product management and engineering raised concerns and wanted more features — understandable, when you're courting executives and every stakeholder has a list.

---

## Slide 12 — The turn

**On slide:** "Two experiences, finished, beat ten features, promised. Depth first — breadth after."

**Say:** The turn was winning that argument — or rather, the team winning it together. After several discussions, product management and engineering came around to the premise underneath the pitch: two experiences that solve the majority of problems, finished and demonstrated well, would earn more executive support than a roadmap of everything. Depth first, breadth after. That principle ran the rest of the project.

---

## Slide 13 — How we worked

**On slide:** Daily progress meetings · one workflow at a time · leadership demos twice a week

**Say:** We met daily and concentrated on a single workflow at a time. And we presented to our leadership and executive teams twice a week — not slideware, the actual work. For a team that had never had designers, that cadence built trust faster than any deck could.

---

## Slide 14 — The dashboard *(time check: ~7:00)*

**On slide:** Dashboard: current campaigns · tasks · trading partners · "reload your last task"

**Say:** The dashboard answered Cindy's question — how is the campaign actually going? Current campaigns, tasks, and trading partners, visible at a glance, while there's still time to act. And one small feature with outsized returns: it reloads your last task, so anyone who left comes back exactly where they stopped — in the hope that they finish.

---

## Slide 15 — The activity designer

**On slide:** Activity designer: build any campaign from templates + components. Scales to many steps, many users. (Later additions: split tasks, rich text)

**Say:** The activity designer answered the automation question: build any campaign or process from templates and components — a deliberate rejection of the tedious drag-and-drop builders of that era. It had to scale, because real campaigns have many steps and many people. Iteration taught us what version one missed: campaign creation needed split tasks and rich text formatting before it felt complete. We added both.

---

## Slide 16 — Visual design, in its right order

**On slide:** "The pixels can wait until the story holds." → Flattened toward the IBM Design Language · washed colors · client branding: their colors, their logo

**Say:** Development pushed to start visual design early, and I pushed back: the pixels could wait until the experience and story held together — and I convinced the PM and dev leads that was the better use of our time. When visual design's moment came, we flattened the interface toward the new IBM Design Language and deliberately washed back our colors — because client banks needed to brand the tool as their own. In that industry, trust wears the customer's logo.

---

## Slide 17 — Testing

**On slide:**
- 11 users
- 5-step campaign: 9:43 average · 81% self-completion
- Leave, return, find your last task: ~3 min → 27 seconds (goal: 60)

**Say:** We tested with eleven users. A small five-step campaign took nine minutes forty-three on average, with an eighty-one percent self-completion rate. And the dashboard's return-to-work number: twenty-seven seconds to leave, come back, and find your last task — down from about three minutes, and less than half our sixty-second goal.

---

## Slide 18 — The onboarding number

**On slide:** Client onboarding: 25 days → 5 days

**Say:** But the number that mattered to the business was this one. Onboarding a corporate banking client fell from twenty-five days to five. At fifteen hundred setups a month, that's not a usability win — that's an operations transformation.

---

## Slide 19 — Impact

**On slide:**
- Released Q1 2015 · 8 sponsored users through beta
- Shared with 200+ at the Smarter Commerce conference
- IBM Eminence & Excellence Award

**Say:** We released in Q1 2015, carried through beta by eight sponsored users, and shared the work with over two hundred people at the Smarter Commerce conference. The work was recognized with an IBM Eminence & Excellence Award. And Cindy's D-day is just a date now — she's been watching the campaign the whole time.

---

## Slide 20 — Lessons *(time check: ~12:00)*

**On slide:**
- Don't be afraid of executives — they're just people
- Stand up for your designs
- Depth first, breadth after

**Say:** Three lessons, two of them straight from my notes at the time. Don't be afraid of executives — they're just people, and showing them real work twice a week beat any pitch. Stand up for your designs — the two-experience focus and the delayed visual design both survived because we defended them. And depth first, breadth after: finish the workflows that matter before promising the ones that don't yet. Thank you — happy to take questions.

---

## Slide 21 — Q&A

**On slide:** Thank you · Questions?

**Prep — likely questions and answers:**

- **"This is 2013 — why is it in your portfolio?"** Because it's foundational: first design team that organization ever had, IBM design thinking in its infancy, and the principles — depth first, show real work to executives, visibility over features — are the same ones I still run today. It's the origin of how I work.

- **"Did you hit the 200% campaign-completion goal?"** Exceeded it. Onboarding fell from 25 days to five — a 5x improvement against a 3x target — and the return-to-work time beat its goal by more than half.

- **"How much of the 25-to-5-days is the design versus process change?"** They're inseparable by design: the automation and self-service model is the design. What I'd claim specifically is that the dashboard and activity designer are the mechanisms that removed the manual touchpoints the 25 days were made of.

- **"What was hardest about being the first design team there?"** Earning the right to be in the room. Twice-weekly demos of real work to leadership did more than any argument — executives are just people, and people trust what they can see.

- **"What didn't work?"** Version one of campaign creation. Users needed split tasks and rich text formatting before the activity designer felt complete — we found it in iteration and added both.

---

*End of script. Slides 2–20 map onto the case study's six story beats: cold open (2–3), context and problem (4–6), evidence (7–10), the turn (11–12), the build (13–16), and the reckoning (17–20).*
