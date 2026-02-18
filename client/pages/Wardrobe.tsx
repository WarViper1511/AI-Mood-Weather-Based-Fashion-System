import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import UploadClothing from '@/components/UploadClothing';
import WardrobeGrid from '@/components/WardrobeGrid';
import WardrobeFilter from '@/components/WardrobeFilter';
import { useWardrobe } from '@/context/WardrobeContext';
import { Plus, BarChart3 } from 'lucide-react';

const Wardrobe: React.FC = () => {
  const { wardrobe, removeItem } = useWardrobe();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = [...new Set(wardrobe.map((item) => item.category))];

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return wardrobe.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [wardrobe, searchQuery, selectedCategory]);

  // Calculate statistics
  const stats = {
    total: wardrobe.length,
    byCategory: categories.reduce(
      (acc, cat) => {
        acc[cat] = wardrobe.filter((item) => item.category === cat).length;
        return acc;
      },
      {} as Record<string, number>
    ),
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="font-poppins font-bold text-3xl sm:text-4xl mb-2">
                <span className="gradient-text">Your Wardrobe</span>
              </h1>
              <p className="text-muted-foreground">
                Build and manage your fashion collection
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(!showUploadModal)}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Upload Section / Stats - Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Cards */}
              <div className="space-y-3 animate-slide-up">
                <div className="card-premium p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground text-sm font-medium">
                      Total Items
                    </p>
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-poppins font-bold text-3xl gradient-text">
                    {stats.total}
                  </p>
                </div>

                {/* Category Breakdown */}
                <div className="card-premium p-6">
                  <p className="text-muted-foreground text-sm font-medium mb-4">
                    By Category
                  </p>
                  <div className="space-y-2">
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <div
                          key={cat}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground capitalize font-medium">
                            {cat}
                          </span>
                          <span className="text-primary font-bold">
                            {stats.byCategory[cat]}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        No items yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Pro Tips */}
                <div className="card-premium p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    💡 Pro Tips
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>• Upload clear, well-lit photos</li>
                    <li>• Tag colors accurately for better recommendations</li>
                    <li>• Keep your wardrobe up-to-date</li>
                    <li>• Brand information helps style suggestions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Upload Form - Right Column */}
            {showUploadModal && (
              <div className="lg:col-span-2 animate-slide-up">
                <UploadClothing onClose={() => setShowUploadModal(false)} />
              </div>
            )}
          </div>

          {/* Filter Section */}
          <WardrobeFilter
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            categories={Array.from(
              new Set(wardrobe.map((item) => item.category))
            )}
          />

          {/* Results Summary */}
          {(searchQuery || selectedCategory) && (
            <div className="mt-4 p-4 bg-muted/20 border border-border/40 rounded-lg text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredItems.length}</span> item
              {filteredItems.length !== 1 ? 's' : ''} matching your criteria
            </div>
          )}

          {/* Wardrobe Grid */}
          <div className="mt-8">
            <WardrobeGrid items={filteredItems} onRemove={removeItem} />
          </div>

          {/* Empty State with Tips */}
          {wardrobe.length === 0 && (
            <div className="mt-12 text-center">
              <div className="card-premium p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">👔</div>
                <h2 className="font-poppins font-bold text-2xl mb-3">
                  Build Your Digital Wardrobe
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Upload your favorite clothing items to get started. The more
                  items you add, the better AI recommendations you'll receive!
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Upload Your First Item
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Wardrobe;
