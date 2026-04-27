'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const enterEase = [0.16, 1, 0.3, 1] as const;

const nav = [
  { label: 'Studio', href: '#about-us' },
  { label: 'Training', href: '#services' },
  { label: 'Memberships', href: '#membership' },
  { label: 'Journal', href: '/blog-posts/' },
  { label: 'Contact', href: '/contact' },
];

const datelineParts = (() => {
  const d = new Date();
  const day = d.toLocaleDateString('en-IN', { weekday: 'long' });
  const date = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  return { day, date };
})();

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    if (menuOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed left-0 right-0 z-50 bg-background/95 backdrop-blur"
        style={{ top: 'var(--offer-banner-height, 0px)' }}
      >
        {/* Masthead */}
        <motion.div
          animate={{
            paddingTop: scrolled ? 4 : 6,
            paddingBottom: scrolled ? 4 : 6,
          }}
          transition={{ duration: 0.35, ease: enterEase }}
          className="border-b hairline"
        >
          <div className="container-custom px-4 md:px-6">
            <div className="grid grid-cols-12 items-center gap-4">
              {/* Left — uppercase nav (desktop) */}
              <div className="col-span-3 hidden lg:block">
                <ul className="flex items-center gap-6">
                  {nav.slice(0, 3).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-mono-display text-[11px] uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center — wordmark, scaling */}
              <div className="col-span-9 flex items-center gap-3 lg:col-span-6 lg:justify-center">
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center border hairline lg:hidden"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <Link
                  href="/"
                  aria-label="Fisique Fitness — home"
                  className="flex flex-1 items-center justify-center lg:flex-none"
                >
                  <motion.img
                    src="/fisique-logo-tagline.png"
                    alt="Fisique Fitness — Personal Plans, Real Results."
                    animate={{ height: scrolled ? 36 : 48 }}
                    transition={{ duration: 0.35, ease: enterEase }}
                    className="w-auto"
                  />
                </Link>
              </div>

              {/* Right — remaining nav + CTA */}
              <div className="col-span-3 hidden items-center justify-end gap-6 lg:flex">
                <ul className="flex items-center gap-6">
                  {nav.slice(3).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-mono-display text-[11px] uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  className="group h-9 bg-foreground px-3 text-background hover:bg-foreground/90"
                  asChild
                >
                  <a
                    href="https://wa.me/919515469444?text=Hi!%20I'd%20like%20to%20book%20a%20PT%20trial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-1.5 h-3 w-3" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                      Book trial
                    </span>
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>

              {/* Mobile right — phone */}
              <div className="col-span-3 flex items-center justify-end lg:hidden">
                <a
                  href="tel:+919515469444"
                  className="font-mono-display text-[10px] uppercase tracking-[0.18em] text-foreground/75"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Spacer */}
      <div aria-hidden className="h-[60px] md:h-[64px]" />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: enterEase }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex items-center justify-between border-b hairline px-4 py-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl font-black leading-none text-foreground"
              >
                Fisique
              </Link>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center border hairline"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="container-custom px-4 py-8">
              <ul className="border-t hairline">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: enterEase, delay: 0.05 + i * 0.06 }}
                    className="border-b hairline"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-5 py-6"
                    >
                      <span className="font-mono-display text-xs tracking-widest text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-black tracking-[-0.03em] text-foreground text-[clamp(36px,9vw,56px)] leading-[0.95]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 space-y-3">
                <Button
                  size="lg"
                  className="w-full justify-start bg-foreground text-background hover:bg-foreground/90"
                  asChild
                >
                  <a
                    href="https://wa.me/919515469444?text=Hi!%20I'd%20like%20to%20book%20a%20PT%20trial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Book a trial
                  </a>
                </Button>
                <a
                  href="tel:+919515469444"
                  className="block border hairline px-6 py-4 font-mono-display text-sm tracking-wide text-foreground"
                >
                  +91 95154 69444
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
