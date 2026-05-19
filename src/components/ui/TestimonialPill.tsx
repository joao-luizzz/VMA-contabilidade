'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { Testimonial } from '@/types/testimonial'

interface TestimonialPillProps {
    testimonial: Testimonial
    index: number
    style: React.CSSProperties
}

export function TestimonialPill({ testimonial, index, style }: TestimonialPillProps) {
    return (
        <motion.div
            className="pill relative backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border w-[280px] sm:w-[320px] min-h-[140px] flex flex-col justify-center cursor-pointer group transition-colors duration-300"
            style={{
                ...style,
                backgroundColor: 'var(--surface)',
                borderColor: 'rgba(200, 151, 58, 0.2)',
                opacity: 0.95
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: index * 0.3,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                scale: 1.05,
                backgroundColor: '#ffffff',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                zIndex: 100,
            }}
        >
            <div className="flex flex-col items-center text-center gap-1.5">
                {/* Stars */}
                <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>

                {/* Comment */}
                <p className="text-xs leading-relaxed font-medium whitespace-normal text-[var(--foreground)] group-hover:text-[#0A1628] transition-colors duration-300">
                    "{testimonial.comment}"
                </p>

                {/* User info */}
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-[var(--accent)] group-hover:text-[#C8973A] transition-colors duration-300">
                        {testimonial.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] group-hover:text-[#0A1628]/70 transition-colors duration-300">
                        {testimonial.company}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}