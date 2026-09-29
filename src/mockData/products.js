export const MOCK_PRODUCTS = [
  {
    id: "prod-101",
    name: "Aero X Pro 5G",
    category: "Smartphones",
    brand: "AeroTech",
    price: 37999,
    originalPrice: 42999,
    rating: 4.6,
    reviewCount: 1240,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    sellers: [
      { name: "Omnira Official Direct", type: "online", price: 37999, shipping: "Free Delivery in 24h" },
      { name: "Apex Mobiles & Gadgets", type: "local", shopId: "shop-001", price: 37499, distanceKm: 1.2, stockStatus: "In Stock (3 left)" },
      { name: "TechHub Electronics", type: "local", shopId: "shop-002", price: 37999, distanceKm: 2.8, stockStatus: "In Stock" }
    ],
    specs: {
      processor: "Snapdragon 8 Gen 2",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      display: '6.7" AMOLED, 120Hz Curved',
      camera: "50 MP OIS + 32 MP Telephoto + 12 MP Ultrawide",
      battery: "5000 mAh",
      charging: "80W Fast Charge (0-100% in 28 min)",
      os: "Omnira OS 14 (Android 14)",
      warranty: "1 Year Brand Warranty"
    },
    suitableFor: ["Gaming", "Camera", "Battery", "AI/ML", "Students"],
    reviewSummary: {
      positive: ["Ultra crisp 120Hz display", "Super fast 80W charging", "Smooth gaming performance"],
      negative: ["Slight heating during 4K video recording", "No microSD expansion"],
      overallSentiment: "Extremely Positive (92% satisfaction)"
    }
  },
  {
    id: "prod-102",
    name: "Nexus Phone Ultra 14",
    category: "Smartphones",
    brand: "Nexus",
    price: 39999,
    originalPrice: 45999,
    rating: 4.7,
    reviewCount: 980,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    sellers: [
      { name: "Omnira Store Online", type: "online", price: 39999, shipping: "Express Delivery" },
      { name: "Apex Mobiles & Gadgets", type: "local", shopId: "shop-001", price: 39499, distanceKm: 1.2, stockStatus: "In Stock" },
      { name: "Digital World Electronics", type: "local", shopId: "shop-003", price: 39999, distanceKm: 3.5, stockStatus: "Pre-order" }
    ],
    specs: {
      processor: "MediaTek Dimensity 9200+",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 3.1",
      display: '6.67" OLED 144Hz Flat',
      camera: "64 MP Sony Sensor + 8 MP Ultrawide",
      battery: "4800 mAh",
      charging: "100W HyperCharge",
      os: "Clean Android 14",
      warranty: "1 Year Brand Warranty"
    },
    suitableFor: ["Gaming", "Students", "Budget"],
    reviewSummary: {
      positive: ["Blazing fast 144Hz screen", "100W charging is insane", "Great ergonomics"],
      negative: ["Low light camera is average", "Speaker audio lacks bass"],
      overallSentiment: "Very Positive (88% satisfaction)"
    }
  },
  {
    id: "prod-103",
    name: "Starlight Note 13 Max",
    category: "Smartphones",
    brand: "Starlight",
    price: 32999,
    originalPrice: 38999,
    rating: 4.4,
    reviewCount: 1540,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    sellers: [
      { name: "Omnira Direct", type: "online", price: 32999, shipping: "Standard Delivery" },
      { name: "TechHub Electronics", type: "local", shopId: "shop-002", price: 32500, distanceKm: 2.8, stockStatus: "In Stock" }
    ],
    specs: {
      processor: "Snapdragon 7+ Gen 2",
      ram: "8 GB LPDDR5",
      storage: "128 GB UFS 3.1",
      display: '6.5" FHD+ Super AMOLED 120Hz',
      camera: "108 MP Main + 5 MP Macro",
      battery: "6000 mAh monster battery",
      charging: "45W Fast Charge",
      os: "Starlight UI 5",
      warranty: "1 Year Brand Warranty"
    },
    suitableFor: ["Battery", "Office", "Budget"],
    reviewSummary: {
      positive: ["Unbeatable 2-day battery life", "Bright outdoor screen", "Vibrant colors"],
      negative: ["Heavy to hold (215g)", "Bloatware apps pre-installed"],
      overallSentiment: "Positive (84% satisfaction)"
    }
  },
  {
    id: "prod-104",
    name: "Vortex Blade 15 AI Laptop",
    category: "Laptops",
    brand: "Vortex",
    price: 58999,
    originalPrice: 66999,
    rating: 4.8,
    reviewCount: 620,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    sellers: [
      { name: "Omnira Tech Direct", type: "online", price: 58999, shipping: "Free Express Shipping" },
      { name: "Digital World Electronics", type: "local", shopId: "shop-003", price: 57999, distanceKm: 3.5, stockStatus: "In Stock" }
    ],
    specs: {
      processor: "Intel Core i7 13700H (14 Cores)",
      ram: "16 GB DDR5 5200MHz",
      storage: "1 TB PCIe Gen4 NVMe SSD",
      display: '15.6" QHD 165Hz IPS 100% sRGB',
      camera: "1080p FHD IR Camera with shutter",
      battery: "76 Wh (Up to 8h battery)",
      charging: "135W Type-C Power Delivery",
      os: "Windows 11 Home + MS Office",
      warranty: "2 Year Onsite Warranty"
    },
    suitableFor: ["AI/ML", "Gaming", "Office", "Students"],
    reviewSummary: {
      positive: ["Exceptional multi-thread CPU score for AI model training", "Gorgeous 165Hz screen", "Silent dual fans"],
      negative: ["Webcam lacks physical kill switch", "Power brick is slightly bulky"],
      overallSentiment: "Outstanding (95% satisfaction)"
    }
  },
  {
    id: "prod-105",
    name: "Zenith Slim 14 OLED",
    category: "Laptops",
    brand: "Zenith",
    price: 54999,
    originalPrice: 61999,
    rating: 4.5,
    reviewCount: 430,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    sellers: [
      { name: "Omnira Store Online", type: "online", price: 54999, shipping: "Free Shipping" },
      { name: "Apex Mobiles & Gadgets", type: "local", shopId: "shop-001", price: 54499, distanceKm: 1.2, stockStatus: "In Stock" }
    ],
    specs: {
      processor: "AMD Ryzen 7 7735HS 8-Core",
      ram: "16 GB LPDDR5",
      storage: "512 GB NVMe SSD",
      display: '14" 2.8K 90Hz OLED 100% DCI-P3',
      camera: "1080p FHD",
      battery: "70 Wh (Up to 10h battery)",
      charging: "65W GaN Fast Charger",
      os: "Windows 11 Home",
      warranty: "1 Year Brand Warranty"
    },
    suitableFor: ["Office", "Students", "Battery"],
    reviewSummary: {
      positive: ["Unbelievable OLED color depth & contrast", "Featherlight 1.3kg aluminum body", "Great keyboard tactile feel"],
      negative: ["OLED glossy reflection in direct sunlight"],
      overallSentiment: "Very Positive (90% satisfaction)"
    }
  }
];
