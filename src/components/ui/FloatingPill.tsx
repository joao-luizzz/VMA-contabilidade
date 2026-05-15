'use client'

import { useRef } from 'react'
import { useFloatingAnimation } from '@/hooks/useFloatingAnimation'
import { TestimonialPill } from './TestimonialPill'
import type { Testimonial } from '@/types/testimonial'

interface FloatingPillProps {
    testimonial: Testimonial
    index: number
}

export function FloatingPill({ testimonial, index }: FloatingPillProps) {
    const pillRef = useRef<HTMLDivElement>(null)
    const { position, isVisible } = useFloatingAnimation({
        speed: 120,
        range: 3
    })

    const pillStyle: React.CSSProperties = {
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'all 8s ease-in-out',
        zIndex: isVisible ? Math.floor(position.y) : -1
    }

    return (
        <div ref={pillRef}>
            <TestimonialPill
                testimonial={testimonial}
                index={index}
                style={pillStyle}
            />
        </div>
    )
}