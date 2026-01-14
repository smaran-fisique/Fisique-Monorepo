export const ProblemSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Serious training often fails because the environment does.
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Home workouts plateau.
              <br />
              Community gyms are crowded, inconsistent, and distracting.
            </p>
            
            <p>
              If you already know how to train - or already work with a coach -
              <br className="hidden md:block" />
              you shouldn't have to compromise on the space you train in.
            </p>
            
            <p className="text-foreground font-medium pt-4">
              Fisique exists to remove that compromise.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};
