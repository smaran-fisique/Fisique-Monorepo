import { Star } from "lucide-react";

export const ReviewsSection = () => {
  const reviews = [
    {
      name: "G. Krishna",
      text: "Fantastic gym in Kokapet. Knowledgeable trainers and super supportive environment.",
    },
    {
      name: "Shreya A.",
      text: "My coach rebuilt my form and confidence. The sauna recovery is a game‑changer.",
    },
    {
      name: "Rohit M.",
      text: "No fluff, just elite coaching and clear results. Worth every session.",
    },
  ];

  return (
    <section className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            What Clients Say
          </h2>
          <p className="text-muted-foreground max-w-[60ch] md:text-right">
            Minimal, honest reviews pulled from client feedback. Full list available on Google.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="border border-border rounded-[16px] p-4.5 bg-[hsl(220_23%_8%)]"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[hsl(220_23%_12%)] to-[hsl(220_28%_10%)] border border-border" />
                <strong className="text-sm">{review.name}</strong>
              </div>
              
              <div className="flex gap-0.5 mb-2 text-[#ffd166]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
