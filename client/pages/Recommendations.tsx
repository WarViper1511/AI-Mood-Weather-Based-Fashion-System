import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import OutfitCard from '@/components/OutfitCard';
import OutfitModal from '@/components/OutfitModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useWardrobe, Outfit } from '@/context/WardrobeContext';
import { recommendationAPI } from '@/services/api';
import {
  Sparkles,
  RefreshCw,
  Wand2,
  TrendingUp,
  Clock,
} from 'lucide-react';

const Recommendations: React.FC = () => {
  const { mood, weather, outfits } = useWardrobe();
  const [recommendations, setRecommendations] = useState<Outfit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [filterOccasion, setFilterOccasion] = useState<string | null>(null);

  const occasions = [
    'Casual',
    'Work',
    'Evening',
    'Weekend',
    'Gym',
    'Date Night',
  ];

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const generated = await recommendationAPI.generateOutfit(mood, weather);
      // Combine with wardrobe data
      const fullOutfits: Outfit[] = generated.map((rec) => ({
        id: rec.id,
        name: rec.name,
        items: [
          ...new Set(
            [...outfits, ...outfits].flatMap((o) => o.items)
          ),
        ].slice(0, 3),
        rating: rec.rating,
        occasion: rec.occasion,
        image: rec.image,
      }));
      setRecommendations(fullOutfits);
      setHasGenerated(true);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecommendations = filterOccasion
    ? recommendations.filter((outfit) => outfit.occasion === filterOccasion)
    : recommendations;

  // Mood and weather emojis
  const moodEmoji: Record<string, string> = {
    happy: '😊',
    confident: '😎',
    inspired: '😍',
    thoughtful: '🤔',
    excited: '🌟',
    calm: '😌',
  };

  const weatherEmoji: Record<string, string> = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    windy: '💨',
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl mb-2">
              <span className="gradient-text">AI Outfit Recommendations</span>
            </h1>
            <p className="text-muted-foreground">
              Get personalized outfit suggestions powered by advanced AI
            </p>
          </div>

          {/* Context Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-slide-up">
            {/* Mood Card */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">
                    Your Mood
                  </p>
                  <p className="font-poppins font-bold text-2xl capitalize">
                    {mood}
                  </p>
                </div>
                <div className="text-5xl">{moodEmoji[mood]}</div>
              </div>
            </div>

            {/* Weather Card */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">
                    Weather
                  </p>
                  <p className="font-poppins font-bold text-2xl capitalize">
                    {weather}
                  </p>
                </div>
                <div className="text-5xl">{weatherEmoji[weather]}</div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          {!hasGenerated ? (
            <div className="text-center py-16 animate-slide-up">
              <div className="card-premium p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="font-poppins font-bold text-2xl mb-3">
                  Ready to Generate Your Perfect Outfit?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Our AI will analyze your mood, weather, and wardrobe to create
                  personalized outfit recommendations just for you.
                </p>
                <button
                  onClick={generateRecommendations}
                  disabled={isLoading}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Recommendations
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Filter Tabs */}
              <div className="mb-8 animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <p className="font-semibold text-foreground">Filter by Occasion</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterOccasion(null)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      filterOccasion === null
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted/30 border border-border hover:bg-muted/50'
                    }`}
                  >
                    All
                  </button>
                  {occasions.map((occasion) => (
                    <button
                      key={occasion}
                      onClick={() => setFilterOccasion(occasion)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        filterOccasion === occasion
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted/30 border border-border hover:bg-muted/50'
                      }`}
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Summary */}
              <div className="card-premium p-4 mb-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 animate-slide-up">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      AI-Generated Recommendations
                    </p>
                    <p className="font-poppins font-bold text-lg">
                      Found <span className="text-primary">{filteredRecommendations.length}</span> perfect{' '}
                      {filterOccasion ? `${filterOccasion} ` : ''}outfit
                      {filteredRecommendations.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    onClick={generateRecommendations}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Recommendations Grid */}
              {filteredRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredRecommendations.map((outfit) => (
                    <OutfitCard
                      key={outfit.id}
                      outfit={outfit}
                      onViewDetails={setSelectedOutfit}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 card-premium">
                  <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No outfits found for the selected occasion
                  </p>
                </div>
              )}

              {/* Saved Outfits Section */}
              {outfits.length > 0 && (
                <div className="mt-12 animate-slide-up">
                  <h2 className="font-poppins font-bold text-2xl mb-6">
                    <span className="gradient-text">Your Saved Outfits</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outfits.map((outfit) => (
                      <OutfitCard
                        key={outfit.id}
                        outfit={outfit}
                        onViewDetails={setSelectedOutfit}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Outfit Detail Modal */}
          <OutfitModal
            outfit={selectedOutfit}
            onClose={() => setSelectedOutfit(null)}
          />

          {/* Tips Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-premium p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Better Wardrobe
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Add more items to your wardrobe for better recommendations
                  </p>
                </div>
              </div>
            </div>
            <div className="card-premium p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Try On 3D
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Use our 3D model to visualize outfits before wearing
                  </p>
                </div>
              </div>
            </div>
            <div className="card-premium p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Mood Driven
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Your mood and weather influence every recommendation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Recommendations;
