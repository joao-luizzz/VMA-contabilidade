"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
  priority?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const Logo = ({
  className = "relative w-52 h-24",
  priority = false,
  align = 'left'
}: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} />;
  }

  // Ensure you actually have a light version, otherwise both show the dark logo
  const isDark = resolvedTheme === 'dark';
  const logoSrc = isDark ? '/images/logo.png' : '/images/logo.png';

  const alignClass = align === 'left' ? 'object-left' : align === 'right' ? 'object-right' : 'object-center';

  return (
    <div className={className}>
      <Image
        src={logoSrc}
        alt="VMA Contabilidade"
        fill
        sizes="(max-width: 768px) 250px, 400px"
        className={`object-contain ${alignClass}`}
        priority={priority}
      />
    </div>
  );
};