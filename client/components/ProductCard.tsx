import React from 'react';
import { ShoppingCart, Heart, Star, ExternalLink } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews?: number;
  category?: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <div className="card-premium overflow-hidden group cursor-pointer animate-slide-up">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-full">
          {product.inStock !== false ? '✓ In Stock' : 'Out of Stock'}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-all">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted'
                  }`}
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div>
            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(product);
            }}
            className="p-2 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
