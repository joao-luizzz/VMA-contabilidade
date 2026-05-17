'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TestimonialPill } from '@/components/ui/TestimonialPill'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types/testimonial'

// Dados estáticos como fallback
const fallbackTestimonials: Testimonial[] = [
    {
        id: '1',
        name: "Ana Silva",
        company: "TechStore Brasil",
        comment: "A VMA transformou nossa gestão financeira. Economizamos 40% em impostos!",
        rating: 5
    },
    {
        id: '2',
        name: "Carlos Mendes",
        company: "Construtora Nova Era",
        comment: "Profissionais extremamente competentes. Nossa contabilidade nunca esteve tão organizada.",
        rating: 5
    },
    {
        id: '3',
        name: "Juliana Costa",
        company: "Digital Solutions",
        comment: "Atendimento personalizado e resultados incríveis. Recomendo demais!",
        rating: 5
    },
    {
        id: '4',
        name: "Roberto Alves",
        company: "Restaurante Sabor & Arte",
        comment: "Desde que contratamos a VMA, nossa lucratividade aumentou significativamente.",
        rating: 5
    },
    {
        id: '5',
        name: "Patrícia Santos",
        company: "Clínica Bem Estar",
        comment: "Equipe nota 10! Sempre disponíveis e com soluções inteligentes.",
        rating: 5
    },
    {
        id: '6',
        name: "Marcos Oliveira",
        company: "Agência Criativa",
        comment: "A melhor decisão que tomamos foi confiar nossa contabilidade à VMA.",
        rating: 5
    }
]

const stats = [
    { number: "+500", label: "Clientes Ativos" },
    { number: "98%", label: "Satisfação" },
    { number: "12 anos", label: "Experiência" },
    { number: "24/7", label: "Suporte" }
]

export function TrustedBy() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
    const [loading, setLoading] = useState(true)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        if (!supabase) {
            console.error('Supabase client not initialized. Check your environment variables.');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(8)

            if (error) {
                console.error('Supabase error fetching testimonials:', error);
                throw error;
            }

            if (data && data.length > 0) {
                setTestimonials(data)
            }
        } catch (error) {
            console.error('Erro ao carregar depoimentos do Supabase:', error)
            // Mantém os depoimentos de fallback já definidos no useState inicial
        } finally {
            setLoading(false)
        }
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden"
            style={{ background: 'var(--background)' }}
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#C8973A]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-40 left-20 w-80 h-80 bg-[#C8973A]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-[#C8973A] to-[#8A6A2A] text-[#0A1628] rounded-full text-sm font-bold mb-4 shadow-lg"
                    >
                        QUEM CONFIA NA GENTE
                    </motion.span>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                        Clientes que{' '}
                        <span className="text-gradient">
                            confiam
                        </span>{' '}
                        na VMA
                    </h2>

                    <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                        São mais de 500 empresas que transformaram sua gestão contábil
                        com a VMA Contabilidade
                    </p>
                </motion.div>

                {/* Marquee Testimonials */}
                <div className="relative py-12 mb-20 overflow-hidden">
                    {/* First Row: Moving Left */}
                    <div className="flex gap-6 animate-marquee whitespace-nowrap mb-8">
                        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                            <div key={`row1-${idx}`} className="inline-block">
                                <TestimonialPill
                                    testimonial={testimonial}
                                    index={idx}
                                    style={{}}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Second Row: Moving Right */}
                    <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
                        {[...testimonials, ...testimonials, ...testimonials].reverse().map((testimonial, idx) => (
                            <div key={`row2-${idx}`} className="inline-block">
                                <TestimonialPill
                                    testimonial={testimonial}
                                    index={idx}
                                    style={{}}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <div className="relative backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                style={{ background: 'var(--surface)', opacity: 0.9 }}>
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm md:text-base font-medium" style={{ color: 'var(--text-muted)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <a
                        href="https://wa.me/5511947470884"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                    >
                        Quero ser mais um cliente satisfeito
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}