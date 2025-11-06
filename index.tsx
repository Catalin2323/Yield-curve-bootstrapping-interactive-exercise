import React, { useState, useMemo } from "react";
import { createRoot } from "react-dom/client";

// --- STYLES ---
const styles = `
  :root {
    --bg-color: #1a1a1e;
    --primary-text: #e0e0e0;
    --secondary-text: #b0b0b0;
    --border-color: #333;
    --accent-color: #00aaff;
    --accent-hover: #0088cc;
    --surface-color: #25252b;
    --red: #ff5555;
    --green: #55ff55;
    --yellow: #ffff55;
    --blue: #55aaff;
    --purple: #aa55ff;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--bg-color);
    color: var(--primary-text);
    margin: 0;
    display: flex;
    justify-content: center;
    line-height: 1.6;
  }

  #root {
    width: 100%;
    max-width: 1400px;
    padding: 1rem;
  }

  .app-container {
    display: flex;
    gap: 1.5rem;
    height: calc(100vh - 2rem);
  }

  header {
    text-align: center;
    padding: 1rem 0 2rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1rem;
  }

  header h1 {
    font-size: 2.5rem;
    color: var(--accent-color);
    margin: 0;
    font-weight: 500;
  }
  
  header p {
      margin: 0.5rem 0 0;
      color: var(--secondary-text);
      font-size: 1rem;
  }

  .sidebar {
    flex: 0 0 250px;
    background-color: var(--surface-color);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    height: fit-content;
  }

  .sidebar button {
    display: block;
    width: 100%;
    padding: 0.8rem 1rem;
    margin-bottom: 0.5rem;
    border: none;
    background-color: transparent;
    color: var(--primary-text);
    text-align: left;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .sidebar button.active {
    background-color: var(--accent-color);
    color: #fff;
    font-weight: 500;
  }

  .sidebar button:not(.active):hover {
    background-color: var(--accent-hover);
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background-color: var(--surface-color);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  h2 {
    font-size: 1.8rem;
    color: var(--accent-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
    margin-top: 0;
  }

  h3 {
      font-size: 1.4rem;
      color: var(--primary-text);
      font-weight: 500;
      margin-top: 2rem;
  }
  
  h4 {
      font-size: 1.1rem;
      color: var(--primary-text);
      font-weight: 500;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
  }

  p, li {
    font-size: 1rem;
    color: var(--secondary-text);
  }
  
  code {
    font-family: 'Roboto Mono', monospace;
    background-color: var(--bg-color);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: var(--yellow);
  }
  
  .formula {
      background-color: var(--bg-color);
      padding: 1rem;
      border-radius: 5px;
      margin: 1rem 0;
      font-family: 'Roboto Mono', monospace;
      font-size: 1rem;
      border-left: 3px solid var(--accent-color);
  }

  .controls {
    margin: 1.5rem 0;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .controls label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .explanation-box {
    background-color: var(--bg-color);
    border: 1px solid var(--accent-color);
    border-left-width: 4px;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 4px;
  }

  .explanation-box h3 {
    margin-top: 0;
    color: var(--primary-text);
    font-size: 1.2rem;
  }
  
  .explanation-box p {
    margin-bottom: 0.5rem;
  }
  
  .explanation-box p:last-child {
    margin-bottom: 0;
  }
  
  .chart-container {
    margin-top: 2rem;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0 2rem;
    font-size: 0.9rem;
  }

  .data-table th, .data-table td {
    border: 1px solid var(--border-color);
    padding: 0.6rem 0.8rem;
    text-align: right;
  }
  
  .data-table th {
    background-color: var(--bg-color);
    color: var(--accent-color);
    font-weight: 500;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #2c2c34;
  }
  
  .data-table td:first-child {
    text-align: center;
    font-weight: 500;
  }

  .input-table {
    width: auto;
    margin-top: 1rem;
  }
  
  .input-table input {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    color: var(--primary-text);
    padding: 0.5rem;
    border-radius: 4px;
    width: 80px;
    text-align: right;
  }
  
  .input-table button {
    background: transparent;
    border: none;
    color: var(--red);
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .input-controls {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      align-items: center;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--accent-color);
    background-color: var(--accent-color);
    color: #fff;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .btn:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
  }
  
  .btn:disabled {
      background-color: var(--border-color);
      border-color: var(--border-color);
      color: var(--secondary-text);
      cursor: not-allowed;
  }

  .btn-secondary {
      background-color: transparent;
      color: var(--accent-color);
  }

  .btn-secondary:hover {
      background-color: rgba(0, 170, 255, 0.1);
  }

  .file-input {
    position: relative;
    display: inline-block;
  }
  .file-input input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .results-container {
    margin-top: 2rem;
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
  }

  .swap-valuation-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .swap-inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .swap-inputs label {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
  }
  
  .swap-inputs input {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    color: var(--primary-text);
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
  }

  .swap-results {
    background-color: var(--bg-color);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }
  
  .swap-results p {
    margin: 0 0 0.8rem;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }
  
  .swap-results p span:first-child {
    color: var(--secondary-text);
  }
  
  .swap-results p span:last-child {
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
    color: var(--primary-text);
  }
  
  .swap-results hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 1rem 0;
  }
  
  .swap-results .final-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--accent-color);
  }

`;

// --- MATH & BOOTSTRAPPING LOGIC ---

// Solves a tridiagonal system of linear equations, needed for cubic splines.
const solveTridiagonal = (a, b, c, d) => {
    const n = d.length;
    const c_prime = new Array(n).fill(0);
    const d_prime = new Array(n).fill(0);
    const x = new Array(n).fill(0);

    c_prime[0] = c[0] / b[0];
    d_prime[0] = d[0] / b[0];

    for (let i = 1; i < n; i++) {
        const m = 1.0 / (b[i] - a[i] * c_prime[i - 1]);
        c_prime[i] = c[i] * m;
        d_prime[i] = (d[i] - a[i] * d_prime[i - 1]) * m;
    }

    x[n - 1] = d_prime[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        x[i] = d_prime[i] - c_prime[i] * x[i + 1];
    }
    return x;
};

