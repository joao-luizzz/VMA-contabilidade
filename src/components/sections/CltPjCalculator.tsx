"use client";

import React, { useState, useMemo } from "react";
import {
    Calculator,
    ChevronDown,
    ChevronUp,
    Info,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";

// ─── INSS table 2024 ────────────────────────────────────────────────────────
function calcINSS(bruto: number): number {
    const faixas = [
        { ate: 1412.0, aliq: 0.075 },
        { ate: 2666.68, aliq: 0.09 },
        { ate: 4000.03, aliq: 0.12 },
        { ate: 7786.02, aliq: 0.14 },
    ];
    let inss = 0;
    let base = bruto;
    let prev = 0;
    for (const f of faixas) {
        if (base <= 0) break;
        const faixa = Math.min(bruto, f.ate) - prev;
        if (faixa <= 0) break;
        inss += faixa * f.aliq;
        prev = f.ate;
        base -= faixa;
    }
    return Math.min(inss, 908.86); // teto 2024
}

// ─── IRRF table 2024 ────────────────────────────────────────────────────────
function calcIRRF(baseCalculo: number): number {
    if (baseCalculo <= 2259.2) return 0;
    if (baseCalculo <= 2826.65) return baseCalculo * 0.075 - 169.44;
    if (baseCalculo <= 3751.05) return baseCalculo * 0.15 - 381.44;
    if (baseCalculo <= 4664.68) return baseCalculo * 0.225 - 662.77;
    return baseCalculo * 0.275 - 896.0;
}

function fmt(val: number) {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface ItemProps {
    label: string;
    value: number;
    positive?: boolean;
    indent?: boolean;
    highlight?: boolean;
}

const LineItem = ({ label, value, positive = true, indent = false, highlight = false }: ItemProps) => (
    <div className={`flex justify-between items-center py-2 border-b border-white/5 ${indent ? 'pl-4' : ''}`}>
        <span className={`text-[13px] ${highlight ? 'text-[var(--foreground)] font-medium' : 'text-[var(--text-muted)] font-normal'}`}>
            {label}
        </span>
        <span className={`text-[13px] font-medium font-mono ${highlight ? 'text-[#C8973A] font-bold' : positive ? 'text-[#A3E4C8]' : 'text-[#F9A8A8]'}`}>
            {positive ? "+" : "-"} {fmt(Math.abs(value))}
        </span>
    </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
export const CltPjCalculator = () => {
    // CLT inputs - Alterados para aceitar números ou vazio
    const [salarioBruto, setSalarioBruto] = useState<number | "">("");
    const [vr, setVr] = useState<number | "">("");
    const [vt, setVt] = useState<number | "">("");
    const [planoSaude, setPlanoSaude] = useState<number | "">("");
    const [outrosBeneficios, setOutrosBeneficios] = useState<number | "">("");

    // PJ inputs
    const [aliquotaImposto, setAliquotaImposto] = useState<number>(0.15); // Valores fixos do select, não precisa ficar vazio
    const [pctProlabore, setPctProlabore] = useState<number>(0); // Range slider, não precisa ficar vazio
    const [custoContador, setCustoContador] = useState<number | "">("");
    const [salarioBrutoPJ, setSalarioBrutoPJ] = useState<number | "">("");

    const [showDetailCLT, setShowDetailCLT] = useState(false);
    const [showDetailPJ, setShowDetailPJ] = useState(false);

    // Função auxiliar para lidar com a digitação nos inputs
    const handleNumberChange = (value: string, setter: React.Dispatch<React.SetStateAction<number | "">>) => {
        if (value === "") {
            setter("");
        } else {
            setter(Number(value));
        }
    };

    // ─── CLT CALCULATION ──────────────────────────────────────────────────────
    const clt = useMemo(() => {
        // Garantindo que, se o campo estiver vazio, o cálculo usará 0
        const bruto = Number(salarioBruto) || 0;
        const valVr = Number(vr) || 0;
        const valVt = Number(vt) || 0;
        const valPlanoSaude = Number(planoSaude) || 0;
        const valOutros = Number(outrosBeneficios) || 0;

        const inss = calcINSS(bruto);
        const baseIR = bruto - inss;
        const irrf = Math.max(0, calcIRRF(baseIR));
        const liquido = bruto - inss - irrf;

        // Férias + 1/3 líquidas (sobre bruto)
        const feriasBruto = bruto * (1 / 3 + 1) * (1 / 12);
        const inssFerias = calcINSS(feriasBruto);
        const irrfFerias = Math.max(0, calcIRRF(feriasBruto - inssFerias));
        const feriasLiq = (feriasBruto - inssFerias - irrfFerias);

        // 13º líquido
        const decimoTerceiro = liquido / 12;

        // FGTS 8%
        const fgts = bruto * 0.08;

        const beneficios = valVr + valVt + valPlanoSaude + valOutros;

        const total = liquido + feriasLiq + decimoTerceiro + fgts + beneficios;

        return {
            bruto,
            inss,
            irrf,
            liquido,
            feriasLiq,
            decimoTerceiro,
            fgts,
            beneficios,
            vr: valVr,
            vt: valVt,
            planoSaude: valPlanoSaude,
            outrosBeneficios: valOutros,
            total,
        };
    }, [salarioBruto, vr, vt, planoSaude, outrosBeneficios]);

    // ─── PJ CALCULATION ───────────────────────────────────────────────────────
    const pj = useMemo(() => {
        // Garantindo que valores vazios virem 0 no cálculo
        const bruto = Number(salarioBrutoPJ) || 0;
        const contador = Number(custoContador) || 0;

        const imposto = bruto * aliquotaImposto;
        const prolaboreBase = bruto * (pctProlabore / 100);
        const inss = prolaboreBase * 0.11;
        const total = bruto - imposto - inss - contador;

        return { bruto, imposto, inss, prolaboreBase, contador, total };
    }, [salarioBrutoPJ, aliquotaImposto, pctProlabore, custoContador]);

    const pjMinimoEquivalente = useMemo(() => {
        const contador = Number(custoContador) || 0;
        const coef = 1 - aliquotaImposto - (pctProlabore / 100) * 0.11;
        if (coef <= 0) return null;
        return (clt.total + contador) / coef;
    }, [clt.total, aliquotaImposto, pctProlabore, custoContador]);

    const diff = pj.total - clt.total;
    const pjWins = diff > 0;
    const tied = Math.abs(diff) < 50;

    const cardClass = "bg-[var(--surface)] border border-[#C8973A]/10 rounded-2xl p-6 md:p-8";

    return (
        <section id="calculadora" className="bg-[var(--background)] py-20 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-radial-gradient(ellipse, rgba(200,151,58,0.06) 0%, transparent 70%) pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8973A] mb-4">
                        <span className="w-8 h-px bg-[#C8973A]" />
                        <Calculator className="w-3.5 h-3.5" />
                        Calculadora
                        <span className="w-8 h-px bg-[#C8973A]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-3 leading-[1.1]">
                        CLT ou PJ? Descubra o que vale mais.
                    </h2>
                    <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto">
                        Compare seu salário líquido real em ambas as modalidades com base nos seus dados.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* ── CLT COLUMN ── */}
                    <div className="space-y-6">
                        <div className={cardClass}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-lg font-bold text-blue-400">
                                    C
                                </div>
                                <div>
                                    <div className="text-[var(--foreground)] font-semibold">Regime CLT</div>
                                    <div className="text-[var(--text-muted)] text-xs">Carteira assinada</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 block">Salário bruto mensal</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={salarioBruto}
                                            onChange={(e) => handleNumberChange(e.target.value, setSalarioBruto)}
                                            className="w-full bg-[var(--background)] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:border-[#C8973A] outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#C8973A] mb-4">
                                        <span className="flex-1 h-px bg-[#C8973A]/20" />
                                        Benefícios
                                        <span className="flex-1 h-px bg-[#C8973A]/20" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { label: "Vale-refeição", val: vr, set: setVr },
                                            { label: "Vale-transporte", val: vt, set: setVt },
                                            { label: "Plano de saúde", val: planoSaude, set: setPlanoSaude },
                                            { label: "Outros", val: outrosBeneficios, set: setOutrosBeneficios },
                                        ].map(({ label, val, set }) => (
                                            <div key={label}>
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1 block">{label}</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">R$</span>
                                                    <input
                                                        type="number"
                                                        value={val}
                                                        onChange={(e) => handleNumberChange(e.target.value, set)}
                                                        className="w-full bg-[var(--background)] border border-white/5 rounded-lg py-2 pl-8 pr-3 text-xs focus:border-[#C8973A] outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CLT Result */}
                        <div className={`${cardClass} !border-blue-500/20 shadow-lg shadow-blue-500/5`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Líquido Mensal CLT</div>
                                    <div className="text-3xl font-bold text-blue-400 font-display">{fmt(clt.total)}</div>
                                </div>
                                <button
                                    onClick={() => setShowDetailCLT(!showDetailCLT)}
                                    className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                    {showDetailCLT ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>

                            {showDetailCLT && (
                                <div className="mt-6 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <LineItem label="Salário bruto" value={clt.bruto} />
                                    <LineItem label="(-) INSS" value={clt.inss} positive={false} indent />
                                    <LineItem label="(-) IRRF" value={clt.irrf} positive={false} indent />
                                    <LineItem label="= Salário líquido" value={clt.liquido} highlight />
                                    <LineItem label="(+) Férias + 1/3 (proporcional)" value={clt.feriasLiq} />
                                    <LineItem label="(+) 13º salário (proporcional)" value={clt.decimoTerceiro} />
                                    <LineItem label="(+) FGTS (8%)" value={clt.fgts} />
                                    {(clt.vr + clt.vt + clt.planoSaude + clt.outrosBeneficios) > 0 && (
                                        <LineItem label="(+) Benefícios totais" value={clt.vr + clt.vt + clt.planoSaude + clt.outrosBeneficios} />
                                    )}
                                    <LineItem label="Total mensal equivalente" value={clt.total} highlight />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── PJ COLUMN ── */}
                    <div className="space-y-6">
                        <div className={cardClass}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#C8973A]/10 flex items-center justify-center text-lg font-bold text-[#C8973A]">
                                    P
                                </div>
                                <div>
                                    <div className="text-[var(--foreground)] font-semibold">Regime PJ</div>
                                    <div className="text-[var(--text-muted)] text-xs">Pessoa jurídica</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 block">Faturamento mensal PJ</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={salarioBrutoPJ}
                                            onChange={(e) => handleNumberChange(e.target.value, setSalarioBrutoPJ)}
                                            className="w-full bg-[var(--background)] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:border-[#C8973A] outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 block">Alíquota de Imposto</label>
                                    <select
                                        value={aliquotaImposto}
                                        onChange={(e) => setAliquotaImposto(Number(e.target.value))}
                                        className="w-full bg-[var(--background)] border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:border-[#C8973A] outline-none appearance-none"
                                    >
                                        <option value={0.06}>Simples Nacional (Anexo III) — 6%</option>
                                        <option value={0.155}>Simples Nacional (Anexo V) — 15.5%</option>
                                        <option value={0.1333}>Lucro Presumido — 13.33%</option>
                                        <option value={0.1633}>Lucro Presumido — 16.33%</option>
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#C8973A] mb-4">
                                        <span className="flex-1 h-px bg-[#C8973A]/20" />
                                        Custos Fixos
                                        <span className="flex-1 h-px bg-[#C8973A]/20" />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                                <span>Pró-labore</span>
                                                <span>{pctProlabore}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min={10}
                                                max={100}
                                                value={pctProlabore}
                                                onChange={(e) => setPctProlabore(Number(e.target.value))}
                                                className="w-full accent-[#C8973A] h-1.5 bg-white/5 rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1 block">Honorários Contábeis</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">R$</span>
                                                <input
                                                    type="number"
                                                    value={custoContador}
                                                    onChange={(e) => handleNumberChange(e.target.value, setCustoContador)}
                                                    className="w-full bg-[var(--background)] border border-white/5 rounded-lg py-2 pl-8 pr-3 text-xs focus:border-[#C8973A] outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PJ Result */}
                        <div className={`${cardClass} !border-[#C8973A]/30 shadow-lg shadow-[#C8973A]/5`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Líquido Mensal PJ</div>
                                    <div className="text-3xl font-bold text-[#C8973A] font-display">{fmt(pj.total)}</div>
                                </div>
                                <button
                                    onClick={() => setShowDetailPJ(!showDetailPJ)}
                                    className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                    {showDetailPJ ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>

                            {showDetailPJ && (
                                <div className="mt-6 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <LineItem label="Faturamento bruto" value={pj.bruto} />
                                    <LineItem label={`(-) Impostos (${Math.round(aliquotaImposto * 100)}%)`} value={pj.imposto} positive={false} indent />
                                    <LineItem label="(-) INSS Pró-labore (11%)" value={pj.inss} positive={false} indent />
                                    <LineItem label="(-) Honorários Contábeis" value={pj.contador} positive={false} indent />
                                    <LineItem label="= Líquido Final PJ" value={pj.total} highlight />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Verdict Card */}
                <div className={`mt-10 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 border transition-all ${tied ? 'bg-white/5 border-white/10' :
                    pjWins ? 'bg-[#C8973A]/10 border-[#C8973A]/30' : 'bg-blue-500/5 border-blue-500/20'
                    }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${tied ? 'bg-white/5' : pjWins ? 'bg-[#C8973A]/20' : 'bg-blue-500/10'
                        }`}>
                        {tied ? <Minus className="text-slate-500" size={32} /> :
                            pjWins ? <TrendingUp className="text-[#C8973A]" size={32} /> :
                                <TrendingDown className="text-blue-400" size={32} />}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 font-display">
                            {tied ? "Os cenários são equivalentes" :
                                pjWins ? "O modelo PJ é mais vantajoso" : "O modelo CLT é mais vantajoso"}
                        </h3>
                        <p className="text-sm md:text-base text-[var(--text-muted)]">
                            {tied ? "A diferença é mínima. Considere outros fatores como estabilidade e flexibilidade." :
                                pjWins ? `Você teria um ganho real de ${fmt(Math.abs(diff))} a mais por mês no modelo PJ.` :
                                    `Você teria um ganho real de ${fmt(Math.abs(diff))} a mais por mês no modelo CLT.`}
                        </p>
                    </div>

                    {pjMinimoEquivalente && Number(salarioBruto) > 0 && (
                        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 shrink-0 w-full md:w-auto">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">PJ mínimo equivalente</div>
                            <div className="text-2xl md:text-3xl font-bold text-[#C8973A] font-display">{fmt(pjMinimoEquivalente)}</div>
                            <div className="text-[10px] font-medium text-slate-500 mt-1">
                                {(((pjMinimoEquivalente / Number(salarioBruto)) - 1) * 100).toFixed(0)}% maior que o salário bruto
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex items-start gap-3 p-5 bg-white/3 border border-white/5 rounded-2xl">
                    <Info className="w-5 h-5 text-[#C8973A] shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                        Este cálculo utiliza a tabela de IRRF e INSS vigente em 2024. No modelo CLT, incluímos o proporcional de férias e 13º para uma comparação anualizada justa.
                        No modelo PJ, os valores podem variar conforme o Anexo do Simples Nacional ou Fator R. Consulte nossos especialistas para uma análise detalhada.
                    </p>
                </div>
            </div>
        </section>
    );
};