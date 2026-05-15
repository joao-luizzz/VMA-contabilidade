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
    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            paddingLeft: indent ? "12px" : "0",
        }}
    >
        <span
            style={{
                fontSize: "13px",
                color: highlight ? "var(--foreground)" : "var(--text-muted)",
                fontWeight: highlight ? 500 : 400,
            }}
        >
            {label}
        </span>
        <span
            style={{
                fontSize: "13px",
                fontWeight: highlight ? 600 : 500,
                color: highlight
                    ? "#C8973A"
                    : positive
                        ? "#A3E4C8"
                        : "#F9A8A8",
                fontFamily: "var(--font-display)",
            }}
        >
            {positive ? "+" : "-"} {fmt(Math.abs(value))}
        </span>
    </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
export const CltPjCalculator = () => {
    // CLT inputs
    const [salarioBruto, setSalarioBruto] = useState(8000);
    const [vr, setVr] = useState(600);
    const [vt, setVt] = useState(200);
    const [planoSaude, setPlanoSaude] = useState(400);
    const [outrosBeneficios, setOutrosBeneficios] = useState(0);

    // PJ inputs
    const [aliquotaImposto, setAliquotaImposto] = useState(0.15);
    const [pctProlabore, setPctProlabore] = useState(30);
    const [custoContador, setCustoContador] = useState(300);
    const [salarioBrutoPJ, setSalarioBrutoPJ] = useState(12000);

    const [showDetailCLT, setShowDetailCLT] = useState(false);
    const [showDetailPJ, setShowDetailPJ] = useState(false);

    // ─── CLT CALCULATION ──────────────────────────────────────────────────────
    const clt = useMemo(() => {
        const bruto = salarioBruto;
        const inss = calcINSS(bruto);
        const baseIR = bruto - inss;
        const irrf = Math.max(0, calcIRRF(baseIR));
        const liquido = bruto - inss - irrf;

        // Férias + 1/3 líquidas (sobre bruto)
        const feriasBruto = bruto * (1 / 3 + 1) * (1 / 12); // 1 mês de férias + 1/3, diluído em 12
        const inssFerias = calcINSS(feriasBruto);
        const irrfFerias = Math.max(0, calcIRRF(feriasBruto - inssFerias));
        const feriasLiq = (feriasBruto - inssFerias - irrfFerias);

        // 13º líquido (metade do salário líquido / 12 * 12 = salário líquido / 2 anual → /12 mensal)
        const decimoTerceiro = liquido / 12;

        // FGTS 8%
        const fgts = bruto * 0.08;

        const beneficios = vr + vt + planoSaude + outrosBeneficios;

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
            vr,
            vt,
            planoSaude,
            outrosBeneficios,
            total,
        };
    }, [salarioBruto, vr, vt, planoSaude, outrosBeneficios]);

    // ─── PJ CALCULATION ───────────────────────────────────────────────────────
    const pj = useMemo(() => {
        const bruto = salarioBrutoPJ;
        const imposto = bruto * aliquotaImposto;
        const prolaboreBase = bruto * (pctProlabore / 100);
        const inss = prolaboreBase * 0.11;
        const contador = custoContador;
        const total = bruto - imposto - inss - contador;

        return { bruto, imposto, inss, prolaboreBase, contador, total };
    }, [salarioBrutoPJ, aliquotaImposto, pctProlabore, custoContador]);

    // ─── PJ mínimo para igualar CLT ───────────────────────────────────────────
    const pjMinimoEquivalente = useMemo(() => {
        // solve: bruto*(1 - aliq) - bruto*pct*0.11 - contador = clt.total
        // bruto * (1 - aliq - pct*0.11) = clt.total + contador
        const coef = 1 - aliquotaImposto - (pctProlabore / 100) * 0.11;
        if (coef <= 0) return null;
        return (clt.total + custoContador) / coef;
    }, [clt.total, aliquotaImposto, pctProlabore, custoContador]);

    const diff = pj.total - clt.total;
    const pjWins = diff > 0;
    const tied = Math.abs(diff) < 50;

    // ─── Input helpers ────────────────────────────────────────────────────────
    const inputStyle: React.CSSProperties = {
        width: "100%",
        height: "42px",
        padding: "0 12px",
        background: "var(--surface)",
        border: "1px solid rgba(200, 151, 58, 0.1)",
        borderRadius: "10px",
        color: "var(--foreground)",
        fontSize: "14px",
        outline: "none",
        fontFamily: "var(--font-body)",
        transition: "border-color 0.2s",
    };

    const labelStyle: React.CSSProperties = {
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: "var(--text-muted)",
        marginBottom: "6px",
        display: "block",
    };

    const sectionTitle = (text: string) => (
        <div
            style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C8973A",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                marginTop: "20px",
            }}
        >
            <span style={{ flex: 1, height: "1px", background: "rgba(200,151,58,0.2)" }} />
            {text}
            <span style={{ flex: 1, height: "1px", background: "rgba(200,151,58,0.2)" }} />
        </div>
    );

    const card = (content: React.ReactNode, style?: React.CSSProperties) => (
        <div
            style={{
                background: "var(--surface)",
                border: "1px solid rgba(200, 151, 58, 0.1)",
                borderRadius: "16px",
                padding: "20px 24px",
                ...style,
            }}
        >
            {content}
        </div>
    );

    return (
        <section
            id="calculadora"
            style={{
                background: "var(--background)",
                padding: "80px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow */}
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "700px",
                    height: "300px",
                    background:
                        "radial-gradient(ellipse, rgba(200,151,58,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: "1120px",
                    margin: "0 auto",
                    padding: "0 24px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#C8973A",
                            marginBottom: "16px",
                        }}
                    >
                        <span style={{ width: "32px", height: "1px", background: "#C8973A" }} />
                        <Calculator style={{ width: "14px", height: "14px" }} />
                        Calculadora
                        <span style={{ width: "32px", height: "1px", background: "#C8973A" }} />
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 44px)",
                            fontWeight: 700,
                            color: "var(--foreground)",
                            margin: "0 0 12px",
                            lineHeight: 1.1,
                            fontFamily: "var(--font-display)",
                        }}
                    >
                        CLT ou PJ? Descubra o que vale mais.
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "520px", margin: "0 auto" }}>
                        Compare seu salário líquido real em ambas as modalidades com base nos seus dados.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    {/* ── CLT COLUMN ── */}
                    <div>
                        {card(
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            background: "rgba(56,130,246,0.12)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            color: "#60A5FA",
                                            fontFamily: "var(--font-display)",
                                        }}
                                    >
                                        C
                                    </div>
                                    <div>
                                        <div style={{ color: "var(--foreground)", fontWeight: 600, fontSize: "16px" }}>
                                            Regime CLT
                                        </div>
                                        <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                                            Carteira assinada
                                        </div>
                                    </div>
                                </div>

                                <label style={labelStyle}>Salário bruto mensal</label>
                                <div style={{ position: "relative", marginBottom: "16px" }}>
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: "12px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#8A9BB5",
                                            fontSize: "13px",
                                        }}
                                    >
                                        R$
                                    </span>
                                    <input
                                        type="number"
                                        value={salarioBruto}
                                        min={1320}
                                        step={100}
                                        onChange={(e) => setSalarioBruto(Number(e.target.value))}
                                        style={{ ...inputStyle, paddingLeft: "32px" }}
                                    />
                                </div>

                                {sectionTitle("Benefícios opcionais")}

                                {[
                                    { label: "Vale-refeição / alimentação", val: vr, set: setVr },
                                    { label: "Vale-transporte", val: vt, set: setVt },
                                    { label: "Plano de saúde", val: planoSaude, set: setPlanoSaude },
                                    { label: "Outros benefícios", val: outrosBeneficios, set: setOutrosBeneficios },
                                ].map(({ label, val, set }) => (
                                    <div key={label} style={{ marginBottom: "12px" }}>
                                        <label style={labelStyle}>{label}</label>
                                        <div style={{ position: "relative" }}>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    left: "12px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    color: "#8A9BB5",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                R$
                                            </span>
                                            <input
                                                type="number"
                                                value={val}
                                                min={0}
                                                step={50}
                                                onChange={(e) => set(Number(e.target.value))}
                                                style={{ ...inputStyle, paddingLeft: "32px" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* CLT Result */}
                        {card(
                            <>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <div style={{ fontSize: "11px", color: "#8A9BB5", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                                            Equivalente líquido CLT/mês
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "30px",
                                                fontWeight: 700,
                                                color: "#60A5FA",
                                                fontFamily: "var(--font-display)",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {fmt(clt.total)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowDetailCLT(!showDetailCLT)}
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "8px",
                                            color: "#8A9BB5",
                                            padding: "6px 10px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Detalhes
                                        {showDetailCLT ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                </div>

                                {showDetailCLT && (
                                    <div style={{ marginTop: "16px" }}>
                                        <LineItem label="Salário bruto" value={clt.bruto} />
                                        <LineItem label="(-) INSS" value={clt.inss} positive={false} indent />
                                        <LineItem label="(-) IRRF" value={clt.irrf} positive={false} indent />
                                        <LineItem label="= Salário líquido" value={clt.liquido} highlight />
                                        <LineItem label="(+) Férias + 1/3 líq. (÷12)" value={clt.feriasLiq} />
                                        <LineItem label="(+) 13º salário líq. (÷12)" value={clt.decimoTerceiro} />
                                        <LineItem label="(+) FGTS (8%)" value={clt.fgts} />
                                        {clt.vr > 0 && <LineItem label="(+) VR/VA" value={clt.vr} />}
                                        {clt.vt > 0 && <LineItem label="(+) Vale-transporte" value={clt.vt} />}
                                        {clt.planoSaude > 0 && <LineItem label="(+) Plano de saúde" value={clt.planoSaude} />}
                                        {clt.outrosBeneficios > 0 && <LineItem label="(+) Outros" value={clt.outrosBeneficios} />}
                                        <LineItem label="Total mensal equivalente" value={clt.total} highlight />
                                    </div>
                                )}
                            </>,
                            { borderColor: "rgba(56,130,246,0.25)", marginTop: "16px" }
                        )}
                    </div>

                    {/* ── PJ COLUMN ── */}
                    <div>
                        {card(
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            background: "rgba(200,151,58,0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            color: "#C8973A",
                                            fontFamily: "var(--font-display)",
                                        }}
                                    >
                                        P
                                    </div>
                                    <div>
                                        <div style={{ color: "var(--foreground)", fontWeight: 600, fontSize: "16px" }}>
                                            Regime PJ
                                        </div>
                                        <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                                            Pessoa jurídica
                                        </div>
                                    </div>
                                </div>

                                <label style={labelStyle}>Faturamento bruto mensal PJ</label>
                                <div style={{ position: "relative", marginBottom: "16px" }}>
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: "12px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#8A9BB5",
                                            fontSize: "13px",
                                        }}
                                    >
                                        R$
                                    </span>
                                    <input
                                        type="number"
                                        value={salarioBrutoPJ}
                                        min={1000}
                                        step={500}
                                        onChange={(e) => setSalarioBrutoPJ(Number(e.target.value))}
                                        style={{ ...inputStyle, paddingLeft: "32px" }}
                                    />
                                </div>

                                <label style={labelStyle}>Regime tributário (alíquota)</label>
                                <select
                                    value={aliquotaImposto}
                                    onChange={(e) => setAliquotaImposto(Number(e.target.value))}
                                    style={{ ...inputStyle, marginBottom: "16px", appearance: "auto", colorScheme: "dark" }}
                                >
                                    <option value={0.06}>Simples Nacional — 6%</option>
                                    <option value={0.11}>Simples Nacional — 11%</option>
                                    <option value={0.15}>Lucro Presumido — 15%</option>
                                    <option value={0.27}>Lucro Presumido — 27%</option>
                                    <option value={0.33}>Lucro Real — 33%</option>
                                </select>

                                {sectionTitle("Encargos opcionais")}

                                <label style={labelStyle}>Pró-labore (% do faturamento)</label>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                    <input
                                        type="range"
                                        min={10}
                                        max={100}
                                        step={5}
                                        value={pctProlabore}
                                        onChange={(e) => setPctProlabore(Number(e.target.value))}
                                        style={{ flex: 1, accentColor: "#C8973A" }}
                                    />
                                    <span style={{ color: "#C8973A", fontWeight: 700, minWidth: "40px", textAlign: "right" }}>
                                        {pctProlabore}%
                                    </span>
                                </div>
                                <div style={{ fontSize: "11px", color: "#8A9BB5", marginBottom: "16px" }}>
                                    INSS de 11% incide sobre {fmt(pj.prolaboreBase)} = {fmt(pj.inss)}
                                </div>

                                <label style={labelStyle}>Honorários contábeis / mês</label>
                                <div style={{ position: "relative" }}>
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: "12px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#8A9BB5",
                                            fontSize: "13px",
                                        }}
                                    >
                                        R$
                                    </span>
                                    <input
                                        type="number"
                                        value={custoContador}
                                        min={0}
                                        step={50}
                                        onChange={(e) => setCustoContador(Number(e.target.value))}
                                        style={{ ...inputStyle, paddingLeft: "32px" }}
                                    />
                                </div>
                            </>
                        )}

                        {/* PJ Result */}
                        {card(
                            <>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <div style={{ fontSize: "11px", color: "#8A9BB5", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                                            Líquido PJ/mês
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "30px",
                                                fontWeight: 700,
                                                color: "#C8973A",
                                                fontFamily: "var(--font-display)",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {fmt(pj.total)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowDetailPJ(!showDetailPJ)}
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "8px",
                                            color: "#8A9BB5",
                                            padding: "6px 10px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Detalhes
                                        {showDetailPJ ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                </div>

                                {showDetailPJ && (
                                    <div style={{ marginTop: "16px" }}>
                                        <LineItem label="Faturamento bruto PJ" value={pj.bruto} />
                                        <LineItem label={`(-) Impostos (${Math.round(aliquotaImposto * 100)}%)`} value={pj.imposto} positive={false} indent />
                                        <LineItem label="(-) INSS pró-labore (11%)" value={pj.inss} positive={false} indent />
                                        <LineItem label="(-) Contador" value={pj.contador} positive={false} indent />
                                        <LineItem label="= Líquido estimado" value={pj.total} highlight />
                                    </div>
                                )}
                            </>,
                            { borderColor: "rgba(200,151,58,0.3)", marginTop: "16px" }
                        )}
                    </div>
                </div>

                {/* ── VERDICT ── */}
                <div
                    style={{
                        marginTop: "24px",
                        borderRadius: "16px",
                        padding: "24px 28px",
                        background: tied
                            ? "rgba(255,255,255,0.04)"
                            : pjWins
                                ? "rgba(200,151,58,0.08)"
                                : "rgba(56,130,246,0.08)",
                        border: `1px solid ${tied
                                ? "rgba(255,255,255,0.08)"
                                : pjWins
                                    ? "rgba(200,151,58,0.3)"
                                    : "rgba(56,130,246,0.3)"
                            }`,
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "20px",
                        alignItems: "center",
                    }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            background: tied
                                ? "rgba(255,255,255,0.07)"
                                : pjWins
                                    ? "rgba(200,151,58,0.15)"
                                    : "rgba(56,130,246,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {tied ? (
                            <Minus size={22} color="#8A9BB5" />
                        ) : pjWins ? (
                            <TrendingUp size={22} color="#C8973A" />
                        ) : (
                            <TrendingDown size={22} color="#60A5FA" />
                        )}
                    </div>

                    {/* Text */}
                    <div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px", fontFamily: "var(--font-display)" }}>
                            {tied
                                ? "As duas opções são praticamente equivalentes"
                                : pjWins
                                    ? "PJ rende mais no seu cenário"
                                    : "CLT rende mais no seu cenário"}
                        </div>
                        <div style={{ fontSize: "13px", color: "#8A9BB5" }}>
                            {tied ? (
                                "Diferença inferior a R$50/mês. Considere estabilidade, benefícios e perfil profissional."
                            ) : pjWins ? (
                                <>
                                    O PJ gera{" "}
                                    <strong style={{ color: "#C8973A" }}>{fmt(Math.abs(diff))}/mês</strong> a mais que o CLT equivalente.
                                </>
                            ) : (
                                <>
                                    O CLT gera{" "}
                                    <strong style={{ color: "#60A5FA" }}>{fmt(Math.abs(diff))}/mês</strong> a mais que o PJ configurado.
                                </>
                            )}
                        </div>
                    </div>

                    {/* PJ mínimo */}
                    {pjMinimoEquivalente && (
                        <div style={{ textAlign: "right", borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "20px" }}>
                            <div style={{ fontSize: "11px", color: "#8A9BB5", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>
                                PJ mínimo para igualar
                            </div>
                            <div style={{ fontSize: "22px", fontWeight: 700, color: "#C8973A", fontFamily: "var(--font-display)" }}>
                                {fmt(pjMinimoEquivalente)}
                            </div>
                            <div style={{ fontSize: "11px", color: "#8A9BB5" }}>
                                {((pjMinimoEquivalente / salarioBruto - 1) * 100).toFixed(0)}% acima do CLT bruto
                            </div>
                        </div>
                    )}
                </div>

                {/* Info footer */}
                <div
                    style={{
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                    }}
                >
                    <Info size={14} color="var(--accent)" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                        Cálculo baseado na tabela INSS e IRRF 2024. O FGTS (8%) é pago pelo empregador e incluído como benefício. O PJ não considera plano de saúde, VR/VT e outros benefícios — compare esses custos separadamente. Valores estimativos; consulte nossos especialistas para uma análise personalizada.
                    </p>
                </div>
            </div>
        </section>
    );
};