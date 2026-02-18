import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import Avatar3D from '@/components/Avatar3D';
import { useWardrobe } from '@/context/WardrobeContext';
import {
  Package,
  Palette,
  Info,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';

const ThreeDModel: React.FC = () => {
  const { wardrobe, selectOutfit, selectedOutfit } = useWardrobe();
  const [selectedColor, setSelectedColor] = useState('#8B5CF6');

  const colors = [
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Black', value: '#1F2937' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'White', value: '#F9FAFB' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Green', value: '#10B981' },
  ];

  // Group wardrobe by category
  const outfitsByCategory = wardrobe.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof wardrobe>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl mb-2">
              <span className="gradient-text">3D Virtual Try-On</span>
            </h1>
            <p className="text-muted-foreground">
              Visualize outfits on your personal 3D avatar before wearing them
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* 3D Avatar Preview */}
            <div className="lg:col-span-2 animate-slide-up">
              <div className="card-premium overflow-hidden h-[600px]">
                <Avatar3D
                  outfitColor={selectedColor}
                  onReady={() => console.log('Avatar ready')}
                />
              </div>

              {/* Avatar Info */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="card-premium p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Body Type
                  </p>
                  <p className="font-semibold text-foreground">Standard</p>
                </div>
                <div className="card-premium p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Height</p>
                  <p className="font-semibold text-foreground">5'8"</p>
                </div>
                <div className="card-premium p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Skin Tone
                  </p>
                  <p className="font-semibold text-foreground">Light</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary font-semibold transition-all">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-1 space-y-6 animate-slide-up">
              {/* Color Selection */}
              <div className="card-premium p-6">
                <h2 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Outfit Color
                </h2>

                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        selectedColor === color.value
                          ? 'border-foreground shadow-lg scale-105'
                          : 'border-border'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Selected:{' '}
                  <span className="text-foreground font-semibold">
                    {colors.find((c) => c.value === selectedColor)?.name}
                  </span>
                </p>
              </div>

              {/* Outfit Combinations */}
              <div className="card-premium p-6">
                <h2 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-secondary" />
                  Try Item Combinations
                </h2>

                <div className="space-y-3">
                  {Object.entries(outfitsByCategory).length > 0 ? (
                    Object.entries(outfitsByCategory).map(
                      ([category, items]) => (
                        <div key={category}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                            {category}
                          </p>
                          <div className="space-y-1">
                            {items.slice(0, 3).map((item) => (
                              <button
                                key={item.id}
                                className="w-full px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-left text-sm text-foreground font-medium transition-all flex items-center justify-between group"
                              >
                                <span className="truncate">{item.name}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Add items to your wardrobe to try on
                    </p>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="card-premium p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-secondary" />
                  Try-On Tips
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Use controls to rotate and zoom</li>
                  <li>• Select different colors to match your items</li>
                  <li>• Preview different body type customizations</li>
                  <li>• Save favorite combinations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
            <div className="card-premium p-6">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-foreground mb-2">Color Testing</h3>
              <p className="text-sm text-muted-foreground">
                See how different colors look on your body before purchasing
              </p>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl mb-3">📸</div>
              <h3 className="font-semibold text-foreground mb-2">
                360° View
              </h3>
              <p className="text-sm text-muted-foreground">
                Rotate your avatar to see outfits from every angle
              </p>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl mb-3">👁️</div>
              <h3 className="font-semibold text-foreground mb-2">
                Realistic Preview
              </h3>
              <p className="text-sm text-muted-foreground">
                Get a realistic preview of how items fit and look together
              </p>
            </div>
          </div>

          {/* Body Customization Section */}
          <div className="mt-12 card-premium p-8 animate-slide-up">
            <h2 className="font-poppins font-bold text-2xl mb-6">
              Customize Your Avatar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Body Type', options: ['Petite', 'Standard', 'Athletic', 'Curvy'] },
                { label: 'Height', options: ['5\'0"', '5\'6"', '5\'8"', '6\'0"'] },
                { label: 'Skin Tone', options: ['Fair', 'Light', 'Medium', 'Deep'] },
                { label: 'Style', options: ['Casual', 'Formal', 'Sporty', 'Bohemian'] },
              ].map((section) => (
                <div key={section.label}>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    {section.label}
                  </label>
                  <select className="form-input text-sm">
                    {section.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ThreeDModel;
