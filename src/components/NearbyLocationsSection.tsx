import { Link } from "react-router-dom";
import { MapPin, Car, Dumbbell, Users, GraduationCap } from "lucide-react";

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
    <section className="py-16 sm:py-20 border-t border-border px-4">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Also Serving Nearby Areas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fisique Fitness is conveniently located in Kokapet, easily accessible from neighborhoods across Hyderabad's western corridor.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {nearbyLocations.map((loc) => (
            <Link
              key={loc.path}
              to={loc.path}
              className="group p-4 bg-card/50 border border-border/50 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all text-center"
            >
              <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                Gym Near {loc.name}
              </h3>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Car className="w-3 h-3" />
                <span>{loc.driveTime} drive</span>
              </div>
              {loc.badge && (
                <span className="inline-block mt-2 text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {loc.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Service Hub Links */}
        <div className="border-t border-border/50 pt-8">
          <h3 className="text-lg font-semibold text-center mb-6">Explore Our Services</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {serviceLinks.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.path}
                  to={svc.path}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-card/50 border border-border/50 rounded-full hover:border-primary/50 hover:text-primary transition-all text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {svc.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
