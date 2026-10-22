/* ============================================================
   AlphaStock AI - Tőzsdei Előrejelző Rendszer & Prediktív Motor
   Monte Carlo szimuláció, gépi tanulási becslések & interaktív diagram
   ============================================================ */

// 1. RÉSZVÉNY ADATBÁZIS (20+ Részvény, Top 5 Kiemelt Növekedési Potenciállal)
const STOCKS_DATA = [
  {
    symbol: "PLTR",
    name: "Palantir Technologies",
    sector: "ai",
    sectorLabel: "AI & Vállalati Adatplatform",
    currentPrice: 42.80,
    targetPrice: 64.00,
    expectedGrowth: 49.5, // Legnagyobb várható növekedés
    aiScore: 96,
    confidence: 88,
    beta: 1.82,
    peRatio: "68.4",
    marketCap: "$95.2 Mrd",
    rsi: 63.5,
    risk: "med",
    riskLabel: "Közepes",
    analystConsensus: { buy: 78, hold: 18, sell: 4 },
    catalysts: [
      "Az AIP (Artificial Intelligence Platform) iránti vállalati kereslet exponenciálisan növekszik.",
      "Az S&P 500 indexbe való felvétel intézményi tőkebeáramlást generál.",
      "Védelmi és kormányzati kiber- és adatfeldolgozó szerződések volumene rekordot döntött."
    ],
    risks: [
      "Magas prémium értékeltség a hagyományos szoftvercégekhez képest.",
      "Kormányzati költségvetési ciklusok lassulása esetén kockázat."
    ],
    history: [18.2, 21.4, 23.5, 25.1, 22.8, 26.4, 28.5, 32.0, 36.5, 39.8, 41.2, 42.8],
    predictions: {
      base: [43.5, 45.8, 48.2, 51.0, 53.4, 55.8, 58.0, 60.5, 62.0, 63.2, 63.8, 64.0],
      bull: [45.0, 48.5, 52.0, 56.5, 60.0, 64.0, 68.5, 72.0, 75.5, 78.0, 81.0, 84.5],
      bear: [41.0, 39.5, 42.0, 43.5, 45.0, 46.2, 47.5, 48.0, 49.2, 50.0, 51.5, 52.0]
    }
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "semiconductor",
    sectorLabel: "Félvezetők & AI Hardver",
    currentPrice: 128.50,
    targetPrice: 185.00,
    expectedGrowth: 43.9,
    aiScore: 98,
    confidence: 94,
    beta: 1.68,
    peRatio: "44.2",
    marketCap: "$3,160 Mrd",
    rsi: 59.2,
    risk: "med",
    riskLabel: "Közepes",
    analystConsensus: { buy: 92, hold: 7, sell: 1 },
    catalysts: [
      "Blackwell B200 és GB200 architektúrák teljes kapacitással lekötve 12 hónapra előre.",
      "Hiperskálázó felhőszolgáltatók (Microsoft, Meta, Google, Amazon) AI CAPEX bővítése.",
      "75% feletti bruttó árrés a CUDA szoftveres ökoszisztéma zártsága miatt."
    ],
    risks: [
      "Exportkorlátozások Kína felé szigorodhatnak.",
      "Verseny a felhőcégek saját ASIC chipjei (pl. Google TPU, Amazon Trainium) felől."
    ],
    history: [48.0, 59.0, 68.0, 82.0, 88.0, 95.0, 112.0, 120.0, 115.0, 122.0, 125.0, 128.5],
    predictions: {
      base: [132.0, 138.0, 144.5, 150.0, 156.0, 162.0, 168.0, 172.5, 177.0, 180.0, 182.5, 185.0],
      bull: [136.0, 145.0, 155.0, 166.0, 178.0, 189.0, 198.0, 208.0, 218.0, 225.0, 232.0, 240.0],
      bear: [122.0, 118.0, 125.0, 130.0, 134.0, 137.0, 140.0, 142.0, 145.0, 148.0, 150.0, 152.0]
    }
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    sector: "ev",
    sectorLabel: "Autonóm Mobilitás & Energia",
    currentPrice: 245.20,
    targetPrice: 348.00,
    expectedGrowth: 41.9,
    aiScore: 92,
    confidence: 82,
    beta: 2.15,
    peRatio: "62.8",
    marketCap: "$780 Mrd",
    rsi: 61.0,
    risk: "high",
    riskLabel: "Magas",
    analystConsensus: { buy: 65, hold: 23, sell: 12 },
    catalysts: [
      "FSD v13 end-to-end neurális hálós autonómia bevezetése és Robotaxi platform indulása.",
      "Megapack energiatárolási divízió bevételei megháromszorozódtak, magas marzzsal.",
      "Következő generációs olcsóbb modellplatform gyártási kapacitásának bővülése."
    ],
    risks: [
      "Globális elektromos autó árverseny és támogatási rendszerek átalakulása.",
      "Magas volatilitás és regulatív hatósági vizsgálatok az önvezetés terén."
    ],
    history: [215.0, 198.0, 180.0, 172.0, 185.0, 220.0, 255.0, 230.0, 218.0, 235.0, 240.0, 245.2],
    predictions: {
      base: [252.0, 260.0, 272.0, 285.0, 298.0, 310.0, 320.0, 328.0, 335.0, 340.0, 344.0, 348.0],
      bull: [265.0, 285.0, 310.0, 335.0, 360.0, 385.0, 410.0, 425.0, 440.0, 455.0, 470.0, 490.0],
      bear: [230.0, 215.0, 225.0, 235.0, 245.0, 250.0, 258.0, 262.0, 268.0, 272.0, 275.0, 280.0]
    }
  },
  {
    symbol: "CRWD",
    name: "CrowdStrike Holdings",
    sector: "software",
    sectorLabel: "AI Kiberbiztonság",
    currentPrice: 305.10,
    targetPrice: 418.00,
    expectedGrowth: 37.0,
    aiScore: 90,
    confidence: 86,
    beta: 1.34,
    peRatio: "74.0",
    marketCap: "$74.5 Mrd",
    rsi: 54.8,
    risk: "med",
    riskLabel: "Közepes",
    analystConsensus: { buy: 84, hold: 14, sell: 2 },
    catalysts: [
      "A Falcon platformra épülő konszolidált kiberbiztonsági modulok iránti hűség átlagon felüli.",
      "Generatív AI-alapú Charlotte AI biztonsági elemző asszisztens elterjedése.",
      "115%+ nettó bevételmegtartási arány és robusztus szabad cash-flow termelés."
    ],
    risks: [
      "Vállalati IT költségvetési lassulás veszélye.",
      "Intenzív verseny a Microsoft Defender és Palo Alto Networks felől."
    ],
    history: [240.0, 265.0, 295.0, 320.0, 345.0, 380.0, 260.0, 275.0, 288.0, 298.0, 301.0, 305.1],
    predictions: {
      base: [312.0, 322.0, 335.0, 348.0, 360.0, 372.0, 384.0, 395.0, 402.0, 408.0, 414.0, 418.0],
      bull: [325.0, 345.0, 368.0, 390.0, 415.0, 435.0, 455.0, 472.0, 488.0, 502.0, 515.0, 530.0],
      bear: [290.0, 282.0, 295.0, 305.0, 315.0, 322.0, 330.0, 335.0, 340.0, 345.0, 350.0, 355.0]
    }
  },
  {
    symbol: "LLY",
    name: "Eli Lilly & Company",
    sector: "biotech",
    sectorLabel: "Biotech & GLP-1 Terápia",
    currentPrice: 890.00,
    targetPrice: 1180.00,
    expectedGrowth: 32.6,
    aiScore: 94,
    confidence: 91,
    beta: 0.65,
    peRatio: "56.0",
    marketCap: "$845 Mrd",
    rsi: 58.6,
    risk: "low",
    riskLabel: "Alacsony",
    analystConsensus: { buy: 89, hold: 10, sell: 1 },
    catalysts: [
      "Mounjaro & Zepbound (tirzepatid) globális eladásai túlszárnyalják az elemzői konszenzust.",
      "Gyártási kapacitás bővítése 4 új gigagyárral az ellátási hiányok megszüntetésére.",
      "Új klinikai vizsgálatok kiterjesztése szívelégtelenségre és alvási apnoéra."
    ],
    risks: [
      "Árszabályozási nyomás a biztosítók és kormányok felől az USA-ban.",
      "Kombinációs orális tabletták versenyhelyzete a jövőben."
    ],
    history: [580.0, 620.0, 710.0, 760.0, 775.0, 820.0, 890.0, 930.0, 880.0, 910.0, 905.0, 890.0],
    predictions: {
      base: [910.0, 935.0, 965.0, 1000.0, 1030.0, 1065.0, 1095.0, 1125.0, 1145.0, 1160.0, 1172.0, 1180.0],
      bull: [930.0, 975.0, 1025.0, 1080.0, 1135.0, 1190.0, 1245.0, 1290.0, 1340.0, 1385.0, 1420.0, 1460.0],
      bear: [860.0, 845.0, 870.0, 895.0, 915.0, 935.0, 955.0, 970.0, 985.0, 995.0, 1010.0, 1025.0]
    }
  },
  // További részvények a piaci szűrőhöz
  {
    symbol: "ARM",
    name: "Arm Holdings plc",
    sector: "semiconductor",
    sectorLabel: "Félvezetők & IP",
    currentPrice: 142.00,
    targetPrice: 195.00,
    expectedGrowth: 37.3,
    aiScore: 91,
    confidence: 84,
    beta: 1.95,
    peRatio: "78.2",
    marketCap: "$148 Mrd",
    rsi: 57.0,
    risk: "high",
    riskLabel: "Magas",
    analystConsensus: { buy: 80, hold: 16, sell: 4 },
    catalysts: ["v9 architektúra jogdíjak megduplázódása adatközponti és mobil chipekben."],
    risks: ["Magas P/E értékeltség."],
    history: [72.0, 85.0, 120.0, 110.0, 130.0, 160.0, 135.0, 125.0, 138.0, 140.0, 141.0, 142.0],
    predictions: {
      base: [146, 151, 157, 163, 169, 175, 180, 185, 188, 191, 193, 195],
      bull: [152, 162, 174, 186, 198, 210, 222, 232, 241, 250, 258, 265],
      bear: [134, 128, 135, 140, 144, 148, 152, 155, 158, 160, 163, 165]
    }
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    sector: "semiconductor",
    sectorLabel: "Félvezetők & AI Gyorsítók",
    currentPrice: 156.40,
    targetPrice: 215.00,
    expectedGrowth: 37.5,
    aiScore: 89,
    confidence: 85,
    beta: 1.72,
    peRatio: "48.5",
    marketCap: "$253 Mrd",
    rsi: 52.4,
    risk: "med",
    riskLabel: "Közepes",
    analystConsensus: { buy: 82, hold: 16, sell: 2 },
    catalysts: ["MI325X és MI350 AI gyorsító chipek bevezetése."],
    risks: ["Nvidia dominanciájának megtörése nehézkes."],
    history: [110, 135, 175, 185, 160, 155, 140, 148, 152, 158, 154, 156.4],
    predictions: {
      base: [160, 165, 172, 179, 186, 193, 199, 204, 208, 211, 213, 215],
      bull: [168, 178, 190, 204, 218, 230, 242, 252, 260, 268, 275, 282],
      bear: [148, 142, 148, 154, 159, 163, 167, 170, 173, 176, 178, 180]
    }
  },
  {
    symbol: "COIN",
    name: "Coinbase Global",
    sector: "crypto",
    sectorLabel: "Kripto Ökoszisztéma & Web3",
    currentPrice: 198.50,
    targetPrice: 275.00,
    expectedGrowth: 38.5,
    aiScore: 88,
    confidence: 76,
    beta: 2.85,
    peRatio: "38.0",
    marketCap: "$49 Mrd",
    rsi: 65.2,
    risk: "high",
    riskLabel: "Magas",
    analystConsensus: { buy: 68, hold: 22, sell: 10 },
    catalysts: ["Base Layer-2 hálózat bevételei és intézményi letétkezelés növekedése."],
    risks: ["Kriptopiaci ciklusok és szabályozási bizonytalanságok."],
    history: [85, 120, 160, 240, 220, 235, 190, 180, 175, 192, 195, 198.5],
    predictions: {
      base: [204, 212, 222, 232, 242, 251, 259, 265, 269, 272, 274, 275],
      bull: [218, 235, 255, 278, 300, 320, 340, 355, 370, 382, 392, 405],
      bear: [180, 165, 175, 185, 192, 198, 204, 208, 212, 215, 218, 220]
    }
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    sector: "tech",
    sectorLabel: "Felhő & E-kereskedelem",
    currentPrice: 186.50,
    targetPrice: 242.00,
    expectedGrowth: 29.8,
    aiScore: 92,
    confidence: 90,
    beta: 1.15,
    peRatio: "39.5",
    marketCap: "$1,940 Mrd",
    rsi: 58.0,
    risk: "low",
    riskLabel: "Alacsony",
    analystConsensus: { buy: 94, hold: 6, sell: 0 },
    catalysts: ["AWS felhőbevétel gyorsulása és hirdetési üzletág bővülése."],
    risks: ["Fogyasztói vásárlóerő csökkenése."],
    history: [130, 145, 155, 170, 180, 185, 192, 180, 182, 185, 184, 186.5],
    predictions: {
      base: [191, 196, 202, 208, 214, 220, 226, 231, 235, 238, 240, 242],
      bull: [198, 208, 218, 229, 240, 250, 260, 268, 275, 281, 287, 292],
      bear: [178, 172, 178, 184, 188, 192, 196, 200, 203, 206, 208, 210]
    }
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "software",
    sectorLabel: "Felhő & Szoftver",
    currentPrice: 425.00,
    targetPrice: 530.00,
    expectedGrowth: 24.7,
    aiScore: 93,
    confidence: 93,
    beta: 0.95,
    peRatio: "35.2",
    marketCap: "$3,150 Mrd",
    rsi: 56.5,
    risk: "low",
    riskLabel: "Alacsony",
    analystConsensus: { buy: 91, hold: 8, sell: 1 },
    catalysts: ["Azure AI integráció és Copilot előfizetések skálázása."],
    risks: ["Hatalmas AI adatközponti infrastruktúra kiadások megtérülési ideje."],
    history: [330, 360, 380, 405, 415, 430, 445, 410, 415, 420, 422, 425.0],
    predictions: {
      base: [433, 442, 453, 465, 476, 488, 498, 508, 516, 522, 527, 530],
      bull: [445, 462, 480, 500, 520, 540, 558, 575, 590, 602, 614, 625],
      bear: [412, 402, 414, 424, 432, 440, 448, 455, 460, 465, 470, 475]
    }
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sector: "tech",
    sectorLabel: "Kereső & AI Felhő",
    currentPrice: 165.20,
    targetPrice: 210.00,
    expectedGrowth: 27.1,
    aiScore: 90,
    confidence: 88,
    beta: 1.05,
    peRatio: "24.6",
    marketCap: "$2,050 Mrd",
    rsi: 53.0,
    risk: "low",
    riskLabel: "Alacsony",
    analystConsensus: { buy: 85, hold: 14, sell: 1 },
    catalysts: ["Gemini AI integráció a Google Keresőbe és Google Cloud gyorsuló profitja."],
    risks: ["Monopóliumellenes hatósági perek az USA-ban."],
    history: [130, 135, 142, 150, 170, 180, 188, 160, 162, 164, 165, 165.2],
    predictions: {
      base: [169, 173, 178, 183, 188, 193, 198, 202, 205, 207, 209, 210],
      bull: [175, 183, 192, 201, 210, 218, 226, 233, 239, 245, 250, 255],
      bear: [158, 152, 158, 163, 167, 171, 175, 178, 181, 183, 185, 188]
    }
  },
  {
    symbol: "ASML",
    name: "ASML Holding N.V.",
    sector: "semiconductor",
    sectorLabel: "EUV Litográfia",
    currentPrice: 785.00,
    targetPrice: 1050.00,
    expectedGrowth: 33.8,
    aiScore: 95,
    confidence: 90,
    beta: 1.35,
    peRatio: "42.0",
    marketCap: "$310 Mrd",
    rsi: 48.5,
    risk: "med",
    riskLabel: "Közepes",
    analystConsensus: { buy: 87, hold: 12, sell: 1 },
    catalysts: ["High-NA EUV rendszerek monopóliuma a legújabb 2nm/1.4nm chipgyártáshoz."],
    risks: ["Kínai megrendelések visszaesése exportkorlátozások miatt."],
    history: [620, 680, 750, 840, 920, 980, 850, 790, 760, 780, 775, 785],
    predictions: {
      base: [805, 830, 858, 888, 920, 952, 980, 1005, 1025, 1038, 1045, 1050],
      bull: [830, 875, 925, 978, 1030, 1085, 1135, 1180, 1220, 1255, 1285, 1310],
      bear: [750, 725, 755, 785, 810, 835, 860, 880, 898, 912, 925, 940]
    }
  },
  {
    symbol: "UBER",
    name: "Uber Technologies",
    sector: "tech",
    sectorLabel: "Mobilitási Platform",
    currentPrice: 74.50,
    targetPrice: 98.00,
    expectedGrowth: 31.5,
    aiScore: 87,
    confidence: 83,
    beta: 1.25,
    peRatio: "32.0",
    marketCap: "$155 Mrd",
    rsi: 55.2,
    risk: "med",
    riskLabel: "Közepes",
    analystConsensus: { buy: 88, hold: 11, sell: 1 },
    catalysts: ["Autonóm járműflotta partnerségek (Waymo, Cruise) és hirdetési bevételek."],
    risks: ["Biztosítási költségek emelkedése."],
    history: [46, 52, 60, 68, 75, 78, 68, 70, 72, 73, 74, 74.5],
    predictions: {
      base: [76, 78, 81, 84, 87, 89, 92, 94, 95, 96, 97, 98],
      bull: [79, 83, 88, 94, 99, 105, 110, 115, 119, 123, 126, 130],
      bear: [70, 67, 70, 73, 76, 78, 80, 82, 84, 85, 87, 88]
    }
  }
];

