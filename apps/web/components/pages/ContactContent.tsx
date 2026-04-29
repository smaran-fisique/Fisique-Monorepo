'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight } from 'lucide-react';

export default function ContactContent() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const message = encodeURIComponent(
      `Hi! I'm ${name.trim()}, phone: ${phone.trim()}. I'd like to know more about Fisique Fitness.`
    );
    window.open(`https://wa.me/919515469444?text=${message}`, '_blank');
  };

  return (
    <>
      <Header />

      <main>
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-16">

            {/* Dateline */}
            <div className="flex items-center justify-between border-b hairline pb-3 mb-10 md:mb-14">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                Contact · Fisique
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Kokapet · Hyderabad
              </span>
            </div>

            {/* Headline */}
            <div className="mb-10 md:mb-14">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                Get in touch
              </span>
              <h1 className="mt-4 font-display font-black text-foreground text-[clamp(40px,7vw,108px)] leading-[0.92] tracking-[-0.045em]">
                Say
                <span className="font-thin text-accent"> hello.</span>
              </h1>
            </div>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12">

              {/* Left — contact info */}
              <div className="md:col-span-5 space-y-0">
                <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-6">
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Studio</span>
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">01</span>
                </div>

                <div className="space-y-5">
                  <a
                    href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 py-4 border-b hairline hover:text-foreground transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground mb-1">Address</p>
                      <p className="text-[13px] leading-[1.65] text-foreground/80">
                        4th Floor, Avant Cedar<br />
                        Above Pulla Reddy Sweets<br />
                        Kokapet, Hyderabad
                      </p>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </a>

                  <div className="py-4 border-b hairline">
                    <div className="flex items-center gap-4 mb-3">
                      <Phone className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Phone</p>
                    </div>
                    <div className="pl-[1.875rem] space-y-1.5">
                      <a href="tel:+919515469444" className="block font-mono-display text-[11px] uppercase tracking-[0.14em] text-foreground/80 hover:text-accent transition-colors">
                        +91 95154 69444
                      </a>
                      <a href="tel:+917671959610" className="block font-mono-display text-[11px] uppercase tracking-[0.14em] text-foreground/80 hover:text-accent transition-colors">
                        +91 76719 59610
                      </a>
                    </div>
                  </div>

                  <div className="py-4 border-b hairline">
                    <div className="flex items-center gap-4 mb-3">
                      <Mail className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Email</p>
                    </div>
                    <div className="pl-[1.875rem] space-y-1.5">
                      <a href="mailto:hello@fisique.fitness" className="block font-mono-display text-[11px] tracking-[0.08em] text-foreground/80 hover:text-accent transition-colors">
                        hello@fisique.fitness
                      </a>
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="flex items-center gap-4 mb-3">
                      <Clock className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Hours</p>
                    </div>
                    <div className="pl-[1.875rem] space-y-1.5 font-mono-display text-[10px] uppercase tracking-[0.14em] text-foreground/70">
                      <div className="flex justify-between">
                        <span>Mon — Sat</span>
                        <span>05:30 — 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sun · self-train</span>
                        <span>07:00 — 12:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — inquiry form */}
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-6">
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Quick Inquiry</span>
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">02</span>
                </div>

                <p className="text-[14px] leading-[1.7] text-muted-foreground mb-8">
                  Leave your name and number — we'll follow up on WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border hairline bg-background px-4 py-3 text-[13px] placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full border hairline bg-background px-4 py-3 text-[13px] placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="sm"
                    className="group h-10 bg-foreground px-6 text-background hover:bg-foreground/90"
                  >
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                      Send on WhatsApp
                    </span>
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t hairline flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 border hairline px-4 text-foreground hover:bg-foreground/5"
                    asChild
                  >
                    <a
                      href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20know%20more%20about%20Fisique%20Fitness"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">WhatsApp directly</span>
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 border hairline px-4 text-foreground hover:bg-foreground/5"
                    asChild
                  >
                    <a
                      href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Get directions</span>
                    </a>
                  </Button>
                </div>
              </div>

            </div>

            {/* Map */}
            <div className="mt-12 border hairline overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.3558!3d17.4156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFisique%20Fitness!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="360"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fisique Fitness Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
