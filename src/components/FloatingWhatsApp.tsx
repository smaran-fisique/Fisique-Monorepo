import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const FloatingWhatsApp = () => {
  const { settings } = useSiteSettings();
  const message = encodeURIComponent("Hi! I'd like concierge assistance with plans and bookings.");

  return (
    <a
      href={`https://wa.me/${settings.whatsapp_number}?text=${message}`}
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 bg-[hsl(158_43%_14%)] border border-[hsl(158_35%_22%)] text-[hsl(158_100%_92%)] rounded-full shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      aria-label="WhatsApp Concierge"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};
