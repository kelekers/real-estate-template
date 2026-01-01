import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fungsi 'cn' (class name) digunakan untuk menggabungkan class Tailwind 
 * secara dinamis tanpa adanya konflik (menggunakan tailwind-merge).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fungsi 'formatPrice' untuk mengubah angka mentah menjadi format mata uang Rupiah.
 * Contoh: 1500000000 -> Rp 1.500.000.000
 */
export const formatPrice = (price: number) => {
  if (price === undefined || price === null) return "Rp 0";
  
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};