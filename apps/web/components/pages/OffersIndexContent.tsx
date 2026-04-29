'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowUpRight, Tag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface Offer {
  id: string;
  title: string;
  description: string;
  cta_link: string;
  cta_text: string;
  end_date: string;
  slug?: string | null;
}

const getOfferSlug = (offer: { slug?: string | null; title: string }) => {
  if (offer.slug) return offer.slug;
  if (offer.title.toLowerCase().includes('iphone')) return 'iphone';
  return offer.title.toLowerCase().replace(/\s+/g, '-').slice(0, 20);
};

const useOffers = () =>
  useQuery({
    queryKey: ['offers-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Offer[];
    },
  });

export default function OffersIndexContent() {
  const { data: offers = [], isLoading } = useOffers();

  return (
    <>
      <Header />

      <main>
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-14">

            {/* Dateline */}
            <div className="flex items-center justify-between border-b hairline pb-3 mb-10 md:mb-14">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                Offers · Members
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Fisique · Kokapet
              </span>
            </div>

            {/* Headline */}
            <div className="mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                  Limited Time
                </span>
                <h1 className="mt-4 font-display font-black text-foreground text-[clamp(40px,7vw,108px)] leading-[0.92] tracking-[-0.045em]">
                  Special
                  <span className="font-thin text-accent"> offers.</span>
                </h1>
              </div>
              <p className="font-mono-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground max-w-xs leading-[1.8]">
                Exclusive promotions for Fisique members and new joiners
              </p>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-52" />
                ))}
              </div>
            )}

            {/* Offers grid */}
            {!isLoading && offers.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {offers.map((offer, i) => {
                  const isExternal = offer.cta_link.startsWith('http');
                  const href = isExternal ? offer.cta_link : `/offers/${getOfferSlug(offer)}`;
                  const inner = (
                    <div className="tile p-6 h-full flex flex-col group-hover:bg-accent/5 transition-colors">
                      <div className="flex items-baseline justify-between border-b hairline pb-3 mb-4">
                        <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                          {String(i + 1).padStart(2, '0')} · Active
                        </span>
                        <Tag className="h-3.5 w-3.5 text-accent" />
                      </div>

                      <h2 className="font-display font-black text-[clamp(18px,2vw,24px)] tracking-[-0.02em] leading-tight group-hover:text-accent transition-colors flex-1">
                        {offer.title}
                      </h2>

                      <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground line-clamp-2">
                        {offer.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t hairline pt-4">
                        <span className="font-mono-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                          Ends {format(new Date(offer.end_date), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1 font-mono-display text-[9px] uppercase tracking-[0.18em] text-accent">
                          {offer.cta_text}
                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  );

                  return isExternal ? (
                    <a key={offer.id} href={href} target="_blank" rel="noopener noreferrer" className="group">
                      {inner}
                    </a>
                  ) : (
                    <Link key={offer.id} href={href} className="group">
                      {inner}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && offers.length === 0 && (
              <div className="border-y hairline py-24 text-center">
                <p className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  No active offers right now
                </p>
                <p className="mt-3 text-[13px] text-muted-foreground">
                  Check back soon — exclusive deals drop regularly.
                </p>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
