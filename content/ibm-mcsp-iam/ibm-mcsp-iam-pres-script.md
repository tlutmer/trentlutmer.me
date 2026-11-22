# Eight Consoles Deep — 20-Slide Presentation Script

*Multi-Cloud SaaS Platform: Identity & Access Management — IBM · Presenter: Trent Lutmer*
*Target runtime: ~12 minutes plus Q&A. Time checks at slides 7, 14, and 20.*

---

## Slide 1 — Title

**On slide:** Eight Consoles Deep · MCSP: Identity & Access Management — IBM · Trent Lutmer, Product Designer

**Say:** This is the story of designing identity and access management for IBM's Multi-cloud SaaS Platform — and of how granting one person access to one tool became a job measured in consoles. Meet Marcus.

---

## Slide 2 — Cold open: Marcus

**On slide:** Eight browser tabs of admin consoles + one terminal window. One line: "By lunch: four approval requests filed. Permissions granted: zero."

**Say:** Marcus is an IT administrator at a midsize manufacturer, and a new engineer starts Monday. All she needs is access to the tools her team already uses. So Marcus opens the first of eight admin consoles and works down the list — an invite here, a role request there, a terminal window for the permissions that can only be drawn in a CLI. By lunch, he's filed approval requests in four different systems and granted nothing. And he types carefully — last quarter, one mistyped role took three days to unwind.

---

## Slide 3 — The multi-cloud reality

**On slide:** "90% of large firms run multiple clouds — IBM, AWS, Azure, GCP." (Forbes) · 8+ systems to buy and manage IBM SaaS subscriptions

**Say:** Marcus isn't an edge case. Per Forbes, ninety percent of large firms run multiple clouds. Each cloud looks, feels, and functions differently — and just buying and managing IBM SaaS subscriptions took more than eight separate systems, with IAM boundaries drawn manually in a command line. Redundancy, errors, and approvals for everything.

---

## Slide 4 — What MCSP is

**On slide:** Multi-cloud SaaS Platform: accounts · subscriptions · billing · identity · access · SSO — one platform, shared infrastructure

**Say:** IBM's answer is the Multi-cloud SaaS Platform — MCSP. One platform where companies manage accounts, subscriptions, billing, identity, access, and single sign-on, with common tools and infrastructure underneath so IBM products ship faster. I was the product designer responsible for researching and defining the identity and access management piece.

---

## Slide 5 — Why now

**On slide:** May 2022: IBM + AWS Strategic Collaboration Agreement. "More clouds, more marketplaces, more subscriptions."

**Say:** The urgency came in May 2022, when IBM and AWS signed a Strategic Collaboration Agreement. IBM customers could now buy our SaaS products and host them on AWS. Great for adoption, great for the partnership — and about to multiply the administrative sprawl Marcus was already drowning in.

---

## Slide 6 — A finite game of request and approval

**On slide:** Diagram: request → approve → request → approve → request → approve… One new hire, one tool, six approval gates across four systems.

**Say:** Look at what granting access actually took. Request access to the platform — wait for approval. Request the product — wait for approval. Request the role, the instance, the environment — each one its own ticket, its own approver, often its own system. No single step looks unreasonable. The sum is. Every system had overlapping functionality but its own bureaucracy — fragmented, inconsistent, confusing. And for IBM: redundant operational costs and missed sales.

---

## Slide 7 — The challenge *(time check: ~3:00)*

**On slide:**
- Who is this person?
- Are they allowed here?
- What are they allowed to do?
- One platform. Right people, right things, right reasons.

**Say:** The challenge, stripped to its bones: let IT and system admins identify, authenticate, and authorize any resource or entity, securely, on a single platform. Or in plain English — who is this person? Are they allowed here? What are they allowed to do? The right people, with the right things, for the right reasons. The business goals rode alongside: presence in multi-cloud marketplaces, native provisioning, and cutting time to market by sixty percent.

---

## Slide 8 — The team

**On slide:** Designers · PMs · developers · architects · content designers — across 6 time zones

**Say:** The team was itself a coordination problem: designers, product managers, developers, architects, and content designers spread across six time zones. My research surfaced the two big problems fast — the eight-plus systems, the CLI boundaries. Agreeing on what to do about them was much slower.

---

## Slide 9 — Stuck

**On slide:** "Weeks of circling the same conversations — 8+ products, each with its own opinion about identity."

**Say:** The products we were consolidating each had overlapping features and their own opinions about how identity should work. For weeks the team circled the same conversations about goals and outcomes without landing anywhere. More meetings weren't helping — the loudest frame in the room kept resetting the conversation.

---

## Slide 10 — The turn

**On slide:** "The fix for a team talking past each other: a meeting where nobody talks."

**Say:** So I proposed the opposite of another meeting: a silent one. A no-talk working session where everyone wrote in parallel — what we know, what we don't, how admins do this today, how we expect it to work tomorrow. Without anyone's voice setting the frame, the overlaps became visible on the board. I consolidated the insights and shared them back — and the plan that had eluded us for weeks fell out of one session.

---

## Slide 11 — Phase 1 scope

**On slide:**
- Identity management — users & user groups
- Access management — role-based access controls (RBAC)
- Microservices — products adopt only the pieces they need

**Say:** That plan became Phase 1: identity management with users and user groups. Access management through role-based access controls. And all of it built as microservices — so one IBM product could take identity and RBAC but skip service IDs and API keys, while another takes everything. À la carte, by design.

---

## Slide 12 — Identity management

**On slide:** User list flows: invite · add · view · edit · remove. Feedback: "I can't tell who is receiving permission and what they will get."

