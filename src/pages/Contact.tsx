import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { useSEO } from "@/hooks/useSEO";

const Contact = () => {
  const { seo } = useSEO('/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Contact' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    
    const message = encodeURIComponent(
      `Hi! I'm ${name.trim()}, phone: ${phone.trim()}. I'd like to know more about Fisique Fitness.`
    );
    window.open(`https://wa.me/919515469444?text=${message}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey"} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey" />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <Header />
      <main className="pt-20">
        <section className="py-24 md:py-32">
          <div className="container-custom px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Contact Us
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ready to start your fitness journey? We'd love to hear from you.
                </p>
              </div>
              
              {/* Contact Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                
                {/* Contact Info */}
                <div className="space-y-8 p-8 rounded-2xl bg-card border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <a 
                      href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 text-muted-foreground hover:text-accent transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p>Fisique Fitness, 4th Floor,<br />Above Pulla reddy Sweets,<br />Avant Cedar, Kokapet</p>
                      </div>
                    </a>
                    
                    <div className="flex items-start gap-4 text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a href="tel:+919515469444" className="hover:text-accent transition-colors block">+91-9515469444</a>
                        <a href="tel:+917671959610" className="hover:text-accent transition-colors block">+91-7671959610</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:hello@fisique.fitness" className="hover:text-accent transition-colors block">hello@fisique.fitness</a>
                        <a href="mailto:smaran@fisique.fitness" className="hover:text-accent transition-colors block">smaran@fisique.fitness</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Hours</p>
                        <p>Mon - Sat: 6:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Inquiry Form */}
                <div className="space-y-6 p-8 rounded-2xl bg-accent/5 border border-accent/20">
                  <h2 className="text-2xl font-bold text-foreground">Quick Inquiry</h2>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Leave your details and we'll get back to you on WhatsApp.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </Button>
                  </form>
                  
                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="w-full border-border hover:bg-secondary text-foreground"
                      asChild
                    >
                      <a 
                        href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20know%20more%20about%20Fisique%20Fitness" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp Us Directly
                      </a>
                    </Button>
                    
                    <Button 
                      size="lg"
                      variant="outline"
                      className="w-full border-border hover:bg-secondary text-foreground"
                      asChild
                    >
                      <a 
                        href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
                
              </div>
              
              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-border/50">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.3558!3d17.4156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFisique%20Fitness!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fisique Fitness Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
