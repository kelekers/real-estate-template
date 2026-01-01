"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek ganti warna saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-slate-200 py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
          {siteConfig.name.split(" ")[0]}
          <span className="text-amber-600">{siteConfig.name.split(" ")[1]}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Phone size={16} /> Hubungi Kami
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col gap-4 animate-in slide-in-from-top">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}