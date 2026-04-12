'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'abhisheka2026';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('at_admin', 'true');
      router.push('/admin');
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#F4F4F4' }}
    >
      <div
        className="w-full max-w-sm bg-white p-10 rounded-xl"
        style={{ border: '1px solid #EEEEEE' }}
      >
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#5C5E62' }}>
          Abhisheka Technologies
        </p>
        <h1
          className="font-medium mb-8"
          style={{ fontSize: '22px', color: '#171A20' }}
        >
          Admin access
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#393C41' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full border border-cloud rounded px-4 py-3 text-sm text-graphite placeholder-pewter transition-colors duration-330 focus:border-blue focus:outline-none"
              style={{ borderColor: error ? '#EF4444' : undefined }}
            />
            {error && (
              <p className="text-xs mt-1.5" style={{ color: '#EF4444' }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue text-white text-sm font-medium py-3 transition-opacity duration-330 hover:opacity-85 mt-2"
            style={{ borderRadius: '4px', backgroundColor: '#3E6AE1' }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
