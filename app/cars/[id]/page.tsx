// app/cars/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cars } from "@/lib/mockData";
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaTachometerAlt, 
  FaOilCan, 
  FaCog,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaShareAlt,
  FaPlay,
  FaTimes,
  FaGasPump
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { formatPrice } from "@/types";

export default function CarDetailPage() {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  if (!car) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl">Car not found</h1>
        <Link href="/cars" className="text-amber-500 mt-4 inline-block">Back to inventory</Link>
      </div>
    );
  }

  const handleInquiry = () => {
    toast.success(`Inquiry sent for ${car.name}. We'll contact you shortly!`);
  };

  const handleMediaClick = (media: any, index: number) => {
    if (media.type === "video") {
      setSelectedVideo(media.url);
      setShowVideoModal(true);
    } else {
      setSelectedMediaIndex(index);
    }
  };

  const currentMedia = car.media[selectedMediaIndex];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Link href="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-amber-500 mb-6 transition">
          <FaArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Gallery */}
          <div>
            <div 
              className="relative h-96 rounded-2xl overflow-hidden mb-4 cursor-pointer group"
              onClick={() => currentMedia && handleMediaClick(currentMedia, selectedMediaIndex)}
            >
              {currentMedia?.type === "video" ? (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src={currentMedia.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <>
                  <Image
                    src={currentMedia?.url || car.coverImage}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-black/60 p-3 rounded-full">
                      <FaPlay className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Media Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {car.media.map((media, idx) => (
                <button
                  key={media.id}
                  onClick={() => {
                    if (media.type === "video") {
                      setSelectedVideo(media.url);
                      setShowVideoModal(true);
                    } else {
                      setSelectedMediaIndex(idx);
                    }
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    selectedMediaIndex === idx && media.type === "image" ? "ring-2 ring-amber-500" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {media.type === "video" ? (
                    <>
                      <Image
                        src={media.thumbnail || "https://placehold.co/200x150/1a1a1a/FFD700?text=Video"}
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <FaPlay className="w-6 h-6 text-white" />
                      </div>
                    </>
                  ) : (
                    <Image src={media.url} alt={`${car.name} view ${idx + 1}`} fill className="object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{car.name}</h1>
              {car.price && (
                <p className="text-2xl text-amber-500 font-bold"> {formatPrice(car.price)}</p>
              )}
            </div>

            <div className="flex gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                car.condition === "Brand New" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
              }`}>
                {car.condition}
              </span>
              {/* <span className="px-3 py-1 rounded-full bg-white/10 text-xs">{car.type}</span> */}
            </div>
           
<div className="flex items-center gap-3">
  <FaGasPump className="w-5 h-5 text-amber-500" />
  <div>
    <p className="text-sm text-muted-foreground">Fuel Type</p>
    <p className="font-medium">{car.fuelType}</p>
  </div>
</div>
<div className="flex items-center gap-3">
  <FaCog className="w-5 h-5 text-amber-500" />
  <div>
    <p className="text-sm text-muted-foreground">Engine</p>
    <p className="font-medium text-sm">{car.engine}</p>
  </div>
</div>
<div className="flex items-center gap-3">
  <FaTachometerAlt className="w-5 h-5 text-amber-500" />
  <div>
    <p className="text-sm text-muted-foreground">Mileage</p>
    <p className="font-medium">{car.mileage || "0 km"}</p>
  </div>
</div>

            <p className="text-muted-foreground mb-8 leading-relaxed">{car.description}</p>

            {/* Specifications */}
            <div className="glass-card p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaTachometerAlt className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-medium">{car.mileage?.toLocaleString() || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaOilCan className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCog className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Engine</p>
                    <p className="font-medium text-sm">{car.engine}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleInquiry}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all hover:scale-105"
              >
                <FaPhone className="w-4 h-4" /> Contact Dealer
              </button>
              <button
                onClick={() => toast.success("Added to favorites!")}
                className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition"
              >
                <FaHeart className="w-4 h-4" /> Save
              </button>
              <button
                onClick={() => toast.success("Link copied!")}
                className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition"
              >
                <FaShareAlt className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full hover:bg-black/80 transition"
              >
                <FaTimes className="w-5 h-5 text-white" />
              </button>
              <iframe
                src={selectedVideo}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}