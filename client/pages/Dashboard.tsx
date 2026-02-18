import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useWardrobe } from '@/context/WardrobeContext';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Upload,
  Smile,
  Heart,
  Zap,
  ArrowRight,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { mood, setMood, weather, setWeather, outfits } = useWardrobe();
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const [moodInput, setMoodInput] = useState(mood);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😎', label: 'Confident', value: 'confident' },
    { emoji: '😍', label: 'Inspired', value: 'inspired' },
    { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
    { emoji: '🌟', label: 'Excited', value: 'excited' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
  ];

  const weatherOptions = [
    { label: 'Sunny', value: 'sunny', icon: Sun },
    { label: 'Cloudy', value: 'cloudy', icon: Cloud },
    { label: 'Rainy', value: 'rainy', icon: CloudRain },
    { label: 'Windy', value: 'windy', icon: Wind },
  ];

  const handleMoodSelect = (selectedMood: (typeof moods)[0]) => {
    setMood(selectedMood.value);
    setMoodEmoji(selectedMood.emoji);
    setMoodInput(selectedMood.value);
  };

  const handleWeatherSelect = (value: string) => {
    setWeather(value);
  };

  const selectedMood = moods.find((m) => m.value === mood);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h1 className="font-poppins font-bold text-3xl sm:text-4xl">
                Welcome back, <span className="gradient-text">{user?.name}!</span>
              </h1>
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-primary shadow-lg"
                />
              )}
            </div>
            <p className="text-muted-foreground">
              Let's create the perfect outfit for today
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weather Card */}
            <div className="card-premium p-6 lg:col-span-1 animate-slide-up">
              <h2 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                Today's Weather
              </h2>

              <div className="space-y-3">
                {weatherOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleWeatherSelect(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        weather === option.value
                          ? 'bg-primary/20 border border-primary text-primary'
                          : 'bg-muted/30 border border-border hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">
                  Temperature: <span className="text-secondary">72°F</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Humidity: <span className="text-secondary">65%</span>
                </p>
              </div>
            </div>

            {/* Mood & Feeling Card */}
            <div className="card-premium p-6 lg:col-span-1 animate-slide-up">
              <h2 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                How Are You Feeling?
              </h2>

              <div className="space-y-3">
                {moods.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleMoodSelect(m)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      mood === m.value
                        ? 'bg-primary/20 border border-primary'
                        : 'bg-muted/30 border border-border hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span className="font-medium text-sm">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selfie Upload Card */}
            <div className="card-premium p-6 lg:col-span-1 animate-slide-up">
              <h2 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 hover:border-primary/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Upload Selfie</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Smile className="w-5 h-5" />
                    <span className="font-medium">Get Recommendation</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-xs font-semibold text-accent mb-1">
                  Pro Tip 💡
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload a selfie to get personalized outfit recommendations based on your skin tone!
                </p>
              </div>
            </div>
          </div>

          {/* Recent Outfits */}
          {outfits.length > 0 && (
            <div className="animate-slide-up">
              <h2 className="font-poppins font-bold text-2xl mb-4">
                Your Recent Outfits
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {outfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    className="card-premium overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-square bg-muted/30 overflow-hidden relative">
                      {outfit.image ? (
                        <img
                          src={outfit.image}
                          alt={outfit.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">
                              No image
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">
                        {outfit.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {outfit.occasion}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < (outfit.rating || 0)
                                    ? 'text-yellow-400'
                                    : 'text-muted'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-primary">
                          {outfit.items.length} items
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate-slide-up">
            <div className="card-premium p-6">
              <p className="text-muted-foreground text-sm mb-2">Wardrobe Items</p>
              <p className="font-poppins font-bold text-3xl">5</p>
            </div>
            <div className="card-premium p-6">
              <p className="text-muted-foreground text-sm mb-2">Outfits Created</p>
              <p className="font-poppins font-bold text-3xl">1</p>
            </div>
            <div className="card-premium p-6">
              <p className="text-muted-foreground text-sm mb-2">Average Rating</p>
              <p className="font-poppins font-bold text-3xl">4.5</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
