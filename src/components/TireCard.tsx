import React from 'react';
import { Tire } from '../types';
import { MapPin, Eye } from 'lucide-react';

interface TireCardProps {
  key?: string;
  tire: Tire;
  onViewDetails: (tire: Tire) => void;
}

export default function TireCard({ tire, onViewDetails }: TireCardProps) {
  // Use a reliable, nice tire image from Unsplash or dynamic based on brand/notes
  const getImage = (brand: string) => {
    if (brand.toLowerCase() === 'cooper') {
      return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400';
    }
    if (brand.toLowerCase() === 'general' || brand.toLowerCase() === 'roadtrack') {
      return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400';
    }
    // Default high-quality tire image
    return 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400';
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 hover:border-red-600 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-red-600/5">
      {/* Code Badge */}
      <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-mono text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg shadow-md">
        {tire.code}
      </div>

      {/* Branch Badge */}
      <div className="absolute top-3 right-3 z-10 bg-zinc-950/90 text-zinc-300 font-sans text-[10px] font-bold px-2 py-1 rounded-lg border border-zinc-800/60 backdrop-blur-md flex items-center gap-1">
        <MapPin className="w-3 h-3 text-red-500" />
        {tire.branch}
      </div>

      {/* Image container */}
      <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden group">
        <img
          src={getImage(tire.brand)}
          alt={`${tire.brand} ${tire.model}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        {/* Hover overlay with a Quick View button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onViewDetails(tire)}
            className="bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer uppercase"
            id={`view-tire-${tire.code}`}
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
              {tire.brand}
            </span>
          </div>

          <h3 className="text-white font-black italic text-base leading-snug tracking-tight group-hover:text-red-500 transition-colors mt-0.5 uppercase">
            {tire.model}
          </h3>

          <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-1">
            <span className="text-zinc-500">Medida:</span>
            <span className="text-zinc-200 font-bold">{tire.size}</span>
          </p>

          {tire.notes && (
            <p className="text-[10px] text-zinc-500 mt-2 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 line-clamp-1">
              {tire.notes}
            </p>
          )}
        </div>

        {/* Pricing & Detail button */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-zinc-800">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Precio Unitario</p>
            <p className="text-lg font-black text-red-500 font-mono">
              ${tire.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-xs text-zinc-400 font-normal">MXN</span>
            </p>
          </div>

          <button
            onClick={() => onViewDetails(tire)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-md shadow-red-600/5 hover:shadow-red-600/10 cursor-pointer active:scale-95"
            id={`detail-tire-${tire.code}`}
          >
            <span>Detalle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
