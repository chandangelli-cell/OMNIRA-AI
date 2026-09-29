import React, { useState } from "react";
import { dataService } from "../../services/dataService";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { X, Plus, Package, UploadCloud, Tag } from "lucide-react";

export const ProductUploadModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { refreshData } = useAppData();

  const [formData, setFormData] = useState({
    name: "",
    category: "Smartphones",
    brand: "",
    price: "",
    originalPrice: "",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    processor: "",
    ram: "",
    storage: "",
    display: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dataService.addProduct(
      {
        name: formData.name,
        category: formData.category,
        brand: formData.brand || "Brand",
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        image: formData.image,
        specs: {
          processor: formData.processor,
          ram: formData.ram,
          storage: formData.storage,
          display: formData.display
        }
      },
      user?.id
    );

    refreshData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 border border-amber-500/30 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Upload New Product</h3>
            <p className="text-xs text-slate-400">Add inventory to make it searchable by Omnira AI customers.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Product Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Aero X Pro 5G Flagship"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Consumer Electronics">Consumer Electronics</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Brand Name</label>
              <input
                type="text"
                required
                placeholder="e.g. AeroTech"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                required
                placeholder="37499"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">MRP / Original Price (₹)</label>
              <input
                type="number"
                placeholder="42999"
                value={formData.originalPrice}
                onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Product Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 font-mono text-[11px]"
            />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <p className="font-bold text-amber-400">Specifications Breakdown:</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Processor (e.g. Snapdragon 8)"
                value={formData.processor}
                onChange={e => setFormData({ ...formData, processor: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              <input
                type="text"
                placeholder="RAM (e.g. 12GB LPDDR5X)"
                value={formData.ram}
                onChange={e => setFormData({ ...formData, ram: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              <input
                type="text"
                placeholder="Storage (e.g. 256GB)"
                value={formData.storage}
                onChange={e => setFormData({ ...formData, storage: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              <input
                type="text"
                placeholder="Display (e.g. 6.7 AMOLED 120Hz)"
                value={formData.display}
                onChange={e => setFormData({ ...formData, display: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white shadow-lg"
          >
            PUBLISH PRODUCT TO CATALOG
          </button>
        </form>
      </div>
    </div>
  );
};
