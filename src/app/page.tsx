import Hero from "@/components/sections/hero";
import PropertyCard from "@/components/property/property-card";
import { client } from "@/lib/sanity";

// Fungsi untuk ambil data dari Sanity (GROQ Query)
async function getProperties() {
  const query = `*[_type == "property"] | order(_createdAt desc) [0...6]`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <>
      <Hero />
      
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Properti Unggulan</h2>
              <p className="mt-2 text-slate-600">Pilihan hunian terbaik yang baru saja ditambahkan.</p>
            </div>
            <button className="text-amber-600 font-semibold hover:underline">Lihat Semua</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}