// Mock API service for the Fashion AI Ecosystem
// In production, replace these with actual API calls

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

// Mock delay function to simulate API latency
const mockDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Authentication API Calls
 */
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await mockDelay();

    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
      token: `token_${Date.now()}`,
    };
  },

  signup: async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    await mockDelay(1000);

    // Mock validation
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return {
      user: {
        id: Date.now().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
      token: `token_${Date.now()}`,
    };
  },
};

/**
 * Weather API Calls
 */
export const weatherAPI = {
  getWeather: async (condition: string): Promise<WeatherData> => {
    await mockDelay(500);

    const weatherConditions: Record<string, WeatherData> = {
      sunny: {
        temperature: 72,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 5,
      },
      cloudy: {
        temperature: 68,
        condition: 'Cloudy',
        humidity: 70,
        windSpeed: 8,
      },
      rainy: {
        temperature: 62,
        condition: 'Rainy',
        humidity: 85,
        windSpeed: 12,
      },
      windy: {
        temperature: 65,
        condition: 'Windy',
        humidity: 60,
        windSpeed: 15,
      },
    };

    return weatherConditions[condition] || weatherConditions.sunny;
  },
};

/**
 * Wardrobe API Calls
 */
export const wardrobeAPI = {
  getItems: async () => {
    await mockDelay(600);
    return [
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
  },

  uploadImage: async (file: File) => {
    await mockDelay(1000);
    return {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      category: 'tops',
    };
  },
};

/**
 * Recommendations API Calls
 */
export const recommendationAPI = {
  generateOutfit: async (mood: string, weather: string) => {
    await mockDelay(800);

    const outfits = [
      {
        id: '1',
        name: 'Casual Chic',
        occasion: 'Casual',
        rating: 4.5,
        description: 'Perfect for a laid-back day out',
        image:
          'https://images.unsplash.com/photo-1585487000714-f3519e67ca93?w=300&h=300&fit=crop',
      },
      {
        id: '2',
        name: 'Smart Casual',
        occasion: 'Work',
        rating: 4.8,
        description: 'Great for the office or meetings',
        image:
          'https://images.unsplash.com/photo-1595586336743-c6a3d00a3643?w=300&h=300&fit=crop',
      },
      {
        id: '3',
        name: 'Evening Elegant',
        occasion: 'Evening',
        rating: 4.9,
        description: 'Perfect for dinners and social events',
        image:
          'https://images.unsplash.com/photo-1595603344935-c8fb91d2e737?w=300&h=300&fit=crop',
      },
    ];

    return outfits.sort(() => Math.random() - 0.5).slice(0, 3);
  },
};

/**
 * Marketplace API Calls
 */
export const marketplaceAPI = {
  getProducts: async (brand?: string, maxPrice?: number) => {
    await mockDelay(700);

    const allProducts = [
      {
        id: '1',
        name: 'Premium Black Sneakers',
        brand: 'Nike',
        price: 129.99,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        rating: 4.7,
      },
      {
        id: '2',
        name: 'Minimalist White Shirt',
        brand: 'Uniqlo',
        price: 39.99,
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        rating: 4.5,
      },
      {
        id: '3',
        name: 'Luxury Watch',
        brand: 'Rolex',
        price: 5999.99,
        image:
          'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop',
        rating: 4.9,
      },
      {
        id: '4',
        name: 'Designer Handbag',
        brand: 'Gucci',
        price: 1899.99,
        image:
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
        rating: 4.8,
      },
    ];

    let filtered = allProducts;

    if (brand) {
      filtered = filtered.filter((p) =>
        p.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    return filtered;
  },
};

/**
 * 3D Model API
 */
export const modelAPI = {
  generateAvatar: async (preferences?: Record<string, string>) => {
    await mockDelay(1000);

    return {
      modelId: `model_${Date.now()}`,
      url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=model',
      format: 'svg',
    };
  },

  tryOutfit: async (outfitId: string, avatarId: string) => {
    await mockDelay(500);

    return {
      success: true,
      preview: `https://via.placeholder.com/400x600.png?text=Avatar+wearing+outfit+${outfitId}`,
    };
  },
};

export default {
  auth: authAPI,
  weather: weatherAPI,
  wardrobe: wardrobeAPI,
  recommendations: recommendationAPI,
  marketplace: marketplaceAPI,
  model: modelAPI,
};
