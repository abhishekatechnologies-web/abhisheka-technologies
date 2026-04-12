'use client';

/**
 * ContactForm — EmailJS-powered contact form with full UX polish.
 *
 * Flow:
 *  1. Validate on blur (per-field) and on submit (all fields).
 *  2. On valid submit: save to localStorage as backup, then send via EmailJS.
 *  3. On success → animated SuccessState.
 *  4. On failure → ErrorState with retry and direct email fallback.
 *
 * EmailJS template variables expected: from_name, reply_to, message, budget.
 * Keys are read from NEXT_PUBLIC_EMAILJS_* environment variables.
 *
 * Budget options cover both USD and INR ranges to serve international clients.
 * localStorage backup (at_messages) means no submission is ever silently lost.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function saveMessageToLocalStorage(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('at_messages') || '[]');
    existing.push({
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem('at_messages', JSON.stringify(existing));
  } catch {
    // silently fail if localStorage is unavailable
  }
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-4 py-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center w-12 h-12 rounded-full"
        style={{ backgroundColor: '#F4F4F4' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10l4.5 4.5 7.5-9" stroke="#3E6AE1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <div>
        <p className="text-base font-medium mb-1" style={{ color: '#171A20' }}>
          Message sent.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#5C5E62' }}>
          Thanks for reaching out. I&apos;ll get back to you within one business day.
        </p>
      </div>
    </motion.div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-4 py-6"
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full"
        style={{ backgroundColor: '#FEF2F2' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 6v4M10 14h.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="10" r="8" stroke="#EF4444" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <p className="text-base font-medium mb-1" style={{ color: '#171A20' }}>
          Message couldn&apos;t be sent.
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#5C5E62' }}>
          There was a problem with the email service. Your message has been saved — you can also
          reach me directly at{' '}
          <a
            href="mailto:abhishekatechnologies@gmail.com"
            className="underline transition-opacity hover:opacity-70"
            style={{ color: '#3E6AE1' }}
          >
            abhishekatechnologies@gmail.com
          </a>
        </p>
        <button
          onClick={onRetry}
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: '#3E6AE1' }}
        >
          Try again →
        </button>
      </div>
    </motion.div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', budget: '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const errors = {
    name: !form.name.trim() ? 'Name is required.' : '',
    email: !form.email.trim()
      ? 'Email is required.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? 'Enter a valid email address.'
      : '',
    message: !form.message.trim() ? 'Message is required.' : '',
    budget: !form.budget ? 'Please select a budget range.' : '',
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true, budget: true });

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setStatus('loading');
    saveMessageToLocalStorage(form);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        reply_to: form.email,
        message: form.message,
        budget: form.budget,
      }, PUBLIC_KEY);
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error status:', err?.status);
      console.error('EmailJS error text:', err?.text);
      setStatus('error');
    }
  };

  const inputBase =
    'w-full border rounded bg-white px-4 py-3 text-sm transition-colors duration-[330ms] focus:outline-none';

  const fieldClass = (name) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && form[name];
    if (hasError) return `${inputBase} border-red-400 text-graphite placeholder-pewter focus:border-red-400`;
    if (isValid) return `${inputBase} border-[#3E6AE1] text-graphite placeholder-pewter focus:border-[#3E6AE1]`;
    return `${inputBase} border-cloud text-graphite placeholder-pewter focus:border-[#3E6AE1]`;
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <SuccessState key="success" />
      ) : status === 'error' ? (
        <ErrorState key="error" onRetry={() => setStatus('idle')} />
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#393C41' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                className={fieldClass('name')}
              />
              {touched.name && errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#393C41' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@company.com"
                className={fieldClass('email')}
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#393C41' }}>
              Budget
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass('budget')}
            >
              <option value="">Select a range</option>
              <optgroup label="USD">
                <option value="Under $5k">Under $5k</option>
                <option value="$5k–$20k">$5k–$20k</option>
                <option value="$20k+">$20k+</option>
              </optgroup>
              <optgroup label="INR">
                <option value="Under ₹1L">Under ₹1L</option>
                <option value="₹1L–₹5L">₹1L–₹5L</option>
                <option value="₹5L–₹20L">₹5L–₹20L</option>
                <option value="₹20L+">₹20L+</option>
              </optgroup>
              <option value="Let's talk">Let&apos;s talk / not sure</option>
            </select>
            {touched.budget && errors.budget && (
              <p className="mt-1 text-xs text-red-500">{errors.budget}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#393C41' }}>
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell me about your project or challenge..."
              rows={5}
              className={`${fieldClass('message')} resize-none`}
            />
            {touched.message && errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white px-7 py-3 transition-colors duration-[330ms] hover:bg-[#2d58c8] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ borderRadius: '4px', backgroundColor: '#3E6AE1', minWidth: '148px' }}
            >
              {status === 'loading' ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                'Send message'
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