// 2. GLOBÁLIS ÁLLAPOT
let activeStock = STOCKS_DATA[0]; // Kezdés PLTR-rel (#1 kiemelt növekedés)
let activeScenario = "base"; // "base" | "bull" | "bear"
let activeModel = "ensemble"; // "ensemble" | "montecarlo" | "dcf"
let activeRange = "1Y"; // "1M" | "3M" | "6M" | "1Y"
let filterCategory = "all";
let searchTerm = "";
let sortColumn = "expectedGrowth";
let sortAsc = false;

// 3. INICIALIZÁLÁS
document.addEventListener("DOMContentLoaded", () => {
  renderTop5Cards();
  populateStockSelect();
  renderScreenerTable();
  setupEventListeners();
  updateStockView(activeStock);
  initCalculator();
});

// 4. TOP 5 KIEMELT RÉSZVÉNY RENDERELÉSE
function renderTop5Cards() {
  const container = document.getElementById("top5CardsContainer");
  if (!container) return;

  // A legmagasabb növekedési potenciál szerint sorba rendezve az 5 legjobb
  const top5 = [...STOCKS_DATA]
    .sort((a, b) => b.expectedGrowth - a.expectedGrowth)
    .slice(0, 5);

  container.innerHTML = "";

  const ranks = ["🥇 #1 Top Pick", "🥈 #2 Pick", "🥉 #3 Pick", "⭐ #4 Pick", "⭐ #5 Pick"];

  top5.forEach((stock, idx) => {
    const card = document.createElement("div");
    card.className = `top5-card ${stock.symbol === activeStock.symbol ? "active" : ""}`;
    card.dataset.symbol = stock.symbol;

    card.innerHTML = `
      <div class="card-ribbon ${idx === 0 ? "rank-1" : ""}">${ranks[idx]}</div>
      <div>
        <div class="card-top">
          <div>
            <div class="ticker-symbol">${stock.symbol}</div>
            <div class="company-name" title="${stock.name}">${stock.name}</div>
            <div class="badge-tag">${stock.sectorLabel}</div>
          </div>
        </div>

        <div class="card-pricing">
          <div class="current-price">$${stock.currentPrice.toFixed(2)}</div>
          <div class="growth-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            +${stock.expectedGrowth.toFixed(1)}% Várható
          </div>
        </div>

        <div class="card-metrics">
          <div class="metric-row">
            <span>12 Havi Célár:</span>
            <span class="target-val">$${stock.targetPrice.toFixed(2)}</span>
          </div>
          <div class="metric-row">
            <span>Kockázati szint:</span>
            <span class="risk-tag risk-${stock.risk}">${stock.riskLabel}</span>
          </div>
          <div class="ai-score-bar-wrap">
            <div class="ai-score-label">
              <span>AI Növekedési Index:</span>
              <span style="font-weight: 700; color: var(--accent-green);">${stock.aiScore}/100</span>
            </div>
            <div class="ai-score-bar">
              <div class="ai-score-fill" style="width: ${stock.aiScore}%;"></div>
            </div>
          </div>
        </div>

        <div class="card-catalyst">
          💡 <strong>Katalizátor:</strong> ${stock.catalysts[0]}
        </div>
      </div>

      <button class="btn-card-select" onclick="selectStock('${stock.symbol}')">
        <span>Előrejelzés megnyitása</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    `;

    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        selectStock(stock.symbol);
      }
    });

    container.appendChild(card);
  });
}

