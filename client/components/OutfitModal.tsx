import React from 'react';
import { Outfit } from '@/context/WardrobeContext';
import { X, Heart, Share2, Download } from 'lucide-react';

interface OutfitModalProps {
  outfit: Outfit | null;
  onClose: () => void;
}

const OutfitModal: React.FC<OutfitModalProps> = ({ outfit, onClose }) => {
  if (!outfit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border/40 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 bg-card border-b border-border/40 z-10">
          <div>
            <h2 className="font-poppins font-bold text-2xl">{outfit.name}</h2>
            {outfit.occasion && (
              <p className="text-sm text-muted-foreground mt-1">
                Perfect for: {outfit.occasion}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Image */}
          {outfit.image && (
            <div className="w-full aspect-video bg-muted/30 rounded-lg overflow-hidden">
              <img
                src={outfit.image}
                alt={outfit.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground text-sm">
              This carefully curated outfit combines{' '}
              <span className="text-primary font-medium">{outfit.items.length} pieces</span> to create
              a cohesive and stylish look. Perfect for{' '}
              <span className="text-primary font-medium">{outfit.occasion || 'any occasion'}</span>.
            </p>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">AI Rating</h3>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(outfit.rating || 4)
                          ? 'text-yellow-400'
                          : 'text-muted'
                      }`}
                    >
                      ★
                    </span>
                  ))}
              </div>
              <span className="text-lg font-bold text-foreground">
                {(outfit.rating || 4).toFixed(1)}/5.0
              </span>
            </div>
          </div>

          {/* Items in Outfit */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              Items ({outfit.items.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {outfit.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-muted/30 rounded-lg p-3 text-center hover:bg-muted/50 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p className="text-xs font-medium text-foreground line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {item.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why This Works */}
          <div className="space-y-2 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
            <h3 className="font-semibold text-foreground text-sm">
              ✨ Why This Works
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Balanced color palette creates visual harmony</li>
              <li>• Mix of textures adds depth and interest</li>
              <li>• Proportions are well-balanced</li>
              <li>• Season and weather appropriate</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium transition-all">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary font-medium transition-all">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent font-medium transition-all">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Try On</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitModal;
