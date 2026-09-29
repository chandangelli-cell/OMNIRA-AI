import { MOCK_PRODUCTS } from "../mockData/products";
import { MOCK_SHOPS } from "../mockData/shops";
import { INITIAL_ADVERTISEMENTS, ADVERTISING_PLANS } from "../mockData/advertisements";

const STORAGE_KEYS = {
  PRODUCTS: "omnira_products_db_v1",
  SHOPS: "omnira_shops_db_v1",
  ADS: "omnira_ads_db_v1",
  ORDERS: "omnira_orders_db_v1",
  ENQUIRIES: "omnira_enquiries_db_v1",
  SAVED_ITEMS: "omnira_saved_items_db_v1",
  USER_PREFS: "omnira_user_prefs_db_v1"
};

const getStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage save failed", e);
  }
};

export const dataService = {
  // Initialize storage if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      setStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHOPS)) {
      setStorage(STORAGE_KEYS.SHOPS, MOCK_SHOPS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADS)) {
      setStorage(STORAGE_KEYS.ADS, INITIAL_ADVERTISEMENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      setStorage(STORAGE_KEYS.ORDERS, [
        {
          id: "ORD-9901",
          customerId: "CUSTOMER-000001",
          customerName: "Chandan Kumar",
          customerPhone: "+91 98765 11223",
          shopkeeperId: "SHOP-000001",
          shopName: "Apex Mobiles & Electronics",
          productId: "prod-101",
          productName: "Aero X Pro 5G",
          productImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
          amount: 37499,
          status: "CONFIRMED", // PENDING, CONFIRMED, READY, COMPLETED, CANCELLED
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          type: "Store Pickup"
        }
      ]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
      setStorage(STORAGE_KEYS.ENQUIRIES, [
        {
          id: "ENQ-7701",
          customerId: "CUSTOMER-000001",
          customerName: "Chandan Kumar",
          shopkeeperId: "SHOP-000001",
          shopName: "Apex Mobiles & Electronics",
          productName: "Aero X Pro 5G",
          message: "Is the Aero X Pro 5G available in Black color for instant store pickup today?",
          status: "RESPONDED",
          response: "Yes Chandan! We have 2 units in Black available right now at our Jubilee Hills store.",
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_ITEMS)) {
      setStorage(STORAGE_KEYS.SAVED_ITEMS, {
        "CUSTOMER-000001": ["prod-101", "hotel-101", "shop-001"]
      });
    }
  },

  // Products
  getProducts: () => getStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS),
  addProduct: (productData, shopkeeperId) => {
    const products = dataService.getProducts();
    const newProd = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      sellers: [
        {
          name: shopkeeperId || "Local Shopkeeper",
          type: "local",
          shopId: shopkeeperId,
          price: productData.price,
          stockStatus: "In Stock"
        }
      ],
      reviewSummary: {
        positive: ["Newly uploaded store item", "Original factory warranty"],
        negative: [],
        overallSentiment: "Verified Product"
      },
      ...productData
    };
    products.unshift(newProd);
    setStorage(STORAGE_KEYS.PRODUCTS, products);

    // Also link product to shop
    if (shopkeeperId) {
      const shops = dataService.getShops();
      const shopIndex = shops.findIndex(s => s.shopkeeperId === shopkeeperId || s.id === shopkeeperId);
      if (shopIndex !== -1) {
        if (!shops[shopIndex].products) shops[shopIndex].products = [];
        shops[shopIndex].products.push(newProd.id);
        setStorage(STORAGE_KEYS.SHOPS, shops);
      }
    }
    return newProd;
  },

  // Shops
  getShops: () => getStorage(STORAGE_KEYS.SHOPS, MOCK_SHOPS),
  getShopByKeeperId: (shopkeeperId) => {
    const shops = dataService.getShops();
    return shops.find(s => s.shopkeeperId === shopkeeperId) || shops[0];
  },

  // Advertisements
  getAds: () => getStorage(STORAGE_KEYS.ADS, INITIAL_ADVERTISEMENTS),
  getActiveAds: () => {
    const ads = dataService.getAds();
    return ads.filter(a => a.status === "ACTIVE");
  },
  createAd: (adPayload) => {
    const ads = dataService.getAds();
    const newAd = {
      id: `ad-${Date.now()}`,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + adPayload.durationDays * 86400000).toISOString().split("T")[0],
      status: "ACTIVE",
      views: 0,
      clicks: 0,
      ...adPayload
    };
    ads.unshift(newAd);
    setStorage(STORAGE_KEYS.ADS, ads);
    return newAd;
  },
  incrementAdMetrics: (adId, type = "view") => {
    const ads = dataService.getAds();
    const ad = ads.find(a => a.id === adId);
    if (ad) {
      if (type === "view") ad.views += 1;
      if (type === "click") ad.clicks += 1;
      setStorage(STORAGE_KEYS.ADS, ads);
    }
  },

  // Orders (Isolated by User ID)
  getOrdersForCustomer: (customerId) => {
    const orders = getStorage(STORAGE_KEYS.ORDERS, []);
    return orders.filter(o => o.customerId === customerId);
  },
  getOrdersForShopkeeper: (shopkeeperId) => {
    const orders = getStorage(STORAGE_KEYS.ORDERS, []);
    return orders.filter(o => o.shopkeeperId === shopkeeperId);
  },
  createOrder: (orderData) => {
    const orders = getStorage(STORAGE_KEYS.ORDERS, []);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      ...orderData
    };
    orders.unshift(newOrder);
    setStorage(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  },
  updateOrderStatus: (orderId, newStatus) => {
    const orders = getStorage(STORAGE_KEYS.ORDERS, []);
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      orders[idx].status = newStatus;
      setStorage(STORAGE_KEYS.ORDERS, orders);
      return orders[idx];
    }
    return null;
  },

  // Enquiries (Isolated by User ID)
  getEnquiriesForCustomer: (customerId) => {
    const list = getStorage(STORAGE_KEYS.ENQUIRIES, []);
    return list.filter(e => e.customerId === customerId);
  },
  getEnquiriesForShopkeeper: (shopkeeperId) => {
    const list = getStorage(STORAGE_KEYS.ENQUIRIES, []);
    return list.filter(e => e.shopkeeperId === shopkeeperId);
  },
  createEnquiry: (enquiryData) => {
    const list = getStorage(STORAGE_KEYS.ENQUIRIES, []);
    const newEnquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      ...enquiryData
    };
    list.unshift(newEnquiry);
    setStorage(STORAGE_KEYS.ENQUIRIES, list);
    return newEnquiry;
  },
  respondToEnquiry: (enquiryId, responseText) => {
    const list = getStorage(STORAGE_KEYS.ENQUIRIES, []);
    const idx = list.findIndex(e => e.id === enquiryId);
    if (idx !== -1) {
      list[idx].response = responseText;
      list[idx].status = "RESPONDED";
      setStorage(STORAGE_KEYS.ENQUIRIES, list);
      return list[idx];
    }
    return null;
  },

  // Saved Items (Isolated by Customer ID)
  getSavedItems: (customerId) => {
    const store = getStorage(STORAGE_KEYS.SAVED_ITEMS, {});
    return store[customerId] || [];
  },
  toggleSaveItem: (customerId, itemId) => {
    const store = getStorage(STORAGE_KEYS.SAVED_ITEMS, {});
    if (!store[customerId]) store[customerId] = [];

    const index = store[customerId].indexOf(itemId);
    if (index === -1) {
      store[customerId].push(itemId);
    } else {
      store[customerId].splice(index, 1);
    }
    setStorage(STORAGE_KEYS.SAVED_ITEMS, store);
    return store[customerId];
  }
};