// 5. RÉSZVÉNY KIVÁLASZTÁSA
function selectStock(symbol) {
  const found = STOCKS_DATA.find((s) => s.symbol === symbol);
  if (!found) return;

  activeStock = found;

  // Frissítjük a kártyák aktív állapotát
  document.querySelectorAll(".top5-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.symbol === symbol);
  });

  // Frissítjük a select mezőt
  const select = document.getElementById("calcStockSelect");
  if (select) select.value = symbol;

  // Nézet és diagram frissítése
  updateStockView(activeStock);

  // Görgetés a grafikonhoz
  const chartEl = document.getElementById("forecastSection");
  if (chartEl) {
    chartEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// 6. RÉSZLETEZŐ NÉZET ÉS DIAGRAM FRISSÍTÉSE
function updateStockView(stock) {
  // Cím és szimbólum elemek
  document.getElementById("chartStockSymbol").textContent = stock.symbol;
  document.getElementById("chartStockName").textContent = stock.name;
  document.getElementById("chartStockPrice").textContent = `$${stock.currentPrice.toFixed(2)}`;
  
  const growthEl = document.getElementById("chartStockGrowth");
  growthEl.textContent = `+${stock.expectedGrowth.toFixed(1)}% (Célár: $${stock.targetPrice.toFixed(2)})`;

  // Mini mutatók
  document.getElementById("deepPe").textContent = stock.peRatio;
  document.getElementById("deepBeta").textContent = stock.beta.toFixed(2);
  document.getElementById("deepRsi").textContent = stock.rsi.toFixed(1);
  document.getElementById("deepCap").textContent = stock.marketCap;
  document.getElementById("deepConfidence").textContent = `${stock.confidence}%`;
  document.getElementById("deepBuyRating").textContent = `${stock.analystConsensus.buy}% Vétel`;

  // Katalizátorok és indoklás lista
  const catContainer = document.getElementById("stockCatalystList");
  if (catContainer) {
    catContainer.innerHTML = stock.catalysts
      .map((c) => `<li style="margin-bottom: 0.4rem; color: var(--text-muted); font-size: 0.8rem;">• ${c}</li>`)
      .join("");
  }

  // Rajzoljuk újra a diagramot
  drawForecastChart();

  // Számoljuk újra a kalkulátort
  calculateInvestment();
}

// 7. INTERAKTÍV DIAGRAM RAJZOLÓ MOTOR (Canvas High-DPI)
function drawForecastChart() {
  const canvas = document.getElementById("forecastCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  // Valódi felbontás beállítása retina kijelzőkhöz
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  // Letisztítás
  ctx.clearRect(0, 0, width, height);

  // Adatok előkészítése
  const hist = activeStock.history; // 12 hónap múltbeli adat
  let pred = activeStock.predictions[activeScenario]; // 12 hónap jövőbeli adat

  // Ha Monte Carlo modellt választottak, véletlenszerű sztochasztikus driftet adunk hozzá
  if (activeModel === "montecarlo") {
    pred = generateMonteCarloPath(activeStock.currentPrice, activeStock.beta, activeScenario);
  } else if (activeModel === "dcf") {
    // Fundamentális simított pálya
    pred = activeStock.predictions.base.map((v, i) => v * (1 + (i * 0.005)));
  }

  // Időtáv szűrés
  let histPoints = [...hist];
  let predPoints = [...pred];

  if (activeRange === "1M") {
    histPoints = hist.slice(-3);
    predPoints = pred.slice(0, 2);
  } else if (activeRange === "3M") {
    histPoints = hist.slice(-6);
    predPoints = pred.slice(0, 4);
  } else if (activeRange === "6M") {
    histPoints = hist.slice(-8);
    predPoints = pred.slice(0, 7);
  }

  const allPoints = [...histPoints, ...predPoints];
  const minVal = Math.min(...allPoints) * 0.92;
  const maxVal = Math.max(...allPoints) * 1.08;

  const padding = { top: 30, right: 30, bottom: 40, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Y pozíció kalkulátor
  const getY = (val) => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  // X pozíció kalkulátor
  const totalPointsCount = histPoints.length + predPoints.length - 1;
  const getX = (idx) => padding.left + (idx / totalPointsCount) * chartW;

  // 1. Rácsvonalak és Y tengely feliratok rajzolása
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#64748b";
  ctx.font = "11px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "right";

  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const yVal = minVal + ((maxVal - minVal) / ySteps) * i;
    const yPos = getY(yVal);
    ctx.beginPath();
    ctx.moveTo(padding.left, yPos);
    ctx.lineTo(width - padding.right, yPos);
    ctx.stroke();

    ctx.fillText(`$${yVal.toFixed(0)}`, padding.left - 10, yPos + 4);
  }

  // 2. Múltbeli és Előrejelzett zóna elválasztása
  const splitIndex = histPoints.length - 1;
  const splitX = getX(splitIndex);

  // Előrejelzési zóna háttér derengése
  const predGrad = ctx.createLinearGradient(splitX, 0, width - padding.right, 0);
  predGrad.addColorStop(0, "rgba(59, 130, 246, 0.02)");
  predGrad.addColorStop(1, "rgba(16, 185, 129, 0.07)");
  ctx.fillStyle = predGrad;
  ctx.fillRect(splitX, padding.top, width - padding.right - splitX, chartH);

  // Függőleges elválasztó szaggatott vonal "MA" (Ma/Jelenlegi ár)
  ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(splitX, padding.top);
  ctx.lineTo(splitX, height - padding.bottom);
  ctx.stroke();
  ctx.setLineDash([]); // Visszaállítás folytonosra

  ctx.fillStyle = "#3b82f6";
  ctx.textAlign = "center";
  ctx.fillText("MA (Jelen)", splitX, padding.top - 12);

  // 3. Konfidencia sáv (Árfolyam-folyosó bika és medve határ között)
  if (activeRange === "1Y" || activeRange === "6M") {
    const bullCurve = activeStock.predictions.bull.slice(0, predPoints.length);
    const bearCurve = activeStock.predictions.bear.slice(0, predPoints.length);

    ctx.beginPath();
    ctx.moveTo(splitX, getY(histPoints[histPoints.length - 1]));
    for (let i = 0; i < bullCurve.length; i++) {
      ctx.lineTo(getX(splitIndex + i), getY(bullCurve[i]));
    }
    for (let i = bearCurve.length - 1; i >= 0; i--) {
      ctx.lineTo(getX(splitIndex + i), getY(bearCurve[i]));
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(16, 185, 129, 0.06)";
    ctx.fill();
  }

  // 4. Múltbeli árfolyam vonal és terület kitöltése
  const histGrad = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  histGrad.addColorStop(0, "rgba(59, 130, 246, 0.25)");
  histGrad.addColorStop(1, "rgba(59, 130, 246, 0.0)");

  ctx.beginPath();
  ctx.moveTo(getX(0), getY(histPoints[0]));
  for (let i = 1; i < histPoints.length; i++) {
    ctx.lineTo(getX(i), getY(histPoints[i]));
  }
  ctx.lineTo(splitX, height - padding.bottom);
  ctx.lineTo(getX(0), height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = histGrad;
  ctx.fill();

  // Múltbeli vonal rajzolása
  ctx.beginPath();
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2.5;
  ctx.moveTo(getX(0), getY(histPoints[0]));
  for (let i = 1; i < histPoints.length; i++) {
    ctx.lineTo(getX(i), getY(histPoints[i]));
  }
  ctx.stroke();

  // 5. Előrejelzési vonal rajzolása (zöld vagy piros forgatókönyv szerint)
  let forecastColor = "#10b981"; // Bázis / Bika
  if (activeScenario === "bear") forecastColor = "#f43f5e";

  ctx.beginPath();
  ctx.strokeStyle = forecastColor;
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 4]); // Szaggatott a predikció jelzésére
  ctx.moveTo(splitX, getY(histPoints[histPoints.length - 1]));

  for (let i = 0; i < predPoints.length; i++) {
    ctx.lineTo(getX(splitIndex + i), getY(predPoints[i]));
  }
  ctx.stroke();
  ctx.setLineDash([]); // Visszaállítás

  // Célár pont kiemelése a végén
  const lastX = getX(totalPointsCount);
  const lastY = getY(predPoints[predPoints.length - 1]);

  ctx.beginPath();
  ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
  ctx.fillStyle = forecastColor;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  // Célár címke
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`$${predPoints[predPoints.length - 1].toFixed(1)}`, lastX - 35, lastY - 12);

  // X tengely időpontok
  ctx.fillStyle = "#64748b";
  ctx.font = "11px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Múltbeli hónapok", getX(Math.floor(splitIndex / 2)), height - 12);
  ctx.fillText("Prediktált 12 Hónap ➔", getX(splitIndex + Math.floor(predPoints.length / 2)), height - 12);
}

