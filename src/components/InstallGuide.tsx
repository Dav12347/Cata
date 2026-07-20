import React from 'react';
import { X, Smartphone, Globe, Share, PlusSquare, ChevronRight, Check } from 'lucide-react';

interface InstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallGuide({ isOpen, onClose }: InstallGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Decorative ambient background */}
        <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-red-600/10 blur-3xl" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white p-2 rounded-lg italic font-black">
              SL
            </div>
            <div>
              <h3 className="text-white font-black uppercase text-sm tracking-widest">Guardar en tu Celular</h3>
              <p className="text-xs text-zinc-500 font-bold uppercase">Instala esta App gratis y sin ocupar espacio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
            id="close-guide-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs / Split */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed font-semibold">
            Puedes guardar este catálogo de <span className="text-red-500 underline decoration-2 underline-offset-4">SUPER LLANTAX</span> directamente en la pantalla de inicio de tu celular para tener acceso rápido como si fuera una aplicación nativa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* iOS (Safari) Card */}
            <div className="bg-zinc-900 border border-zinc-800 p-4.5 rounded-3xl relative space-y-3.5">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-800/60 pb-2.5">
                <span className="text-xs font-black text-zinc-400 px-2.5 py-0.5 rounded-lg bg-zinc-950 uppercase">Apple iOS</span>
                <span className="text-xs text-red-500 font-black uppercase">Safari</span>
              </div>
              <ol className="text-xs text-zinc-300 space-y-2.5 list-decimal list-inside font-bold">
                <li>Abre el navegador <span className="text-white">Safari</span> en tu iPhone.</li>
                <li>Toca el botón de <span className="text-red-500 flex inline-flex items-center gap-0.5"><Share className="w-3.5 h-3.5" /> Compartir</span> en la barra inferior.</li>
                <li>Desliza hacia abajo y selecciona <span className="text-white flex inline-flex items-center gap-0.5"><PlusSquare className="w-3.5 h-3.5" /> Agregar a inicio</span>.</li>
                <li>Presiona <span className="text-red-500">Agregar</span> en la esquina superior derecha.</li>
              </ol>
            </div>

            {/* Android (Chrome) Card */}
            <div className="bg-zinc-900 border border-zinc-800 p-4.5 rounded-3xl relative space-y-3.5">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-800/60 pb-2.5">
                <span className="text-xs font-black text-zinc-400 px-2.5 py-0.5 rounded-lg bg-zinc-950 uppercase">Android</span>
                <span className="text-xs text-red-500 font-black uppercase">Chrome</span>
              </div>
              <ol className="text-xs text-zinc-300 space-y-2.5 list-decimal list-inside font-bold">
                <li>Abre este sitio en <span className="text-white">Google Chrome</span>.</li>
                <li>Toca los <span className="text-white">tres puntos (⋮)</span> en la esquina superior derecha.</li>
                <li>Selecciona <span className="text-red-500">Agregar a la pantalla principal</span> o <span className="text-red-500">Instalar Aplicación</span>.</li>
                <li>Confirma tocando <span className="text-red-500">Agregar</span>.</li>
              </ol>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl flex gap-3 items-start">
            <Globe className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-400 leading-normal space-y-1 font-semibold">
              <p className="font-black text-zinc-200 uppercase text-[10px] tracking-wider">¿Deseas alojarlo en la web con un dominio gratis en Netlify?</p>
              <p>Puedes exportar este proyecto como ZIP, subirlo a <a href="https://drop.netlify.com" target="_blank" rel="noopener noreferrer" className="text-red-500 underline hover:text-red-400">drop.netlify.com</a> con un simple drag &amp; drop y tendrás tu catálogo funcionando gratis para compartir en todo el mundo.</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-zinc-900/40 border-t border-zinc-900 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-500 text-white font-black px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer active:scale-95 uppercase tracking-wider"
            id="close-guide-primary-btn"
          >
            <Check className="w-4 h-4" /> Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
