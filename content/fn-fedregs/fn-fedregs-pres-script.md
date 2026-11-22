# The Week the Internet Broke FiscalNote — 20-Slide Presentation Script

*Federal Regulations — FiscalNote · Presenter: Trent Lutmer*
*Target runtime: ~12 minutes plus Q&A. Time checks at slides 7, 14, and 20.*

---

## Slide 1 — Title

**On slide:** The Week the Internet Broke FiscalNote · Federal Regulations — FiscalNote · Trent Lutmer, Lead Designer

**Say:** Today I want to tell you about the project where a late-night comedy segment nearly took down the product I was designing — and why that turned out to be the most useful thing that happened to it. This is the Federal Regulations redesign at FiscalNote.

---

## Slide 2 — Cold open: Nancy

**On slide:** Photo/illustration of a regulatory affairs manager at her desk. One line: "She has forty minutes until her call with a lawmaker's office."

**Say:** I want to start with Nancy. Nancy runs regulatory affairs at a national education nonprofit. It's morning, and she's checking a federal comment page for the third time. The number keeps climbing. Somewhere in that list is a group that agrees with her, and a group that doesn't — and she can't tell which is which. The card on her screen shows ten pieces of data and five buttons, and none of them tell her what actually matters. She has forty minutes before a call with a lawmaker's office, and the screen isn't helping.

---

## Slide 3 — What FiscalNote is

**On slide:** FiscalNote product shot. "Track bills, regulations, and campaign data — and act on them."

**Say:** The tool Nancy is using is FiscalNote — software that companies, nonprofits, and government teams use to track the bills and regulations that could affect them. Lobbyists and policy teams use it to build a proactive agenda: what's moving, who's saying what, and what to do about it.

---

## Slide 4 — 2017: Net Neutrality

**On slide:** FCC / Net Neutrality headline imagery. "1.6M comments and climbing."

**Say:** It's 2017. The FCC's new chairman, Ajit Pai, has moved to roll back Net Neutrality, and it's the regulatory story everyone is watching. For our customers this was existential — for Nancy's nonprofit, their online education programs were directly at stake. Customers didn't need a better way to read about rules anymore. They needed a faster way to respond to them. And our regulation feature was still built like our bills feature: a simple list.

---

## Slide 5 — The problem

**On slide:**
- 10 data points, 5 actions, one card — no hierarchy
- Digging instead of deciding
- Missed ally = weaker coalition · Missed rule change = fines in the millions
- Worst exactly when traffic spikes

**Say:** So here's the problem, plainly. Our regulation cards packed ten data points and five actions onto one screen with no clear hierarchy. People whose whole job is spotting allies and risks in a moving docket were left digging instead of deciding. And the cost is concrete — missing an ally weakens your case; missing a change in a rule can mean million-dollar fines. Worst of all, the pain peaked exactly when the stakes were highest: during high-traffic events, when time to act is shortest.

---

## Slide 6 — Goals

**On slide:**
- Identify a relevant regulation: 3 minutes → 90 seconds
- Time to find like-minded comments: cut by 50%
- One clear, cohesive experience — designed to scale internationally

**Say:** We set three success metrics up front, based on our analytics. Cut the time to identify a relevant regulation from three minutes to ninety seconds. Cut the time to find like-minded comments in half. And deliver one cohesive experience instead of a patchwork of features — something that could also stretch to the international data the business wanted to add.

---

## Slide 7 — The team *(time check: ~3:00)*

**On slide:** Brian, Manuela, Kris, Briane + Trent (lead designer)

**Say:** The team was five people: a product manager, a front-end developer, a data scientist, an intern researcher — and me, as the sole and lead designer. Four months to ship.

---

## Slide 8 — Learning the domain

**On slide:** Federal rulemaking process diagram. "15+ full-length filings · 2 books · 1 former Director of Regulatory Affairs · 10 practitioner interviews"

