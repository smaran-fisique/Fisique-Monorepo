import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping & Exchange Policy - Fisique Fitness</title>
        <meta name="description" content="Shipping and Exchange Policy for Fisique Fitness" />
      </Helmet>
      
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Shipping & Exchange Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              Fisique Fitness offers physical products (merchandise, supplements, fitness gear) for purchase. This policy covers shipping and exchanges for these products.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Shipping Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Local Delivery (Hyderabad):</strong> 1-3 business days</li>
                <li><strong>Domestic Shipping (India):</strong> 5-7 business days</li>
                <li><strong>Shipping Charges:</strong> Calculated at checkout based on location and order value</li>
                <li><strong>Free Shipping:</strong> Available on orders above ₹2,999 within Hyderabad</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Order Processing</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Orders are processed within 1-2 business days</li>
                <li>You will receive tracking information via email/SMS once shipped</li>
                <li>Orders placed on weekends/holidays will be processed on the next business day</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Exchange Policy</h2>
              <p className="text-muted-foreground mb-3">
                We want you to be satisfied with your purchase. Exchanges are accepted under the following conditions:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Timeframe:</strong> Items can be exchanged within 7 days of delivery</li>
                <li><strong>Condition:</strong> Items must be unused, unwashed, and in original packaging with tags attached</li>
                <li><strong>Eligible Items:</strong> Apparel, fitness accessories, and merchandise</li>
                <li><strong>Non-Exchangeable:</strong> Supplements, nutrition products, personalized items, and sale/clearance items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Exchange Process</h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Contact us at <a href="mailto:hello@fisique.fitness" className="text-accent hover:underline">hello@fisique.fitness</a> with your order number and reason for exchange</li>
                <li>Wait for approval and exchange authorization</li>
                <li>Ship the item back to our facility (address will be provided)</li>
                <li>Once received and inspected, we'll ship the replacement item</li>
              </ol>
              <p className="text-muted-foreground mt-3">
                <strong>Note:</strong> Return shipping costs are the responsibility of the customer unless the exchange is due to our error or defective product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Damaged or Defective Items</h2>
              <p className="text-muted-foreground mb-3">
                If you receive a damaged or defective item:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Contact us within 48 hours of delivery</li>
                <li>Provide photos of the damaged item and packaging</li>
                <li>We'll arrange for pickup or replacement at no additional cost</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Lost or Delayed Shipments</h2>
              <p className="text-muted-foreground mb-3">
                If your shipment is lost or significantly delayed, please contact us immediately. We'll work with the courier service to resolve the issue and may offer a replacement or refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                For shipping or exchange inquiries, please contact us at{" "}
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

export default Shipping;
