export const ADVERTISING_PLANS = [
  {
    id: "plan-basic",
    name: "Basic Boost",
    durationDays: 7,
    price: 999,
    features: [
      "7 Days Active Display",
      "Standard Carousel Placement",
      "Targeted City Visibility",
      "Basic Click & View Analytics"
    ],
    recommendedFor: "Local store promotions & new arrivals"
  },
  {
    id: "plan-standard",
    name: "Standard Surge",
    durationDays: 15,
    price: 1899,
    badge: "Most Popular",
    features: [
      "15 Days Active Display",
      "Priority Carousel Placement",
      "Targeted Category + Location Matching",
      "Direct Customer Enquiry Button",
      "Detailed Analytics Dashboard"
    ],
    recommendedFor: "Seasonal discount sales & flagship products"
  },
  {
    id: "plan-premium",
    name: "Premium Dominance",
    durationDays: 30,
    price: 3499,
    features: [
      "30 Days Active Display",
      "Featured #1 Carousel Highlight",
      "AI Recommendation Priority Boost",
      "Direct Call & Shop Navigation Link",
      "Advanced Conversion Tracking & CTR Optimization"
    ],
    recommendedFor: "Maximum business reach & mega offers"
  }
];

export const INITIAL_ADVERTISEMENTS = [
  {
    id: "ad-001",
    shopkeeperId: "SHOP-000001",
    shopName: "Apex Mobiles & Electronics",
    title: "Samsung Galaxy Flagship Deal — Flat ₹6,000 Instant Off!",
    description: "Exclusive festive sale at Apex Mobiles. Get complimentary 25W GaN charger and 0% interest EMI on all Galaxy devices.",
    productName: "Aero X Pro 5G",
    offerPrice: 37499,
    originalPrice: 42999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    targetCategory: "Smartphones",
    targetLocation: "Jubilee Hills, Hyderabad",
    startDate: "2026-09-25",
    endDate: "2026-10-10",
    durationDays: 15,
    pricePaid: 1899,
    status: "ACTIVE",
    views: 1420,
    clicks: 184
  },
  {
    id: "ad-002",
    shopkeeperId: "SHOP-000003",
    shopName: "Digital World & Gadgets",
    title: "Vortex AI Laptops with Free RTX Gaming Bag & Mouse",
    description: "Upgrade your work and AI dev setup. Visit Digital World Madhapur for live hands-on demo and immediate stock pickup.",
    productName: "Vortex Blade 15 AI Laptop",
    offerPrice: 57999,
    originalPrice: 66999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    targetCategory: "Laptops",
    targetLocation: "Madhapur, Hyderabad",
    startDate: "2026-09-28",
    endDate: "2026-10-28",
    durationDays: 30,
    pricePaid: 3499,
    status: "ACTIVE",
    views: 2890,
    clicks: 342
  }
];