**Say:** I started by learning the domain from the inside — I read fifteen-plus full-length federal filings and two books on the rulemaking process. Then I sat down with Rishi, a colleague who had previously been a Director of Regulatory Affairs, and interviewed ten more people in similar roles about their day-to-day work. Those insights became a persona we kept updating throughout the project.

---

## Slide 9 — The workaround

**On slide:** "Bookmark it. Download it. Print it. Read it on the plane." — the 'one and done' ritual · Usage data: only 57% of key-term searches completed

**Say:** One pattern showed up in almost every interview. Without a better tool, people coped the same way: bookmark the document, download it, print it, read it on the plane. One and done. That works for a static document — it collapses completely against a docket that changes every day. And our usage data backed the interviews up: in the old experience, only fifty-seven percent of key-term searches were ever completed.

---

## Slide 10 — The turn

**On slide:** "They weren't browsing. They were triaging risk."

**Say:** And that led to the insight that changed the project. These people weren't browsing — they were triaging risk, protecting their employers from fines that could reach millions. Every minute spent hunting for a comment was a minute not spent lining up allies before a deadline. So the question was never "how do we make this card easier to read?" It was "how do we help someone find their allies fast enough to act on them?"

---

## Slide 11 — How might we…?

**On slide:**
- How might we help them identify like-minded comments to build coalitions?
- How might we display documents so they can search for key terms?

**Say:** That reframing gave us two "how might we" questions: how might we help them identify like-minded comments and build coalitions — and how might we display documents so they can actually search for the terms that matter to them?

---

## Slide 12 — Ideation

**On slide:** Photos of crazy 8s sketches, dot voting, flow maps

**Say:** I led the team through sketching sessions — crazy 8s, dot voting, flow mapping. Everyone sketched, everyone presented, everyone voted. Two ideas rose to the top and survived every round: a document viewer, and a way to group public comments. I took both into wireframes and prototypes.

---

## Slide 13 — Document Viewer: iterations

**On slide:** V1 and V2 screens, annotated. "V1: tested well, wanted context. V2: too much — hierarchy lost."

**Say:** The document viewer took three versions to get right. The first tested well, but users wanted context from similar filings on the Federal Register. The second version added that — and too much more. The hierarchy collapsed, and people's decision-making actually got slower. That failure was useful: it told us the document itself had to stay the hero.

---

## Slide 14 — Document Viewer: final *(time check: ~7:00)*

**On slide:** Final document viewer. Inline reader · related filings · sentiment & position insight

**Say:** The final version blended the two: maximum real estate for the document, everything else at the edges. An inline reader, links to related documentation, and a simple sentiment-and-position read on public opinion. One screen where Nancy can make a decision, instead of ten data points competing for her attention.

---

## Slide 15 — Comment Themes

**On slide:** Comment Themes UI — twelve groups

**Say:** The second experience was Comment Themes. Working with my product manager and our data scientist, we grouped public comments by the language in the text — twelve themes for the MVP. Instead of reading thousands of comments one at a time, a regulator could scan the whole conversation at a glance and find the organizations that aligned with them. That's coalition-building at docket speed.

---

## Slide 16 — Then John Oliver happened

**On slide:** Last Week Tonight still. "1.6M → 23M comments in one week."

**Say:** We were on schedule. And then John Oliver ran a Last Week Tonight segment on Net Neutrality. Before it aired, the FCC docket had 1.6 million comments. A week later: 23 million. Fourteen times the volume our ingestion pipeline was built for. Scraping broke, performance crawled, and costs spiked — during the exact event our customers bought the product for.

---

## Slide 17 — The trade-off

**On slide:** "Snapshot at 10k / 50k / 100k / 500k · Chart capped at first 100k · Full set still searchable · Sentiment shift: only 4%"

