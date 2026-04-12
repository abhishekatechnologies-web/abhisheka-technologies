'use client';

import { useState, useEffect } from 'react';

const HARDCODED = [
  {
    id: 'aafes-shop-my-exchange',
    title: 'AAFES — Shop My Exchange',
    slug: 'aafes-shop-my-exchange',
    tagline: 'Enterprise headless commerce platform on Frontastic with Flutter mobile and Node.js backend — serving military customers across 50+ countries.',
    tags: 'Frontastic, Flutter, Node.js, Headless Commerce, Enterprise',
    duration: '2025 — present',
    team: 'Engineering team (Technical Lead role)',
    hardcoded: true,
  },
  {
    id: 'bright-smile',
    title: 'Bright Smile — Dental Clinic Platform',
    slug: 'bright-smile',
    tagline: 'Complete clinic management system on Firebase serverless — real-time sync, role-based access, digital dental charting, PDF invoicing.',
    tags: 'Flutter, Firebase, Serverless, Healthcare',
    duration: 'Ongoing (live product)',
    team: 'Solo build',
    hardcoded: true,
  },
  {
    id: 'nari-care',
    title: 'NariCare — Women\'s Health Clinic System',
    slug: 'nari-care',
    tagline: 'Gynaecology and obstetrics platform with ANC tracking, IVF cycles, lab results, and automated reminders — serverless Firebase backend.',
    tags: 'Flutter, Firebase, Serverless, OB-GYN',
    duration: 'Ongoing (live product)',
    team: 'Solo build',
    hardcoded: true,
  },
  {
    id: 'algotrader-pro',
    title: 'AlgoTrader Pro',
    slug: 'algotrader-pro',
    tagline: 'Algorithmic trading platform for Indian stocks and crypto with strategy builder and backtesting — deployed serverlessly on Vercel.',
    tags: 'Next.js, Vercel, Serverless, FinTech',
    duration: 'Ongoing (personal project)',
    team: 'Solo build',
    hardcoded: true,
  },
  {
    id: 'job-search-agent',
    title: 'Job Search Multi-Agent System',
    slug: 'job-search-agent',
    tagline: 'Multi-agent pipeline using CrewAI and Groq that fetches jobs, scores them against a résumé, tailors the résumé, and writes a cover letter.',
    tags: 'Python, CrewAI, Groq, Multi-Agent, AI',
    duration: 'Ongoing (personal project)',
    team: 'Solo build',
    hardcoded: true,
  },
  {
    id: 'microservices-on-gcp',
    title: 'Microservices Migration on GCP',
    slug: 'microservices-on-gcp',
    tagline: 'Node.js monolith extracted into Cloud Run services with Pub/Sub event bus and Java Spring Boot for high-throughput domains.',
    tags: 'Node.js, Java, Spring Boot, GCP, Microservices',
    duration: '6 months',
    team: '2 backend engineers + infrastructure lead',
    hardcoded: true,
  },
  {
    id: 'bs-food-beverage',
    title: 'BS Food & Beverage — Business Platform',
    slug: 'bs-food-beverage',
    tagline: 'Web-first operations platform unifying inventory and staff workflows on Firebase serverless — Flutter Web, real-time sync across all devices.',
    tags: 'Flutter Web, Firebase, Serverless, Inventory',
    duration: 'Ongoing (live product)',
    team: 'Solo build',
    hardcoded: true,
  },
];

const EMPTY_FORM = {
  title: '',
  slug: '',
  tagline: '',
  tags: '',
  problem: '',
  approach: '',
  outcome: '',
  duration: '',
  team: '',
};