// Creates a function for cubic spline interpolation.
const createCubicSplineInterpolator = (points) => {
    const n = points.length;
    if (n < 2) return (x) => (points.length > 0 ? points[0].y : 0);

    const sortedPoints = [...points].sort((a, b) => a.x - b.x);
    const x = sortedPoints.map(p => p.x);
    const y = sortedPoints.map(p => p.y);

    const h = new Array(n - 1);
    for (let i = 0; i < n - 1; i++) h[i] = x[i + 1] - x[i];

    const a_sub = new Array(n - 2);
    for (let i = 0; i < n - 2; i++) a_sub[i] = h[i];

    const b_sub = new Array(n - 2);
    for (let i = 0; i < n - 2; i++) b_sub[i] = 2 * (h[i] + h[i + 1]);

    const c_sub = new Array(n - 2);
    for (let i = 0; i < n - 2; i++) c_sub[i] = h[i + 1];

    const d_sub = new Array(n - 2);
    for (let i = 0; i < n - 2; i++) {
        d_sub[i] = 6 * ((y[i + 2] - y[i + 1]) / h[i + 1] - (y[i + 1] - y[i]) / h[i]);
    }

    const m = solveTridiagonal(a_sub, b_sub, c_sub, d_sub);
    const M = [0, ...m, 0]; // Natural spline condition

    const c = new Array(n - 1);
    const d = new Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
        c[i] = y[i] / h[i] - M[i] * h[i] / 6;
        d[i] = y[i+1] / h[i] - M[i+1] * h[i] / 6;
    }

    return (xi) => {
        let i = 0;
        while (i < x.length - 2 && xi > x[i + 1]) {
            i++;
        }
        const t1 = M[i] * Math.pow(x[i+1] - xi, 3) / (6 * h[i]);
        const t2 = M[i+1] * Math.pow(xi - x[i], 3) / (6 * h[i]);
        const t3 = c[i] * (x[i+1] - xi);
        const t4 = d[i] * (xi - x[i]);
        return t1 + t2 + t3 + t4;
    };
};

// Creates a function for linear interpolation.
const createLinearInterpolator = (points) => {
    if (points.length === 0) return () => 0;
    const sortedPoints = [...points].sort((a, b) => a.x - b.x);
    return (x) => {
        if (sortedPoints.length === 0) return 0;
        if (x <= sortedPoints[0].x) return sortedPoints[0].y;
        if (x >= sortedPoints[sortedPoints.length - 1].x) return sortedPoints[sortedPoints.length - 1].y;

        const i = sortedPoints.findIndex(p => p.x > x) - 1;
        const p1 = sortedPoints[i];
        const p2 = sortedPoints[i + 1];
        if (!p1 || !p2) return sortedPoints[0].y; 
        
        return p1.y + (p2.y - p1.y) * (x - p1.x) / (p2.x - p1.x);
    };
};

const singleCurveInstruments = [
    { tenor: 0.25, rate: 0.050 }, // 3m deposit
    { tenor: 0.50, rate: 0.052 }, // 6m deposit/FRA
    { tenor: 1.00, rate: 0.055 }, // 1y swap
    { tenor: 2.00, rate: 0.058 }, // 2y swap
    { tenor: 3.00, rate: 0.060 }, // 3y swap
    { tenor: 5.00, rate: 0.062 }, // 5y swap
    { tenor: 7.00, rate: 0.063 }, // 7y swap
    { tenor: 10.0, rate: 0.065 }, // 10y swap
];

// Single curve bootstrapping logic
const bootstrapSingleCurve = (instruments, interpolatorFactory) => {
    const knownPoints = [{x: 0, y: 1}]; // DF(0)=1
    const zeroRates = [{x: 0, y: 0}];

    for (const instrument of instruments) {
        const T = instrument.tenor;
        const R = instrument.rate;
        
        let df;
        if (T <= 0.5) { // Simple rate for deposits
            df = 1 / (1 + R * T);
        } else { // Swap rates (assuming annual payments for simplicity)
            const interpolator = interpolatorFactory(knownPoints);
            let sumDf = 0;
            for (let t = 1; t < T; t++) {
                sumDf += interpolator(t);
            }
            df = (1 - R * sumDf) / (1 + R);
        }
        const zeroRate = -Math.log(df) / T;
        knownPoints.push({ x: T, y: df });
        zeroRates.push({ x: T, y: zeroRate });
    }
    return zeroRates;
};

// Data for multi-curve
const oisInstruments = [
    { tenor: 0.25, rate: 0.045 },
    { tenor: 0.5, rate: 0.046 },
    { tenor: 1.0, rate: 0.048 },
    { tenor: 2.0, rate: 0.050 },
    { tenor: 5.0, rate: 0.053 },
    { tenor: 10.0, rate: 0.055 },
];

const liborInstruments = [
    { tenor: 0.25, rate: 0.050 },
    { tenor: 0.5, rate: 0.052 },
    { tenor: 1.0, rate: 0.055 },
    { tenor: 2.0, rate: 0.058 },
    { tenor: 5.0, rate: 0.062 },
    { tenor: 10.0, rate: 0.065 },
];

