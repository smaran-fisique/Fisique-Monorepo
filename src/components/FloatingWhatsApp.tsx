import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  const whatsappNumber = "919515469444";
  const message = encodeURIComponent("Hi! I'd like concierge assistance with plans and bookings.");

  return (
    <div className="fixed right-4.5 bottom-4.5 z-50">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-4 py-3 bg-[hsl(158_43%_14%)] border border-[hsl(158_35%_22%)] text-[hsl(158_100%_92%)] rounded-full shadow-xl hover:-translate-y-0.5 transition-transform duration-300"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-4.5 h-4.5" />
        <span className="text-sm font-semibold hidden sm:inline">WhatsApp Concierge</span>
      </a>
    </div>
  );
};