// 8. MONTE CARLO SZIMULÁCIÓS GENERÁTOR
function generateMonteCarloPath(startPrice, beta, scenario) {
  const steps = 12;
  const path = [startPrice];
  const dt = 1 / 12;

  // Drift (várható hozam) és volatilitás beállítása a forgatókönyvhöz
  let mu = 0.25; // 25% éves várható bázis növekedés
  if (scenario === "bull") mu = 0.45;
  if (scenario === "bear") mu = 0.05;

  const sigma = 0.22 * beta; // Volatilitás a béta arányában

  let current = startPrice;
  for (let i = 1; i <= steps; i++) {
    // Standard normális eloszlás (Box-Muller transzformáció)
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.cos(2.0 * Math.PI * u2);

    const drift = (mu - 0.5 * sigma * sigma) * dt;
    const diffusion = sigma * Math.sqrt(dt) * z;
    current = current * Math.exp(drift + diffusion);
    path.push(Math.round(current * 10) / 10);
  }

  return path.slice(1);
}

// 9. BEFEKTETÉSI ÉS PROFIT KALKULÁTOR
function initCalculator() {
  const amountInput = document.getElementById("calcAmount");
  const currencySelect = document.getElementById("calcCurrency");
  const periodSelect = document.getElementById("calcPeriod");

  if (amountInput) amountInput.addEventListener("input", calculateInvestment);
  if (currencySelect) currencySelect.addEventListener("change", calculateInvestment);
  if (periodSelect) periodSelect.addEventListener("change", calculateInvestment);

  calculateInvestment();
}

