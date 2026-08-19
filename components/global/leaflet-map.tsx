"use client"

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { CARDS } from "@/lib/data"
import { countryCoordinates } from "@/lib/coordinates"
import { CountryCard } from "@/components/ui/country-card"
import { X, Globe2, Compass } from "lucide-react"

// Create a custom icon function for the flag pins
const createFlagIcon = (cardCode: string, isActive: boolean) => {
  const size = isActive ? 48 : 38;
  
  const html = `
    <div style="width: ${size}px; height: ${size}px; border-radius: 50%; overflow: hidden; border: 2.5px solid ${isActive ? '#00d65b' : 'white'}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; transform: ${isActive ? 'scale(1.1)' : 'scale(1)'}; pointer-events: none;">
      <img src="https://flagcdn.com/w80/${cardCode.toLowerCase()}.png" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
  `;

  return L.divIcon({
    html,
    className: `custom-flag-marker ${isActive ? 'leaflet-interactive' : ''}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function LeafletMap() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Close popup when escape is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null);
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="relative w-full h-full select-none">
      <MapContainer 
        center={[20, 0]} 
        zoom={3} 
        style={{ width: '100%', height: '100%', zIndex: 10 }}
        zoomControl={false}
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180]]}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {CARDS.map((card) => {
          const coord = countryCoordinates[card.code] || [0, 0];
          const position: [number, number] = [coord[1], coord[0]];
          
          if (coord[0] === 0 && coord[1] === 0) return null;

          const isActive = activeCard === card.slug;

          return (
            <Marker 
              key={card.slug} 
              position={position}
              icon={createFlagIcon(card.code, isActive)}
              eventHandlers={{
                click: () => {
                  setActiveCard(isActive ? null : card.slug);
                }
              }}
              zIndexOffset={isActive ? 1000 : 0}
            />
          );
        })}
      </MapContainer>

      {/* Global blur overlay behind the popup but above the map */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-[3px] z-30 transition-opacity duration-300 ${activeCard ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setActiveCard(null)}
      />

      {/* Active Card Popup Overlay centered on screen */}
      {activeCard && (() => {
        const activeIdx = CARDS.findIndex(c => c.slug === activeCard);
        const card = CARDS[activeIdx];
        if (!card) return null;

        return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[calc(100vw-32px)] max-w-[340px] pointer-events-auto animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveCard(null)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-[70] p-2 bg-white/95 backdrop-blur-md border border-neutral-200 shadow-xl rounded-full text-neutral-900 hover:bg-neutral-100 transition-all hover:scale-110 active:scale-95"
              aria-label="Close details"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-[32px] overflow-hidden bg-white max-h-[85vh] overflow-y-auto">
              <CountryCard card={card} idx={activeIdx} />
            </div>
          </div>
        );
      })()}

      {/* Helper Map Legend / Bottom Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-max max-w-[90vw]">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-neutral-200/80 shadow-lg text-[11px] sm:text-xs font-semibold text-neutral-700">
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4F46E5] animate-spin-slow" />
          <span>Tap any flag pin to inspect visa details</span>
        </div>
      </div>
    </div>
  )
}
