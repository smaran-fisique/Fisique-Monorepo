import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="border-t border-border bg-[hsl(218_31%_3%)] py-10">
      <div className="container-custom">
        <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="glow-dot" />
              <span className="text-lg font-extrabold tracking-wide">FISIQUE</span>
            </div>
            
            <p className="text-muted-foreground mb-2">Premium Personal Training Studio - Kokapet</p>
            
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>4th Floor, Advant Cedar, Osman Sagar Rd, above Pulla Reddy Sweets, Narsingi, Hyderabad, Telangana 500075</span>
              </p>
              
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+917671959610" className="hover:text-accent transition-colors">
                  +91 7671959610
                </a>
              </p>
              
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@fisique.fitness" className="hover:text-accent transition-colors">
                  hello@fisique.fitness
                </a>
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: "programs", label: "Programs" },
              { id: "experience", label: "Experience" },
              { id: "transformations", label: "Transformations" },
              { id: "pricing", label: "Pricing" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-muted-foreground hover:text-accent transition-colors text-left text-sm"
              >
                {label}
              </button>
            ))}
            
            <a
              href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Google Maps
            </a>
            
            <a
              href="https://wa.me/919515469444?text=Hi!%20I%E2%80%99m%20interested%20in%20knowing%20more%20about%20Fisique%20Fitness%20Kokapet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
