import Link from "next/link";
import { MapPin, Car, Dumbbell, Users, GraduationCap, ArrowUpRight } from "lucide-react";

const LOCATIONS = [
  { name: "Kokapet", path: "/kokapet-gym", driveTime: "0 min", badge: "Home Base" },
  { name: "Narsingi", path: "/gym-narsingi", driveTime: "3 min" },
  { name: "Financial District", path: "/gym-financial-district", driveTime: "5 min" },
  { name: "Gachibowli", path: "/gym-gachibowli", driveTime: "8 min" },
  { name: "Gandipet", path: "/gym-gandipet", driveTime: "7 min" },
  { name: "Manikonda", path: "/gym-manikonda", driveTime: "10 min" },
  { name: "Puppalaguda", path: "/gym-puppalaguda", driveTime: "6 min" },
  { name: "Tellapur", path: "/gym-tellapur", driveTime: "12 min" },
];

const SERVICES = [
  { name: "Personal Training", path: "/personal-training-kokapet", icon: Users },
  { name: "Gym Membership", path: "/gym-membership-kokapet", icon: Dumbbell },
  { name: "Freelance Trainers", path: "/freelance-trainer-kokapet", icon: GraduationCap },
];

interface NearbyLocationsSectionProps {
  currentPath: string;
}

export const NearbyLocationsSection = ({ currentPath }: NearbyLocationsSectionProps) => {
  const nearbyLocations = LOCATIONS.filter((loc) => loc.path !== currentPath);
  const serviceLinks = SERVICES.filter((svc) => svc.path !== currentPath);

  return (
    <section className="border-t hairline border-b hairline">
      <div className="container-custom px-4 md:px-6 py-12 md:py-20">

        <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
          <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
            Nearby
          </span>
          <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Hyderabad · Western Corridor
          </span>
        </div>

        <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(24px,3.5vw,48px)] mb-8">
          Also serving
          <span className="block font-thin text-accent"> nearby areas.</span>
        </h2>

        {/* Location tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 mb-8">
          {nearbyLocations.map((loc) => (
            <Link
              key={loc.path}
              href={loc.path}
              className="tile group p-4 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-baseline justify-between border-b hairline pb-2 mb-3">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {loc.badge && (
                  <span className="font-mono-display text-[8px] uppercase tracking-[0.18em] text-accent">
                    {loc.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display font-black text-[14px] tracking-[-0.02em] leading-tight group-hover:text-accent transition-colors">
                Gym Near {loc.name}
              </h3>
              <div className="mt-1.5 flex items-center gap-1 font-mono-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                <Car className="h-3 w-3" />
                <span>{loc.driveTime} drive</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Service links */}
        <div className="border-t hairline pt-6">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Explore our services
          </p>
          <div className="flex flex-wrap gap-1.5">
            {serviceLinks.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.path}
                  href={svc.path}
                  className="tile group inline-flex items-center gap-2 px-4 py-2.5 hover:bg-accent/5 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                    {svc.name}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
