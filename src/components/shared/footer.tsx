import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-white text-xl font-bold mb-4">{siteConfig.name}</h3>
          <p className="text-sm leading-relaxed">{siteConfig.description}</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            {siteConfig.mainNav.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-amber-500">{item.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li>{siteConfig.contact.address}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.whatsapp}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
          <div className="flex gap-4">
             <Link href={siteConfig.links.instagram} className="hover:text-amber-500">Instagram</Link>
             <Link href={siteConfig.links.facebook} className="hover:text-amber-500">Facebook</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}