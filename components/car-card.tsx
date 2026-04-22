// components/car-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, formatPrice } from "@/types";
import { FaEye, FaCalendarAlt, FaTachometerAlt, FaOilCan, FaVideo } from "react-icons/fa";
import { useState } from "react";

interface CarCardProps {
  car: Car;
  featured?: boolean;
}

export function CarCard({ car, featured }: CarCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const imageUrl = imgError 
    ? "https://placehold.co/800x600/1a1a1a/FFD700?text=LuxAuto" 
    : car.coverImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-card overflow-hidden rounded-2xl"
    >
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <Image
          src={imageUrl}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {featured && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-black text-xs font-semibold rounded-full">
            Featured
          </span>
        )}
        {car.condition === "Brand New" && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            Brand New
          </span>
        )}
        {car.media.some(m => m.type === "video") && (
          <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-full flex items-center gap-1">
            <FaVideo className="w-3 h-3" /> Video
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold tracking-tight">{car.name}</h3>
            <p className="text-sm text-muted-foreground">{car.brand} • {car.model}</p>
          </div>
          {car.price && (
            <p className="text-amber-500 font-bold text-sm">
              {formatPrice(car.price)}
            </p>
          )}
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{car.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" /> {car.year}
          </div>
          <div className="flex items-center gap-1">
            <FaTachometerAlt className="w-3 h-3" /> {car.mileage || "0 km"}
          </div>
          <div className="flex items-center gap-1">
            <FaOilCan className="w-3 h-3" /> {car.fuelType}
          </div>
          <div className="flex items-center gap-1">
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>

        <Link
          href={`/cars/${car.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-amber-500/10 text-amber-500 font-medium hover:bg-amber-500 hover:text-black transition-all group-hover:shadow-glow"
        >
          <FaEye className="w-4 h-4" /> View Details
        </Link>
      </div>
    </motion.div>
  );
}