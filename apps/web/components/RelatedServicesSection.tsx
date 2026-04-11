import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dumbbell, Users, Phone } from 'lucide-react';

interface RelatedServicesSectionProps {
  title?: string;
  subtitle?: string;
  showContact?: boolean;
}

export const RelatedServicesSection = ({
  title = "Ready to Start Your Fitness Journey?",
  subtitle = "Explore our services and find what works best for you",
  showContact = true
}: RelatedServicesSectionProps) => {
  return (
    <section className="py-12 border-t border-border px-4 bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/personal-training-kokapet">
              <Users className="w-4 h-4" />
              Personal Training
            </Link>
          </Button>

          <Button variant="outline" asChild className="gap-2">
            <Link href="/gym-membership-kokapet">
              <Dumbbell className="w-4 h-4" />
              Gym Membership
            </Link>
          </Button>

          {showContact && (
            <Button
              className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              asChild
            >
              <Link href="/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey">
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
