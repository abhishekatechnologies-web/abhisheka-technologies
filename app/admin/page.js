'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    caseStudies: 7,
    seoPages: 0,
    messages: 0,
    unread: 0,
  });

  useEffect(() => {
    try {
      const messages = JSON.parse(localStorage.getItem('at_messages') || '[]');
      const unread = messages.filter((m) => !m.read).length;

      const seoKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith('at_seo_')
      );

      const customCaseStudies = JSON.parse(
        localStorage.getItem('at_case_studies') || '[]'
      );

      setStats({
        caseStudies: 7 + customCaseStudies.length,
        seoPages: seoKeys.length,
        messages: messages.length,
        unread,
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const cards = [
    {
      label: 'Total Case Studies',
      value: stats.caseStudies,
      href: '/admin/case-studies',
      sub: 'Published & drafts',
    },
    {
      label: 'Pages with custom SEO',
      value: stats.seoPages,
      href: '/admin/seo',
      sub: 'Saved in SEO manager',
    },
    {
      label: 'Total Messages',
      value: stats.messages,
      href: '/admin/messages',
      sub: `${stats.unread} unread`,
    },
  ];

  return (
    <div className="px-8 py-10">
      <h1
        className="font-medium mb-1"
        style={{ fontSize: '22px', color: '#171A20' }}
      >
        Dashboard
      </h1>
      <p className="text-sm mb-10" style={{ color: '#5C5E62' }}>
        Overview of your site content and activity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-7 transition-colors duration-330 hover:border-blue"
            style={{ border: '1px solid #EEEEEE', display: 'block' }}
          >
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9E9E9E' }}>
              {card.label}
            </p>
            <p
              className="font-medium mb-1"
              style={{ fontSize: '36px', color: '#171A20', lineHeight: 1 }}
            >
              {card.value}
            </p>
            <p className="text-sm" style={{ color: '#5C5E62' }}>
              {card.sub}
            </p>
          </Link>
        ))}
      </div>

      <div
        className="mt-8 p-5 rounded-xl"
        style={{ backgroundColor: '#F4F4F4', border: '1px solid #EEEEEE' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: '#171A20' }}>
          Quick links
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          {[
            { label: 'View live site', href: '/' },
            { label: 'Edit SEO', href: '/admin/seo' },
            { label: 'View messages', href: '/admin/messages' },
            { label: 'Manage case studies', href: '/admin/case-studies' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: '#3E6AE1' }}
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