// Dual curve bootstrapping logic - CORRECTED IMPLEMENTATION
const bootstrapMultiCurve = (ois, libor, interpolatorFactory) => {
    // 1. Bootstrap OIS curve to get discount factors
    const oisRawZeroRates = bootstrapSingleCurve(ois, interpolatorFactory);
    const dfOisInterpolator = interpolatorFactory(
      oisRawZeroRates.map(p => ({ x: p.x, y: Math.exp(-p.y * p.x) }))
    );

    // 2. Bootstrap LIBOR (forwarding) curve using OIS discount factors
    const knownFwdDfPoints = [{x: 0, y: 1}];
    const forwardZeroRates = [{x: 0, y: 0}];

    for (const instrument of libor) {
        const T = instrument.tenor;
        const R = instrument.rate;
        
        let fwdDf;
        if (T <= 0.5) { // Simple rate for short-term instruments
            fwdDf = 1 / (1 + R * T);
        } else { // Swap rates
            const fwdDfInterpolator = interpolatorFactory(knownFwdDfPoints);
            
            // Annuity: Sum of OIS discount factors for the fixed leg
            let sumAnnuity = 0;
            for (let t = 1; t <= T; t++) {
                sumAnnuity += dfOisInterpolator(t);
            }
            const pvFixedLeg = R * sumAnnuity;
            
            // PV of known floating leg payments
            let sumKnownFloating = 0;
            for (let t = 1; t < T; t++) {
                // Forward rate F(t-1, t) = (DF_fwd(t-1) / DF_fwd(t) - 1)
                const forwardPayment = (fwdDfInterpolator(t-1) / fwdDfInterpolator(t) - 1) * dfOisInterpolator(t);
                sumKnownFloating += forwardPayment;
            }
            const numerator = fwdDfInterpolator(T - 1) * dfOisInterpolator(T);
            const denominator = pvFixedLeg - sumKnownFloating + dfOisInterpolator(T);

            fwdDf = numerator / denominator;
        }
        
        knownFwdDfPoints.push({ x: T, y: fwdDf });
        const zeroRate = -Math.log(fwdDf) / T;
        forwardZeroRates.push({ x: T, y: zeroRate });
    }
    
    return { oisZeroRates: oisRawZeroRates, forwardZeroRates };
};


// --- UI COMPONENTS ---

const YieldCurveChart = ({ dataSets, width = 800, height = 450, title }) => {
    const padding = { top: 40, right: 150, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const allPoints = dataSets.flatMap(ds => [...ds.points, ...(ds.rawPoints || [])]);
    const xMax = Math.max(...allPoints.map(p => p.x), 0);
    const yMax = Math.max(...allPoints.map(p => p.y), 0) * 1.1;

    const xScale = (x) => (x / xMax) * chartWidth;
    const yScale = (y) => chartHeight - (y / yMax) * chartHeight;

    const linePath = (points) => {
        if (points.length === 0) return "";
        let path = `M ${xScale(points[0].x)} ${yScale(points[0].y)}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${xScale(points[i].x)} ${yScale(points[i].y)}`;
        }
        return path;
    };

    const xAxisTicks = Array.from({ length: Math.floor(xMax) + 1 }, (_, i) => i).filter(i => i % Math.ceil(xMax / 10) === 0 || i === Math.floor(xMax));
    const yAxisTicks = Array.from({ length: 6 }, (_, i) => (yMax / 5) * i);

    return (
      <div className="chart-container" aria-label={`Yield curve chart: ${title}`}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Title */}
            <text x={chartWidth / 2} y={-10} textAnchor="middle" fill="var(--primary-text)" fontSize="18" fontWeight="500">{title}</text>
            
            {/* Grid lines */}
            {yAxisTicks.map((tick, i) => (
              <line key={`y-grid-${i}`} x1="0" y1={yScale(tick)} x2={chartWidth} y2={yScale(tick)} stroke="var(--border-color)" strokeDasharray="2,2" />
            ))}
             {xAxisTicks.map((tick, i) => (
              <line key={`x-grid-${i}`} x1={xScale(tick)} y1="0" x2={xScale(tick)} y2={chartHeight} stroke="var(--border-color)" strokeDasharray="2,2" />
            ))}

            {/* Axes */}
            <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="var(--secondary-text)" />
            <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="var(--secondary-text)" />
            
            {/* X-axis ticks and labels */}
            {xAxisTicks.map((tick) => (
              <g key={`x-tick-${tick}`} transform={`translate(${xScale(tick)}, ${chartHeight})`}>
                <line y2="5" stroke="var(--secondary-text)" />
                <text y="20" textAnchor="middle" fill="var(--secondary-text)" fontSize="12">{tick}Y</text>
              </g>
            ))}
             <text x={chartWidth/2} y={chartHeight + 45} textAnchor="middle" fill="var(--primary-text)" fontSize="14">Tenor (Years)</text>
            
            {/* Y-axis ticks and labels */}
            {yAxisTicks.map((tick) => (
              <g key={`y-tick-${tick}`} transform={`translate(0, ${yScale(tick)})`}>
                <line x2="-5" stroke="var(--secondary-text)" />
                <text x="-10" dy="0.32em" textAnchor="end" fill="var(--secondary-text)" fontSize="12">{(tick * 100).toFixed(2)}%</text>
              </g>
            ))}
            <text transform={`translate(${-45}, ${chartHeight/2}) rotate(-90)`} textAnchor="middle" fill="var(--primary-text)" fontSize="14">Rate</text>

            {/* Lines and points */}
            {dataSets.map((ds, i) => (
              <g key={i}>
                <path d={linePath(ds.points)} fill="none" stroke={ds.color} strokeWidth="2" />
                {ds.showPoints && ds.rawPoints && ds.rawPoints.map((p, j) => (
                   <circle key={j} cx={xScale(p.x)} cy={yScale(p.y)} r="4" fill={ds.color} />
                ))}
              </g>
            ))}
            
            {/* Legend */}
            {dataSets.map((ds, i) => (
               <g key={`legend-${i}`} transform={`translate(${chartWidth + 20}, ${20 + i * 25})`}>
                  <rect width="15" height="15" fill={ds.color} />
                  <text x="25" y="12" fill="var(--primary-text)" fontSize="12">{ds.label}</text>
               </g>
            ))}
          </g>
        </svg>
      </div>
    );
};

