import React, { useState } from 'react';
import { Product } from './ProductCard';
import {
  X,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border/40 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 bg-card border-b border-border/40 z-10">
          <h2 className="font-poppins font-bold text-2xl">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div>
              <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted/30 rounded cursor-pointer hover:bg-muted/50 transition-all"
                  >
                    <img
                      src={product.image}
                      alt={`View ${i}`}
                      className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Brand & Price */}
              <div>
                <p className="text-muted-foreground text-sm mb-2">
                  {product.brand}
                </p>
                <h1 className="font-poppins font-bold text-3xl mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-muted'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.reviews || 0} reviews
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <p className="font-poppins font-bold text-4xl text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-all"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isSaved
                      ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                      : 'bg-muted/30 hover:bg-muted/50 text-foreground border border-border'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save for Later'}
                </button>
              </div>

              {/* Info */}
              <div className="space-y-2 pt-4 border-t border-border/30">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-5 h-5 text-secondary" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-border/30 pt-6">
            <h3 className="font-semibold text-foreground mb-3">
              About This Item
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This premium quality {product.category || 'clothing item'} from{' '}
              <span className="font-medium text-foreground">{product.brand}</span>{' '}
              combines style and comfort. Perfect for any occasion, crafted with
              attention to detail and made from high-quality materials.
            </p>
          </div>

          {/* Specifications */}
          <div className="border-t border-border/30 pt-6">
            <h3 className="font-semibold text-foreground mb-3">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Material', value: '100% Cotton' },
                { label: 'Care', value: 'Machine Wash' },
                { label: 'Fit', value: 'Standard' },
                { label: 'Availability', value: 'In Stock' },
              ].map((spec) => (
                <div key={spec.label}>
                  <p className="text-xs text-muted-foreground mb-1">
                    {spec.label}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
