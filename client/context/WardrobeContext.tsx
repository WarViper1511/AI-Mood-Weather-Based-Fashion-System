import React, { createContext, useContext, useState } from 'react';

export interface WardrobeItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'shoes' | 'jackets' | 'accessories';
  color: string;
  image: string;
  brand?: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: WardrobeItem[];
  rating?: number;
  occasion?: string;
  image?: string;
}

interface WardrobeContextType {
  wardrobe: WardrobeItem[];
  outfits: Outfit[];
  selectedOutfit: Outfit | null;
  mood: string;
  weather: string;
  addItem: (item: WardrobeItem) => void;
  removeItem: (itemId: string) => void;
  addOutfit: (outfit: Outfit) => void;
  selectOutfit: (outfit: Outfit) => void;
  setMood: (mood: string) => void;
  setWeather: (weather: string) => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(
  undefined
);

// Mock initial wardrobe data
const INITIAL_WARDROBE: WardrobeItem[] = [
  {
    id: '1',
    name: 'Classic Black T-Shirt',
    category: 'tops',
    color: 'Black',
    brand: 'Minimalist Co.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'White Oversized Shirt',
    category: 'tops',
    color: 'White',
    brand: 'Basics+',
    image:
      'https://images.unsplash.com/photo-1596752046944-a1c2e315a42f?w=300&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Slim Fit Black Jeans',
    category: 'bottoms',
    color: 'Black',
    brand: 'Denim Pro',
    image:
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Blue Denim Jacket',
    category: 'jackets',
    color: 'Blue',
    brand: 'Denim Pro',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Leather Chelsea Boots',
    category: 'shoes',
    color: 'Black',
    brand: 'Step Forward',
    image:
      'https://images.unsplash.com/photo-1548869871-f2d1e5f8d895?w=300&h=300&fit=crop',
  },
];

const INITIAL_OUTFITS: Outfit[] = [
  {
    id: '1',
    name: 'Casual Chic',
    items: [INITIAL_WARDROBE[0], INITIAL_WARDROBE[2], INITIAL_WARDROBE[4]],
    rating: 4.5,
    occasion: 'Casual',
    image:
      'https://images.unsplash.com/photo-1585487000714-f3519e67ca93?w=300&h=300&fit=crop',
  },
];

export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(INITIAL_WARDROBE);
  const [outfits, setOutfits] = useState<Outfit[]>(INITIAL_OUTFITS);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [mood, setMood] = useState('excited');
  const [weather, setWeather] = useState('sunny');

  const addItem = (item: WardrobeItem) => {
    setWardrobe((prev) => [...prev, item]);
  };

  const removeItem = (itemId: string) => {
    setWardrobe((prev) => prev.filter((item) => item.id !== itemId));
  };

  const addOutfit = (outfit: Outfit) => {
    setOutfits((prev) => [...prev, outfit]);
  };

  const selectOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
  };

  return (
    <WardrobeContext.Provider
      value={{
        wardrobe,
        outfits,
        selectedOutfit,
        mood,
        weather,
        addItem,
        removeItem,
        addOutfit,
        selectOutfit,
        setMood,
        setWeather,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within WardrobeProvider');
  }
  return context;
};
