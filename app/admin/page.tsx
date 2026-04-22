// app/admin/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cars as initialCars } from "@/lib/mockData";
import { Car as CarType, Media, formatPrice } from "@/types";
import { 
  FaCar, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaStar, 
  FaSignOutAlt,
  FaImage,
  FaVideo,
  FaTimes,
  FaUpload,
  FaSpinner,
  FaCloudUploadAlt
} from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

// Simple auth hook (demo)
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = (password: string) => {
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };
  
  return { isAuthenticated, login, logout };
};

// Admin Login Component
function AdminLogin({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      toast.success("Welcome to Admin Dashboard");
    } else {
      setError(true);
      toast.error("Invalid password");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCar className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold">Admin Access</h2>
          <p className="text-muted-foreground text-sm mt-2">Enter your credentials to continue</p>
          <p className="text-amber-500 text-xs mt-2">Password: admin123</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:border-amber-500"
          />
          {error && <p className="text-red-500 text-sm">Invalid password. Try: admin123</p>}
          <button type="submit" className="w-full py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Media Upload Component (Updated with theme support)
function MediaUpload({ media, onAdd, onRemove }: { media: Media[]; onAdd: (item: Media) => void; onRemove: (id: string) => void }) {
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (mediaType === "image") {
        return file.type.startsWith("image/");
      } else {
        return file.type.startsWith("video/");
      }
    });

    if (validFiles.length === 0) {
      toast.error(`Please select valid ${mediaType} files`);
      return;
    }

    setIsUploading(true);
    
    validFiles.forEach((file, index) => {
      const localUrl = URL.createObjectURL(file);
      
      setTimeout(() => {
        // TODO: Replace with actual cloud upload
        const newMedia: Media = {
          id: Date.now().toString() + index,
          type: mediaType,
          url: localUrl,
          thumbnail: mediaType === "video" ? localUrl : undefined,
        };
        
        onAdd(newMedia);
        
        if (index === validFiles.length - 1) {
          setIsUploading(false);
          toast.success(`${validFiles.length} ${mediaType}(s) added`);
        }
      }, 500);
    });
  };

  return (
    <div className="space-y-4">
      {/* Media Type Selection */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setMediaType("image")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition ${
            mediaType === "image" 
              ? "bg-amber-500 text-black" 
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <FaImage className="w-4 h-4" /> Upload Images
        </button>
        <button
          type="button"
          onClick={() => setMediaType("video")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition ${
            mediaType === "video" 
              ? "bg-amber-500 text-black" 
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <FaVideo className="w-4 h-4" /> Upload Videos
        </button>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
          ${dragActive 
            ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/20" 
            : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 hover:border-amber-500/50 dark:hover:border-amber-500/50"
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={mediaType === "image" ? "image/*" : "video/*"}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <FaCloudUploadAlt className={`w-12 h-12 mx-auto mb-3 ${dragActive ? "text-amber-500" : "text-gray-400 dark:text-gray-500"}`} />
        <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {dragActive ? "Drop files here" : "Click or drag to upload"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {mediaType === "image" 
            ? "Upload JPG, PNG, GIF, WEBP (Max 10MB each)" 
            : "Upload MP4, MOV, WEBM (Max 100MB each)"}
        </p>
        
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <FaSpinner className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        )}
      </div>

      {/* Media Preview Grid */}
      {media.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
          {media.map((item) => (
            <div key={item.id} className="relative group aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {item.type === "image" ? (
                <Image src={item.url} alt="Media" fill className="object-cover" />
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <FaVideo className="w-8 h-8 text-amber-500" />
                  {item.thumbnail && (
                    <Image src={item.thumbnail} alt="Video thumb" fill className="object-cover opacity-50" />
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="absolute top-1 right-1 p-1.5 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-500"
              >
                <FaTimes className="w-3 h-3 text-white" />
              </button>
              <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 rounded text-[10px] text-white">
                {item.type === "image" ? "IMG" : "VID"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add/Edit Car Modal (Updated with theme support)
function CarFormModal({ car, onClose, onSave }: { car?: CarType; onClose: () => void; onSave: (car: Partial<CarType>) => void }) {
  const [formData, setFormData] = useState({
    name: car?.name || "",
    model: car?.model || "",
    description: car?.description || "",
    price: car?.price || "",
    brand: car?.brand || "",
    year: car?.year || new Date().getFullYear(),
    bodyType: car?.bodyType || "SUV",
    condition: car?.condition || "Brand New",
    coverImage: car?.coverImage || "",
    transmission: car?.transmission || "Automatic",
    engine: car?.engine || "",
    fuelType: car?.fuelType || "Petrol",
    mileage: car?.mileage || "",
  });
  const [media, setMedia] = useState<Media[]>(car?.media || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coverImage) {
      toast.error("Cover image URL is required");
      return;
    }
    onSave({
      ...formData,
      price: formData.price ? Number(formData.price) : undefined,
      featured: car?.featured || false,
      media,
      createdAt: car?.createdAt || new Date().toISOString(),
    });
  };

  const handleAddMedia = (item: Media) => {
    setMedia([...media, item]);
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter(m => m.id !== id));
    toast.success("Media removed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="glass-card p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-black/90 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            {car ? "Edit Car" : "Add New Car"}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition text-gray-500 dark:text-gray-400"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Two Column Layout for Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Car Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tesla Model S Plaid"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Model S Plaid"
                  value={formData.model}
                  onChange={e => setFormData({...formData, model: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tesla"
                  value={formData.brand}
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Price (Birr)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 13499000"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="2024"
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Body Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., SUV, Sedan, Coupe"
                  value={formData.bodyType}
                  onChange={e => setFormData({...formData, bodyType: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.condition}
                  onChange={e => setFormData({...formData, condition: e.target.value as "Brand New" | "Used"})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white"
                  required
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Transmission <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Automatic, Manual, CVT"
                  value={formData.transmission}
                  onChange={e => setFormData({...formData, transmission: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Fuel Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Petrol, Electric, Diesel, Hybrid"
                  value={formData.fuelType}
                  onChange={e => setFormData({...formData, fuelType: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Engine <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tri-Motor Electric, 3.8L V8"
                  value={formData.engine}
                  onChange={e => setFormData({...formData, engine: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Mileage
                </label>
                <input
                  type="text"
                  placeholder="e.g., 0 km or 15,000 km"
                  value={formData.mileage}
                  onChange={e => setFormData({...formData, mileage: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/cover-image.jpg"
                  value={formData.coverImage}
                  onChange={e => setFormData({...formData, coverImage: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
                {formData.coverImage && (
                  <div className="mt-2 relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                    <Image 
                      src={formData.coverImage} 
                      alt="Cover preview" 
                      fill 
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x300/1a1a1a/FFD700?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Full Width Fields */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Detailed description of the car..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={5}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              required
            />
          </div>

          {/* Media Gallery Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Media Gallery (Images & Videos)
            </label>
            <MediaUpload media={media} onAdd={handleAddMedia} onRemove={handleRemoveMedia} />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition shadow-md hover:shadow-lg"
            >
              {car ? "Update Car" : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Admin Dashboard
function AdminDashboard() {
  const [cars, setCars] = useState(initialCars);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | undefined>(undefined);
  const { logout } = useAdminAuth();
  
  const handleSaveCar = (carData: Partial<CarType>) => {
    if (editingCar) {
      // Edit existing
      setCars(prev => prev.map(c => c.id === editingCar.id ? { ...c, ...carData, id: c.id } as CarType : c));
      toast.success("Car updated successfully");
    } else {
      // Add new
      const newCar: CarType = {
        id: Date.now().toString(),
        name: carData.name!,
        model: carData.model!,
        description: carData.description!,
        price: carData.price,
        coverImage: carData.coverImage!,
        media: carData.media || [],
        bodyType: carData.bodyType!,
        featured: false,
        createdAt: new Date().toISOString(),
        brand: carData.brand!,
        year: carData.year!,
        transmission: carData.transmission!,
        engine: carData.engine!,
        fuelType: carData.fuelType!,
        condition: carData.condition as "Brand New" | "Used",
        mileage: carData.mileage,
      };
      setCars(prev => [newCar, ...prev]);
      toast.success("Car added successfully");
    }
    setShowModal(false);
    setEditingCar(undefined);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      setCars(prev => prev.filter(c => c.id !== id));
      toast.success("Car deleted");
    }
  };
  
  const handleToggleFeatured = (id: string) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, featured: !c.featured } : c));
    toast.success(cars.find(c => c.id === id)?.featured ? "Removed from featured" : "Added to featured");
  };
  
  const featuredCount = cars.filter(c => c.featured).length;
  const brandNewCount = cars.filter(c => c.condition === "Brand New").length;
  const usedCount = cars.filter(c => c.condition === "Used").length;
  
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your car inventory</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setEditingCar(undefined); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-400 transition"
            >
              <FaPlus className="w-4 h-4" /> Add Car
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition"
            >
              <FaSignOutAlt className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm">Total Cars</p>
            <p className="text-3xl font-bold">{cars.length}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm">Featured Cars</p>
            <p className="text-3xl font-bold">{featuredCount}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm">Brand New</p>
            <p className="text-3xl font-bold text-green-500">{brandNewCount}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm">Used</p>
            <p className="text-3xl font-bold text-blue-500">{usedCount}</p>
          </div>
        </div>
        
        {/* Cars Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/30">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Car</th>
                  <th className="text-left p-4 text-sm font-semibold">Brand/Model</th>
                  <th className="text-left p-4 text-sm font-semibold">Price (Birr)</th>
                  <th className="text-left p-4 text-sm font-semibold">Year</th>
                  <th className="text-left p-4 text-sm font-semibold">Condition</th>
                  <th className="text-left p-4 text-sm font-semibold">Media</th>
                  <th className="text-left p-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="border-b border-border hover:bg-secondary/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary">
                          <Image src={car.coverImage} alt={car.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{car.name}</p>
                          <p className="text-xs text-muted-foreground">{car.bodyType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{car.brand}</p>
                      <p className="text-xs text-muted-foreground">{car.model}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-amber-500 text-sm font-medium">
                        {formatPrice(car.price)}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{car.year}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        car.condition === "Brand New" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {car.condition}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {car.media.filter(m => m.type === "image").length > 0 && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FaImage className="w-3 h-3" /> {car.media.filter(m => m.type === "image").length}
                          </span>
                        )}
                        {car.media.filter(m => m.type === "video").length > 0 && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FaVideo className="w-3 h-3" /> {car.media.filter(m => m.type === "video").length}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleFeatured(car.id)}
                          className={`p-1.5 rounded-lg transition ${
                            car.featured 
                              ? "text-amber-500 bg-amber-500/10" 
                              : "text-muted-foreground hover:text-amber-500"
                          }`}
                          title={car.featured ? "Remove from featured" : "Add to featured"}
                        >
                          <FaStar className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setEditingCar(car); setShowModal(true); }}
                          className="p-1.5 text-muted-foreground hover:text-amber-500 transition"
                          title="Edit car"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="p-1.5 text-muted-foreground hover:text-red-500 transition"
                          title="Delete car"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Modal */}
      {showModal && (
        <CarFormModal
          car={editingCar}
          onClose={() => { setShowModal(false); setEditingCar(undefined); }}
          onSave={handleSaveCar}
        />
      )}
    </div>
  );
}

// Main Admin Page
export default function AdminPage() {
  const { isAuthenticated, login } = useAdminAuth();
  
  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }
  
  return <AdminDashboard />;
}