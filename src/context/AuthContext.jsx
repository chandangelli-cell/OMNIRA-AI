import React, { createContext, useContext, useState, useEffect } from "react";
import { dataService } from "../services/dataService";

const AuthContext = createContext(null);

export const PRESET_USERS = {
  CUSTOMER_A: {
    id: "CUSTOMER-000001",
    role: "CUSTOMER",
    name: "Chandan Kumar",
    email: "chandan@omnira.ai",
    phone: "+91 98765 11223",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    city: "Jubilee Hills, Hyderabad",
    interests: ["Mobiles", "AI Laptops", "Boutique Stays"]
  },
  CUSTOMER_B: {
    id: "CUSTOMER-000002",
    role: "CUSTOMER",
    name: "Ananya Roy",
    email: "ananya@omnira.ai",
    phone: "+91 91122 33445",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    city: "Gachibowli, Hyderabad",
    interests: ["Healthy Food", "Smart Watches", "Hostels"]
  },
  SHOPKEEPER_A: {
    id: "SHOP-000001",
    role: "SHOPKEEPER",
    name: "Rajesh Kumar",
    shopName: "Apex Mobiles & Electronics",
    email: "apex.mobiles@omnira-shop.com",
    phone: "+91 98765 43210",
    category: "Mobile & Electronics",
    address: "Shop 14, Central Market Square, Jubilee Hills, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  SHOPKEEPER_B: {
    id: "SHOP-000002",
    role: "SHOPKEEPER",
    name: "Priya Sundaram",
    shopName: "Digital World & Gadgets",
    email: "digitalworld@omnira-shop.com",
    phone: "+91 99887 66554",
    category: "Consumer Electronics",
    address: "Block 4, Metro Plaza, Madhapur, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("omnira_active_user");
      return stored ? JSON.parse(stored) : null; // null means guest / landing mode
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    dataService.init();
    if (user) {
      localStorage.setItem("omnira_active_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("omnira_active_user");
    }
  }, [user]);

  const loginAs = (userData) => {
    setUser(userData);
  };

  const signupCustomer = (customerData) => {
    const newId = `CUSTOMER-${Math.floor(100000 + Math.random() * 900000)}`;
    const userPayload = {
      id: newId,
      role: "CUSTOMER",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      ...customerData
    };
    setUser(userPayload);
    return userPayload;
  };

  const signupShopkeeper = (shopkeeperData) => {
    const newId = `SHOP-${Math.floor(100000 + Math.random() * 900000)}`;
    const userPayload = {
      id: newId,
      role: "SHOPKEEPER",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      ...shopkeeperData
    };
    setUser(userPayload);
    return userPayload;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isCustomer: user?.role === "CUSTOMER",
        isShopkeeper: user?.role === "SHOPKEEPER",
        loginAs,
        signupCustomer,
        signupShopkeeper,
        logout,
        PRESET_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
