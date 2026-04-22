// app/cars/page.tsx
"use client";

import { useState, useMemo } from "react";
import { CarCard } from "@/components/car-card";
import { cars, brands, carTypes } from "@/lib/mockData";
import { Search, Filter, X } from "lucide-react";

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [condition, setCondition] = useState<"All" | "Brand New" | "Used">("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
      const matchesType = selectedType === "All" || car.bodyType === selectedType;
      const matchesPrice = (car.price || 0) >= priceRange[0] && (car.price || 0) <= priceRange[1];
      const matchesCondition = condition === "All" || car.condition === condition;
      return matchesSearch && matchesBrand && matchesType && matchesPrice && matchesCondition;
    });
  }, [searchTerm, selectedBrand, selectedType, priceRange, condition]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Our <span className="text-gradient">Inventory</span></h1>
          <p className="text-gray-400">Discover our collection of premium vehicles</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition"
          >
            <Filter className="w-5 h-5" />
            Filters {showFilters ? "▲" : "▼"}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="glass-card p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg"
              >
                {carTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg"
              >
                <option value="All">All</option>
                <option value="Brand New">Brand New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Price: ${priceRange[1].toLocaleString()}</label>
              <input
                type="range"
                min="0"
                max="300000"
                step="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          Found {filteredCars.length} vehicles
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No vehicles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedBrand("All");
                setSelectedType("All");
                setPriceRange([0, 300000]);
                setCondition("All");
              }}
              className="mt-4 text-amber-500 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}