function calculateInvestment() {
  const amountInput = document.getElementById("calcAmount");
  const currencySelect = document.getElementById("calcCurrency");
  const periodSelect = document.getElementById("calcPeriod");

  if (!amountInput) return;

  const investAmount = parseFloat(amountInput.value) || 0;
  const currency = currencySelect ? currencySelect.value : "HUF";
  const periodMonths = parseInt(periodSelect ? periodSelect.value : 12);

  // Várható időarányos növekedés kiszámítása
  const annualGrowthRate = activeStock.expectedGrowth / 100;
  const periodFactor = periodMonths / 12;
  const periodGrowth = annualGrowthRate * periodFactor;

  const estimatedValue = investAmount * (1 + periodGrowth);
  const estimatedProfit = estimatedValue - investAmount;
  const profitPercentage = periodGrowth * 100;

  // Formázás
  const symbol = currency === "HUF" ? "Ft" : "$";
  const formatter = new Intl.NumberFormat("hu-HU", {
    maximumFractionDigits: currency === "HUF" ? 0 : 2
  });

  const valueEl = document.getElementById("calcResultValue");
  const profitEl = document.getElementById("calcResultProfit");
  const percentEl = document.getElementById("calcResultPercent");

  if (valueEl) valueEl.textContent = `${formatter.format(estimatedValue)} ${symbol}`;
  if (profitEl) profitEl.textContent = `+${formatter.format(estimatedProfit)} ${symbol}`;
  if (percentEl) percentEl.textContent = `+${profitPercentage.toFixed(1)}%`;
}

