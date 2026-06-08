// src/data/courses.js
export const courses = [
  {
    id: 1,
    title: "Artisanal Sourdough Baking",
    chef: "Chef Marco Pierre",
    price: 450,
    level: "Intermediate",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500",
  },
  {
    id: 2,
    title: "Mastering French Pastries",
    chef: "Chef Chloe Laurent",
    price: 600,
    level: "Advanced",
    isAvailable: false, // Triggers "Sold Out" status
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
  },
  {
    id: 3,
    title: "Classic Italian Pasta Making",
    chef: "Chef Giovanni Rossi",
    price: 350,
    level: "Beginner",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
  },
  {
    id: 4,
    title: "Japanese Sushi Foundations",
    chef: "Chef Akira Tanaka",
    price: 550,
    level: "Intermediate",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
  },
];
