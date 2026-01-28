import { MapPin, Phone, Mail } from "lucide-react";
import fisiquelogo from "@/assets/fisique-logo.webp";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-[hsl(218_31%_3%)] py-16">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="text-center space-y-6 mb-12">
            <img 
              src={fisiquelogo} 
              alt="Fisique Fitness Logo" 
              width={188} 
              height={48} 
              className="h-12 w-auto mx-auto" 
            />
            
            <p className="text-lg font-medium text-foreground">
              Kokapet's Premium Fitness Studio
            </p>
            
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Personalized training, customized nutrition plans, and on-site sauna recovery — all under one roof. At Fisique, it's never generic. It's always personal.
            </p>
          </div>
          
          {/* Address */}
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            4th Floor, Above Pulla reddy Sweets, Avant Cedar, Kokapet
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-12 text-sm text-muted-foreground">
            <a 
              href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
            
            <a 
              href="tel:+919515469444" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91-9515469444
            </a>
            
            <a 
              href="tel:+917671959610" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91-7671959610
            </a>
            
            <a 
              href="mailto:hello@fisique.fitness" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@fisique.fitness
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-8 border-t border-border/50 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link to="/refund" className="hover:text-accent transition-colors">
              Refund Policy
            </Link>
            <a 
              href="https://member.fisique.fitness" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent transition-colors"
            >
              Member Portal
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
