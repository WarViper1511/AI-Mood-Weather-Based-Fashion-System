import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProductCard, { Product } from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { marketplaceAPI } from '@/services/api';
import {
  Search,
  Filter,
  X,
  ShoppingBag,
  TrendingUp,
  Zap,
} from 'lucide-react';

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'price_low' | 'price_high' | 'rating'>('rating');

  const brands = [
    'Nike',
    'Adidas',
    'Gucci',
    'Prada',
    'Uniqlo',
    'H&M',
    'Zara',
    'Tom Ford',
  ];

  // Load products
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await marketplaceAPI.getProducts(selectedBrand || undefined);
      setProducts(data);
      setHasSearched(true);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesPrice;
    });

    // Sort
    if (sortBy === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, searchQuery, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBrand(null);
    setPriceRange([0, 10000]);
    setSortBy('rating');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl mb-2">
              <span className="gradient-text">Fashion Marketplace</span>
            </h1>
            <p className="text-muted-foreground">
              Discover and shop from curated fashion brands
            </p>
          </div>

          {/* Featured Section */}
          {!hasSearched && (
            <div className="mb-8">
              <div className="card-premium p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: TrendingUp,
                      title: 'Trending Now',
                      desc: 'Explore the latest fashion trends',
                    },
                    {
                      icon: Zap,
                      title: 'Flash Sales',
                      desc: 'Limited time offers on premium items',
                    },
                    {
                      icon: ShoppingBag,
                      title: 'Collections',
                      desc: 'Curated collections for every style',
                    },
                  ].map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="text-center">
                        <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Search & Browse Button */}
          {!hasSearched ? (
            <div className="text-center py-12 animate-slide-up">
              <button
                onClick={loadProducts}
                className="btn-primary inline-flex items-center gap-2 mb-8"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 space-y-6 animate-slide-up">
                {/* Search */}
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search
                  </h3>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Brands */}
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Brands
                  </h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() =>
                          setSelectedBrand(
                            selectedBrand === brand ? null : brand
                          )
                        }
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedBrand === brand
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Min: ${priceRange[0]}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Max: ${priceRange[1]}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedBrand || sortBy !== 'rating' || priceRange[0] !== 0 || priceRange[1] !== 10000) && (
                  <button
                    onClick={handleClearFilters}
                    className="w-full px-4 py-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3 space-y-6">
                {/* Sort Bar */}
                <div className="card-premium p-4 flex items-center justify-between animate-slide-up">
                  <p className="text-sm font-medium text-foreground">
                    Showing{' '}
                    <span className="text-primary">{filteredProducts.length}</span>{' '}
                    products
                  </p>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'price_low' | 'price_high' | 'rating'
                      )
                    }
                    className="form-input text-sm w-32"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                </div>

                {/* Loading */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner message="Loading products..." />
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => alert(`Added ${product.name} to cart!`)}
                        onViewDetails={setSelectedProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 card-premium">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No products found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Product Modal */}
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Marketplace;
