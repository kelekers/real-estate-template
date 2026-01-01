"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image dengan Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" /> {/* Gelapkan sedikit agar teks terbaca */}
      </div>

      {/* Konten Utama */}
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium backdrop-blur-sm">
            Eksklusif di {siteConfig.name}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Temukan Hunian Impian <br /> 
            <span className="text-amber-500">Tanpa Batas</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            Kami menyediakan pilihan properti terbaik di lokasi paling strategis. 
            Mewah, nyaman, dan bernilai investasi tinggi.
          </p>
        </motion.div>

        {/* Search Bar Melayang */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto bg-white p-2 md:p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="flex-1 w-full flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-slate-200 py-2">
            <MapPin className="text-amber-600" />
            <input 
              type="text" 
              placeholder="Cari lokasi, kota, atau area..."
              className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
            <Search className="text-amber-600" />
            <select className="w-full bg-transparent border-none focus:outline-none text-slate-800">
              <option>Tipe Properti</option>
              <option>Rumah Modern</option>
              <option>Villa Mewah</option>
              <option>Apartemen</option>
            </select>
          </div>
          <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300">
            Cari Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  );
}