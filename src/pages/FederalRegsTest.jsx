import { CaseText, P } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'

// Ported from trentlutmer.me (docs/fn-fedregs.html): the same copy in the same order, set in v4's
// ProjectSplit layout — text on the left, the pictures on the right in reading order. The source page
// had no alt text on any of its images; these are written fresh, from the pictures themselves.
const IMAGES = {
  comments: {
    src: '/media/fedregs/fn-fedregs-001.jpg',
    w: 2880,
    h: 2048,
    alt: 'The FiscalNote platform’s Comments tab for a rulemaking: a stance-detection scatter plot (oppose/support against negative/positive) beside a Comment Themes pie chart, with a table of individual comments below.',
  },
  persona: {
    src: '/media/fedregs/fn-fedregs-004.jpg',
    w: 2880,
    h: 2048,
    alt: 'A user persona card for "Federal Frankie, Director of Regulatory and Technical Affairs," with his responsibilities, motivation, needs and feelings, and a Thinks / Hears / Does / Says / Sees / Pains empathy map.',
  },
  whiteboard: {
    src: '/media/fedregs/fn-fedregs-005.jpg',
    w: 2880,
    h: 2048,
    alt: 'A whiteboard covered in sticky notes and a hand-drawn, numbered user-flow diagram mapping how a regulatory affairs manager tracks a rule from alert to comment.',
  },
  wireframes: {
    src: '/media/fedregs/fn-fedregs-007.jpg',
    w: 2880,
    h: 2048,
    alt: 'A wall of sketched wireframes exploring the regulation overview, comment themes and document viewer screens.',
  },
  overview: {
    src: '/media/fedregs/fn-fedregs-010.jpg',
    w: 2880,
    h: 2048,
    alt: 'An iPad showing the FiscalNote app’s regulation Overview tab: its basic information on the left, a list of authorizing legislation on the right.',
  },
  documents: {
    src: '/media/fedregs/fn-fedregs-011.jpg',
    w: 2880,
    h: 2048,
    alt: 'The same regulation page with its Documents panel open, listing attached comment letters, including one from Cook Group Inc. open for reading.',
  },
  tabsA: {
    src: '/media/fedregs/fn-fedregs-012.gif',
    w: 1569,
    h: 962,
    alt: 'A screen recording of a cursor switching between the Overview and Documents tabs on the regulation page.',
  },
  tabsB: {
    src: '/media/fedregs/fn-fedregs-013.gif',
    w: 1569,
    h: 962,
    alt: 'A second screen recording of the same Overview / Documents tab switch, from a moment later in the demo.',
  },
}

