import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import { formatPrice } from "@/lib/utils"; // Pastikan fungsi formatPrice sudah ada di utils.ts

export default function PropertyCard({ property }: { property: any }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 w-full">
        {property.mainImage && (
          <Image
            src={urlFor(property.mainImage).url()}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 uppercase">
          {property.type}
        </div>
      </div>
      
      <div className="p-5">
        <Link href={`/properties/${property.slug.current}`}>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer">
                {property.title}
            </h3>
        </Link>
        <div className="flex items-center gap-1 text-slate-500 text-sm mt-2">
          <MapPin size={14} /> {property.location}
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
          <div className="flex gap-4 text-slate-600">
            <span className="flex items-center gap-1 text-xs"><BedDouble size={14}/> {property.features?.beds || 0}</span>
            <span className="flex items-center gap-1 text-xs"><Bath size={14}/> {property.features?.baths || 0}</span>
            <span className="flex items-center gap-1 text-xs"><Square size={14}/> {property.features?.sqft || 0}m²</span>
          </div>
          <p className="text-lg font-bold text-amber-600">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>
    </div>
  );
}