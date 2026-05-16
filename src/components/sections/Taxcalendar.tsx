"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, AlertCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type EventCategory = "federal" | "estadual" | "municipal" | "trabalhista" | "contabil";

interface TaxEvent {
    day: number;
    title: string;
    description: string;
    category: EventCategory;
}

// ─── Recurring monthly events ─────────────────────────────────────────────────
const MONTHLY_EVENTS: TaxEvent[] = [
    {
        day: 7,
        title: "FGTS",
        description: "Recolhimento do FGTS referente à competência do mês anterior.",
        category: "trabalhista",
    },
    {
        day: 10,
        title: "Honorários contábeis",
        description: "Pagamento dos honorários ao escritório de contabilidade.",
        category: "contabil",
    },
    {
        day: 10,
        title: "IRRF — Serviços",
        description: "Recolhimento do IRRF retido sobre pagamentos de serviços (DARF).",
        category: "federal",
    },
    {
        day: 15,
        title: "INSS — Contribuição",
        description: "Pagamento da GPS (Guia da Previdência Social) referente ao mês anterior.",
        category: "federal",
    },
    {
        day: 20,
        title: "Simples Nacional",
        description: "Vencimento do DAS (Documento de Arrecadação do Simples Nacional).",
        category: "federal",
    },
    {
        day: 20,
        title: "ISS",
        description: "Recolhimento do Imposto Sobre Serviços (municipal) do mês anterior.",
        category: "municipal",
    },
    {
        day: 20,
        title: "ICMS",
        description: "Pagamento do ICMS para empresas do Lucro Presumido/Real.",
        category: "estadual",
    },
    {
        day: 25,
        title: "PIS / COFINS",
        description: "Recolhimento das contribuições PIS e COFINS (Lucro Real/Presumido).",
        category: "federal",
    },
    {
        day: 28,
        title: "IRPJ / CSLL",
        description: "Pagamento estimado mensal do Imposto de Renda e CSLL (Lucro Real).",
        category: "federal",
    },
    {
        day: 30,
        title: "Folha de pagamento",
        description: "Processamento e pagamento da folha de salários dos colaboradores.",
        category: "trabalhista",
    },
];

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
    EventCategory,
    { label: string; color: string; bg: string; border: string; dot: string }
> = {
    federal: {
        label: "Federal",
        color: "#3B82F6",
        bg: "rgba(56,130,246,0.12)",
        border: "rgba(56,130,246,0.25)",
        dot: "#3B82F6",
    },
    estadual: {
        label: "Estadual",
        color: "#16A34A",
        bg: "rgba(34,197,94,0.1)",
        border: "rgba(34,197,94,0.25)",
        dot: "#22C55E",
    },
    municipal: {
        label: "Municipal",
        color: "#CA8A04",
        bg: "rgba(234,179,8,0.1)",
        border: "rgba(234,179,8,0.25)",
        dot: "#EAB308",
    },
    trabalhista: {
        label: "Trabalhista",
        color: "#DB2777",
        bg: "rgba(236,72,153,0.1)",
        border: "rgba(236,72,153,0.25)",
        dot: "#EC4899",
    },
    contabil: {
        label: "Contábil",
        color: "#C8973A",
        bg: "rgba(200,151,58,0.12)",
        border: "rgba(200,151,58,0.3)",
        dot: "#C8973A",
    },
};

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

