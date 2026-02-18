import React, { useRef, useState } from 'react';
import { useWardrobe, WardrobeItem } from '@/context/WardrobeContext';
import { Upload, X, Check } from 'lucide-react';

interface UploadClothingProps {
  onClose?: () => void;
}

const UploadClothing: React.FC<UploadClothingProps> = ({ onClose }) => {
  const { addItem } = useWardrobe();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tops' as const,
    color: '',
    brand: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = ['tops', 'bottoms', 'shoes', 'jackets', 'accessories'];
  const colors = [
    'Black',
    'White',
    'Navy',
    'Gray',
    'Red',
    'Blue',
    'Green',
    'Brown',
    'Beige',
    'Multicolor',
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview || !formData.name || !formData.color) {
      alert('Please fill in all required fields and upload an image');
      return;
    }

    setIsUploading(true);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItem: WardrobeItem = {
      id: `item_${Date.now()}`,
      name: formData.name,
      category: formData.category as 'tops' | 'bottoms' | 'shoes' | 'jackets' | 'accessories',
      color: formData.color,
      brand: formData.brand || 'Unknown Brand',
      image: preview,
    };

    addItem(newItem);
    setUploadSuccess(true);
    setIsUploading(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        category: 'tops',
        color: '',
        brand: '',
      });
      setPreview(null);
      setUploadSuccess(false);
      onClose?.();
    }, 2000);
  };

  return (
    <div className="bg-card border border-border/40 rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins font-bold text-xl">Add to Wardrobe</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Clothing Image *
          </label>
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-primary/30"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 p-2 bg-destructive/90 hover:bg-destructive rounded-lg text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/30 rounded-lg p-8 hover:bg-primary/5 transition-all cursor-pointer text-center"
            >
              <Upload className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-foreground font-medium mb-1">
                Click to upload clothing image
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Item Name */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Item Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g., Classic Black T-Shirt"
            className="form-input"
            disabled={isUploading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as 'tops' | 'bottoms' | 'shoes' | 'jackets' | 'accessories',
              })
            }
            className="form-input"
            disabled={isUploading}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Color *
          </label>
          <select
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            className="form-input"
            disabled={isUploading}
          >
            <option value="">Select a color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Brand (Optional)
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            placeholder="e.g., Nike, Adidas, Unknown"
            className="form-input"
            disabled={isUploading}
          />
        </div>

        {/* Success Message */}
        {uploadSuccess && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-slide-up">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-sm font-medium text-green-500">
              Item added successfully! 🎉
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Add to Wardrobe
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadClothing;
