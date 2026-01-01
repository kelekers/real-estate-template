// src/config/site.ts

export const siteConfig = {
  name: "Nusantara Estate",
  description: "Solusi properti mewah dan terpercaya di seluruh Indonesia.",
  url: "https://nusantara-estate.com",
  ogImage: "https://nusantara-estate.com/og.jpg",
  contact: {
    email: "admin@nusantaraestate.com",
    whatsapp: "+628123456789",
    address: "Jl. Sudirman No. 1, Jakarta Pusat",
  },
  mainNav: [
    { title: "Beranda", href: "/" },
    { title: "Listing Properti", href: "/properties" },
    { title: "Tentang Kami", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Kontak", href: "/contact" },
  ],
  links: {
    instagram: "https://instagram.com/nusantaraestate",
    facebook: "https://facebook.com/nusantaraestate",
  },
}

export type SiteConfig = typeof siteConfig