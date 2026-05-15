"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { CltPjCalculator } from '@/components/sections/CltPjCalculator';
import { TaxCalendar } from '@/components/sections/Taxcalendar';
import { TrustedBy } from '@/components/sections/TrustedBy'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TaxCalendar />
        <CltPjCalculator />
        <TrustedBy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
