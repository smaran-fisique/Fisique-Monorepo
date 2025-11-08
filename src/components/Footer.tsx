import { MapPin, Phone, Mail } from "lucide-react";
import fisiquelogo from "@/assets/fisique-logo.webp";
import { Link } from "react-router-dom";

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
        <div className="grid md:grid-cols-[1.3fr_0.7fr_0.7fr] gap-6 items-start">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <img src={fisiquelogo} alt="Fisique Fitness Logo" className="h-10 w-auto" />
            </div>

            <p className="text-muted-foreground mb-2">Premium Personal Training Studio - Kokapet</p>

            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <a
                href="https://www.google.com/maps/place/Fisique+Fitness+-+Best+Gym+in+Kokapet/@17.3871076,78.3375157,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb95d94e825109:0x6ba7f754df2b8672!8m2!3d17.3871076!4d78.3400906!16s%2Fg%2F11y3l06b_5?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 underline hover:text-primary transition"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                4th Floor, Advant Cedar, Osman Sagar Rd, above Pulla Reddy Sweets, Narsingi, Hyderabad, Telangana 500075
              </a>

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

          <nav className="flex flex-col gap-2.5">
            <a
              href="https://member.fisique.fitness"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              Member Portal →
            </a>

            <div className="h-px bg-border/50 my-1" />

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

          <nav className="flex flex-col gap-2.5">
            <div className="text-sm font-medium text-foreground mb-1">Legal</div>

            <Link to="/terms" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Terms & Conditions
            </Link>

            <Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Privacy Policy
            </Link>

            <Link to="/refund" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Cancellation & Refund
            </Link>

            <Link to="/shipping" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Shipping & Exchange
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
