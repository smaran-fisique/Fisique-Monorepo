import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const fisiquelogo = '/fisique-logo.webp';

export const Footer = () => {
  return (
    <footer className="bg-[hsl(218_31%_3%)] border-t border-white/15">

      {/* Main grid */}
      <div className="container-custom px-4 md:px-6 py-12 md:py-16">

        {/* Dateline */}
        <div className="flex items-center justify-between border-b border-white/12 pb-3 mb-10">
          <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent-glow">
            Fisique Fitness
          </span>
          <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-white/30">
            Kokapet · Hyderabad
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand col */}
          <div className="md:col-span-4">
            <img
              src={fisiquelogo}
              alt="Fisique Fitness"
              width={148}
              height={38}
              className="h-9 w-auto mb-6 opacity-80"
            />
            <p className="text-[13px] leading-[1.7] text-white/55 max-w-xs">
              PT-first training studio in Kokapet. One coach, one client, one floor — strength, sauna, and nutrition under one roof.
            </p>

            <div className="mt-6 space-y-2">
              <a
                href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-white/45 hover:text-accent-glow transition-colors"
              >
                <MapPin className="h-3 w-3" />
                4th Floor, Avant Cedar, Kokapet
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:+919515469444"
                className="group flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-white/45 hover:text-accent-glow transition-colors"
              >
                <Phone className="h-3 w-3" />
                +91 95154 69444
              </a>
              <a
                href="tel:+917671959610"
                className="group flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-white/45 hover:text-accent-glow transition-colors"
              >
                <Phone className="h-3 w-3" />
                +91 76719 59610
              </a>
              <a
                href="mailto:hello@fisique.fitness"
                className="group flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-white/45 hover:text-accent-glow transition-colors"
              >
                <Mail className="h-3 w-3" />
                hello@fisique.fitness
              </a>
            </div>
          </div>

          {/* Links cols */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">

            <div>
              <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-white/35 border-b border-white/10 pb-2 mb-4">
                Services
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Personal Training', href: '/personal-training-kokapet' },
                  { label: 'Gym Membership', href: '/gym-membership-kokapet' },
                  { label: 'Our Studio', href: '/kokapet-gym' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-white/50 hover:text-accent-glow transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-white/35 border-b border-white/10 pb-2 mb-4">
                Locations
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Kokapet', href: '/kokapet-gym' },
                  { label: 'Narsingi', href: '/gym-narsingi' },
                  { label: 'Financial District', href: '/gym-financial-district' },
                  { label: 'Gachibowli', href: '/gym-gachibowli' },
                  { label: 'Gandipet', href: '/gym-gandipet' },
                  { label: 'Manikonda', href: '/gym-manikonda' },
                  { label: 'Puppalaguda', href: '/gym-puppalaguda' },
                  { label: 'Tellapur', href: '/gym-tellapur' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-white/50 hover:text-accent-glow transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-white/35 border-b border-white/10 pb-2 mb-4">
                Resources
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Blog', href: '/blog-posts/' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Offers', href: '/offers' },
                  { label: 'Member Portal', href: 'https://member.fisique.fitness', external: true },
                ].map(({ label, href, external }) => (
                  <a
                    key={href}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-white/50 hover:text-accent-glow transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-white/35 border-b border-white/10 pb-2 mb-4">
                Legal
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Terms', href: '/legal#terms' },
                  { label: 'Privacy', href: '/legal#privacy' },
                  { label: 'Refund', href: '/legal#refund' },
                  { label: 'Shipping', href: '/legal#shipping' },
                  { label: 'EMI Terms', href: '/legal#emi' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-white/50 hover:text-accent-glow transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono-display text-[9px] uppercase tracking-[0.18em] text-white/25">
            © {new Date().getFullYear()} Surya Narayana Enterprises LLP
          </p>
          <a
            href="https://www.linkedin.com/in/smaranchallapalli/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-display text-[9px] uppercase tracking-[0.18em] text-white/25 hover:text-accent-glow transition-colors"
          >
            Built by Smaran Challapalli
          </a>
        </div>
      </div>

    </footer>
  );
};