**Say:** The fix was a compromise. The team snapshotted the data in increments — ten thousand, fifty, a hundred, five hundred thousand. We tested whether capping the visible chart changed what users took away from it, and the sentiment and position readings shifted by only four percent. So we capped the chart at the first hundred thousand comments and kept the full set searchable. We traded real-time completeness so the tool would survive the one week that mattered most. Not a perfect fix — an honest one.

---

## Slide 18 — Testing the redesign

**On slide:**
- 23 participants (15 external, 8 internal) over 2.5 weeks
- Find a like-minded comment: 3:00 → 98 seconds (goal: 90)
- Identify similar comments: 79% success (goal: 90%)
- Document viewer: every tester called it useful

**Say:** While development fought the John Oliver fire, I ran usability tests with fifteen external users and eight internal colleagues. Time to find a like-minded comment dropped from three minutes to ninety-eight seconds — just short of our ninety-second goal. Seventy-nine percent could identify similar comments, under our ninety percent target. And every tester who used the document viewer called it useful. Honest numbers: real progress, targets not quite hit, and a clear list of what to fix — we spent the next month cutting redundant information and moving detail into modals.

---

## Slide 19 — Impact

**On slide:**
- $1.8M new ARR · 15 new customers
- Docket page usage ×7 · Document page usage ×5
- Task-completion time −54% vs. pre-redesign baseline (usage data)
- +300% adoption over 3 months · +88% user satisfaction
- Shipped September · 300+ screens in 4 months

**Say:** We launched in September, and usage of the docket and document pages rose seven- and five-fold. The same usage data that exposed the problem confirmed the fix: task-completion time fell fifty-four percent from the pre-redesign baseline. Over the following three months, adoption climbed a steady three hundred percent, and user satisfaction rose eighty-eight percent. The new offering added 1.8 million dollars in new annual recurring revenue and fifteen new customers. In four months, as the sole designer, I'd produced over three hundred screens — but the number I care about most is Nancy's: she finds her allies with time to spare, and makes her call.

---

## Slide 20 — Lessons *(time check: ~12:00)*

**On slide:**
- Mise en place — do the domain homework before you design
- Fall in love with the problem, not the solution
- Don't underestimate John Oliver

**Say:** Three lessons. First — mise en place. It's the French cooking phrase for having everything in place before you start; reading those filings and books is why the interviews and the reframing worked. Second — fall in love with the problem, not the solution: the winning design was our third version of the viewer, not our first. And third — never underestimate John Oliver. A tool built to help people act fast has to survive the one week nobody planned for. Thank you — happy to take questions.

---

## Slide 21 — Q&A

**On slide:** Thank you · Questions?

**Prep — likely questions and answers:**

- **"You missed both targets — 98 seconds against a 90-second goal, 79% against 90%. Why present it as a success?"** The targets were deliberately aggressive, and the movement is what mattered: a near-50% cut from the three-minute baseline, achieved during the worst data event in the product's history. We also didn't stop there — the month after testing went to closing exactly those gaps before the September launch.

- **"The 88% satisfaction number — how was it measured?"** Post-launch user follow-up: 88 percent of users reported the redesign accomplished what they needed — reusing comments to build coalitions. The rest asked for more features, which fed the backlog.

- **"How much of the $1.8M is attributable to design?"** It's the offering's first-month ARR, so it's a team number — but the redesign was the offering. Federal Regulations wasn't sellable as a bill-style list; the document viewer and Comment Themes are what customers bought.

- **"Who made the 100,000-comment cap decision?"** It was joint — design, the data scientist, and the PM. Design's contribution was insisting we test it before accepting it: the 4% sentiment shift is what made the cap defensible rather than just expedient.

- **"What would you do differently today?"** Bring more perspectives in earlier — and design for the data-spike failure mode from day one instead of discovering it when John Oliver found it for us.

---

*End of script. If presenting inside a larger portfolio deck, slides 2–20 map cleanly onto the case study's six story beats: cold open (2), context and problem (3–6), evidence (7–9), the turn (10), the build (11–17), and the reckoning (18–20).*
