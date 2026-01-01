// src/sanity/schemaTypes/property.ts
import { defineType, defineField } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Listing Properti',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nama Properti', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'price', title: 'Harga (IDR)', type: 'number' }),
    defineField({ name: 'location', title: 'Lokasi', type: 'string' }),
    defineField({ name: 'mainImage', title: 'Foto Utama', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'type', title: 'Tipe', type: 'string', options: { list: ['Rumah', 'Villa', 'Apartemen', 'Tanah'] } }),
    defineField({ name: 'description', title: 'Deskripsi', type: 'text' }),
    defineField({
      name: 'features',
      title: 'Fasilitas',
      type: 'object',
      fields: [
        { name: 'beds', title: 'Kamar Tidur', type: 'number' },
        { name: 'baths', title: 'Kamar Mandi', type: 'number' },
        { name: 'sqft', title: 'Luas Bangunan (m2)', type: 'number' },
      ]
    }),
  ],
})