export const AboutSection = () => {
  return (
    <section id="about-us" className="py-24 md:py-32 bg-background">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            About Us
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Located in Kokapet, Fisique Fitness is Hyderabad's premium fitness studio
              offering personalized, results-driven training for those serious about their health.
            </p>

            <p>
              Our approach combines <span className="text-foreground font-medium">one-on-one coaching</span> with
              customized nutrition plans, helping you build strength, improve mobility, and achieve
              lasting transformation.
            </p>

            <p>
              With premium equipment, on-site sauna recovery, and a distraction-free environment,
              we provide everything you need to train with focus and consistency.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
