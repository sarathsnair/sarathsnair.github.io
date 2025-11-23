'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { colorPalettes, type ColorPalette } from '@/lib/colorPalettes';

export default function ColorPaletteSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(colorPalettes[0]);
  const [hoveredPalette, setHoveredPalette] = useState<ColorPalette | null>(null);

  useEffect(() => {
    const savedPaletteId = localStorage.getItem('colorPalette');
    if (savedPaletteId) {
      const palette = colorPalettes.find((p) => p.id === savedPaletteId);
      if (palette) {
        setCurrentPalette(palette);
        applyPalette(palette);
      }
    }
  }, []);

  const applyPalette = (palette: ColorPalette) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--secondary', palette.secondary);
    root.style.setProperty('--accent', palette.accent);

    setCurrentPalette(palette);
    localStorage.setItem('colorPalette', palette.id);
  };

  const previewPalette = (palette: ColorPalette) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--secondary', palette.secondary);
    root.style.setProperty('--accent', palette.accent);
    setHoveredPalette(palette);
  };

  const resetPreview = () => {
    if (hoveredPalette) {
      applyPalette(currentPalette);
      setHoveredPalette(null);
    }
  };

  const selectRandomPalette = () => {
    const availablePalettes = colorPalettes.filter(p => p.id !== currentPalette.id);
    const randomPalette = availablePalettes[Math.floor(Math.random() * availablePalettes.length)];
    applyPalette(randomPalette);
  };

  return (
    <>
      {/* Brutalist Floating Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors group"
        style={{
          boxShadow: `6px 6px 0 ${currentPalette.primary}`,
        }}
        aria-label="Change color palette"
      >
        <Palette size={28} className="group-hover:rotate-180 transition-transform duration-500" />
      </motion.button>

      {/* Brutalist Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l-4 border-black z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-black text-white p-6 border-b-4 border-black">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">
                      Colors
                    </h2>
                    <p className="text-sm font-mono uppercase tracking-wider mt-1 opacity-70">
                      Pick Your Vibe
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-12 h-12 border-4 border-white bg-white text-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Random Theme Button */}
                <button
                  onClick={selectRandomPalette}
                  className="w-full px-6 py-3 bg-white text-black border-4 border-white font-black uppercase tracking-wider hover:bg-black hover:text-white hover:border-white transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Palette size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    Random Theme
                  </span>
                </button>
              </div>

              {/* Palettes Grid */}
              <div className="p-6 space-y-4">
                {colorPalettes.map((palette) => {
                  const isActive = currentPalette.id === palette.id;
                  const isPreviewing = hoveredPalette?.id === palette.id;
                  return (
                    <motion.button
                      key={palette.id}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => previewPalette(palette)}
                      onMouseLeave={resetPreview}
                      onClick={() => {
                        applyPalette(palette);
                        setIsOpen(false);
                      }}
                      className={`
                        w-full p-6 text-left relative group
                        ${isActive ? 'bg-black text-white border-4 border-black' : isPreviewing ? 'bg-gray-100 border-4 border-black' : 'bg-white border-4 border-black hover:bg-gray-100'}
                        transition-all duration-300
                      `}
                      style={{
                        boxShadow: isActive ? `8px 8px 0 ${palette.primary}` : isPreviewing ? `6px 6px 0 ${palette.primary}` : '4px 4px 0 black',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Color Preview Blocks */}
                        <div className="flex gap-2">
                          <div
                            className="w-12 h-12 border-2 border-current"
                            style={{ backgroundColor: palette.primary }}
                          />
                          <div
                            className="w-12 h-12 border-2 border-current"
                            style={{ backgroundColor: palette.secondary }}
                          />
                          <div
                            className="w-12 h-12 border-2 border-current"
                            style={{ backgroundColor: palette.accent }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{palette.emoji}</span>
                            <h3 className="text-xl font-black uppercase tracking-tight">
                              {palette.name}
                            </h3>
                          </div>
                          <p className="text-sm font-mono uppercase tracking-wider mt-2 opacity-70">
                            {palette.description}
                          </p>
                        </div>

                        {/* Active/Preview indicator */}
                        {isActive && (
                          <div className="absolute top-2 right-2 px-3 py-1 bg-white text-black text-xs font-black uppercase border-2 border-black">
                            Active
                          </div>
                        )}
                        {isPreviewing && !isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-2 right-2 px-3 py-1 text-xs font-black uppercase border-2 border-black"
                            style={{ backgroundColor: palette.primary, color: 'white' }}
                          >
                            Preview
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-black text-white p-6 border-t-4 border-black">
                <p className="text-xs font-mono uppercase tracking-widest text-center opacity-70">
                  Auto-Saved • {colorPalettes.length} Themes
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
