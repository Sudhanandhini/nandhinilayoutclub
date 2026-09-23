import React from 'react';
import { motion } from 'framer-motion';

// export function WhatsAppButton() {
//   const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
//   const message = encodeURIComponent('Hello! I would like to know more about Nandini Layout Club.');
//   return (
//     <motion.a
//       href={`https://wa.me/${number}?text=${message}`}
//       target="_blank" rel="noopener noreferrer"
//       className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl"
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.95 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 1 }}
//       aria-label="Chat on WhatsApp">
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
//         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
//         <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.532 5.848L.057 23.885a.5.5 0 0 0 .611.612l6.064-1.473A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.949 9.949 0 0 1-5.146-1.43l-.37-.22-3.816.927.958-3.776-.24-.38A9.961 9.961 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
//       </svg>
//     </motion.a>
//   );
// }

export function Breadcrumbs({ items }) {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3" aria-label="Breadcrumb">
      <div className="container-custom">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-400">›</span>}
              {item.href ? (
                <a href={item.href} className="text-primary hover:underline">{item.label}</a>
              ) : (
                <span className="text-gray-500">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export function PageHero({ title, subtitle, bg = 'bg-primary' }) {
  return (
    <div className={`${bg} text-white py-20 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)' }} />
      <div className="container-custom relative text-center">
        {subtitle && <p className="text-gold uppercase tracking-widest text-sm font-sans font-semibold mb-3">{subtitle}</p>}
        <h1 className="font-serif text-4xl md:text-5xl font-bold">{title}</h1>
        <div className="w-16 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}

// export function SectionWrapper({ children, className = '', id }) {
//   return (
//     <section id={id} className={`py-16 md:py-24 ${className}`}>
//       {children}
//     </section>
//   );
// }