// 10. PIACI SZŰRŐ TÁBLÁZAT (Screener)
function renderScreenerTable() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  // Szűrés kategória és keresés alapján
  let filtered = STOCKS_DATA.filter((s) => {
    const matchesCat = filterCategory === "all" || s.sector === filterCategory;
    const matchesSearch =
      s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Rendezés
  filtered.sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    return sortAsc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  filtered.forEach((stock) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="stock-cell-info">
          <div class="stock-symbol-badge">${stock.symbol}</div>
          <div>
            <div class="stock-name-title">${stock.name}</div>
            <div class="stock-sub-sector">${stock.sectorLabel}</div>
          </div>
        </div>
      </td>
      <td><strong>$${stock.currentPrice.toFixed(2)}</strong></td>
      <td style="color: var(--accent-cyan); font-weight: 600;">$${stock.targetPrice.toFixed(2)}</td>
      <td>
        <span class="growth-text-up">+${stock.expectedGrowth.toFixed(1)}%</span>
      </td>
      <td>
        <div class="confidence-meter">
          <span style="font-weight: 700; width: 28px;">${stock.aiScore}</span>
          <div class="meter-track">
            <div class="meter-bar" style="width: ${stock.aiScore}%;"></div>
          </div>
        </div>
      </td>
      <td>
        <span class="risk-tag risk-${stock.risk}">${stock.riskLabel}</span>
      </td>
      <td>
        <button class="btn-table-action" onclick="event.stopPropagation(); selectStock('${stock.symbol}')">
          Elemzés
        </button>
        <button class="btn-table-action" style="background: rgba(255,255,255,0.06); color: var(--text-main);" onclick="event.stopPropagation(); openDeepDiveModal('${stock.symbol}')">
          Részletek
        </button>
      </td>
    `;

    tr.addEventListener("click", () => selectStock(stock.symbol));
    tbody.appendChild(tr);
  });
}

// 11. MODÁLIS RÉSZLETEZŐ ABLAK KEZELÉSE
function openDeepDiveModal(symbol) {
  const stock = STOCKS_DATA.find((s) => s.symbol === symbol);
  if (!stock) return;

  const modal = document.getElementById("deepDiveModal");
  if (!modal) return;

  document.getElementById("modalSymbol").textContent = `${stock.symbol} - ${stock.name}`;
  document.getElementById("modalPrice").textContent = `$${stock.currentPrice.toFixed(2)}`;
  document.getElementById("modalTarget").textContent = `$${stock.targetPrice.toFixed(2)}`;
  document.getElementById("modalGrowth").textContent = `+${stock.expectedGrowth.toFixed(1)}%`;
  document.getElementById("modalAiScore").textContent = `${stock.aiScore}/100`;
  document.getElementById("modalBeta").textContent = stock.beta.toFixed(2);
  document.getElementById("modalPe").textContent = stock.peRatio;
  document.getElementById("modalCap").textContent = stock.marketCap;
  document.getElementById("modalRsi").textContent = stock.rsi.toFixed(1);

  // Katalizátorok
  const catList = document.getElementById("modalCatalysts");
  catList.innerHTML = stock.catalysts.map((c) => `<li>${c}</li>`).join("");

  // Kockázatok
  const riskList = document.getElementById("modalRisks");
  riskList.innerHTML = stock.risks.map((r) => `<li>${r}</li>`).join("");

  modal.classList.add("open");
}

function closeDeepDiveModal() {
  const modal = document.getElementById("deepDiveModal");
  if (modal) modal.classList.remove("open");
}

// 12. ESEMÉNYKEZELŐK BEKÖTÉSE
function setupEventListeners() {
  // Szcenárió gombok (Bázis / Bika / Medve)
  document.querySelectorAll(".scenario-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".scenario-pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeScenario = btn.dataset.scenario;
      drawForecastChart();
    });
  });

  // Modell gombok (Ensemble / Monte Carlo / DCF)
  document.querySelectorAll(".model-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".model-pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeModel = btn.dataset.model;
      drawForecastChart();
    });
  });

  // Időtáv gombok (1M, 3M, 6M, 1Y)
  document.querySelectorAll(".range-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".range-pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeRange = btn.dataset.range;
      drawForecastChart();
    });
  });

  // Keresőmező
  const searchEl = document.getElementById("screenerSearch");
  if (searchEl) {
    searchEl.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderScreenerTable();
    });
  }

  // Kategória szűrő gombok
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterCategory = btn.dataset.filter;
      renderScreenerTable();
    });
  });

  // Reszponzív ablak átméretezés a vászonhoz
  window.addEventListener("resize", () => {
    drawForecastChart();
  });

  // Modális bezárás kattintásra a háttérre
  const modal = document.getElementById("deepDiveModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeDeepDiveModal();
    });
  }
}

// 13. RÉSZVÉNY KIVÁLASZTÓ LEGYEZŐ
function populateStockSelect() {
  const select = document.getElementById("calcStockSelect");
  if (!select) return;

  select.innerHTML = "";
  STOCKS_DATA.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.symbol;
    opt.textContent = `${s.symbol} - ${s.name} (+${s.expectedGrowth.toFixed(1)}%)`;
    select.appendChild(opt);
  });

  select.value = activeStock.symbol;
  select.addEventListener("change", (e) => {
    selectStock(e.target.value);
  });
}
