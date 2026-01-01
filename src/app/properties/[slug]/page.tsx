import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Square, Phone } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import MortgageCalculator from "@/components/property/mortgage-calculator";

async function getPropertyData(slug: string) {
  // Query GROQ untuk mengambil data berdasarkan slug
  const query = `*[_type == "property" && slug.current == $slug][0]`;
  const data = await client.fetch(query, { slug });
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyData(slug);

  if (!property) return { title: "Properti Tidak Ditemukan" };

  return {
    title: `${property.title} | ${siteConfig.name}`,
    description: property.description.substring(0, 160), // Ambil 160 karakter pertama untuk Google
    openGraph: {
      images: [urlFor(property.mainImage).url()],
    },
  };
}

// PERHATIKAN: params sekarang dibungkus Promise
export default async function PropertyDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // UNWRAP params menggunakan await
  const { slug } = await params;
  const property = await getPropertyData(slug);

  if (!property) {
    return (
      <div className="py-40 text-center">
        <h2 className="text-2xl font-bold">Properti tidak ditemukan</h2>
        <p className="text-slate-500">Slug: {slug}</p>
      </div>
    );
  }

  const waMessage = `Halo, saya tertarik dengan properti "${property.title}" di ${property.location}.`;
  const waLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Gambar Utama dengan perbaikan 'sizes' prop untuk performa */}
        <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <Image
            src={urlFor(property.mainImage).url()}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase">
                  {property.type}
                </span>
                <h1 className="text-4xl font-bold text-slate-900 mt-2">{property.title}</h1>
                <p className="flex items-center gap-1 text-slate-500 mt-2">
                  <MapPin size={18} /> {property.location}
                </p>
              </div>
              <div className="text-3xl font-bold text-amber-600">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Icons Fasilitas */}
            <div className="flex gap-8 py-8 my-8 border-y border-slate-100 overflow-x-auto">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><BedDouble /></div>
                <div><p className="text-xs text-slate-500">Kamar Tidur</p><p className="font-bold">{property.features?.beds || 0}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Bath /></div>
                <div><p className="text-xs text-slate-500">Kamar Mandi</p><p className="font-bold">{property.features?.baths || 0}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Square /></div>
                <div><p className="text-xs text-slate-500">Luas Bangunan</p><p className="font-bold">{property.features?.sqft || 0} m²</p></div>
              </div>
            </div>

            {/* Bagian Deskripsi */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Bagian Kalkulator */}
            <div className="mt-12 border-t border-slate-100 pt-12">
                <MortgageCalculator propertyPrice={property.price} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 p-6 bg-white rounded-3xl border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tertarik?</h3>
              <a 
                href={waLink}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
              >
                <Phone size={20} /> Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}