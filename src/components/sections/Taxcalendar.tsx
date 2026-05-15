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

    // ─── Styles ─────────────────────────────────────────────────────────────────
    const cellBase: React.CSSProperties = {
        position: "relative",
        aspectRatio: "1",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "6px",
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s",
        border: "1px solid transparent",
        minHeight: "52px",
    };

    return (
        <section
            id="calendario"
            style={{
                background: "var(--background)",
                padding: "80px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow */}
            <div style={{
                position: "absolute", bottom: "0", right: "10%",
                width: "500px", height: "400px", pointerEvents: "none",
                background: "radial-gradient(ellipse, rgba(200,151,58,0.05) 0%, transparent 70%)",
            }} />

            <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: "#C8973A", marginBottom: "16px",
                    }}>
                        <span style={{ width: "32px", height: "1px", background: "#C8973A" }} />
                        <Calendar style={{ width: "14px", height: "14px" }} />
                        Calendário Fiscal
                        <span style={{ width: "32px", height: "1px", background: "#C8973A" }} />
                    </div>
                    <h2 style={{
                        fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--foreground)",
                        margin: "0 0 12px", lineHeight: 1.1, fontFamily: "var(--font-display)",
                    }}>
                        Nunca perca um prazo fiscal.
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>
                        Acompanhe todas as obrigações tributárias e contábeis do mês em um só lugar.
                    </p>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-6 items-start">

                    {/* ── CALENDAR ── */}
                    <div style={{
                        background: "var(--surface)",
                        border: "1px solid rgba(200, 151, 58, 0.1)",
                        borderRadius: "20px",
                        padding: "24px",
                    }}>
                        {/* Month nav */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                            <button
                                onClick={prevMonth}
                                style={{
                                    width: "36px", height: "36px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(255,255,255,0.04)", color: "#8A9BB5", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                                }}
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-display)" }}>
                                    {MONTHS[currentMonth]}
                                </div>
                                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{currentYear}</div>
                            </div>

                            <button
                                onClick={nextMonth}
                                style={{
                                    width: "36px", height: "36px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(255,255,255,0.04)", color: "#8A9BB5", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                                }}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Weekday labels */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
                            {WEEKDAYS.map(d => (
                                <div key={d} style={{
                                    textAlign: "center", fontSize: "11px", fontWeight: 700,
                                    letterSpacing: "0.06em", color: "var(--text-muted)", padding: "4px 0",
                                    textTransform: "uppercase",
                                }}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Day grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }} className="animate-in fade-in duration-700">
                            {/* Empty cells */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} />
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
                                        style={{
                                            ...cellBase,
                                            background: isSelected
                                                ? "rgba(200,151,58,0.15)"
                                                : todayDay
                                                    ? "rgba(56,130,246,0.12)"
                                                    : dayEvents.length > 0
                                                        ? "rgba(255,255,255,0.03)"
                                                        : "transparent",
                                            border: isSelected
                                                ? "1px solid rgba(200,151,58,0.5)"
                                                : todayDay
                                                    ? "1px solid rgba(56,130,246,0.4)"
                                                    : "1px solid transparent",
                                        }}
                                    >
                                        <span style={{
                                            fontSize: "13px",
                                            fontWeight: todayDay ? 700 : 400,
                                            color: isSelected
                                                ? "#C8973A"
                                                : todayDay
                                                    ? "#60A5FA"
                                                    : weekend
                                                        ? "rgba(0, 0, 0, 0.2)"
                                                        : "var(--foreground)",
                                            lineHeight: 1,
                                        }}>
                                            {day}
                                        </span>

                                        {/* Event dots */}
                                        {dayEvents.length > 0 && (
                                            <div style={{
                                                display: "flex", gap: "2px", marginTop: "4px",
                                                flexWrap: "wrap", justifyContent: "center", padding: "0 2px",
                                            }}>
                                                {dayEvents.slice(0, 3).map((ev, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            width: "5px", height: "5px", borderRadius: "50%",
                                                            background: CATEGORY_CONFIG[ev.category].dot,
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                ))}
                                                {dayEvents.length > 3 && (
                                                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4A5568" }} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div style={{
                            marginTop: "20px", paddingTop: "16px",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", flexWrap: "wrap", gap: "8px",
                        }}>
                            {(Object.keys(CATEGORY_CONFIG) as EventCategory[]).map(cat => {
                                const cfg = CATEGORY_CONFIG[cat];
                                const active = activeCategories.has(cat);
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "6px",
                                            padding: "4px 10px", borderRadius: "999px", cursor: "pointer",
                                            border: `1px solid ${active ? cfg.border : "rgba(255,255,255,0.06)"}`,
                                            background: active ? cfg.bg : "transparent",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <div style={{
                                            width: "6px", height: "6px", borderRadius: "50%",
                                            background: active ? cfg.dot : "#4A5568",
                                        }} />
                                        <span style={{
                                            fontSize: "11px", fontWeight: 600,
                                            color: active ? cfg.color : "#4A5568",
                                            letterSpacing: "0.04em",
                                        }}>
                                            {cfg.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <div className="flex flex-col gap-4 w-full">

                        {/* Selected day events */}
                        <div style={{
                            background: "var(--surface)",
                            border: "1px solid rgba(200, 151, 58, 0.15)",
                            borderRadius: "20px",
                            padding: "20px",
                        }}>
                            <div style={{
                                fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                                textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "14px",
                            }}>
                                {selectedDay
                                    ? `Dia ${selectedDay} — ${MONTHS[currentMonth]}`
                                    : "Selecione um dia"}
                            </div>

                            {selectedDay && selectedEvents.length === 0 && (
                                <div style={{
                                    textAlign: "center", padding: "24px 0",
                                    color: "#4A5568", fontSize: "13px",
                                }}>
                                    <Calendar size={28} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
                                    Sem obrigações neste dia.
                                </div>
                            )}

                            {selectedEvents.map((ev, i) => {
                                const cfg = CATEGORY_CONFIG[ev.category];
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            padding: "12px 14px",
                                            borderRadius: "12px",
                                            background: cfg.bg,
                                            border: `1px solid ${cfg.border}`,
                                            marginBottom: "8px",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "7px", height: "7px", borderRadius: "50%",
                                                background: cfg.dot, flexShrink: 0,
                                            }} />
                                            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>
                                                {ev.title}
                                            </span>
                                            <span style={{
                                                marginLeft: "auto",
                                                fontSize: "10px", fontWeight: 700,
                                                letterSpacing: "0.06em", color: cfg.color,
                                                background: "rgba(0,0,0,0.2)",
                                                padding: "2px 7px", borderRadius: "999px",
                                            }}>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: "12px", color: "#8A9BB5", margin: 0, lineHeight: 1.5 }}>
                                            {ev.description}
                                        </p>
                                    </div>
                                );
                            })}

                            {!selectedDay && (
                                <div style={{ textAlign: "center", padding: "24px 0", color: "#4A5568", fontSize: "13px" }}>
                                    <Calendar size={28} style={{ margin: "0 auto 8px", opacity: 0.3 }} />
                                    Clique em um dia para ver os vencimentos.
                                </div>
                            )}
                        </div>

                        {/* Upcoming (only current month) */}
                        {upcoming.length > 0 && (
                            <div style={{
                                background: "var(--surface)",
                                border: "1px solid rgba(200,151,58,0.2)",
                                borderRadius: "20px",
                                padding: "20px",
                            }}>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                                    textTransform: "uppercase", color: "#C8973A", marginBottom: "14px",
                                }}>
                                    <AlertCircle size={13} />
                                    Próximos 7 dias
                                </div>
                                {upcoming.map((ev, i) => {
                                    const cfg = CATEGORY_CONFIG[ev.category];
                                    const daysLeft = ev.day - today.getDate();
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedDay(ev.day)}
                                            style={{
                                                display: "flex", alignItems: "center", gap: "12px",
                                                padding: "10px 0",
                                                borderBottom: i < upcoming.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <div style={{
                                                width: "36px", height: "36px", borderRadius: "10px",
                                                background: cfg.bg, border: `1px solid ${cfg.border}`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0,
                                            }}>
                                                <span style={{ fontSize: "14px", fontWeight: 700, color: cfg.color, fontFamily: "var(--font-display)" }}>
                                                    {ev.day}
                                                </span>
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)", marginBottom: "2px" }}>
                                                    {ev.title}
                                                </div>
                                                <div style={{ fontSize: "11px", color: "#8A9BB5" }}>
                                                    {daysLeft === 0 ? "Hoje!" : daysLeft === 1 ? "Amanhã" : `Em ${daysLeft} dias`}
                                                </div>
                                            </div>
                                            <div style={{
                                                width: "6px", height: "6px", borderRadius: "50%",
                                                background: daysLeft <= 2 ? "#F87171" : daysLeft <= 5 ? "#FBBF24" : "#34D399",
                                                flexShrink: 0,
                                            }} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* CTA */}
                        <div style={{
                            padding: "20px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, rgba(200,151,58,0.12), rgba(200,151,58,0.04))",
                            border: "1px solid rgba(200,151,58,0.25)",
                            textAlign: "center",
                        }}>
                            <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)", marginBottom: "6px", fontFamily: "var(--font-display)" }}>
                                Quer que a gente cuide disso?
                            </div>
                            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 14px" }}>
                                Nossa equipe gerencia todos os seus prazos fiscais.
                            </p>
                            <a
                                href="#contato"
                                className="btn-primary"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "6px",
                                    padding: "10px 20px", fontSize: "13px", borderRadius: "8px",
                                    fontWeight: 700, textDecoration: "none",
                                    background: "linear-gradient(135deg, #C8973A, #E8B45A)",
                                    color: "#0A1628",
                                    boxShadow: "0 4px 16px rgba(200,151,58,0.3)",
                                }}
                            >
                                Falar com especialista
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};