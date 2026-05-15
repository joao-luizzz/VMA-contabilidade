export interface Testimonial {
    id: string
    name: string
    company: string
    comment: string
    rating: number
    is_active?: boolean
    created_at?: string
}

export interface FloatingPillPosition {
    x: number
    y: number
}

export interface StatProps {
    number: string
    label: string
    delay?: number
}