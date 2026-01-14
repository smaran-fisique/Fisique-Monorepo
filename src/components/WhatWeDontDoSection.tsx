import { X } from "lucide-react";

const items = [
  "No in-house personal training",
  "No programs or classes",
  "No sales-driven coaching",
  "No overcrowding",
];

export const WhatWeDontDoSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            What We Intentionally Don't Offer
          </h2>
          
          <ul className="space-y-4 text-lg md:text-xl">
            {items.map((item, index) => (
              <li 
                key={index}
                className="flex items-center justify-center gap-3 text-muted-foreground"
              >
                <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          
          <p className="text-foreground font-medium text-lg pt-4">
            This keeps the experience clean, focused, and honest.
          </p>
          
        </div>
      </div>
    </section>
  );
};
