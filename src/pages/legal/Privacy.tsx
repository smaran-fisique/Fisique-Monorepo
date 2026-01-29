import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useSEO } from "@/hooks/useSEO";

const Privacy = () => {
  const { seo } = useSEO('/privacy');
  
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/privacy"} />
      </Helmet>
      
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              At Fisique Fitness, we respect your privacy. This policy outlines how Fisique Fitness handles data collection, use, and protection concerning our services.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Personal Information:</strong> Name, contact details, date of birth, and payment information.</li>
                <li><strong>Health Information:</strong> Medical history, fitness goals, dietary preferences, and other health-related data you voluntarily provide.</li>
                <li><strong>Usage Data:</strong> Information about your facility visits, session attendance, and service usage.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide personalized fitness and nutrition guidance</li>
                <li>Process payments and manage your membership</li>
                <li>Communicate important updates, schedule changes, and promotional offers</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Data Sharing & Disclosure</h2>
              <p className="text-muted-foreground mb-3">
                We do not sell or rent your personal information. We may share your data with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> Third-party payment processors, scheduling tools, and communication platforms that help us deliver services.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground mb-3">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
              <p className="text-muted-foreground mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent for data processing (where applicable)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                To exercise these rights, contact us at{" "}
                <a href="mailto:hello@fisique.fitness" className="text-accent hover:underline">
                  hello@fisique.fitness
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies & Tracking</h2>
              <p className="text-muted-foreground mb-3">
                Our website may use cookies and similar tracking technologies to improve user experience and analyze site traffic. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Children's Privacy</h2>
              <p className="text-muted-foreground mb-3">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from minors without parental consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-3">
                Fisique Fitness reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions or concerns about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hello@fisique.fitness" className="text-accent hover:underline">
                  hello@fisique.fitness
                </a>{" "}
                or call{" "}
                <a href="tel:+917671959610" className="text-accent hover:underline">
                  +91 7671959610
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