function isWeekend(year: number, month: number, day: number) {
    const d = new Date(year, month, day).getDay();
    return d === 0 || d === 6;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const TaxCalendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
    const [activeCategories, setActiveCategories] = useState<Set<EventCategory>>(
        new Set(["federal", "estadual", "municipal", "trabalhista", "contabil"])
    );

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const eventsForDay = (day: number) =>
        MONTHLY_EVENTS.filter(
            (e) => e.day === day && activeCategories.has(e.category)
        );

    const selectedEvents = selectedDay ? eventsForDay(selectedDay) : [];

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
        setSelectedDay(null);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
        setSelectedDay(null);
    };

    const toggleCategory = (cat: EventCategory) => {
        setActiveCategories(prev => {
            const next = new Set(prev);
            if (next.has(cat)) { next.delete(cat); } else { next.add(cat); }
            return next;
        });
    };

    const isToday = (day: number) =>
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

    // Upcoming events (next 7 days from today if same month)
    const upcoming = MONTHLY_EVENTS.filter(e => {
        if (currentMonth !== today.getMonth() || currentYear !== today.getFullYear()) return false;
        return e.day >= today.getDate() && e.day <= today.getDate() + 7 && activeCategories.has(e.category);
    }).sort((a, b) => a.day - b.day);

    return (
        <section id="calendario" className="bg-[var(--background)] py-20 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute bottom-0 right-[10%] w-[500px] h-[400px] bg-radial-gradient(ellipse, rgba(200,151,58,0.05) 0%, transparent 70%) pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8973A] mb-4">
                        <span className="w-8 h-px bg-[#C8973A]" />
                        <Calendar className="w-3.5 h-3.5" />
                        Calendário Fiscal
                        <span className="w-8 h-px bg-[#C8973A]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-3 leading-[1.1] font-display">
                        Nunca perca um prazo fiscal.
                    </h2>
                    <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto">
                        Acompanhe todas as obrigações tributárias e contábeis do mês em um só lugar.
                    </p>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-8 items-start">
                    {/* ── CALENDAR ── */}
                    <div className="w-full bg-[var(--surface)] border border-[#C8973A]/10 rounded-3xl p-6 md:p-8">
                        {/* Month nav */}
                        <div className="flex items-center justify-between mb-8">
                            <button
                                onClick={prevMonth}
                                className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="text-center">
                                <div className="text-xl font-bold text-[var(--foreground)] font-display">
                                    {MONTHS[currentMonth]}
                                </div>
                                <div className="text-xs text-[var(--text-muted)] font-medium">{currentYear}</div>
                            </div>

                            <button
                                onClick={nextMonth}
                                className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Weekday labels */}
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {WEEKDAYS.map(d => (
                                <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] py-2">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Day grid */}
                        <div className="grid grid-cols-7 gap-2 animate-in fade-in duration-700">
                            {/* Empty cells */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square" />
                            ))}

                            {/* Days */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dayEvents = eventsForDay(day);
                                const isSelected = selectedDay === day;
                                const todayDay = isToday(day);
                                const weekend = isWeekend(currentYear, currentMonth, day);

                                return (
                                    <div
                                        key={day}
                                        onClick={() => setSelectedDay(isSelected ? null : day)}
                                        className={`relative aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all border ${
                                            isSelected ? 'bg-[#C8973A]/20 border-[#C8973A]/40' :
                                            todayDay ? 'bg-blue-500/10 border-blue-500/30' :
                                            dayEvents.length > 0 ? 'bg-white/5 border-transparent' : 'bg-transparent border-transparent'
                                        } hover:bg-white/10`}
                                    >
                                        <span className={`text-sm ${
                                            isSelected ? 'text-[#C8973A] font-bold' :
                                            todayDay ? 'text-blue-400 font-bold' :
                                            weekend ? 'text-slate-600' : 'text-[var(--foreground)]'
                                        }`}>
                                            {day}
                                        </span>

                                        {/* Event dots */}
                                        {dayEvents.length > 0 && (
                                            <div className="absolute bottom-2 flex gap-0.5 justify-center">
                                                {dayEvents.slice(0, 3).map((ev, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-1 h-1 rounded-full"
                                                        style={{ background: CATEGORY_CONFIG[ev.category].dot }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                            {(Object.keys(CATEGORY_CONFIG) as EventCategory[]).map(cat => {
                                const cfg = CATEGORY_CONFIG[cat];
                                const active = activeCategories.has(cat);
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border`}
                                        style={{
                                            backgroundColor: active ? cfg.bg : 'transparent',
                                            borderColor: active ? cfg.border : 'rgba(255,255,255,0.05)',
                                            color: active ? cfg.color : '#64748b'
                                        }}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: active ? cfg.dot : '#475569' }} />
                                        {cfg.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <div className="flex flex-col gap-6 w-full">
                        {/* Selected day events */}
                        <div className="bg-[var(--surface)] border border-[#C8973A]/10 rounded-3xl p-6">
                            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-[#C8973A]" />
                                {selectedDay ? `Dia ${selectedDay} de ${MONTHS[currentMonth]}` : "Selecione um dia"}
                            </div>

                            <div className="space-y-4">
                                {selectedDay && selectedEvents.length === 0 && (
                                    <div className="text-center py-10">
                                        <Calendar className="w-10 h-10 mx-auto mb-3 opacity-10" />
                                        <p className="text-sm text-slate-500 italic">Sem obrigações para este dia.</p>
                                    </div>
                                )}

                                {selectedEvents.map((ev, i) => {
                                    const cfg = CATEGORY_CONFIG[ev.category];
                                    return (
                                        <div key={i} className="p-4 rounded-2xl border transition-all" style={{ background: cfg.bg, borderColor: cfg.border }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/20" style={{ color: cfg.color }}>
                                                    {cfg.label}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-[var(--foreground)] text-sm mb-1">{ev.title}</h4>
                                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{ev.description}</p>
                                        </div>
                                    );
                                })}

                                {!selectedDay && (
                                    <div className="text-center py-10">
                                        <Calendar className="w-10 h-10 mx-auto mb-3 opacity-10" />
                                        <p className="text-sm text-slate-500">Clique em um dia no calendário para ver os detalhes.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        {upcoming.length > 0 && (
                            <div className="bg-gradient-to-br from-[#C8973A]/10 to-transparent border border-[#C8973A]/20 rounded-3xl p-6">
                                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C8973A] mb-6 flex items-center gap-2">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Próximos 7 dias
                                </div>
                                <div className="space-y-4">
                                    {upcoming.map((ev, i) => {
                                        const cfg = CATEGORY_CONFIG[ev.category];
                                        const daysLeft = ev.day - today.getDate();
                                        return (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedDay(ev.day)}
                                                className="flex items-center gap-4 cursor-pointer group"
                                            >
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm transition-transform group-hover:scale-110" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                                                    {ev.day}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-[var(--foreground)] truncate">{ev.title}</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                        {daysLeft === 0 ? "Hoje" : daysLeft === 1 ? "Amanhã" : `Em ${daysLeft} dias`}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="bg-[#C8973A] rounded-3xl p-6 text-[#0A1628]">
                            <h4 className="font-bold mb-2 font-display">Sua empresa em boas mãos.</h4>
                            <p className="text-xs opacity-80 mb-6">Nossa equipe cuida de todos os seus prazos fiscais para você focar no que importa.</p>
                            <a href="https://wa.me/5511947470884" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#0A1628] text-white text-center rounded-xl text-xs font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                Falar com Especialista
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};