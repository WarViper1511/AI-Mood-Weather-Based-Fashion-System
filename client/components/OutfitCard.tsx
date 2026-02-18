import React from 'react';
import { Outfit } from '@/context/WardrobeContext';
import { Heart, Eye, Zap } from 'lucide-react';

interface OutfitCardProps {
  outfit: Outfit;
  onViewDetails: (outfit: Outfit) => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onViewDetails }) => {
  return (
    <div className="card-premium overflow-hidden group cursor-pointer animate-slide-up">
      {/* Image Container */}
      <div
        className="relative aspect-square bg-muted/30 overflow-hidden"
        onClick={() => onViewDetails(outfit)}
      >
        {outfit.image ? (
          <img
            src={outfit.image}
            alt={outfit.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-3">
            <Heart className="w-12 h-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No preview available</p>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(outfit);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>

        {/* AI Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3" />
          AI Pick
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full flex items-center gap-1">
          ★ {(outfit.rating || 4).toFixed(1)}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-poppins font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {outfit.name}
          </h3>
          {outfit.occasion && (
            <p className="text-xs text-muted-foreground mt-1">
              For {outfit.occasion}
            </p>
          )}
        </div>

        {/* Item Count */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
          <div className="flex -space-x-2">
            {outfit.items.slice(0, 3).map((item, idx) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                title={item.name}
                className="w-6 h-6 rounded-full border-2 border-card object-cover"
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-2">
            {outfit.items.length} items
          </span>
        </div>

        {/* Try On Button */}
        <button className="w-full px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary font-semibold text-sm transition-all">
          Try On 3D
        </button>
      </div>
    </div>
  );
};

export default OutfitCard;