const IntroSection = () => (
    <div>
        <h2>Welcome to the Yield Curve Interactive Tutorial</h2>
        <p>This application is designed to provide an intuitive, hands-on understanding of yield curve construction for aspiring quantitative analysts.</p>
        <p>A <strong>yield curve</strong> is a fundamental tool in finance, representing the relationship between interest rates (or cost of borrowing) and the time to maturity of the debt for a given borrower in a given currency.</p>
        <p>The process of building a yield curve from market prices of various debt instruments (like deposits, futures, and swaps) is called <strong>bootstrapping</strong>. It involves sequentially calculating zero-coupon rates for various maturities.</p>
        <p>Use the navigation on the left to explore different concepts:</p>
        <ul>
            <li><strong>Single-Curve Bootstrapping:</strong> The classic approach where the same curve is used for both discounting future cash flows and projecting forward rates.</li>
            <li><strong>Multi-Curve Bootstrapping:</strong> The modern, post-2008 financial crisis framework that uses separate curves for discounting and forecasting.</li>
            <li><strong>Valuation Exercise:</strong> Apply your knowledge by building a curve from your own data and valuing a swap.</li>
            <li><strong>Methodology:</strong> Review the core mathematical formulas and reasoning behind the calculations.</li>
        </ul>
    </div>
);

const SingleCurveSection = () => {
    const [interpolation, setInterpolation] = useState('cubic');

    const { curve, rawPoints, tableData } = useMemo(() => {
        const interpolatorFactory = interpolation === 'linear' ? createLinearInterpolator : createCubicSplineInterpolator;
        const rawPoints = bootstrapSingleCurve(singleCurveInstruments, interpolatorFactory);
        const interpolator = interpolatorFactory(rawPoints);
        
        const curvePoints = [];
        for (let t = 0; t <= 10; t += 0.1) {
            curvePoints.push({ x: t, y: interpolator(t) });
        }
        
        const tableData = [];
        const marketRateInterpolator = interpolatorFactory(
            singleCurveInstruments.map(i => ({ x: i.tenor, y: i.rate }))
        );
        
        const discountFactors = { 0: 1.0 }; 
        
        for (let T = 1; T <= 20; T++) {
            const R = marketRateInterpolator(T);
            let sumDf = 0;
            for (let t = 1; t < T; t++) {
                sumDf += discountFactors[t];
            }

            const df = (1 - R * sumDf) / (1 + R);
            discountFactors[T] = df;

            const zeroRateAnnually = Math.pow(1 / df, 1 / T) - 1;
            const continuousRate = -Math.log(df) / T;

            tableData.push({
                maturity: T,
                marketRate: R,
                discountFactor: df,
                zeroRate: zeroRateAnnually,
                continuousRate: continuousRate,
            });
        }
        
        return { curve: curvePoints, rawPoints, tableData };
    }, [interpolation]);

    return (
        <div>
            <h2>Single-Curve Bootstrapping & Interpolation</h2>
            <p>In the single-curve framework, it's assumed that the curve for discounting cash flows and the curve for projecting forward rates are one and the same. We use a set of market instruments (deposits, swaps) to derive a set of "pillar points" for our zero-coupon curve.</p>
            
            <div className="explanation-box">
                <h3>What is a Zero Rate?</h3>
                <p>The curve you see on the chart is a <strong>zero-coupon rate curve</strong>. A zero rate represents the yield-to-maturity of a zero-coupon bond for a specific maturity.</p>
                <p>We derive these rates from <strong>Discount Factors (DFs)</strong>, which represent the present value of one unit of currency to be received at a future time. The relationship is: <code>Zero Rate = -ln(DF) / T</code>. The bootstrapping process first finds the DFs and then converts them into these more intuitive zero rates.</p>
                <p>Zero rates are crucial in finance because they form the fundamental building block for pricing most financial instruments, allowing for the accurate valuation of individual future cash flows.</p>
            </div>

            <div className="explanation-box">
                <h3>Understanding Interpolation</h3>
                <p>Bootstrapping gives us zero rates at specific "pillar" maturities (e.g., 1Y, 2Y, 5Y), but for pricing and risk management, we need rates for any date in between (e.g., 2.5Y). Interpolation is the mathematical technique used to estimate these intermediate values.</p>

                <h4>Linear Interpolation</h4>
                <p>This is the simplest method. It assumes a straight line connects two consecutive pillar points. For a maturity <code>x</code> between two pillars <code>(x1, y1)</code> and <code>(x2, y2)</code>, the interpolated rate <code>y</code> is calculated as:</p>
                <p className="formula">y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)</p>
                <p><strong>Pros:</strong> Simple to implement and understand. <strong>Cons:</strong> The resulting curve is not smooth and has "kinks" at the pillar points, which can be unrealistic for forward rate calculations.</p>
                
                <h4>Cubic Spline Interpolation</h4>
                <p>This method creates a much smoother curve by fitting a unique cubic polynomial between each pair of pillar points. A cubic polynomial has the form:</p>
                <p className="formula">S(x) = a*x³ + b*x² + c*x + d</p>
                <p>The coefficients (a, b, c, d) for each segment are calculated by solving a system of equations. These equations enforce conditions to ensure the curve not only passes through all pillar points but also that its first and second derivatives are continuous at these points. This continuity is what gives the curve its smoothness.</p>
                <p><strong>Pros:</strong> Produces a smooth, continuously differentiable curve (C² continuity), which is generally considered more realistic for financial modeling. <strong>Cons:</strong> More computationally intensive and complex to implement.</p>
            </div>

            <div className="controls">
                <strong>Select Method to Visualize:</strong>
                <label>
                    <input type="radio" name="interpolation" value="cubic" checked={interpolation === 'cubic'} onChange={() => setInterpolation('cubic')} />
                    Cubic Spline
                </label>
                <label>
                    <input type="radio" name="interpolation" value="linear" checked={interpolation === 'linear'} onChange={() => setInterpolation('linear')} />
                    Linear
                </label>
            </div>

            <YieldCurveChart
                title={`Single-Curve Zero Rates (${interpolation === 'cubic' ? 'Cubic Spline' : 'Linear'})`}
                dataSets={[{
                    label: 'Zero Curve',
                    color: 'var(--green)',
                    points: curve,
                    rawPoints: rawPoints,
                    showPoints: true,
                }]}
            />

            <h3>Bootstrapping Process Breakdown</h3>
            <p>The table below shows a step-by-step breakdown of the bootstrapping process for annual maturities. Each row is calculated sequentially using the discount factors from the preceding rows.</p>
             <table className="data-table">
              <thead>
                <tr>
                  <th>Maturity (Y)</th>
                  <th>Market Swap Rate</th>
                  <th>Discount Factor</th>
                  <th>Zero Rate (Annually)</th>
                  <th>Continuous Rate</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row.maturity}>
                    <td>{row.maturity}</td>
                    <td>{(row.marketRate * 100).toFixed(4)}%</td>
                    <td>{row.discountFactor.toFixed(6)}</td>
                    <td>{(row.zeroRate * 100).toFixed(4)}%</td>
                    <td>{(row.continuousRate * 100).toFixed(4)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};

