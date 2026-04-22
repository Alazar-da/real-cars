// lib/mockData.ts
import { Car, Testimonial } from "@/types";

export const cars: Car[] = [
  {
    id: "1",
    name: "Hyundai Santa Fe",
    description: "Navigation system, Bluetooth interface, LED daytime running lights, LED front and Rear fog lights, 6 Airbags, Autonomous emergency braking, Rear spoiler, Roof rails, Power Seats, Seat Ventilation, Panoramic Roof.",
    price: 12000000,
    coverImage: "/h1.jpg",
    media: [
      { id: "1", type: "image", url: "/h1.jpg" },
      { id: "2", type: "image", url: "/h2.jpg" },
      { id: "3", type: "image", url: "/h3.jpg" },
      
    ],
    bodyType: "SUV",
    featured: true,
    createdAt: new Date().toISOString(),
    brand: "Hyundai",
    model: "Santa Fe Plug-in",
    year: 2023,
    mileage: "42,000 Kms",
    transmission: "6-Speed Automatic(DCT)",
    engine: "IN-Line 4 Cyl 1.6L Turbo",
    fuelType: "Plug-in Hybrid",
    condition: "Brand New",
  },
  {
    id: "2",
    name: "Toyota BZ4X EV",
    description: "Iconic sports car with a 640 hp twin-turbo flat-six engine. 0-60 mph in 2.6 seconds.",
    price: 5650000,
    coverImage: "/t1.jpg",
    media: [
      { id: "1", type: "image", url: "/t1.jpg" },
      { id: "2", type: "image", url: "/t2.jpg" },
      { id: "3", type: "image", url: "/t3.jpg" },
    ],
    bodyType: "Crossover SUV",
    featured: true,
    createdAt: new Date().toISOString(),
    brand: "Toyota",
    model:"BZ4X EV",
    year: 2023,
    mileage: "18,000 Kms",
    transmission: "Automatic",
    engine: "150KW 214HP",
    fuelType: "Electric",
    condition: "Brand New",
  },
  {
    id: "3",
    name: "Peugeot 5008 GT",
    description: "3D connected navigation, Sports button, Panoramic Sunroof, Heated and Massage Seat, 7 Seater",
    price: 4500000,
    coverImage: "/p1.jpg",
    media: [
      { id: "1", type: "image", url: "/p1.jpg" },
      { id: "2", type: "image", url: "/p2.jpg" },
      { id: "3", type: "image", url: "/p3.jpg" },
    ],
    bodyType: "SUV",
    featured: true,
    createdAt: new Date().toISOString(),
    brand: "Peugeot",
    model: "5008 GT",
    year: 2022,
    mileage: "47,000 Kms",
    transmission: "8-Speed Automatic",
    engine: "In-line 3,1.2 PureTech 131Hp",
    fuelType: "Benzine",
    condition: "Brand New",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Wilson",
    role: "CEO, Tech Innovations",
    content: "Exceptional service from start to finish. The team helped me find my dream Porsche and handled everything seamlessly.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Entrepreneur",
    content: "The online experience was smooth and professional. The virtual tour made me feel confident in my purchase.",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Real Estate Developer",
    content: "Best car buying experience I've ever had. Transparent pricing and amazing customer support.",
    rating: 4,
  },
];

export const brands = ["All", "Tesla", "Porsche", "BMW", "Mercedes-Benz", "Lucid", "Ferrari"];
export const carTypes = ["All", "SUV", "Sedan", "Coupe", "Electric", "Convertible"];