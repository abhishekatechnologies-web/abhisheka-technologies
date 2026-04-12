import Link from 'next/link';
import ContactForm from '@/app/components/ContactForm';

export const metadata = {
  title: 'Contact — Abhisheka Technologies',
  description:
    'Get in touch to discuss consulting engagements, project scoping, or to explore working together.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Nav bar placeholder row */}
      <div style={{ borderBottom: '1px solid #EEEEEE' }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium tracking-widest transition-opacity hover:opacity-70"
            style={{ color: '#171A20' }}
          >
            A&bull;T
          </Link>
          <Link
            href="/"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: '#5C5E62' }}
          >
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#5C5E62' }}>
            Contact
          </p>
          <h1
            className="font-medium mb-6 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#171A20' }}
          >
            Let&apos;s work together.
          </h1>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#5C5E62' }}>
            I&apos;m available for consulting engagements on a project or retainer basis. Whether
            you&apos;re building something new, untangling something broken, or trying to make a
            clearer technology decision — get in touch.
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#5C5E62' }}>
            I also work with clients through{' '}
            <a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: '#393C41' }}
            >
              Upwork
            </a>{' '}
            and{' '}
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: '#393C41' }}
            >
              Fiverr
            </a>{' '}
            for well-scoped engagements.
          </p>
          <a
            href="mailto:avi.kr16@gmail.com"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: '#3E6AE1' }}
          >
            avi.kr16@gmail.com
          </a>
        </div>

        {/* Right — form */}
        <ContactForm />
      </div>
    </div>
  );
}
