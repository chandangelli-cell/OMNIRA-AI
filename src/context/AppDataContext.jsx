import React, { createContext, useContext, useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { DEFAULT_USER_LOCATION, locationService } from "../services/locationService";
import { useAuth } from "./AuthContext";

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [ads, setAds] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [savedItemIds, setSavedItemIds] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userEnquiries, setUserEnquiries] = useState([]);
  const [location, setLocation] = useState(DEFAULT_USER_LOCATION);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Refresh reactive data from dataService
  const refreshData = () => {
    setProducts(dataService.getProducts());
    setShops(dataService.getShops());
    setAds(dataService.getActiveAds());
    if (user?.id) {
      if (user.role === "CUSTOMER") {
        setUserOrders(dataService.getOrdersForCustomer(user.id));
        setUserEnquiries(dataService.getEnquiriesForCustomer(user.id));
        setSavedItemIds(dataService.getSavedItems(user.id));
      } else if (user.role === "SHOPKEEPER") {
        setUserOrders(dataService.getOrdersForShopkeeper(user.id));
        setUserEnquiries(dataService.getEnquiriesForShopkeeper(user.id));
      }
    }
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  // Comparison logic
  const toggleCompare = (product) => {
    setCompareItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 products side-by-side.");
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const clearCompare = () => setCompareItems([]);

  // Save Item
  const toggleSave = (itemId) => {
    if (!user) return;
    const updated = dataService.toggleSaveItem(user.id, itemId);
    setSavedItemIds([...updated]);
  };

  // Location request
  const requestLocationPermission = async () => {
    const loc = await locationService.requestLocation();
    setLocation(loc);
    setLocationModalOpen(false);
    return loc;
  };

  return (
    <AppDataContext.Provider
      value={{
        products,
        shops,
        ads,
        compareItems,
        savedItemIds,
        userOrders,
        userEnquiries,
        location,
        locationModalOpen,
        setLocationModalOpen,
        toggleCompare,
        clearCompare,
        toggleSave,
        requestLocationPermission,
        refreshData
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
