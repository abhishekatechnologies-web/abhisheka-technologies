'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'SEO', href: '/admin/seo' },
  { label: 'Case Studies', href: '/admin/case-studies' },
  { label: 'Messages', href: '/admin/messages' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }
    const isAdmin = localStorage.getItem('at_admin') === 'true';
    if (!isAdmin) {
      router.replace('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#F4F4F4' }}
      >
        <p className="text-sm" style={{ color: '#5C5E62' }}>
          Checking authentication…
        </p>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: '#171A20' }}
      >
        <div
          className="px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Link href="/" className="text-sm font-medium tracking-widest" style={{ color: '#FFFFFF' }}>
            A&bull;T
          </Link>
          <p className="text-xs mt-0.5" style={{ color: '#5C5E62' }}>
            Admin
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2.5 rounded text-sm transition-colors duration-330"
                style={{
                  color: active ? '#FFFFFF' : '#9E9E9E',
                  backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderRadius: '4px',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div
          className="px-6 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <button
            onClick={() => {
              localStorage.removeItem('at_admin');
              router.push('/admin/login');
            }}
            className="text-xs transition-opacity hover:opacity-70"
            style={{ color: '#5C5E62' }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto" style={{ backgroundColor: '#FAFAFA' }}>
        {children}
      </main>
    </div>
  );
}
