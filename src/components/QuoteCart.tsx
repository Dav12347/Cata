import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, Sparkles, MessageSquare, Check, HelpCircle } from 'lucide-react';
import { QuoteItem } from '../types';

interface QuoteCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: QuoteItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function QuoteCart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: QuoteCartProps) {
  const [selectedBranch, setSelectedBranch] = useState('Santiago');
  const [clientName, setClientName] = useState('');
  const [clientCar, setClientCar] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    // Build elegant WhatsApp message block
    let message = `*COTIZACIÓN - SUPER LLANTAX*\n`;
    if (clientName) message += `*Cliente:* ${clientName}\n`;
    if (clientCar) message += `*Auto/Modelo:* ${clientCar}\n`;
    message += `*Sucursal de Preferencia:* ${selectedBranch}\n`;
    message += `-------------------------------------------\n`;

    cart.forEach((item, index) => {
      const typeLabel = item.type === 'tire' ? '🚗 LLANTA' : '⭐ RIN';
      const itemTotal = item.price * item.quantity;
      message += `${index + 1}. ${typeLabel} - *${item.name}*\n`;
      message += `   Detalle: ${item.detail}\n`;
      message += `   Cant: ${item.quantity} x $${item.price.toLocaleString('es-MX')} MXN\n`;
      message += `   Subtotal: *$${itemTotal.toLocaleString('es-MX')} MXN*\n\n`;
    });

    message += `-------------------------------------------\n`;
    message += `*TOTAL ESTIMADO:* *$${subtotal.toLocaleString('es-MX')} MXN*\n`;
    message += `-------------------------------------------\n`;
    message += `_Hola, me interesa agendar una cita o confirmar existencias de estos productos en la sucursal de ${selectedBranch}. ¿Tienen disponibles?_`;

    const encodedMessage = encodeURIComponent(message);
    // WhatsApp API URL (Using custom number or standard gateway)
    const whatsappUrl = `https://wa.me/524421234567?text=${encodedMessage}`;
    
    // Open in a new tab safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm">
      {/* Overlay background close trigger */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Cart Drawer */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white w-10 h-10 rounded-lg italic font-black flex items-center justify-center shadow-md">
              SL
            </div>
            <div>
              <h3 className="text-white font-black uppercase text-sm tracking-widest">Tu Cotización</h3>
              <p className="text-xs text-zinc-500 font-bold uppercase">Llantas &amp; Rines seleccionados</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
            id="close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-zinc-900/60 rounded-full flex items-center justify-center mx-auto text-zinc-600 border border-zinc-800">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Tu cotizador está vacío</p>
                <p className="text-xs text-zinc-500 max-w-[240px] mx-auto mt-1">
                  Navega por nuestro catálogo de rines y llantas deportivos para agregarlos a tu cotización.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Client Info inputs */}
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl space-y-3">
                <p className="text-[10px] text-red-500 font-black uppercase tracking-widest">Datos de Cotización</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
                  />
                  <input
                    type="text"
                    placeholder="Vehículo (ej: Jetta A6, Hilux)"
                    value={clientCar}
                    onChange={(e) => setClientCar(e.target.value)}
                    className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50"
                  />
                  
                  {/* Branch select */}
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-black mb-1 ml-1 uppercase tracking-wider">Sucursal Preferente</label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-600/50 cursor-pointer font-bold"
                    >
                      <option value="Santiago">Santiago, Qro.</option>
                      <option value="Querétaro">Querétaro, Qro.</option>
                      <option value="San Juan del Río">San Juan del Río, Qro.</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Artículos Seleccionados ({cart.length})</p>
                  <button
                    onClick={onClearCart}
                    className="text-[10px] text-red-500 hover:text-red-400 font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Vaciar Todo
                  </button>
                </div>

                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-2xl relative group"
                    >
                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[9px] font-mono text-red-500 font-black uppercase tracking-widest">
                            {item.type === 'tire' ? 'LLANTA' : 'RIN'}
                          </span>
                          <span className="text-xs font-black text-red-500 font-mono">
                            ${(item.price * item.quantity).toLocaleString('es-MX')} MXN
                          </span>
                        </div>
                        <h4 className="text-xs text-white font-bold truncate">{item.name}</h4>
                        <p className="text-[10px] text-zinc-400 truncate">{item.detail}</p>
                        <p className="text-[9px] text-zinc-500 font-mono mt-0.5">
                          PU: ${item.price.toLocaleString('es-MX')} MXN
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-red-500 text-zinc-500 transition-colors cursor-pointer"
                          aria-label="Disminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1.5 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-red-500 text-zinc-500 transition-colors cursor-pointer"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-600 hover:text-red-500 p-1.5 transition-colors rounded-lg cursor-pointer ml-1"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer info & Send to WhatsApp CTA */}
        {cart.length > 0 && (
          <div className="p-6 bg-zinc-950 border-t border-zinc-900 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-500 text-xs font-black uppercase tracking-wider">Subtotal</span>
                <span className="text-zinc-300 text-xs font-bold font-mono">
                  ${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-500 text-xs font-black uppercase tracking-wider">Envío / Instalación</span>
                <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Gratis en taller</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-900">
                <span className="text-white font-black uppercase text-xs tracking-wider">Total Estimado</span>
                <span className="text-red-500 font-black text-xl font-mono">
                  ${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-zinc-500 font-sans">MXN</span>
                </span>
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-emerald-600/10 cursor-pointer active:scale-[0.98]"
              id="send-whatsapp-btn"
            >
              <MessageSquare className="w-5 h-5 fill-white stroke-none animate-bounce" />
              <span>Enviar por WhatsApp</span>
            </button>

            <p className="text-[10px] text-zinc-500 text-center leading-normal">
              Al enviar, se abrirá WhatsApp con el formato de tu cotización listo para ser enviado a nuestro equipo de ventas. No requiere datos de tarjeta de crédito.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