export default function CaseStudiesCMS() {
  const [custom, setCustom] = useState([]);
  const [editing, setEditing] = useState(null); // null = list, 'new' = new form, id = edit form
  const [form, setForm] = useState(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setCustom(JSON.parse(localStorage.getItem('at_case_studies') || '[]'));
    } catch (e) {}
  }, []);

  const saveCustom = (updated) => {
    setCustom(updated);
    localStorage.setItem('at_case_studies', JSON.stringify(updated));
  };

  const handleNew = () => {
    setForm(EMPTY_FORM);
    setEditing('new');
  };

  const handleEdit = (item) => {
    setForm({ ...item });
    setEditing(item.id);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this case study?')) return;
    saveCustom(custom.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (!form.title || !form.slug) return;
    if (editing === 'new') {
      const newItem = { ...form, id: form.slug || Date.now().toString() };
      saveCustom([...custom, newItem]);
    } else {
      saveCustom(custom.map((c) => (c.id === editing ? { ...form, id: editing } : c)));
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEditing(null);
    }, 1200);
  };

  const inputClass =
    'w-full border border-cloud rounded px-4 py-2.5 text-sm text-graphite placeholder-pewter transition-colors duration-330 focus:border-blue focus:outline-none';

  const allStudies = [...HARDCODED, ...custom];

  if (editing !== null) {
    return (
      <div className="px-8 py-10 max-w-2xl">
        <button
          onClick={() => setEditing(null)}
          className="text-sm mb-6 transition-opacity hover:opacity-70"
          style={{ color: '#5C5E62' }}
        >
          ← Back to list
        </button>
        <h1 className="font-medium mb-8" style={{ fontSize: '22px', color: '#171A20' }}>
          {editing === 'new' ? 'New Case Study' : 'Edit Case Study'}
        </h1>
        <div className="space-y-5">
          {[
            { field: 'title', label: 'Title', placeholder: 'Case study title' },
            { field: 'slug', label: 'Slug', placeholder: 'url-friendly-slug' },
            { field: 'tagline', label: 'Tagline', placeholder: 'One-sentence summary' },
            { field: 'tags', label: 'Tags (comma-separated)', placeholder: 'Strategy, AI, Architecture' },
            { field: 'duration', label: 'Duration', placeholder: '3 months' },
            { field: 'team', label: 'Team', placeholder: '2 engineers + 1 PM' },
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="block text-xs font-medium uppercase tracking-widest mb-1.5" style={{ color: '#9E9E9E' }}>
                {label}
              </label>
              <input
                type="text"
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                placeholder={placeholder}
                className={inputClass}
              />
            </div>
          ))}
          {['problem', 'approach', 'outcome'].map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium uppercase tracking-widest mb-1.5" style={{ color: '#9E9E9E' }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <textarea
                rows={5}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} narrative...`}
                className={`${inputClass} resize-vertical`}
              />
            </div>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              className="text-sm font-medium text-white px-6 py-3 transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#3E6AE1', borderRadius: '4px' }}
            >
              Save case study
            </button>
            {saved && <p className="text-sm" style={{ color: '#5C5E62' }}>Saved.</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-medium mb-1" style={{ fontSize: '22px', color: '#171A20' }}>
            Case Studies
          </h1>
          <p className="text-sm" style={{ color: '#5C5E62' }}>
            {allStudies.length} total — {HARDCODED.length} built-in, {custom.length} custom
          </p>
        </div>
        <button
          onClick={handleNew}
          className="text-sm font-medium text-white px-5 py-2.5 transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#3E6AE1', borderRadius: '4px' }}
        >
          + New case study
        </button>
      </div>

      <div className="space-y-3">
        {allStudies.map((study) => (
          <div
            key={study.id}
            className="bg-white rounded-xl px-6 py-5 flex items-center justify-between gap-4"
            style={{ border: '1px solid #EEEEEE' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium truncate" style={{ color: '#171A20' }}>
                  {study.title}
                </p>
                {study.hardcoded && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#F4F4F4', color: '#9E9E9E' }}
                  >
                    built-in
                  </span>
                )}
              </div>
              <p className="text-xs truncate" style={{ color: '#9E9E9E' }}>
                /{study.slug}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              {!study.hardcoded && (
                <>
                  <button
                    onClick={() => handleEdit(study)}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: '#3E6AE1' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(study.id)}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: '#EF4444' }}
                  >
                    Delete
                  </button>
                </>
              )}
              {study.hardcoded && (
                <span className="text-xs" style={{ color: '#CCCCCC' }}>
                  Read-only
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
