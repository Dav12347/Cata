import React from 'react';
import { X, ShieldCheck, Truck, Wrench, Share2, BadgeCheck } from 'lucide-react';
import { Tire, Rim } from '../types';

interface ProductDetailModalProps {
  product: Tire | Rim | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  const isTire = 'code' in product;
  const title = isTire ? `${product.brand} ${product.model}` : `Rin Deportivo ${product.size}`;
  const price = product.price;

  // Use high-quality visual representation
  const getImage = () => {
    if (isTire) {
      if (product.brand.toLowerCase() === 'cooper') {
        return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600';
      }
      if (product.brand.toLowerCase() === 'general' || product.brand.toLowerCase() === 'roadtrack') {
        return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600';
      }
      return 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600';
    } else {
      if (product.id === 1 || product.id === 18 || product.id === 19) {
        return '/src/assets/images/sports_rim_showcase_1784518322896.jpg';
      }
      return product.image || 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=600';
    }
  };

  const handleShare = () => {
    const text = `Mira este producto en SuperLlantax Miranda: ${title} por $${price.toLocaleString('es-MX')} MXN. ¡Está genial!`;
    if (navigator.share) {
      navigator.share({
        title: 'SuperLlantax Miranda',
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert('¡Enlace de producto copiado al portapapeles!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] md:max-h-[85vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-zinc-900/60 backdrop-blur-md rounded-full transition-colors cursor-pointer border border-zinc-800/50"
          aria-label="Cerrar modal"
          id="close-detail-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 bg-zinc-950 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-900">
          <img
            src={getImage()}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover max-h-[300px] md:max-h-full"
          />
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden" />
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-black text-red-500 bg-red-600/10 border border-red-900/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {isTire ? 'Llanta Deportiva' : `Rin deportivo ${product.diameter}"`}
                </span>
                {!isTire && (
                  <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full uppercase">
                    Juego Completo
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-black italic text-white leading-tight tracking-tight uppercase">
                {title}
              </h2>
              {isTire && (
                <p className="text-sm text-zinc-500 font-mono mt-1">
                  Código: <span className="text-zinc-200 font-bold">{product.code}</span>
                </p>
              )}
            </div>

            {/* Price section */}
            <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-3xl">
              <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Precio de Catálogo</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl md:text-3xl font-black text-red-500 font-mono">
                  ${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-sm font-bold text-zinc-400">MXN</span>
              </div>
              <p className="text-[10px] text-green-400 font-bold mt-1 flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" /> IVA incluido • Montaje gratuito en taller
              </p>
            </div>

            {/* Specs Grid */}
            <div className="space-y-3">
              <h4 className="text-xs text-zinc-400 font-black uppercase tracking-wider">Especificaciones Técnicas</h4>
              <div className="grid grid-cols-2 gap-3.5">
                {isTire ? (
                  <>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Medida</p>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">{product.size}</p>
                    </div>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Sucursal</p>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">{product.branch}</p>
                    </div>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900 col-span-2">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Características</p>
                      <p className="text-xs text-zinc-300 mt-0.5">{product.notes || 'Excelente tracción y durabilidad ideal para carretera y ciudad.'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Medida de Rin</p>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">{product.size}</p>
                    </div>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Barrenación</p>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">{product.boltPattern}</p>
                    </div>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Diámetro</p>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">{product.diameter} pulgadas</p>
                    </div>
                    <div className="bg-zinc-900/20 p-2.5 rounded-2xl border border-zinc-900">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Acabado / Notas</p>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">{product.features || 'Deportivo Premium'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Extra Service Perks */}
            <div className="flex gap-4 items-center justify-around text-center py-3 border-y border-zinc-900">
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-red-500" />
                <span className="text-[9px] text-zinc-400 mt-1 uppercase font-bold">Entrega Express</span>
              </div>
              <div className="flex flex-col items-center">
                <Wrench className="w-5 h-5 text-red-500" />
                <span className="text-[9px] text-zinc-400 mt-1 uppercase font-bold">Instalación Gratis</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <span className="text-[9px] text-zinc-400 mt-1 uppercase font-bold">Garantía</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-900">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black uppercase tracking-wider transition-all cursor-pointer bg-zinc-900 hover:bg-zinc-855 text-zinc-300 hover:text-white border border-zinc-800"
              title="Compartir producto"
              id="share-product-btn"
            >
              <Share2 className="w-5 h-5" />
              <span>Compartir</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black uppercase tracking-wider transition-all cursor-pointer bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/10"
              id="modal-close-btn"
            >
              <span>Cerrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
