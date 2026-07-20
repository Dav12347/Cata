import React, { useState, useEffect } from 'react';
import { TIRES_DATA } from './data/tires';
import { RIMS_DATA } from './data/rims';
import { Tire, Rim, QuoteItem } from './types';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import TireCard from './components/TireCard';
import RimCard from './components/RimCard';
import QuoteCart from './components/QuoteCart';
import InstallGuide from './components/InstallGuide';
import ProductDetailModal from './components/ProductDetailModal';

// Icons
import {
  Search,
  Filter,
  SlidersHorizontal,
  Compass,
  FileCheck,
  Zap,
  RotateCcw,
  Smartphone,
  ChevronRight,
  Info,
  Layers,
  ArrowUpDown,
  Car,
  CircleAlert
} from 'lucide-react';

export default function App() {
  // Tabs and general UI
  const [activeTab, setActiveTab] = useState<'tires' | 'rims'>('tires');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Tire | Rim | null>(null);

  // Cart / Quote State loaded from localStorage
  const [cart, setCart] = useState<QuoteItem[]>(() => {
    const saved = localStorage.getItem('super_llantax_quote');
    return saved ? JSON.parse(saved) : [];
  });

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Todas');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedDiameter, setSelectedDiameter] = useState('Todos');
  const [selectedBoltPattern, setSelectedBoltPattern] = useState('Todos');
  const [selectedSize, setSelectedSize] = useState('Todas');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  // Compare List State
  const [compareList, setCompareList] = useState<(Tire | Rim)[]>([]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('super_llantax_quote', JSON.stringify(cart));
  }, [cart]);

  // Handle Cart Operations
  const handleAddToCart = (product: Tire | Rim) => {
    const isTire = 'code' in product;
    const itemId = isTire ? `tire-${product.code}` : `rim-${product.id}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          type: isTire ? 'tire' : 'rim',
          name: isTire ? `${product.brand} ${product.model}` : `Rin Deportivo ${product.size}`,
          detail: isTire ? `Medida: ${product.size} | ${product.branch}` : `Barrenación: ${product.boltPattern} | R${product.diameter}`,
          price: product.price,
          quantity: 1,
          branch: isTire ? product.branch : undefined,
        },
      ];
    });
    
    // Open cart drawer immediately to provide responsive feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuoteItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    if (window.confirm('¿Seguro que deseas vaciar tu cotización?')) {
      setCart([]);
    }
  };

  // Compare operations
  const handleToggleCompare = (product: Tire | Rim) => {
    const isAlreadyComparing = compareList.some((item) => 
      'code' in item && 'code' in product ? item.code === product.code : !('code' in item) && !('code' in product) && item.id === product.id
    );

    if (isAlreadyComparing) {
      setCompareList((prev) => prev.filter((item) => 
        'code' in item && 'code' in product ? item.code !== product.code : !('code' in item) && !('code' in product) && item.id !== product.id
      ));
    } else {
      if (compareList.length >= 3) {
        alert('Puedes comparar un máximo de 3 artículos a la vez.');
        return;
      }
      setCompareList((prev) => [...prev, product]);
    }
  };

  // Filter & Sort Logic
  // Unique options for dropdowns
  const tireBrands = Array.from(new Set(TIRES_DATA.map((t) => t.brand))).sort();
  const tireSizes = Array.from(new Set(TIRES_DATA.map((t) => t.size))).sort();
  const tireBranches = Array.from(new Set(TIRES_DATA.map((t) => t.branch))).sort();
  
  const rimDiameters = Array.from(new Set(RIMS_DATA.map((r) => r.diameter))).sort((a, b) => a - b);
  const rimBoltPatterns = Array.from(new Set(RIMS_DATA.map((r) => r.boltPattern))).sort();

  const filteredTires = TIRES_DATA.filter((tire) => {
    const matchesSearch =
      tire.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tire.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tire.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tire.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = selectedBranch === 'Todas' || tire.branch === selectedBranch;
    const matchesBrand = selectedBrand === 'Todas' || tire.brand === selectedBrand;
    const matchesSize = selectedSize === 'Todas' || tire.size === selectedSize;

    return matchesSearch && matchesBranch && matchesBrand && matchesSize;
  });

  const filteredRims = RIMS_DATA.filter((rim) => {
    const matchesSearch =
      rim.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rim.boltPattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rim.features && rim.features.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDiameter = selectedDiameter === 'Todos' || rim.diameter.toString() === selectedDiameter;
    const matchesBoltPattern = selectedBoltPattern === 'Todos' || rim.boltPattern.includes(selectedBoltPattern);

    return matchesSearch && matchesDiameter && matchesBoltPattern;
  });

  // Sorting
  const sortProducts = (list: any[]) => {
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      // name-asc (default)
      const nameA = 'code' in a ? `${a.brand} ${a.model}` : `Rin Deportivo ${a.size}`;
      const nameB = 'code' in b ? `${b.brand} ${b.model}` : `Rin Deportivo ${b.size}`;
      return nameA.localeCompare(nameB);
    });
  };

  const sortedTires = sortProducts(filteredTires);
  const sortedRims = sortProducts(filteredRims);

  // Clear all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBranch('Todas');
    setSelectedBrand('Todas');
    setSelectedSize('Todas');
    setSelectedDiameter('Todos');
    setSelectedBoltPattern('Todos');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Header component */}
      <Header
        onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Bento Row: Hero + Quick Search (12-column grid-cols-12 layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Hero Showcase (Spans 8 columns on large screens) */}
          <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[32px] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl">
            {/* Dynamic image background generated by AI */}
            <div className="absolute inset-0 z-0 opacity-25">
              <img
                src="/src/assets/images/super_llantax_banner_1784518310471.jpg"
                alt="Super Llantax Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
            </div>

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-900/30 rounded-full text-red-500 text-xs font-black uppercase tracking-widest animate-pulse">
                <Zap className="w-3.5 h-3.5" /> Catálogo Interactivo Oficial 2026
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight leading-none uppercase">
                Equipa tu Auto con <br />
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Estilo y Seguridad
                </span>
              </h1>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-6 max-w-md">
              <button
                onClick={() => setActiveTab('tires')}
                className={`flex-1 py-3.5 px-5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === 'tires'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 scale-102'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-850'
                }`}
                id="tab-tires-btn"
              >
                🚗 Ver Llantas
              </button>
              <button
                onClick={() => setActiveTab('rims')}
                className={`flex-1 py-3.5 px-5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === 'rims'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 scale-102'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-850'
                }`}
                id="tab-rims-btn"
              >
                ⭐ Rines Deportivos
              </button>
            </div>
          </div>

          {/* Card 2: Quick Search Wizard (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 bg-zinc-900/50 border border-zinc-900 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 text-white p-3 rounded-2xl italic font-black text-sm shadow-md">
                  SL
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-xs tracking-widest">Buscador Rápido</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Medidas y compatibilidad</p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Filtra por medida de llanta o barrenación de rines deportivos para ver compatibilidades instantáneas.
              </p>

              <div className="space-y-3.5 pt-2">
                {activeTab === 'tires' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 font-black uppercase tracking-wider ml-1">Medida de Llanta</label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600/50 cursor-pointer font-mono font-bold"
                      >
                        <option value="Todas">Todas las medidas</option>
                        {tireSizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 font-black uppercase tracking-wider ml-1">Marca de Preferencia</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600/50 cursor-pointer font-bold"
                      >
                        <option value="Todas">Todas las marcas</option>
                        {tireBrands.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 font-black uppercase tracking-wider ml-1">Diámetro del Rin</label>
                      <select
                        value={selectedDiameter}
                        onChange={(e) => setSelectedDiameter(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600/50 cursor-pointer font-mono font-bold"
                      >
                        <option value="Todos">Todos los diámetros</option>
                        {rimDiameters.map((d) => (
                          <option key={d} value={d.toString()}>{d}"</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 font-black uppercase tracking-wider ml-1">Barrenación / Patrón</label>
                      <select
                        value={selectedBoltPattern}
                        onChange={(e) => setSelectedBoltPattern(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600/50 cursor-pointer font-bold"
                      >
                        <option value="Todos">Todas las barrenaciones</option>
                        {rimBoltPatterns.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleResetFilters}
              className="w-full mt-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:text-white rounded-xl text-zinc-400 hover:border-zinc-700 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              title="Limpiar filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar Filtros</span>
            </button>
          </div>

        </div>

        {/* Bento Card 3: Filters Toolbar (Full-width bar, rounded-3xl) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-zinc-900/20 border border-zinc-900 p-4.5 rounded-[32px] shadow-lg">
          
          {/* Search bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
            <input
              type="text"
              placeholder={activeTab === 'tires' ? "Buscar llantas (ej: Kelly, 175-70-13, Santiago)..." : "Buscar rines deportivos (ej: Cromo, 6-139.7)..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-850 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/20"
              id="catalog-search-input"
            />
          </div>

          {/* Quick stats and active filters */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-2xl">
              <ArrowUpDown className="w-4 h-4 text-zinc-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer font-bold"
              >
                <option value="name">Ordenar por Nombre</option>
                <option value="price-asc">Precio: de Menor a Mayor</option>
                <option value="price-desc">Precio: de Mayor a Menor</option>
              </select>
            </div>

            {/* Tires Specific Branch Filter */}
            {activeTab === 'tires' && (
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-2xl">
                <SlidersHorizontal className="w-4 h-4 text-zinc-500 shrink-0" />
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer font-bold"
                >
                  <option value="Todas">Todas las sucursales</option>
                  {tireBranches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="text-xs text-zinc-500 font-black uppercase tracking-wider">
              Mostrando <span className="text-red-500 font-black font-mono text-sm">{activeTab === 'tires' ? sortedTires.length : sortedRims.length}</span> resultados
            </div>
          </div>
        </div>

        {/* Catalog Grid Area */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[32px] p-6 shadow-2xl">
          {activeTab === 'tires' ? (
            sortedTires.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl space-y-3">
                <CircleAlert className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-white font-bold text-base uppercase tracking-wider">No encontramos llantas con esos filtros</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Prueba buscando otra medida, marca o seleccionando "Todas las sucursales".</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 text-xs bg-red-600 text-white font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-red-500 transition-colors cursor-pointer"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedTires.map((tire) => {
                  return (
                    <TireCard
                      key={tire.code + tire.branch}
                      tire={tire}
                      onViewDetails={setSelectedProduct}
                    />
                  );
                })}
              </div>
            )
          ) : (
            sortedRims.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl space-y-3">
                <CircleAlert className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-white font-bold text-base uppercase tracking-wider">No encontramos rines con esos filtros</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Prueba seleccionando "Todos los diámetros" o escribiendo una barrenación diferente.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 text-xs bg-red-600 text-white font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-red-500 transition-colors cursor-pointer"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedRims.map((rim) => {
                  return (
                    <RimCard
                      key={rim.id}
                      rim={rim}
                      onViewDetails={setSelectedProduct}
                    />
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Informative Promo banner (Bento-style full width card) */}
        <section className="bg-gradient-to-r from-red-950/20 to-zinc-900 border border-zinc-900 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-2xl">
          {/* Ambient light overlay */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-red-600/5 blur-3xl rounded-full" />

          <div className="space-y-2 relative z-10 text-center md:text-left">
            <h3 className="text-white font-black italic text-xl md:text-2xl uppercase tracking-tight">
              ¿Quieres este catálogo en tu Celular?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 max-w-xl font-semibold">
              Nuestra aplicación está optimizada para comportarse como una App nativa. Agrégala a tu inicio, consulta precios en segundos y comparte tus combinaciones de rines con tus amigos.
            </p>
          </div>

          <button
            onClick={() => setIsInstallGuideOpen(true)}
            className="bg-red-600 hover:bg-red-500 text-white font-black py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/10 shrink-0 cursor-pointer active:scale-95 flex items-center gap-2"
            id="install-promo-btn"
          >
            <Smartphone className="w-4 h-4" /> Instalar en Celular Gratis
          </button>
        </section>

      </main>

      {/* Footer component */}
      <Footer onOpenInstallGuide={() => setIsInstallGuideOpen(true)} />

      {/* Install Mobile PWA Guide Modal */}
      <InstallGuide
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
      />

      {/* Product Specification Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
