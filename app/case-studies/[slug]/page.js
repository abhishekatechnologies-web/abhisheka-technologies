import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReadingProgress from '@/app/components/ReadingProgress';

// Matches the color/accent pairs in CaseStudyCards.js
const STUDY_PALETTE = {
  'aafes-shop-my-exchange': { color: '#EEF2FF', accent: '#4F46E5' },
  'bright-smile':           { color: '#F0FDF4', accent: '#16A34A' },
  'nari-care':              { color: '#FFF1F2', accent: '#E11D48' },
  'algotrader-pro':         { color: '#FFFBEB', accent: '#D97706' },
  'job-search-agent':       { color: '#F5F3FF', accent: '#7C3AED' },
  'microservices-on-gcp':   { color: '#ECFEFF', accent: '#0891B2' },
  'bs-food-beverage':       { color: '#FFF7ED', accent: '#EA580C' },
};

const caseStudies = {
  'bright-smile': {
    title: 'Bright Smile — Dental Clinic Platform',
    tagline:
      'A complete clinic management system replacing paper records and disconnected tools — built serverlessly on Firebase so a small clinic never has to think about infrastructure.',
    tags: ['Flutter', 'Firebase', 'Serverless', 'Healthcare'],
    url: 'https://bright-smile-35523.web.app/',
    problem: `The clinic was managing patient records on paper cards, appointments through a generic booking app, and billing in a spreadsheet. Appointment clashes were weekly. Doctors had no way to pull up a patient's treatment history mid-consultation. Invoices were hand-written and chased by phone.

Most clinic software on the market was either too expensive, too generic, or built for large hospital networks. What was needed was a purpose-built system that a doctor, receptionist, and admin could each use without a training programme — and that wouldn't require a dedicated IT person to keep running.`,
    approach: `The system was designed around three distinct roles — Admin, Doctor, and Staff — each seeing only what they need for their actual daily workflow.

The backend runs entirely on Firebase, Google's serverless platform. Cloud Firestore provides the real-time database — a receptionist updating an appointment slot is visible on the doctor's screen instantly, no refresh required. Firebase Authentication handles role-based access without a custom auth server. Cloud Storage manages document and image uploads (X-rays, patient photos). Cloud Functions run server-side logic — PDF invoice generation, notification triggers — without any servers to provision or maintain. For a single-location clinic with no IT team, serverless was the right architecture: no infrastructure to patch, no capacity to plan, and costs that scale to near-zero when the clinic is closed.

Flutter was chosen for cross-platform deployment — the same codebase runs on web, Android, and iOS. Clean Architecture with BLoC kept the state logic testable and the UI layer thin. The interactive FDI dental chart replaced hand-drawn versions that were being photographed and stored in folders.`,
    outcome: `Bright Smile is live and in active use. It handles the full patient lifecycle: registration, appointment scheduling, consultation notes, digital dental charting, multi-phase treatment plans with cost estimates, document uploads, and GST-compliant invoice generation with PDF export.

The Firebase serverless backend means zero ongoing infrastructure cost or maintenance. The system runs itself — the clinic team's only job is using it. This architecture also proved extensible: NariCare, a full obstetrics and gynaecology platform, was built on the same serverless foundation without adding a single new infrastructure dependency.`,
    duration: 'Ongoing (live product)',
    team: 'Solo build',
    stack: ['Flutter 3.35+', 'Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'Firebase Storage', 'BLoC', 'GoRouter'],
  },

  'nari-care': {
    title: 'NariCare — Women\'s Health Clinic System',
    tagline:
      'A gynaecology and obstetrics clinic platform for Dr. Neha Rauniyar — built serverlessly on Firebase with domain-specific modules no generic software covers.',
    tags: ['Flutter', 'Firebase', 'Serverless', 'OB-GYN'],
    url: 'https://nari-care.web.app/',
    problem: `Dr. Neha Rauniyar's growing practice had no software that understood OB-GYN workflows. Generic clinic tools handled appointments and billing, but had no concept of an antenatal care visit schedule, no place for ultrasound findings, no way to track an IVF stimulation cycle or log a patient's menstrual history. Every women's health workflow ended up in a separate notebook alongside the main system.

The challenge was building something that understood the clinical domain — not just building a clinic system.`,
    approach: `NariCare was built on top of the Bright Smile platform, extending the same Flutter + Firebase serverless architecture rather than starting from scratch. This meant the core operations — appointments, billing, prescriptions, queue, staff, inventory — were already solved. All engineering focus went to the domain-specific layer.

Firebase's serverless capabilities were used precisely: Cloud Firestore's real-time listeners mean a doctor's update to a patient's ANC record is immediately visible on any device without polling. Cloud Functions handle automated reminders — ANC visit schedules, vaccination alerts, contraception renewal notices — without a dedicated job scheduler or cron infrastructure. Cloud Storage manages ultrasound images and lab report uploads alongside structured data.

The ANC module implements a full WHO-guideline visit schedule. Ultrasound reports use structured fields rather than free text. Lab results — hormonal profiles, CBC, OGTT, Pap smear, Hep-B, HIV, TSH — are tracked over time in a comparable format. SOAP clinical notes structure each consultation. Infertility and IVF cycles record stimulation protocols and outcomes in a format that shows a doctor the complete treatment history at a glance.`,
    outcome: `NariCare is live. The practice went from paper records and disconnected spreadsheets to a fully integrated system covering the complete patient journey — first visit through pregnancy, delivery, and postnatal follow-up.

The serverless Firebase backend means no servers, no maintenance windows, and no infrastructure cost beyond usage. The platform handles pregnancy management, ultrasound reports, lab tracking, IVF cycles, menstrual health, contraception records, women's health screenings, and delivery records — alongside all standard clinic operations. Built on a proven base, time from spec to live was significantly shorter than a ground-up build would have been.`,
    duration: 'Ongoing (live product)',
    team: 'Solo build',
    stack: ['Flutter 3.35+', 'Cloud Firestore', 'Firebase Auth', 'Cloud Functions', 'Firebase Storage', 'BLoC', 'Built on Bright Smile'],
  },

  'bs-food-beverage': {
    title: 'BS Food & Beverage — Business Platform',
    tagline:
      'A web-first operations platform giving a food and beverage business one place to manage inventory, staff, and the business — serverless backend, no app install required.',
    tags: ['Flutter Web', 'Firebase', 'Serverless', 'Inventory'],
    url: 'https://bs-food-beverage.web.app/',
    problem: `A food and beverage business was managing stock, staff workflows, and daily operations across spreadsheets, a separate orders system, and WhatsApp for internal coordination. The owner had no single view of the business. Staff had to ask managers for information that should have been self-service.

The key constraint: no one wanted to install another app. The solution had to run in the browser, work on any device, and be fast enough that staff would actually use it.`,
    approach: `The platform splits cleanly into a public-facing site and a staff operations app, both under the same URL. Staff reach the inventory and operations system through a "Staff Login" button in the main navigation — no separate URL, no confusion.

The backend is Firebase serverless: Cloud Firestore handles real-time inventory state across all devices simultaneously, Firebase Authentication controls staff access by role, and Cloud Functions run any server-side business logic without provisioning infrastructure. Real-time Firestore listeners mean one staff member updating stock levels is reflected on every other device instantly — the same pattern that makes the clinic platforms work, applied here to operations instead of healthcare.

Flutter Web was chosen because it delivers an app-like experience in the browser without the compromises of a typical responsive website. The same widget system works on phone, tablet, or laptop.`,
    outcome: `BS Food & Beverage is live and handling daily operations. Staff log in from any device and reach the same consistent interface. Inventory is tracked in real time, eliminating the end-of-day spreadsheet reconciliation. The owner has business visibility without being physically present.

The serverless Firebase backend means zero infrastructure maintenance. There is no server to restart, no database to back up manually, no capacity to provision. This is the right architecture for a small business that needs software to work reliably without needing a technical team to keep it running.`,
    duration: 'Ongoing (live product)',
    team: 'Solo build',
    stack: ['Flutter Web', 'Cloud Firestore', 'Firebase Auth', 'Cloud Functions', 'Firebase Storage', 'BLoC'],
  },

  'algotrader-pro': {
    title: 'AlgoTrader Pro — Algorithmic Trading Platform',
    tagline:
      'A personal project giving retail traders in India a real toolset for building, testing, and refining algorithmic strategies across stocks and crypto — deployed serverlessly on Vercel.',
    tags: ['Next.js', 'Vercel', 'Serverless', 'FinTech'],
    url: 'https://algotrader-pro-xi.vercel.app/',
    problem: `Most retail traders in India have no practical way to build and test algorithmic strategies without either paying for expensive institutional platforms or spending weeks on data infrastructure before writing a single trading rule. The tools available either abstract away too much (basic buy/sell rules only) or demand engineering expertise before anything useful can be tested.

The specific gap: a clean interface for defining strategies, running them against real historical data, and evaluating results — without requiring a data engineering background to get started.`,
    approach: `Built as a personal project on Next.js, deployed serverlessly on Vercel. The serverless deployment is deliberate — market activity is highly time-concentrated (trading hours, earnings periods), so the platform needs to scale to handle that demand without paying for idle capacity overnight and on weekends. Vercel's serverless functions handle this naturally.

Market data comes from Yahoo Finance for NSE-listed stocks and CoinGecko for cryptocurrency — two independent, reliable sources brought into a unified interface. TradingView-style charts with technical indicators give the visual context for understanding strategy behaviour before trusting it with capital. The strategy builder lets traders define algorithmic rules; the backtesting engine runs those rules against historical data and surfaces performance metrics. The full workflow — from strategy definition to backtest results — runs in the browser without requiring any local setup.`,
    outcome: `A live platform demonstrating end-to-end product thinking in a technically demanding domain — real-time market data ingestion, algorithmic strategy execution, historical backtesting, and performance analytics. It is marked as educational and not connected to live trading accounts, which is the correct scope for a personal research tool.

The project explores a domain that intersects several areas of practical interest: serverless architecture for bursty workloads, financial data pipelines, and the UX of making complex algorithmic concepts approachable to non-engineers. It continues to be developed as a personal learning and experimentation platform.`,
    duration: 'Ongoing (personal project)',
    team: 'Solo build',
    stack: ['Next.js', 'Vercel Serverless', 'Yahoo Finance API', 'CoinGecko API', 'React', 'TradingView Charting'],
  },

  'aafes-shop-my-exchange': {
    title: 'AAFES — Shop My Exchange',
    tagline:
      'A global headless commerce platform serving US military personnel across 50+ countries — composable storefront on Frontastic, AI personalisation via Monetate, Flutter mobile app, Node.js backend.',
    tags: ['Frontastic', 'Headless Commerce', 'Flutter', 'Node.js', 'Enterprise'],
    url: null,
    problem: `AAFES — the Army & Air Force Exchange Service — operates one of the largest retail networks in the world, serving US military personnel and their families across more than 50 countries. Running a global e-commerce platform at this scale carries a specific set of constraints: the need to ship storefront changes quickly without full engineering deploys, the ability to personalise experiences by geography and customer segment, and performance that holds across network conditions ranging from high-speed stateside connections to limited bandwidth on overseas military installations.

A monolithic, coupled commerce platform makes all of this slower and more expensive. Every storefront change requires a backend deploy. Personalisation logic is buried in the platform and difficult to iterate. Mobile and web share nothing except the brand.`,
    approach: `The solution is a headless, composable commerce architecture. Frontastic — a frontend composition platform — separates the storefront presentation layer from the commerce and content backends. The merchandising team can build, preview, and publish storefront experiences through Frontastic's visual studio without requiring engineering deployments for every change. This is the core value of headless commerce: the business moves at business speed, not at engineering deployment speed.

AI-driven personalisation runs through Monetate, integrated at the headless layer — product recommendations and experience targeting operate on the presentation side without being baked into the backend. This means the personalisation strategy can be updated independently of platform releases.

The mobile application is built in Flutter, delivering a native-quality experience on iOS and Android. Rather than a separate mobile codebase diverging from web, shared business logic flows through a clean API contract, and the backend services in Node.js and TypeScript provide the unified API surface that both the Frontastic web storefront and the Flutter app consume.

This is a genuinely composable architecture: each layer — frontend composition, mobile, personalisation, backend API — can evolve independently. New capabilities can be added to one layer without rebuilding the others.`,
    outcome: `An active enterprise engagement. The platform serves military customers across more than 50 countries — a distribution that spans every network condition, device capability, and timezone. The headless architecture gives the business team direct control over storefront experience without engineering bottlenecks. Personalisation runs at the edge, not buried in the backend.

This project sits at the intersection of the capabilities that matter most for modern retail: composable frontend architecture, API-first backend design, native mobile delivery, and AI-driven personalisation — not as separate initiatives, but as a coherent system.`,
    duration: '2025 — present (active engagement)',
    team: 'Engineering team (Technical Lead role)',
    stack: ['Frontastic', 'Flutter', 'Node.js', 'TypeScript', 'Monetate AI', 'Headless Commerce', 'REST APIs'],
  },

  'job-search-agent': {
    title: 'Job Search Multi-Agent System',
    tagline:
      'A fully autonomous multi-agent pipeline that finds real jobs from Indian and global job boards, scores them against a résumé, tailors the résumé, and writes a cover letter — end to end, without human input.',
    tags: ['Python', 'CrewAI', 'Groq', 'Multi-Agent', 'AI'],
    url: null,
    problem: `Job searching at scale is repetitive, time-consuming, and poorly matched — most applications go out with a generic résumé that wasn't written for the specific role. The problem isn't finding jobs; it's the labour of reading each one, deciding if it's worth applying, rewriting the résumé to match, and producing a cover letter that sounds like it was written by a human who actually wants the job.

This is exactly the kind of work that a well-designed multi-agent system should absorb entirely.`,
    approach: `The system is built as a pipeline of four cooperating agents using CrewAI as the orchestration framework and Groq (cloud-hosted, free tier) as the LLM backend — replacing an earlier version that ran local models via LM Studio.

The first agent fetches live jobs from multiple sources: Adzuna (which aggregates Naukri, LinkedIn India, Indeed India, and TimesJobs via commercial API agreements — avoiding the scraping fragility of hitting those platforms directly), Remotive for global remote roles, and Jobicy for remote tech roles. The second agent applies a fast, deterministic scoring pass against a candidate profile — keyword matching, seniority alignment, must-have and avoid filters — before any AI is involved, so the expensive LLM step only runs on jobs that have already cleared a sensible threshold. The third agent reads the candidate's résumé PDF and scores each shortlisted job for semantic match, producing a ranked list with reasoning. The fourth agent takes the best-matched job, rewrites the résumé tailored to that specific role, and produces a personalised cover letter — both as ready-to-send .docx files.

The architecture separates the fast/cheap work (API fetching, keyword scoring) from the slow/expensive work (LLM reasoning, document generation). This keeps the pipeline practical to run daily without burning API quota on every job in the database.`,
    outcome: `A working autonomous pipeline that runs end to end from a single command. Output is a SQLite database of all jobs found, a tailored résumé .docx, and a cover letter .docx — all without manual input beyond the initial config.

The project demonstrates applied multi-agent design: not a single LLM prompt, but a coordinated system where each agent has a clear responsibility, agents pass structured outputs to each other, and the pipeline makes real decisions (which jobs to score with AI, which job to tailor for) rather than just generating text. It also reflects a pragmatic engineering choice — Groq over local inference, Adzuna over fragile scraping — because the goal was a tool that works reliably, not a research prototype.`,
    duration: 'Personal project (ongoing)',
    team: 'Solo build',
    stack: ['Python', 'CrewAI', 'Groq API', 'Adzuna API', 'SQLite', 'python-docx', 'LLM orchestration'],
  },

  'microservices-on-gcp': {
    title: 'Microservices Migration on GCP',
    tagline:
      'Breaking a fragile monolithic Node.js API into independently deployable services on Google Cloud — without stopping feature delivery or accepting a big-bang rewrite.',
    tags: ['Node.js', 'GCP', 'Microservices', 'Java', 'Spring Boot'],
    url: null,
    problem: `A growing SaaS product had been built on a single Node.js API — the right call at the start, but increasingly painful as the team and feature set grew. A bug in the payments module could take down user authentication. Deployments happened in maintenance windows because any release carried risk for the whole system. New engineers needed weeks to become productive because there were no clear boundaries between what any part of the codebase owned.

The business problem was not architectural — it was that slow, risky deployments were directly limiting how fast the product could grow.`,
    approach: `The migration was designed as a series of extractions, not a rewrite. Three services with the clearest domain boundaries and highest independent change frequency were identified first — authentication, billing, and notifications. These became the first independently deployed services on Google Cloud Run, each in its own container with its own deployment pipeline.

Cloud Pub/Sub replaced direct synchronous calls for cross-service events that didn't need an immediate response. This decoupled services without creating new dependencies that could cascade failures. Java Spring Boot was used for the highest-throughput services where the JVM's performance characteristics and the ecosystem's maturity for enterprise patterns (transaction management, structured concurrency, connection pooling) were worth the trade-off over Node.js. Infrastructure was defined in Terraform — reproducible, reviewable, and templatable for new services.

The original monolith kept running throughout. No maintenance windows, no feature freeze, no moment where the whole system went offline.`,
    outcome: `Within four months, five core domains were running as independent services on GCP. Deployment frequency went from fortnightly to multiple times per day per service. An incident in the notifications service no longer affected authentication or payments.

The project demonstrated a pattern that applies broadly: server-based microservices on Cloud Run for latency-sensitive, stateful services; serverless Cloud Functions for event-driven, sporadic workloads; Pub/Sub for reliable async communication between them. Knowing when to use each — and when not to — is the actual skill. Java Spring Boot for enterprise-grade services, Node.js for lightweight API surfaces, and GCP's managed layer to avoid the operational overhead of running the infrastructure yourself.`,
    duration: '6 months',
    team: '2 backend engineers + infrastructure lead',
    stack: ['Node.js', 'Java', 'Spring Boot', 'GCP Cloud Run', 'Pub/Sub', 'Cloud SQL', 'Terraform', 'Docker'],
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const study = caseStudies[params.slug];
  if (!study) return { title: 'Not Found' };
  return {
    title: `${study.title} — Abhisheka Technologies`,
    description: study.tagline,
  };
}

export default function CaseStudyPage({ params }) {
  const study = caseStudies[params.slug];
  if (!study) notFound();

  const { color, accent } = STUDY_PALETTE[params.slug] ?? { color: '#F4F4F4', accent: '#3E6AE1' };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <ReadingProgress accentColor={accent} />

      {/* Breadcrumb / Back nav */}
      <div style={{ borderBottom: '1px solid #EEEEEE' }} className="px-6 py-4 sticky top-0 z-50 bg-white">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#5C5E62' }}>
            <Link
              href="/"
              className="transition-colors duration-[330ms] hover:text-[#3E6AE1]"
              style={{ color: '#5C5E62' }}
            >
              Home
            </Link>
            <span style={{ color: '#D0D1D2' }}>/</span>
            <Link
              href="/#work"
              className="transition-colors duration-[330ms] hover:text-[#3E6AE1]"
              style={{ color: '#5C5E62' }}
            >
              Work
            </Link>
            <span style={{ color: '#D0D1D2' }}>/</span>
            <span className="hidden sm:inline truncate max-w-[160px]" style={{ color: '#393C41' }}>
              {study.title}
            </span>
          </nav>

          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-[330ms] hover:text-[#3E6AE1] shrink-0"
            style={{ color: '#5C5E62' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to work
          </Link>
        </div>
      </div>

      {/* Header — tinted with the study's palette color */}
      <header className="px-6 pt-16 pb-12" style={{ backgroundColor: color }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: accent, color: '#FFFFFF' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="font-medium mb-4 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#171A20' }}
          >
            {study.title}
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: '#5C5E62' }}>
            {study.tagline}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 pt-6"
            style={{ borderTop: '1px solid #EEEEEE' }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#9E9E9E' }}>
                Duration
              </p>
              <p className="text-sm font-medium" style={{ color: '#393C41' }}>
                {study.duration}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#9E9E9E' }}>
                Team
              </p>
              <p className="text-sm font-medium" style={{ color: '#393C41' }}>
                {study.team}
              </p>
            </div>
            {study.stack && (
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#9E9E9E' }}>
                  Stack
                </p>
                <p className="text-sm font-medium leading-relaxed" style={{ color: '#393C41' }}>
                  {study.stack.join(' · ')}
                </p>
              </div>
            )}
          </div>

          {study.url && (
            <div className="mt-6">
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-[330ms] hover:bg-[#2d58c8] text-white px-5 py-2.5"
                style={{ backgroundColor: '#3E6AE1', borderRadius: '4px' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5.5 2H2.5A.5.5 0 0 0 2 2.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M8 2h4v4M12 2L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View live product
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <article className="px-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-16">
          {[
            { label: 'Problem', content: study.problem },
            { label: 'Approach', content: study.approach },
            { label: 'Outcome', content: study.outcome },
          ].map((section) => (
            <section key={section.label}>
              <h2 className="font-medium mb-6" style={{ fontSize: '22px', color: '#171A20' }}>
                {section.label}
              </h2>
              <div className="space-y-4">
                {section.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: '#393C41' }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* CTA */}
      <div
        className="px-6 py-16"
        style={{ backgroundColor: '#F4F4F4', borderTop: '1px solid #EEEEEE' }}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-medium mb-1" style={{ fontSize: '18px', color: '#171A20' }}>
              Need something like this?
            </p>
            <p className="text-sm" style={{ color: '#5C5E62' }}>
              I&apos;m available for new product builds and consulting engagements.
            </p>
          </div>
          <Link
            href="/#contact"
            className="text-sm font-medium text-white px-6 py-3 transition-colors duration-[330ms] hover:bg-[#2d58c8] whitespace-nowrap"
            style={{ backgroundColor: '#3E6AE1', borderRadius: '4px' }}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