// Test copy of the Federal Regulations page (route /federal-regulations-test). Not linked from the nav;
// edit freely without touching the live page in FederalRegs.jsx.
export function FederalRegsTest() {
  return (
    <ProjectSplit
      title="Federal Regulations"
      media={[
        IMAGES.comments,
        IMAGES.whiteboard,
        IMAGES.persona,
        IMAGES.wireframes,
        IMAGES.overview,
        IMAGES.documents,
        IMAGES.tabsA,
        IMAGES.tabsB,
      ]}
    >
      <P>
        Regulatory affairs managers spent their time digging for allies and risks instead of acting on them. I made it easier so users could find like-minded comments, from three minutes to 98 seconds and raising user satisfaction 88 percent.
      </P>
      <hr className="case__rule" />
      <CaseText>
        <P>
          Nancy, a regulatory affairs manager at a national education nonprofit, checks the comment page for the
          third time that morning. The number keeps climbing. Somewhere in that long list is a group that agrees
          with her and a group that doesn't, and she can't tell which is which.
        </P>
        <P>
          The card in front of her holds ten pieces of data and five buttons, and none of them say what actually
          matters. She has forty minutes until her call with a lawmaker's office, and the screen isn't helping.
        </P>
        <P>
          The tool is FiscalNote, software that companies, nonprofits, and government teams use to track the bills
          and regulations that could affect them — and, when it matters, to act on them. By 2017 it mattered
          constantly.
        </P>
        <P>
          The FCC's new chairman had moved to roll back Net Neutrality, and customers no longer needed a better
          way to read about rules; they needed a faster way to respond to them. The regulation feature hadn't kept
          up.
        </P>
        <P>
          It was still built like FiscalNote's bills feature — a simple list — even though regulations move to a
          different rhythm: dockets, comment periods, hard deadlines.
        </P>
        <P>
          <strong>Problem:</strong> FiscalNote's regulation cards packed ten data points and five actions onto a
          single screen with no clear hierarchy between them. Regulatory affairs managers — people whose job is to
          spot allies and risks in a moving docket — were left digging instead of deciding. The cost was concrete:
          a missed ally weakens a coalition's case, and a missed change in a rule can mean fines in the millions.
          And the pain peaked exactly when the stakes were highest — during high-traffic events like Net
          Neutrality, when time to act was shortest.
        </P>
        <P>
          <strong>Goals:</strong> Cut the time to identify a relevant regulation from three minutes to ninety
          seconds. Cut the time to find like-minded comments in half. Deliver one clear, cohesive experience
          instead of a patchwork of features.
        </P>
        <P>
          The team was five people — a product manager, a front-end developer, a data scientist, an intern
          researcher, and one designer leading it.
        </P>
        <P>
          To learn the domain from the inside, I read fifteen-plus full-length federal filings and two books on
          the rulemaking process, then interviewed Rishi, a colleague who had previously run Regulatory Affairs,
          and ten peers in similar roles.
        </P>
        <P>
          The same coping ritual kept appearing in the interviews: bookmark the document, download it, print it,
          read it on the plane — a "one and done" workaround that couldn't keep pace with a docket that changed
          daily.
        </P>
        <P>
          The usage data agreed with the interviews: in the old experience, only 57 percent of key-term searches
          were ever completed. Meanwhile, the development team had a problem of its own: the backend that ingested
          the data was fragile and already due for a rebuild.
        </P>
        <P>
          The interviews surfaced the real insight: these people weren't browsing, they were triaging risk —
          protecting their employers from fines that could reach millions of dollars.
        </P>
        <P>
          Every minute spent hunting for a comment was a minute not spent lining up allies before a deadline. The
          question was never how to make the card easier to read. It was how to help someone find their allies
          fast enough to act on them.
        </P>
        <P>
          That reframing pointed at two ideas: a document viewer, and a way to sort thousands of comments into
          groups.
        </P>
        <P>
          The team sketched — crazy 8s, dot voting, flow mapping — and both ideas held up.
        </P>
        <P>
          The document viewer took three versions to get right: the first tested well but users wanted context
          from similar filings; the second added so much that the hierarchy collapsed and decisions stalled.
        </P>
        <P>
          The final version gave the document the most real estate and moved everything else to the edges — an
          inline reader, links to related filings, and a simple sentiment-and-position read on public opinion.
        </P>
        <P>
          Comment Themes, shaped with the product manager and data scientist, sorted comments into twelve groups
          based on the language in the text, so a user could scan thousands of opinions in the time it used to
          take to read three.
        </P>
        <P>
          Then John Oliver ran a <em>Last Week Tonight</em> segment on Net Neutrality, and the FCC's docket jumped
          from 1.6 million comments to 23 million in a week — fourteen times what the ingestion pipeline was built
          to handle. Costs spiked; performance crawled.
        </P>
        <P>
          The fix was a compromise: snapshot the data in increments and cap the visible chart at the first 100,000
          comments while keeping the full set searchable. Testing showed the cap shifted the sentiment and
          position readings by only four percent.
        </P>
        <P>
          Real-time completeness was traded away so the tool would survive the exact week its users needed it
          most.
        </P>
        <P>
          Nancy's screen today shows one document, its related filings, and a clear read on where opinion stands —
          not ten competing pieces of information. She finds her allies with time to spare and makes her call.
        </P>
        <P>
          In usability tests with fifteen external users and eight internal colleagues, time to find a like-minded
          comment fell from three minutes to ninety-eight seconds, just short of the ninety-second goal; 79
          percent of testers could identify similar comments, under the 90 percent target; and every tester who
          used the document viewer called it useful.
        </P>
        <P>
          After the September launch, usage of the docket and document pages rose seven- and five-fold, adoption
          climbed a steady 300 percent over the following three months, and user satisfaction rose 88 percent.
        </P>
        <P>
          The usage data that had exposed the problem now confirmed the fix: task-completion time fell 54 percent
          from the pre-redesign baseline. The offering added $1.8 million in new annual recurring revenue and
          fifteen new customers.
        </P>
        <P>
          The lesson was never about comment counts or card design — a tool built to help people act fast has to
          survive the one week nobody planned for.
        </P>
      </CaseText>
    </ProjectSplit>
  )
}

export default FederalRegsTest
