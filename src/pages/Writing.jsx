import { useEffect, useState } from 'react'
import { Bullets, Figure, Hero, P, Paragraphs, Section } from '../components/CaseStudy/CaseStudy'
import { Typography } from '../components/Typography/Typography'

// "Design your job hunt" — the Writing page (/job-hunt). The only way in is its card on the Info
// page: it isn't in the nav or the footer. Set in the case-study building blocks (components/CaseStudy): the 800px
// column, Kelex type, themed colours, and a plain card per picture that opens in the lightbox
// (w x h are the pixels of the file, so each card keeps its picture's own proportions).
const IMAGES = {
  resume: {
    src: '/media/job-hunt/job-hunt-resume.png',
    w: 614,
    h: 793,
    alt: 'A 2011 résumé: a black circle with the initials TL beside the name Trent Lutmer, web and graphic designer, above sections for objective, software proficiencies, extracurricular activities, experience, education and skills.',
  },
  neopets: {
    src: '/media/job-hunt/job-hunt-neopets.png',
    w: 1920,
    h: 1600,
    alt: 'The Neopets HTML Guide page on a yellow starry background, with a numbered list of thirteen lessons from The Basics to Edit User Lookup.',
  },
}

// The article's sections, in order: each one's anchor id and its heading. The side list and the
// headings both read from here, so they can't drift apart.
const S = {
  intro: { id: 'design-your-job-hunt', label: 'Design your job hunt' },
  resume: { id: 'resume', label: 'Résumé: Get their attention' },
  portfolio: { id: 'portfolio', label: 'Portfolio: Pique their interest' },
  presentation: { id: 'presentation', label: 'Presentation: Prove how you think' },
  final: { id: 'final-thoughts', label: 'Final thoughts: Quit your whining' },
}
const SECTIONS = Object.values(S)
// The intro is the page's h1; every other section is an h2 (see Hero and SectionHead below).
const [INTRO, ...SUBSECTIONS] = SECTIONS

// One link in the list, styled by its heading level (h1 or h2).
function NavLink({ section, level, active }) {
  return (
    <a
      href={`#${section.id}`}
      tabIndex={0}
      className={`writing-nav__link writing-nav__link--h${level}`}
      aria-current={active === section.id ? 'location' : undefined}
    >
      {section.label}
    </a>
  )
}

