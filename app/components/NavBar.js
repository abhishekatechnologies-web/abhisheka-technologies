'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['About', 'Services', 'Work', 'Contact'];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white border-b border-[#EEEEEE]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={closeMenu}
            className={`text-base font-medium tracking-widest transition-colors duration-300 ${
              scrolled || menuOpen ? 'text-[#171A20]' : 'text-white'
            }`}
          >
            A&bull;T
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#3E6AE1] ${
                  scrolled ? 'text-[#393C41]' : 'text-white'
                }`}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="text-sm font-medium text-white px-5 py-2 transition-colors duration-300 hover:bg-[#2d58c8]"
              style={{ borderRadius: '4px', backgroundColor: '#3E6AE1' }}
            >
              Hire me
            </Link>
          </div>

          {/* Hamburger — animated */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] transition-colors duration-300 ${
              scrolled || menuOpen ? 'text-[#171A20]' : 'text-white'
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[1.5px] bg-current origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[1.5px] bg-current origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/20"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#EEEEEE] px-6 pb-8"
            >
              <div className="flex flex-col gap-1 pt-4">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                  >
                    <Link
                      href={`/#${item.toLowerCase()}`}
                      onClick={closeMenu}
                      className="block text-base font-medium text-[#393C41] py-3 border-b border-[#F4F4F4] hover:text-[#3E6AE1] transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.2 }}
                  className="pt-4"
                >
                  <Link
                    href="/#contact"
                    onClick={closeMenu}
                    className="inline-block text-sm font-medium text-white px-6 py-3 transition-colors duration-300 hover:bg-[#2d58c8]"
                    style={{ borderRadius: '4px', backgroundColor: '#3E6AE1' }}
                  >
                    Hire me
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