**Say:** Identity answers the first two questions — who is this person, are they allowed here. Our first major iteration tried to mirror parts of another IBM product to move faster. When we walked it through, very few of those parts meant anything in our context. Expecting that, I'd already started Plan B: flows mapped straight from the architecture documents — inviting, adding, viewing, editing, removing users. I wireframed it and put it in front of colleagues, and their feedback named the real monster: scale and visibility. "I can't tell who is receiving permission and what they will get."

---

## Slide 13 — Access management

**On slide:** RBAC: scope (account · subscription · instance) × entity (user · user group · service ID). "What if I need to do this for 100 or more people?"

**Say:** Access management answers the third question — what are they allowed to do — and it was the hardest by far. Granting a role means choosing a scope — an account, a subscription, an instance — for an entity — a user, a group, a service ID. The combinations multiply fast. Of our twelve-plus major iterations, access management drove most of them. Testers put it bluntly: "It looks and feels clunky — and what if I need to do this for a hundred or more people?"

---

## Slide 14 — The disagreement *(time check: ~7:00)*

**On slide:** Version A: four sequential dropdowns (design manager) vs. Version B: Carbon Add/Select, the full grant visible before committing (mine). "The decision: Version A."

**Say:** It also produced the project's hardest disagreement. My design manager proposed four sequential dropdowns — pick, pick, pick, pick, grant. I proposed Carbon's Add/Select component, which shows the entire grant visually before you commit. We debated it for months — yes, months. The decision went to the dropdowns. Not my favorite outcome. But I documented my alternative, kept it in the file for the day the question reopens, and committed to the team's direction.

---

## Slide 15 — Finalizing

**On slide:** Figma components with visual design · identity flows + IdP connections + API keys · access flows

**Say:** With the direction settled, I worked closely with visual design to build the final Figma components and align everything. The shipped identity flow lets admins add, edit, view, and remove users, connect identity-provider systems for large user sets, and issue API keys for an extra security layer. The access flow grants or restricts access to any cloud, account, subscription, product, or user — in one place.

---

## Slide 16 — What shipped

**On slide:** Final UI. "One platform: invite → group → grant."

**Say:** For Marcus, the eight consoles collapse into one flow: invite the new engineer, assign her to a group, grant the group its access. No terminal window. No wondering which approvals he's already filed.

---

## Slide 17 — Timeline

**On slide:** January 2023 → June 2024 beta (~18 months)

**Say:** The project began in January 2023, and the beta released in June 2024 — about eighteen months to take identity and access management from a blank page to a shipping platform capability.

---

## Slide 18 — Impact

**On slide:**
- Adopted by 6 IBM SaaS products · 14 in the queue
- Framework saves development time by 60%
- Go-to-market deliverables 5x faster
- Redundant teams and projects reduced 8x

**Say:** At the end of Phase 1: six IBM SaaS products had adopted the platform, with fourteen more in the queue. The shared framework cuts product development time by sixty percent. Go-to-market deliverables move five times faster. And redundant teams and projects — all those separate groups solving identity separately — fell eightfold.

---

## Slide 19 — What's next

**On slide:** SSO — one credential, many apps · Federated identity (IdP config) · Just-in-Time provisioning

**Say:** The roadmap follows the workforce: single sign-on, so one set of credentials opens many SaaS apps. Federated identity, so companies bring their own identity providers. And just-in-time provisioning, granting access automatically from job roles. Each step moves companies closer to secure, seamless access — and keeps them compliant along the way.

---

## Slide 20 — Lessons *(time check: ~12:00)*

**On slide:**
- Silence can align a team faster than another meeting
- Borrow the research, not the solution
- Disagree, commit — and keep your receipts

**Say:** Three lessons. First — silence can align a team faster than another meeting; the no-talk session did in one sitting what weeks of discussion couldn't. Second — borrow the research, not the solution: mirroring another product's screens failed, but its underlying knowledge fed everything that worked. And third — disagree, commit, and keep your receipts. The dropdowns shipped; my alternative is documented and ready if the question reopens. That's not losing — that's how a design team stays a team. Thank you — happy to take questions.

---

## Slide 21 — Q&A

**On slide:** Thank you · Questions?

**Prep — likely questions and answers:**

- **"Why did the four dropdowns win over your Add/Select?"** Development cost and timeline, mostly — the dropdowns were cheaper to build and consistent with patterns the adopting products already had. I still believe the Add/Select reads better at scale, which is why it's documented and waiting rather than deleted. Committing to the team's decision and keeping the alternative alive aren't in conflict.

- **"There are no usability metrics here — why not?"** The beta shipped in June 2024; Phase 1 validation came from internal walkthroughs and the six adopting product teams, whose feedback shaped the iterations. Formal usability measurement is the right next step as adoption widens, and it's planned.

- **"What did the no-talk meeting actually look like?"** A structured silent session: everyone writing in parallel across four prompts — what we know, what we don't, how it's done today, how it should work. Then I consolidated and played it back. The discipline is that nobody frames the problem out loud before everyone has written.

- **"How is the 60% development-time savings measured?"** It's the platform engineering estimate comparing products adopting the shared IAM framework against building identity features independently — the same basis as the 8x redundant-team reduction.

- **"What's the hardest design problem in RBAC?"** The combinatorics: scope times entity times role multiplies fast, and the design has to keep 'who is getting what, where' legible at a hundred users, not just five. That visibility question drove most of our twelve-plus iterations.

---

*End of script. Slides 2–20 map onto the case study's six story beats: cold open (2), context and problem (3–7), evidence (8–9), the turn (10), the build (11–16), and the reckoning (17–20).*