// The "on this page" list: an anchor link per section, sticky in the gutter to the right of the
// article (see .writing in site-nav.css; on a phone it isn't shown). The section being read is marked aria-current — the last one whose top has
// scrolled above about a third of the way down the window, or the last section once the page ends.
function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id)

  useEffect(() => {
    function update() {
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = SECTIONS[0].id
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id
      }
      setActive(atEnd ? SECTIONS[SECTIONS.length - 1].id : current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <aside className="writing__toc">
      <nav className="writing-nav" aria-label="On this page">
        <NavLink section={INTRO} level={1} active={active} />
        <div className="writing-nav__group">
          {SUBSECTIONS.map((section) => (
            <NavLink key={section.id} section={section} level={2} active={active} />
          ))}
        </div>
      </nav>
    </aside>
  )
}

// A sub-section's "Tidbits" heading and its bullet list.
function Tidbits({ items }) {
  return (
    <div className="case__section">
      <Typography as="h3" variant="header-3" className="work-project__copy">
        Tidbits
      </Typography>
      <Bullets items={items} />
    </div>
  )
}

export function Writing() {
  return (
    <main id="main-content" className="page--full">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="writing">
          <SectionNav />
          <div className="content project">
            <Hero id={S.intro.id} title={S.intro.label} readTime="Trent Lutmer, Sep 2026" />

            <Paragraphs>
              <P>
                In December 2011, I graduated from a little college in South Dakota. After the excitement
                and joy, I gleefully went to the school’s Career Services department with an oblivious,
                naive optimism. “Just go to the website and you’ll find something,” said the 60-year-old
                woman at the counter. I drove back to my apartment, opened my computer, entered the site,
                searched, searched again, then searched more. Nothing. Not a single job listed in art,
                design, or technology in the whole state of South Dakota.
              </P>
              <P>
                That was my first real lesson in job hunting: school tells you how to do the job, but
                nobody teaches you how to get the job.
              </P>
              <P>
                Since then, I’ve had many job-hunting highs and lows. I’ve been hired, fired, laid off, had
                offers rescinded, received a verbal offer before a personality test, and, my favorite, been
                hired by a fake company without my knowledge. Over the years, I’ve stayed on top of
                job-hunting trends to help young and seasoned designers who are out of touch, confused,
                frustrated, angry, and lost.
              </P>
              <P>
                During my coaching and mentoring sessions, I find myself repeating the same key things like
                a crappy superhero catchphrase. Use the design process to design your résumé, portfolio,
                and presentations. You’re solving a problem, and that’s what we do. The job hunt is a
                design problem: understand the audience, communicate your value, show how you think, use
                the feedback, and iterate. So, here we go.
              </P>
            </Paragraphs>

            <Section id={S.resume.id} title={S.resume.label}>
              <P>
                I don’t remember when I made my first résumé, but I do remember it was in 2005 for my
                part-time busboy job. However, I still have my design résumé from 2011, and it makes me
                laugh. I mean, look at this monster. It’s got two very large logos that have been
                intricately placed to fill an obscene amount of space, two typefaces (why, Bank Gothic?!),
                seven font sizes, and for some reason, beyond my comprehension, I’m proficient in Notepad++
                and Microsoft Office.
              </P>
              <Figure image={IMAGES.resume} caption="My résumé circa 2011" />
              <P>
                In the age of AI, ATS scanners, 23-year-old job recruiters who don’t know what designers
                do, and hiring managers reading thousands of résumés, the time you have to capture their
                attention is down to a mere 11 seconds. Yep, 11 seconds (Source). This is like some The
                Wolf of Wall Street “Sell me this pen.” crap. You spent days and nights tweaking every
                pixel, and now all that work has to immediately grab someone's attention.
              </P>
              <P>
                Your résumé isn't being judged on how much effort you put into it. It's being judged on
                whether it communicates value quickly. I think of your résumé, portfolio, and presentation
                as a film’s teaser, official trailer, and feature film. This résumé ‘teaser’ should get the
                audience’s attention, but not show the entire film. Your résumé sets up the framework for
                your portfolio and presentation. Your résumé gets their attention. Your portfolio piques
                their interest. Your presentation proves how you think.
              </P>
              <P>
                Whether you're writing it yourself or using AI to help, make sure that your résumé aligns
                with the job description and the requirements. Hiring teams are comparing your experience
                against other candidates and looking for the type of person they need. Each ‘Experience’
                bullet point should show what you did and the impact you had on users, the product, or the
                company.
              </P>
              <P>Example:</P>
              <Bullets
                items={[
                  'Bad: Designed onboarding experience for users.',
                  'Better: Redesigned onboarding, reducing time-to-value by 35% and increasing activation by 18%.',
                ]}
              />
              <P>
                Show numbers and dates. Impact metrics aren’t hard to present. Here are some ideas: show
                your user research and usability testing metrics, the dates the project started and ended,
                and how long it took. This is non-negotiable. Your solution could save humanity, but you
                need to quantitatively prove it.
              </P>
              <P>
                I recommend, for security and privacy concerns, removing your location, phone number, and
                address. You will be tediously entering your information into each new system anyway. Phone
                numbers, in particular, are used for so many things: DoorDash, Partiful, WhatsApp, or
                two-factor authentication. I firmly believe this will continue to be a major security
                concern.
              </P>
            </Section>

            <Tidbits
              items={[
                'Create a separate ‘professional’ email address; don’t use the same one you buy late-night DoorDash or your student one from college',
                'Stop using a Word/Google Doc template and use Figma or another tool for better control',
                'Put your title or role of the job you want, not blank, ‘Multi-disciplinary designer’, or ‘Designer’',
                'Shorten the URLs to ‘Portfolio’, not ‘.wixsite.com/my-site/38943912898e8231293’',
                'Keep a version that is easy to copy and paste into job portals',
                'Fight AI with AI. Use AI tools and ATS scanners to help aim for a score 65–70 or above. Use the score as a directional signal, not a grade.',
              ]}
            />

            <Section id={S.portfolio.id} title={S.portfolio.label}>
              <P>
                Back in the 2000s, I remember spending the hot and humid summers indoors, playing Super
                Mario 64 and StarFox 64 on the N64, Pokémon Red on my teal Game Boy Color with Mad Catz
                accessories, or playing Neopets on the Windows 95 PC. For me, playing Neopets is where art,
                design, and technology came together in a fun, gamified world. I spent days customizing my
                webpage with basic HTML and CSS, capturing the attention of those who visited. It had to be
                perfect.
              </P>
              <Figure image={IMAGES.neopets} caption="Neopets HTML Guide" />
              <P>
                Today, all those days and nights spent tediously tweaking every pixel need to result in a
                unique showcase of you and your work that immediately grabs the hiring team’s attention. I
                spent days making that page perfect. Today, you have ~1 minute to show a compelling hook, a
                concise set of case studies, and a bit about yourself. People’s attention spans are
                shorter, your competition is stronger, and you have one minute to show them why they should
                hire you. This is a teaser for your interview presentation. The hiring team will scan your
                case study and barely read any of it, but that doesn’t mean you skip the important bits.
                Yes, it sucks, but that’s the nature of the hunt. A rejection isn't necessarily a verdict
                on your ability. It's feedback from one audience, at one moment, for one problem.
              </P>
              <P>The bare minimum should include:</P>
              <Bullets
                items={[
                  'The problem. Clearly articulate and frame the problem statement. I should walk away knowing who this is for, what they are struggling with, and why this is a problem.',
                  'The solution. Show how you arrived at your solution, the decisions you made, and how the experience directly solves the problem. Animated GIFs help immensely.',
                  'The outcome. If I understand the problem and solution, the outcome should be creative and obvious. This is the qualitative proof that your solution works.',
                  'The impact. Show the target and final numbers that prove your solution impacted the users and the business. This is the quantitative proof that your solution works.',
                  'A story. Wrap all of your work in a story. The basics of storytelling are who, what, where, when, why, and how. Include a beginning, middle, and end. And like any good story, add conflict. Tell me when you struggled or ran into a problem of your own.',
                ]}
              />
            </Section>

            <Tidbits
              items={[
                'Pay for a professional domain and site builder. Money is tight, I get it, but using a free Wix, Weebly, or Squarespace template is not doing you any favors.',
                'Show me your favorite or best two to four projects — that’s it. If you have other projects, like a poster that isn’t related to the job you want, move them to a different place on your site. Vibe code it—why not?',
                'Password protected portfolios and projects are infuriating. Finding the password in a sea of HR tools, emails, or Slack messages is not worth the time. Stop.',
                'High-resolution images are great but animated GIFs are best. Static images show the UI, not the UX; show the user’s experience.',
                'Spend more time on your headline, statement, and About Me text. Across so many portfolios, we are hit with “I love food, coffee, and traveling.” or “I am a problem solver that designs for human needs.” You can do better.',
              ]}
            />

            <Section id={S.presentation.id} title={S.presentation.label}>
              <P>
                “Oh god. 10 minutes and this is not good.” That’s what I said before a portfolio
                presentation with a design manager at a Fortune 500 company. For the past hour, my Wi-Fi
                had been down because of freezing temperatures and it was too late to reschedule. Panic set
                in. In a last-ditch effort, I downloaded Zoom on my phone and presented my work over my
                phone. It was an awful experience and I was certain I didn’t get it. But the next day, I
                received an email and was asked to schedule a final interview. Your presentation isn't
                about having perfect circumstances. It's about how you handle those circumstances.
              </P>
              <P>
                Interview presentations are all about how well you can present your work. That shouldn’t be
                a surprise. The soft skills are just as important as, if not more important than, the hard
                skills. For many, being in front of a crowd of people judging you and analyzing everything
                you do is not easy. In the past, my anxiety was so high that I used to black out, not
                remembering a thing that happened. Learn to be comfortable presenting to your team,
                managers, and leadership. If you want to grow into a design leadership role, this is vital.
              </P>
              <P>
                To this day, I still work on my interview presentations. For me, this takes precedence over
                any portfolio updates, whiteboarding challenges, or at-home tests. By now, the hiring team
                has seen that you can do the job. The challenge is showing them how well you can do it.
              </P>
              <P>
                You need at least three presentations and each about 15–20 minutes long. Most portfolio
                reviews will be 45–60 minutes long, with two to five other designers, and having three
                gives you flexibility. Later in your career, when you have more presentations/case
                studies/work to choose from, you can rotate them based on the job description.
              </P>
              <P>
                Don't show everything you did. Show how you think. Presentations let you dive deeper into
                the research, process, decision-making, and outcomes. However, you don’t need to show every
                activity, research stat, or every decision.
              </P>
              <P>
                Fewer words, more images. Remove most of the text on your slides and use them as part of
                your script or notes. Keep everything short, tight, and concise. You need the hiring team
                to listen to your words, not read them. Again, attention spans are short, so the story
                you’re telling must be compelling.
              </P>
              <P>
                Like your case studies, tell a story. The basics of storytelling are who, what, where,
                when, why, and how. Have a clear beginning, middle, and end. Sprinkle in conflict showing
                your struggle and how you overcame it. For inspiration, listen to the Lore Podcast by Aaron
                Mahnke.
              </P>
            </Section>

            <Tidbits
              items={[
                'Write a script, practice, and have fun. Add in jokes, ad-lib facts, use body language. Don’t sound or look like an emotionless AI bot.',
                "Add more personality. Hiring managers and interviewers are looking at how you'll work with the team just as much as your skill set.",
                'Show you’re prepared. Tech issues happen all the time. The Internet goes down or tools don’t work. Test them beforehand so everything is set up. Don’t tinker for 30 seconds while everyone waits.',
                'Send your presentations to the hiring team before your interview. Just in case things go awry, send a compressed version of your presentation.',
                "If you’re applying to dozens of jobs and hearing nothing back, that’s feedback. Look at your résumé. Look at your portfolio. Look at how you’re presenting your work. Change something, test it again, and see what happens. Rejection doesn’t necessarily mean you’re bad at what you do; sometimes it means your résumé, portfolio, or presentation isn't communicating your value to the audience.",
              ]}
            />

            <Section id={S.final.id} title={S.final.label}>
              <P>
                In retrospect, I had such high expectations for a small college in South Dakota. I assumed
                they would do everything in their power to help me, but like many, I was left to take
                charge myself. After college, I spent the next six months in my childhood bedroom applying
                to more than 250 jobs. I spent that time tracking my applications, following up with
                recruiters and hiring managers, copying and pasting application information. Each day at 6
                p.m., I would hear my dad walk downstairs, knock on my bedroom door, and ask me, “Did you
                find a job yet?” This was equal parts annoying and motivating.
              </P>
              <P>
                Getting the first job is the hardest, and it’s a full-time job to look for a job. Without a
                deep network, cold applying is incredibly hard. LinkedIn and other tools make it easier to
                find and apply for jobs, but harder to stand out in a sea of amazing applicants. I wouldn't
                be surprised if, eventually, 80% of jobs were filled through friends and networks. So
                instead of clicking ‘Add connection’ on LinkedIn for people you don't know and collecting
                connections like Pokémon, try to make a real connection.
              </P>
              <P>
                Finally, you’ll never be satisfied with your portfolio; learn to be content with it. Even
                after you finish a glorious year-long update, you’ll hate it immediately. It’s the
                designer’s curse and we are all damned. Use the design process to design your résumé,
                portfolio, and presentations — you’re solving a problem, and that’s what we do. Don't wait
                for perfection. Ship it. Learn. Iterate.
              </P>
              <P>Good luck.</P>
            </Section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Writing
