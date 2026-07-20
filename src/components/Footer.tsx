import React from 'react';
import { ShieldCheck, Smartphone } from 'lucide-react';

interface FooterProps {
  onOpenInstallGuide: () => void;
}

export default function Footer({ onOpenInstallGuide }: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-8 border-t border-zinc-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white w-8 h-8 rounded-lg font-black text-sm italic flex items-center justify-center">
                SL
              </div>
              <span className="font-black text-lg text-white tracking-tighter uppercase">
                SuperLlantax <span className="text-red-600 underline decoration-2 underline-offset-4">Miranda</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              La distribuidora líder para rines deportivos y llantas de alto rendimiento. Conectamos pasión, seguridad y estilo para tu auto con la mejor calidad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs bg-zinc-900 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Garantía de Satisfacción
              </span>
            </div>
          </div>

          {/* App / PWA Benefits */}
          <div className="space-y-4 md:text-right md:flex md:flex-col md:items-end">
            <div className="w-full md:max-w-xs space-y-4">
              <h3 className="text-white font-black text-xs uppercase tracking-widest">Instala la App gratis</h3>
              <p className="text-sm">
                Agrega este catálogo a la pantalla de inicio de tu celular para consultar precios en cualquier momento.
              </p>
              <button
                onClick={onOpenInstallGuide}
                className="w-full flex items-center justify-center gap-2 text-xs bg-zinc-900 text-red-500 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                id="footer-pwa-btn"
              >
                <Smartphone className="w-4.5 h-4.5" />
                Ver Guía de Instalación Celular
              </button>
              <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 justify-center md:justify-end">
                <span>Optimizado para iOS y Android</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900/80 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500">
          <p>© 2026 SuperLlantax Miranda. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500 transition-colors">Términos de Servicio</a>
            <span>•</span>
            <a href="#" className="hover:text-red-500 transition-colors">Aviso de Privacidad</a>
            <span>•</span>
            <a href="#" className="hover:text-red-500 transition-colors" onClick={(e) => { e.preventDefault(); onOpenInstallGuide(); }}>Soporte Técnico</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
