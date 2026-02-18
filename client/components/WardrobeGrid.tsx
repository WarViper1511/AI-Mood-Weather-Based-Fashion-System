import React from 'react';
import { WardrobeItem } from '@/context/WardrobeContext';
import { Trash2, Tag, Heart } from 'lucide-react';

interface WardrobeGridProps {
  items: WardrobeItem[];
  onRemove?: (itemId: string) => void;
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({ items, onRemove }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">👗</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No items yet
        </h3>
        <p className="text-muted-foreground">
          Start building your wardrobe by uploading some clothing items
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="card-premium overflow-hidden group animate-slide-up"
        >
          {/* Image Container */}
          <div className="relative aspect-square bg-muted/30 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all">
                <Heart className="w-4 h-4" />
                Save
              </button>
              {onRemove && (
                <button
                  onClick={() => onRemove(item.id)}
                  className="px-3 py-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-md capitalize">
              {item.category}
            </div>
          </div>

          {/* Item Details */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
              {item.name}
            </h3>

            {/* Color Tag */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{
                  backgroundColor: item.color.toLowerCase().replace(/\s+/g, ''),
                }}
              />
              <span className="text-xs text-muted-foreground">{item.color}</span>
            </div>

            {/* Brand */}
            {item.brand && (
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{item.brand}</span>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
              <span className="capitalize">{item.category}</span>
              <span className="text-accent">In Wardrobe</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WardrobeGrid;
