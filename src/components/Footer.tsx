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
          
          {/* Quick Links - Services */}
          <div className="pt-8 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              {/* Services */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-foreground mb-3">Services</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/personal-training-kokapet" className="text-muted-foreground hover:text-accent transition-colors">
                    Personal Training
                  </Link>
                  <Link to="/gym-membership-kokapet" className="text-muted-foreground hover:text-accent transition-colors">
                    Gym Membership
                  </Link>
                  <Link to="/kokapet-gym" className="text-muted-foreground hover:text-accent transition-colors">
                    Our Studio
                  </Link>
                </div>
              </div>

              {/* Locations We Serve */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-foreground mb-3">Locations We Serve</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/kokapet-gym" className="text-muted-foreground hover:text-accent transition-colors">Kokapet</Link>
                  <Link to="/gym-narsingi" className="text-muted-foreground hover:text-accent transition-colors">Narsingi</Link>
                  <Link to="/gym-financial-district" className="text-muted-foreground hover:text-accent transition-colors">Financial District</Link>
                  <Link to="/gym-gachibowli" className="text-muted-foreground hover:text-accent transition-colors">Gachibowli</Link>
                  <Link to="/gym-gandipet" className="text-muted-foreground hover:text-accent transition-colors">Gandipet</Link>
                  <Link to="/gym-manikonda" className="text-muted-foreground hover:text-accent transition-colors">Manikonda</Link>
                  <Link to="/gym-puppalaguda" className="text-muted-foreground hover:text-accent transition-colors">Puppalaguda</Link>
                  <Link to="/gym-tellapur" className="text-muted-foreground hover:text-accent transition-colors">Tellapur</Link>
                </div>
              </div>
              
              {/* Resources */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-foreground mb-3">Resources</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/blog-posts/" className="text-muted-foreground hover:text-accent transition-colors">
                    Blog
                  </Link>
                  <Link to="/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" className="text-muted-foreground hover:text-accent transition-colors">
                    Contact
                  </Link>
                  <Link to="/offers" className="text-muted-foreground hover:text-accent transition-colors">
                    Offers
                  </Link>
                  <a 
                    href="https://member.fisique.fitness" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    Member Portal
                  </a>
                </div>
              </div>
              
              {/* Legal */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-foreground mb-3">Legal</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/legal#terms" className="text-muted-foreground hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/legal#privacy" className="text-muted-foreground hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/legal#refund" className="text-muted-foreground hover:text-accent transition-colors">
                    Refund Policy
                  </Link>
                  <Link to="/legal#shipping" className="text-muted-foreground hover:text-accent transition-colors">
                    Shipping
                  </Link>
                  <Link to="/legal#emi" className="text-muted-foreground hover:text-accent transition-colors">
                    EMI Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright Notice */}
          <div className="pt-6 text-center text-xs text-muted-foreground/70">
            <p>© {new Date().getFullYear()} Surya Narayana Enterprises LLP. All rights reserved.</p>
            <p className="mt-1">
              Site built by{" "}
              <a 
                href="https://www.linkedin.com/in/smaranchallapalli/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Smaran Challapalli
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
