import React from 'react';
import { ShieldCheck, Smartphone, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenInstallGuide: () => void;
}

export default function Header({ onOpenInstallGuide }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 text-white border-b border-zinc-900 backdrop-blur-md">
      {/* Top micro-bar with red theme */}
      <div className="bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 animate-pulse" />
        <span>¡Encuentra las mejores llantas y rines deportivos!</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Compra Garantizada
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo and Brand in Bento Red Style */}
        <div className="flex items-center gap-3">
          <div className="relative bg-red-600 text-white w-10 h-10 rounded-lg font-black text-xl italic flex items-center justify-center shadow-md">
            SL
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-2xl tracking-tighter uppercase">
                SuperLlantax <span className="text-red-600 underline decoration-2 underline-offset-4">Miranda</span>
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase -mt-1">
              Catálogo de Llantas &amp; Rines Elite
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Save to Mobile PWA Button */}
          <button
            onClick={onOpenInstallGuide}
            className="flex items-center gap-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-red-500 border border-red-900/30 hover:border-red-500 px-3 py-2 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            title="Cómo guardar en tu celular"
            id="install-guide-btn"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Guardar en Celular</span>
          </button>
        </div>
      </div>
    </header>
  );
}
