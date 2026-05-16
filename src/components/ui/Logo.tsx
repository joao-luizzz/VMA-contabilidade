"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const Logo = ({ className = "relative w-32 h-12", width, height, priority = false }: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} />;
  }

  const isDark = resolvedTheme === 'dark';
  const logoSrc = isDark ? '/images/logo-dark.png' : '/images/logo-vma.jpg';

  return (
    <div className={className}>
      <Image
        src={logoSrc}
        alt="VMA Contabilidade"
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );
};


