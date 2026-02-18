import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface WardrobeFilterProps {
  searchQuery: string;
  selectedCategory: string | null;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
}

const WardrobeFilter: React.FC<WardrobeFilterProps> = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="space-y-4 animate-slide-up">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your wardrobe..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-input pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Category</p>
          {selectedCategory && (
            <button
              onClick={() => onCategoryChange(null)}
              className="ml-auto text-xs text-primary hover:text-primary/80 font-medium"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted/30 border border-border hover:bg-muted/50 text-foreground'
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                onCategoryChange(
                  selectedCategory === category ? null : category
                )
              }
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted/30 border border-border hover:bg-muted/50 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tags */}
      {(searchQuery || selectedCategory) && (
        <div className="flex flex-wrap gap-2 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {selectedCategory && (
            <div className="flex items-center gap-2 px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
              {selectedCategory}
              <button
                onClick={() => onCategoryChange(null)}
                className="hover:text-primary/80"
              >
                ×
              </button>
            </div>
          )}
          {searchQuery && (
            <div className="flex items-center gap-2 px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-medium">
              {searchQuery}
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-secondary/80"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WardrobeFilter;
