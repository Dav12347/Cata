import React from 'react';
import { Rim } from '../types';
import { ShieldCheck, Crosshair, Eye } from 'lucide-react';

interface RimCardProps {
  key?: number | string;
  rim: Rim;
  onViewDetails: (rim: Rim) => void;
}

export default function RimCard({ rim, onViewDetails }: RimCardProps) {
  // Map some IDs to our beautiful generated image to make the page pop!
  const getImage = (id: number, fallback: string | undefined) => {
    if (id === 1 || id === 18 || id === 19) {
      // Use our high-quality generated multi-spoke alloy rim showcase image!
      return '/src/assets/images/sports_rim_showcase_1784518322896.jpg';
    }
    return fallback || 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=400';
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 hover:border-red-600 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-red-600/5">
      {/* Diameter Badge */}
      <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-mono text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg shadow-md">
        RIN {rim.diameter}"
      </div>

      {/* BoltPattern / Barrenación Badge */}
      <div className="absolute top-3 right-3 z-10 bg-zinc-950/90 text-zinc-300 font-sans text-[10px] font-bold px-2 py-1 rounded-lg border border-zinc-800/60 backdrop-blur-md flex items-center gap-1">
        <Crosshair className="w-3 h-3 text-red-500" />
        Barr: {rim.boltPattern}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden group">
        <img
          src={getImage(rim.id, rim.image)}
          alt={`Rin Deportivo ${rim.size}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        {/* Hover overlay with a Quick View button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onViewDetails(rim)}
            className="bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer uppercase"
            id={`view-rim-${rim.id}`}
          >
            <Eye className="w-3.5 h-3.5" /> Detalle
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4.5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="font-mono text-xs text-red-500 font-black tracking-wider uppercase">
              RINES DEPORTIVOS
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">
              Juego de 4 rines
            </span>
          </div>

          <h3 className="text-white font-black italic text-base leading-snug tracking-tight group-hover:text-red-500 transition-colors mt-0.5 uppercase">
            Rin Deportivo {rim.size}
          </h3>

          <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-1">
            <span className="text-zinc-500">Diseño:</span>
            <span className="text-zinc-200 font-bold">{rim.features || 'Sport Spec'}</span>
          </p>

          <div className="mt-2 text-[10px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span className="uppercase font-bold text-[9px] tracking-wide text-zinc-400">Juego Completo Garantizado</span>
          </div>
        </div>

        {/* Pricing & Detail Button */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-zinc-800">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Precio Juego</p>
            <p className="text-lg font-black text-red-500 font-mono">
              ${rim.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-xs text-zinc-400 font-normal">MXN</span>
            </p>
          </div>

          <button
            onClick={() => onViewDetails(rim)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-md shadow-red-600/5 hover:shadow-red-600/10 cursor-pointer active:scale-95"
            id={`detail-rim-${rim.id}`}
          >
            <span>Detalle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
