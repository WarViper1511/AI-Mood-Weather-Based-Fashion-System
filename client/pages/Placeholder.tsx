import React from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description: string;
  emoji: string;
  features: string[];
}

const Placeholder: React.FC<PlaceholderProps> = ({
  title,
  description,
  emoji,
  features,
}) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="relative text-center max-w-2xl">
              <div className="text-6xl mb-6 animate-bounce">{emoji}</div>

              <h1 className="font-poppins font-bold text-4xl mb-4">
                <span className="gradient-text">{title}</span>
              </h1>

              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                {description}
              </p>

              {/* Features List */}
              <div className="bg-card border border-border/40 rounded-lg p-8 mb-8 shadow-xl">
                <h2 className="font-semibold text-lg mb-6 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Coming Features
                </h2>
                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6">
                Want to build this feature? Continue prompting to develop this section!
              </p>

              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg transition-all group">
                Ask to Develop
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Placeholder;
