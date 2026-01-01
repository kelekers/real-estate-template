"use client";

import React, { useState, useEffect } from "react";
import { Calculator, Percent, Calendar, Wallet } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CalculatorProps {
  propertyPrice: number;
}

export default function MortgageCalculator({ propertyPrice }: CalculatorProps) {
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2); // Default DP 20%
  const [interestRate, setInterestRate] = useState(5); // Bunga 5%
  const [tenure, setTenure] = useState(20); // Tenor 20 tahun
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Rumus Perhitungan KPR
  useEffect(() => {
    const loanAmount = propertyPrice - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    const numberOfPayments = tenure * 12;

    if (monthlyInterest === 0) {
      setMonthlyPayment(loanAmount / numberOfPayments);
    } else {
      const payment =
        (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
        (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  }, [propertyPrice, downPayment, interestRate, tenure]);

  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-amber-600" />
        <h3 className="text-xl font-bold text-slate-900">Simulasi Cicilan KPR</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Down Payment */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <Wallet size={14} /> Uang Muka (DP)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
          <p className="text-[10px] text-slate-400">Rekomendasi: {formatPrice(propertyPrice * 0.2)} (20%)</p>
        </div>

        {/* Input Bunga */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
            % Suku Bunga Per Tahun
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
        </div>

        {/* Input Tenor */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <Calendar size={14} /> Jangka Waktu (Tahun)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="flex-1 accent-amber-600"
            />
            <span className="font-bold text-slate-900 w-12 text-right">{tenure} Thn</span>
          </div>
        </div>
      </div>

      {/* Hasil Perhitungan */}
      <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-center">
        <p className="text-slate-400 text-sm">Estimasi Cicilan Per Bulan</p>
        <h2 className="text-3xl font-bold text-amber-500 mt-1">
          {formatPrice(monthlyPayment)}
        </h2>
      </div>
    </div>
  );
}