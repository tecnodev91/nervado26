import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from '../ui/Icons';
import { whatsappFloat } from '../../config/site';
import { getBudgetWhatsAppUrl } from '../../utils/whatsapp';

export default function WhatsAppFloat() {
  const { pathname } = useLocation();

  if (whatsappFloat.hiddenOnPaths.includes(pathname)) return null;

  return (
    <a
      href={getBudgetWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 hover:shadow-xl sm:right-6 sm:bottom-6 sm:h-16 sm:w-16"
      aria-label="Contactar por WhatsApp"
    >
      <span
        className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 opacity-75 group-hover:opacity-0"
        aria-hidden
      />
      <span className="absolute inset-0 rounded-full ring-2 ring-white/30 ring-offset-2 ring-offset-cream" />
      <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