const MultiCurveSection = () => {
    const { singleCurve, oisCurve, forwardCurve, calculationData } = useMemo(() => {
        const interpolatorFactory = createCubicSplineInterpolator;
        const single = bootstrapSingleCurve(singleCurveInstruments, interpolatorFactory);
        const { oisZeroRates, forwardZeroRates } = bootstrapMultiCurve(oisInstruments, liborInstruments, interpolatorFactory);
        
        const createSmoothCurve = (points) => {
            const interpolator = interpolatorFactory(points);
            const curve = [];
            for (let t = 0; t <= 10; t += 0.1) {
                if (t >= points[0].x) curve.push({ x: t, y: interpolator(t) });
            }
            return curve;
        };

        const tableData = [];
        const dfOisInterpolator = interpolatorFactory(
          oisZeroRates.map(p => ({ x: p.x, y: Math.exp(-p.y * p.x) }))
        );
        const knownFwdDfPoints = [{x: 0, y: 1}];

        for (const instrument of liborInstruments) {
            const T = instrument.tenor;
            const R = instrument.rate;
            
            if (T > 0.5) { // Only show swaps
                const fwdDfInterpolator = interpolatorFactory(knownFwdDfPoints);
                
                let sumAnnuity = 0;
                for (let t = 1; t <= T; t++) sumAnnuity += dfOisInterpolator(t);
                const pvFixedLeg = R * sumAnnuity;

                let sumKnownFloating = 0;
                for (let t = 1; t < T; t++) {
                    const forwardPayment = (fwdDfInterpolator(t-1) / fwdDfInterpolator(t) - 1) * dfOisInterpolator(t);
                    sumKnownFloating += forwardPayment;
                }
                
                const numerator = dfOisInterpolator(T) * fwdDfInterpolator(T-1);
                const denominator = pvFixedLeg - sumKnownFloating + dfOisInterpolator(T);
                const fwdDf = numerator / denominator;
                const forwardZeroRate = -Math.log(fwdDf) / T;
                
                knownFwdDfPoints.push({ x: T, y: fwdDf });

                const fwdRate1Y = (fwdDfInterpolator(T-1)/fwdDf - 1);

                tableData.push({
                    maturity: T,
                    liborRate: R,
                    pvFixed: pvFixedLeg,
                    pvKnownFloating: sumKnownFloating,
                    fwdDf: fwdDf,
                    fwdZeroRate: forwardZeroRate,
                    fwdRate1Y: fwdRate1Y,
                });
            } else {
                 const df = 1 / (1 + R * T);
                 knownFwdDfPoints.push({ x: T, y: df });
            }
        }
        
        return {
            singleCurve: createSmoothCurve(single),
            oisCurve: createSmoothCurve(oisZeroRates),
            forwardCurve: createSmoothCurve(forwardZeroRates),
            calculationData: tableData,
        };
    }, []);

    return (
        <div>
            <h2>Multi-Curve / Dual-Curve Bootstrapping</h2>
            <p>The 2008 financial crisis revealed that the single-curve assumption was flawed. Different interest rates carried different levels of credit risk.</p>
            
             <div className="explanation-box">
                <h3>The Dual-Curve Logic</h3>
                <p>The multi-curve framework separates the process into two distinct curves:</p>
                <ul>
                    <li>A <strong>Discounting Curve</strong> (OIS) used to calculate the present value (PV) of all future cash flows.</li>
                    <li>A <strong>Forecasting Curve</strong> (LIBOR) used to project or "forecast" future floating interest rate payments.</li>
                </ul>
                <p>First, we build the OIS curve. Then, to build the forward curve, we price a market LIBOR swap, using our OIS curve to discount all payments, and then solve for the forward rates that make the equation hold true.</p>
            </div>

            <p>The chart below illustrates this separation. Notice how the OIS (discounting) curve is the lowest, reflecting its lower risk.</p>
            
            <YieldCurveChart
                title="Single-Curve vs. Multi-Curve Framework"
                dataSets={[
                    { label: 'Discount Curve (OIS)', color: 'var(--blue)', points: oisCurve },
                    { label: 'Forward Curve (LIBOR)', color: 'var(--yellow)', points: forwardCurve },
                    { label: 'Classic Single Curve', color: 'var(--red)', points: singleCurve },
                ]}
            />
            
            <h3>Dual-Curve Calculation Breakdown</h3>
            <p>The following table shows the iterative process of building the forward (LIBOR) curve. At each step, we use the OIS discount factors and previously calculated forward rates to solve for the next point on the forward curve.</p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Maturity (T)</th>
                  <th>Market LIBOR Rate</th>
                  <th>PV Fixed Leg</th>
                  <th>Forward DF</th>
                  <th>Forward Zero Rate</th>
                  <th>1Y Forward Rate</th>
                </tr>
              </thead>
              <tbody>
                {calculationData.map(row => (
                  <tr key={row.maturity}>
                    <td>{row.maturity}Y</td>
                    <td>{(row.liborRate * 100).toFixed(3)}%</td>
                    <td>{row.pvFixed.toFixed(5)}</td>
                    <td>{row.fwdDf.toFixed(6)}</td>
                    <td>{(row.fwdZeroRate * 100).toFixed(4)}%</td>
                    <td>{(row.fwdRate1Y * 100).toFixed(4)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};


const ValuationExerciseSection = () => {
    const [inputData, setInputData] = useState([
        { id: 1, maturity: '1', rate: '5.5' },
        { id: 2, maturity: '2', rate: '5.8' },
        { id: 3, maturity: '5', rate: '6.2' },
        { id: 4, maturity: '10', rate: '6.5' },
    ]);
    const [calculationStep, setCalculationStep] = useState(0); // 0: initial, 1: DF, 2: Zero, 3: Continuous
    const [results, setResults] = useState({ tableData: null, forwardRates: null, chartData: null });
    const [swapParams, setSwapParams] = useState({ notional: '1000000', fixedRate: '6.0', maturity: '5' });
    const [swapValueResult, setSwapValueResult] = useState(null);

    const handleInputChange = (id, field, value) => {
        setInputData(inputData.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const handleSwapParamChange = (field, value) => {
        setSwapParams(prev => ({ ...prev, [field]: value }));
    };

    const addRow = () => {
        const newId = (inputData[inputData.length - 1]?.id || 0) + 1;
        setInputData([...inputData, { id: newId, maturity: '', rate: '' }]);
    };

    const removeRow = (id) => {
        setInputData(inputData.filter(row => row.id !== id));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            if (typeof text === 'string') {
                const rows = text.split('\n').filter(row => row.trim() !== '');
                const newData = rows.map((row, index) => {
                    const [maturity, rate] = row.split(/[,;]/);
                    return { id: index + 1, maturity: maturity?.trim() || '', rate: rate?.trim() || '' };
                });
                setInputData(newData);
                reset();
            }
        };
        reader.readAsText(file);
    };

    const startCalculation = () => {
        const parsedData = inputData
            .map(row => ({ x: parseFloat(row.maturity), y: parseFloat(row.rate) / 100 }))
            .filter(p => !isNaN(p.x) && !isNaN(p.y) && p.x > 0)
            .sort((a, b) => a.x - b.x);

        if (parsedData.length < 2) {
            alert("Please provide at least two valid data points.");
            return;
        }

        const marketRateInterpolator = createLinearInterpolator(parsedData);
        const maxMaturity = Math.max(...parsedData.map(p => p.x));
        const endYear = Math.max(20, Math.ceil(maxMaturity));
        const tableData = [];
        const discountFactors = { 0: 1.0 };

        for (let T = 1; T <= endYear; T++) {
            const R = marketRateInterpolator(T);
            let sumDf = 0;
            for (let t = 1; t < T; t++) {
                sumDf += discountFactors[t];
            }
            const df = (1 - R * sumDf) / (1 + R);
            discountFactors[T] = df;

            const zeroRateAnnually = Math.pow(1 / df, 1 / T) - 1;
            const continuousRate = -Math.log(df) / T;

            tableData.push({
                maturity: T,
                marketRate: R,
                discountFactor: df,
                zeroRate: zeroRateAnnually,
                continuousRate: continuousRate,
            });
        }
        
        const forwardRates = [];
        for (let T = 1; T <= endYear; T++) {
            const df_prev = discountFactors[T - 1];
            const df_curr = discountFactors[T];
            const forwardRate = (df_prev / df_curr - 1); // for 1-year period
            forwardRates.push({ maturity: T, rate: forwardRate });
        }
        
        // Prepare chart data
        const zeroRatePoints = tableData.map(r => ({ x: r.maturity, y: r.zeroRate }));
        const forwardRatePoints = forwardRates.map(r => ({ x: r.maturity, y: r.rate }));

        const zeroInterpolator = createLinearInterpolator(zeroRatePoints);
        const forwardInterpolator = createLinearInterpolator(forwardRatePoints);

        const smoothZeroCurve = [];
        const smoothForwardCurve = [];
        for (let t = 1; t <= endYear; t += 0.1) {
            smoothZeroCurve.push({ x: t, y: zeroInterpolator(t) });
            smoothForwardCurve.push({ x: t, y: forwardInterpolator(t) });
        }

        const chartData = [
            {
                label: 'Bootstrapped Zero Curve',
                color: 'var(--green)',
                points: smoothZeroCurve,
                rawPoints: [],
                showPoints: false,
            },
            {
                label: 'Implied 1Y Forward Curve',
                color: 'var(--yellow)',
                points: smoothForwardCurve,
                rawPoints: [],
                showPoints: false,
            },
            {
                label: 'Market Swap Rates',
                color: 'var(--accent-color)',
                points: [], // No line for market rates
                rawPoints: parsedData, // raw market points
                showPoints: true,
            }
        ];


        setResults({ tableData, forwardRates, chartData });
        setCalculationStep(1);
    };
    
    const handleValueSwap = () => {
        const notional = parseFloat(swapParams.notional);
        const fixedRate = parseFloat(swapParams.fixedRate) / 100;
        const maturity = parseInt(swapParams.maturity, 10);
        
        if (isNaN(notional) || isNaN(fixedRate) || isNaN(maturity) || maturity <= 0) {
            alert("Please enter valid swap parameters.");
            return;
        }
        
        if (!results.tableData || results.tableData.length < maturity) {
            alert("The bootstrapped curve does not extend to the swap's maturity. Please adjust data or maturity.");
            return;
        }

        const dfInterpolator = createLinearInterpolator(
            [{x: 0, y: 1}, ...results.tableData.map(r => ({x: r.maturity, y: r.discountFactor}))]
        );

        let pvFixed = 0;
        for (let t = 1; t <= maturity; t++) {
            const fixedPayment = notional * fixedRate;
            pvFixed += fixedPayment * dfInterpolator(t);
        }

        // Using the simplification PV_float = N * (DF(0) - DF(T)) = N * (1 - DF(T))
        const pvFloating = notional * (1 - dfInterpolator(maturity));
        
        setSwapValueResult({
            pvFixed,
            pvFloating,
            swapValue: pvFloating - pvFixed,
        });
    };

    const nextStep = () => {
        if (calculationStep > 0 && calculationStep < 3) {
            setCalculationStep(prev => prev + 1);
        }
    };

    const reset = () => {
        setCalculationStep(0);
        setResults({ tableData: null, forwardRates: null, chartData: null });
        setSwapValueResult(null);
    };
    
    const formatCurrency = (value) => {
      if (value === null || value === undefined) return 'N/A';
      return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return (
        <div>
            <h2>Valuation Exercise</h2>
            <p>Apply your knowledge by building a yield curve from custom data, and then use that curve to price an interest rate swap.</p>
            
            <h3>1. Provide Market Data</h3>
            <table className="data-table input-table">
                <thead>
                    <tr><th>Maturity (Years)</th><th>Rate (%)</th><th></th></tr>
                </thead>
                <tbody>
                    {inputData.map(row => (
                        <tr key={row.id}>
                            <td><input type="number" value={row.maturity} onChange={e => handleInputChange(row.id, 'maturity', e.target.value)} placeholder="e.g., 1" /></td>
                            <td><input type="number" value={row.rate} onChange={e => handleInputChange(row.id, 'rate', e.target.value)} placeholder="e.g., 5.5" /></td>
                            <td><button onClick={() => removeRow(row.id)}>&times;</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="input-controls">
                <button onClick={addRow} className="btn btn-secondary">Add Row</button>
                <div className="file-input">
                    <button className="btn btn-secondary">Upload CSV</button>
                    <input type="file" accept=".csv,.txt" onChange={handleFileUpload} />
                </div>
            </div>

            <h3>2. Run Calculation</h3>
            <div className="controls">
                {calculationStep === 0 ? (
                    <button onClick={startCalculation} className="btn">Start Exercise</button>
                ) : (
                    <>
                        <button onClick={nextStep} className="btn" disabled={calculationStep >= 3}>Next Step</button>
                        <button onClick={reset} className="btn btn-secondary">Reset</button>
                    </>
                )}
            </div>

            {results.tableData && (
                <div className="results-container">
                    <h3>3. Bootstrapped Curve Results</h3>
                     {results.chartData && (
                        <YieldCurveChart
                            title="Calculated Yield Curves & Market Data"
                            dataSets={results.chartData}
                        />
                    )}
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Maturity (Y)</th>
                                <th>Market Swap Rate</th>
                                {calculationStep >= 1 && <th>Discount Factor</th>}
                                {calculationStep >= 2 && <th>Zero Rate (Annually)</th>}
                                {calculationStep >= 3 && <th>Continuous Rate</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {results.tableData.map(row => (
                                <tr key={row.maturity}>
                                    <td>{row.maturity}</td>
                                    <td>{(row.marketRate * 100).toFixed(4)}%</td>
                                    {calculationStep >= 1 && <td>{row.discountFactor.toFixed(6)}</td>}
                                    {calculationStep >= 2 && <td>{(row.zeroRate * 100).toFixed(4)}%</td>}
                                    {calculationStep >= 3 && <td>{(row.continuousRate * 100).toFixed(4)}%</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>4. Implied Forward Rates</h3>
                    <p>These are the 1-year forward rates implied by the bootstrapped discount factors. They are crucial for valuing the floating leg of a swap.</p>
                    <table className="data-table">
                         <thead>
                            <tr><th>Period</th><th>1Y Forward Rate</th></tr>
                         </thead>
                         <tbody>
                            {results.forwardRates.map(row => (
                                <tr key={row.maturity}>
                                    <td>{row.maturity - 1}Y - {row.maturity}Y</td>
                                    <td>{(row.rate * 100).toFixed(4)}%</td>
                                </tr>
                            ))}
                         </tbody>
                    </table>

                    <h3>5. Price an Interest Rate Swap</h3>
                    <p>Define the parameters of a plain vanilla interest rate swap. The valuation will use the curve you just built.</p>
                     <div className="swap-valuation-grid">
                        <div className="swap-inputs">
                            <label>
                                <span>Notional</span>
                                <input type="number" value={swapParams.notional} onChange={e => handleSwapParamChange('notional', e.target.value)} />
                            </label>
                             <label>
                                <span>Fixed Rate (%)</span>
                                <input type="number" value={swapParams.fixedRate} onChange={e => handleSwapParamChange('fixedRate', e.target.value)} />
                            </label>
                             <label>
                                <span>Maturity (Y)</span>
                                <input type="number" value={swapParams.maturity} onChange={e => handleSwapParamChange('maturity', e.target.value)} />
                            </label>
                            <button onClick={handleValueSwap} className="btn" disabled={calculationStep < 3}>Value Swap</button>
                        </div>
                        {swapValueResult && (
                             <div className="swap-results">
                                <p><span>PV of Fixed Leg</span> <span>{formatCurrency(swapValueResult.pvFixed)}</span></p>
                                <p><span>PV of Floating Leg</span> <span>{formatCurrency(swapValueResult.pvFloating)}</span></p>
                                <hr/>
                                <p className="final-value"><span>Net Swap Value</span> <span>{formatCurrency(swapValueResult.swapValue)}</span></p>
                             </div>
                        )}
                     </div>
                </div>
            )}
        </div>
    );
};

const MethodologySection = () => (
    <div>
        <h2>Core Concepts & Methodology</h2>
        <p>This section details the mathematical formulas and financial reasoning behind the calculations performed in the valuation exercises.</p>

        <h3>1. The Bootstrapping Principle</h3>
        <p>Bootstrapping is the process of creating a zero-coupon yield curve from the prices of coupon-bearing instruments (like swaps). We solve for discount factors (DFs) sequentially, from the shortest maturity outwards.</p>
        <p>For a par interest rate swap (where the fixed rate equals the market swap rate), the Present Value (PV) of the fixed leg must equal the PV of the floating leg at inception.</p>
        <p className="formula">PV_Fixed = PV_Floating</p>
        <p>The PV of the floating leg of a par swap simplifies to <code>1 - DF(T)</code>, where T is the final maturity. The PV of the fixed leg is the sum of discounted coupon payments: <code>R * &Sigma;DF(t_i)</code>.</p>
        <p>To solve for the unknown <code>DF(T)</code>, we rearrange the equation, using the market swap rate (R) and the previously calculated DFs for maturities less than T:</p>
        <p className="formula">DF(T) = (1 - R * &Sigma;DF(t_known)) / (1 + R)</p>
        
        <h3>2. From Discount Factors to Zero Rates</h3>
        <p>A Discount Factor, <code>DF(T)</code>, is the value today of 1 unit of currency received at time T. A zero-coupon rate is the annualized yield of a zero-coupon bond.</p>
        <p>To convert a DF to an <strong>annually compounded</strong> zero rate (Z):</p>
        <p className="formula">Z_annual = (1 / DF(T))^(1/T) - 1</p>
        <p>To convert a DF to a <strong>continuously compounded</strong> zero rate, which is more common in derivatives pricing:</p>
        <p className="formula">Z_cont = -ln(DF(T)) / T</p>
        
        <h3>3. Implied Forward Rates</h3>
        <p>A forward rate is an interest rate for a future period, agreed upon today. The no-arbitrage principle dictates that forward rates must be consistent with the spot zero curve. We can derive them directly from our bootstrapped discount factors.</p>
        <p>The 1-year forward rate starting at time <code>T-1</code> is calculated as:</p>
        <p className="formula">F(T-1, T) = (DF(T-1) / DF(T)) - 1</p>
        
        <h3>4. Interest Rate Swap Valuation</h3>
        <p>A swap's value is the difference between the PV of its two legs. We use the bootstrapped curve to discount all cash flows.</p>
        <p><strong>PV of Fixed Leg:</strong> The fixed leg is a series of known coupon payments. We discount each one using our curve.</p>
        <p className="formula">PV_Fixed = Notional * Fixed_Rate * &Sigma;DF(t_i)</p>
        <p><strong>PV of Floating Leg:</strong> The floating leg is a series of payments based on future unknown rates. We use the implied forward rates as our best estimate for these future rates and discount the resulting cash flows.</p>
        <p className="formula">PV_Floating = Notional * &Sigma; [ F(t_i-1, t_i) * DF(t_i) ]</p>
        <p>There's an elegant simplification for the floating leg PV. It is simply the notional exchanged at the beginning and end, discounted to today. For a spot-starting swap:</p>
        <p className="formula">PV_Floating = Notional * (1 - DF(T_end))</p>
        <p><strong>Net Swap Value:</strong> The final value is the difference. From the perspective of receiving floating and paying fixed:</p>
        <p className="formula">Net Value = PV_Floating - PV_Fixed</p>
    </div>
);


const App = () => {
  const [activeTab, setActiveTab] = useState('intro');

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return <IntroSection />;
      case 'single-curve':
        return <SingleCurveSection />;
      case 'multi-curve':
        return <MultiCurveSection />;
      case 'valuation-exercise':
        return <ValuationExerciseSection />;
      case 'methodology':
          return <MethodologySection />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <header>
        <h1>Interactive Quant Teaching</h1>
        <p>Yield Curve Bootstrapping</p>
      </header>
      <div className="app-container">
        <nav className="sidebar">
          <button onClick={() => setActiveTab('intro')} className={activeTab === 'intro' ? 'active' : ''}>Introduction</button>
          <button onClick={() => setActiveTab('single-curve')} className={activeTab === 'single-curve' ? 'active' : ''}>Single-Curve & Interpolation</button>
          <button onClick={() => setActiveTab('multi-curve')} className={activeTab === 'multi-curve' ? 'active' : ''}>Multi-Curve Framework</button>
          <button onClick={() => setActiveTab('valuation-exercise')} className={activeTab === 'valuation-exercise' ? 'active' : ''}>Valuation Exercise</button>
          <button onClick={() => setActiveTab('methodology')} className={activeTab === 'methodology' ? 'active' : ''}>Methodology</button>
        </nav>
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);