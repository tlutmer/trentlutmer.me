import { Children } from 'react'
import { Bullets, P, Paragraphs, Section } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'
import { Typography } from '../components/Typography/Typography'

// Ported from trentlutmer.me (docs/coachteach.html): the same copy and the same six photos in the
// same order, set in v4's ProjectSplit layout. Each photo keeps its own proportions (w x h, in pixels
// of the file), so nothing is cropped.
const IMAGES = {
  spring2025Team: { src: '/media/coachteach/coaching-and-teaching-spring-2025-team.jpg', w: 2400, h: 1350, alt: 'Spring 2025 cohort team photo' },
  spring2025: { src: '/media/coachteach/coaching-and-teaching-spring-2025.jpg', w: 2400, h: 1350, alt: 'Spring 2025 class in session' },
  spring2024Team: { src: '/media/coachteach/coaching-and-teaching-spring-2024-team.jpg', w: 1600, h: 1200, alt: 'Spring 2024 cohort team photo' },
  spring2024: { src: '/media/coachteach/coaching-and-teaching-spring-2024.jpg', w: 2400, h: 1350, alt: 'Spring 2024 class in session' },
  fall2023Team: { src: '/media/coachteach/coaching-and-teaching-fall-2023-team.jpg', w: 1080, h: 1080, alt: 'Fall 2023 cohort team photo' },
  fall2023: { src: '/media/coachteach/coaching-and-teaching-fall-2023.jpg', w: 2400, h: 1350, alt: 'Fall 2023 class in session' },
}

// A titled group of lines inside a section: under the item's heading, each line is a bullet point.
function Item({ title, children }) {
  return (
    <div className="case__section">
      <Typography as="h3" variant="header-3">
        {title}
      </Typography>
      <ul className="case__list">
        {Children.toArray(children).map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

export function CoachingTeaching() {
  return (
    <ProjectSplit
      title="Coaching and teaching"
      lead="Teaching and coaching university students"
      media={[
        IMAGES.spring2025Team,
        IMAGES.spring2025,
        IMAGES.spring2024Team,
        IMAGES.spring2024,
        IMAGES.fall2023Team,
        IMAGES.fall2023,
      ]}
    >
      <Paragraphs>
        <P>
          Over the years, I've spent time with the University of Texas and Colorado State University
          teaching and coaching advanced design thinking classes.
        </P>
      </Paragraphs>

      <Section title="Design Philosophy">
        <Paragraphs>
          <P>
            Design is the practice of turning intent into meaningful, real-world outcomes—by aligning human
            needs, business reality, and technical truth.
          </P>
          <P>
            I believe the strongest design work comes from clarity, trust, and shared ownership. My role as a
            design leader is not to control decisions, but to create the conditions where good decisions are
            inevitable: a clear vision, honest constraints, high standards, and teams that feel safe enough to
            take risks.
          </P>
          <P>
            I believe in dynamic simplicity. Use the framework and process as the foundation of the work, then
            make whatever and however you desire.
          </P>
          <P>
            Design succeeds when people understand why the work matters, what success looks like, and how their
            contribution fits into the whole. When those things are clear, teams don’t need to be told what to
            do—they take action on their own.
          </P>
          <P>Create clarity, earn trust, inspire action—and let great people do great work.</P>
        </Paragraphs>
      </Section>

      <Section title="Values">
        <Item title="1. Clarity Is Leadership">
          <P>Write the vision down. Make strategy explicit.</P>
          <P>Define goals, success metrics, and expectations for teams and individuals.</P>
          <P>Ambiguity is sometimes necessary—but confusion is not.</P>
        </Item>
        <Item title="2. Trust Is the Operating System">
          <P>Trust is earned by giving it first.</P>
          <P>Autonomy without context fails; trust with clarity scales.</P>
          <P>Let people make mistakes. Learning beats compliance every time.</P>
        </Item>
        <Item title="3. Outcomes Over Output">
          <P>Design artifacts don’t matter unless they change behavior or results.</P>
          <P>The job is to help the team achieve outcomes—not to personally produce the work.</P>
          <P>If I’m doing the work myself, I’m probably blocking someone else’s growth.</P>
        </Item>
        <Item title="4. Inspire, Don’t Instruct">
          <P>Don’t tell people what to do—explain the problem well enough that the solution becomes obvious.</P>
          <P>Ask better questions instead of giving faster answers.</P>
          <P>Momentum comes from belief, not direction.</P>
        </Item>
        <Item title="5. People Are the Strategy">
          <P>Show people how and why their work matters.</P>
          <P>Discuss strengths, weaknesses, opportunities, and threats openly.</P>
          <P>Growth paths, band levels, and goals should never be mysterious.</P>
        </Item>
      </Section>

      <Section title="Principles">
        <Item title="Be a Player-Coach">
          <P>Stay close enough to the work to earn credibility.</P>
          <P>Step in to unblock, model thinking, or raise the bar—not to take over.</P>
          <P>Teach through context, not control.</P>
        </Item>
        <Item title="Lead With Context, Not Control">
          <P>Clarify strategy, team goals, and decision boundaries.</P>
          <P>Support decisions and provide input—then get out of the way.</P>
          <P>Use 1:1s to align on next steps, growth, and expectations.</P>
        </Item>
        <Item title="Feedback Builds the Team">
          <P>Feedback in private. Praise in public.</P>
          <P>Be direct, kind, and timely.</P>
          <P>Critique the work, not the person.</P>
        </Item>
        <Item title="Visibility Creates Meaning">
          <P>Be present, not distant.</P>
          <P>Make sure people know their work matters—to users, to the business, and to you.</P>
        </Item>
        <Item title="Situational Leadership">
          <P>In victory, lead from the back—give credit away.</P>
          <P>In crisis, lead from the front—take responsibility.</P>
          <P>Stability comes from consistency, not ego.</P>
        </Item>
      </Section>

      <Section title="What I Expect From Teams (and Myself)">
        <Bullets
          items={[
            'Thoughtful risk-taking over safe stagnation',
            'Ownership over compliance',
            'Curiosity over defensiveness',
            'Clear thinking over loud opinions',
            'Progress over perfection',
          ]}
        />
        <P>Above all: care deeply—about the problem, the people, and the outcome.</P>
      </Section>
    </ProjectSplit>
  )
}

export default CoachingTeaching
