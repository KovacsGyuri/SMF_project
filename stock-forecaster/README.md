# 📈 AlphaStock AI - Tőzsdei Előrejelző és Részvény Növekedési Portál

Egy modern, interaktív tőzsdei előrejelző webalkalmazás, amely bemutatja a várható részvényárfolyam-növekedéseket, és kiemeli a piac legnagyobb potenciállal rendelkező részvényeit.

---

## 🌟 Kiemelt Funkciók

### 1. 🚀 A Legnagyobb Növekedési Potenciálú 5 Részvény (Top 5 Kiemelés)
A rendszer elemzi a növekedési mutatókat, az intézményi tőkebeáramlást és a fundamentális katalizátorokat, kiemelve az 5 legígéretesebb papírt:
1. **PLTR (Palantir Technologies)** - **+49.5%** várható növekedés (Célár: \$64.00) • AI Növekedési Index: 96/100
2. **NVDA (NVIDIA Corporation)** - **+43.9%** várható növekedés (Célár: \$185.00) • AI Növekedési Index: 98/100
3. **TSLA (Tesla Inc.)** - **+41.9%** várható növekedés (Célár: \$348.00) • AI Növekedési Index: 92/100
4. **CRWD (CrowdStrike Holdings)** - **+37.0%** várható növekedés (Célár: \$418.00) • AI Növekedési Index: 90/100
5. **LLY (Eli Lilly & Co.)** - **+32.6%** várható növekedés (Célár: \$1,180.00) • AI Növekedési Index: 94/100

### 2. 📊 Interaktív Előrejelző Diagram (Forecast Canvas)
- **Tényleges múltbeli árfolyam vs. Prediktált jövőbeli pálya**
- **3 Forgatókönyv**:
  - *Bázis pálya* (legvalószínűbb trend)
  - *Bika pálya* (optimista növekedés, akár +45%)
  - *Medve pálya* (kockázatvédelmi szint)
- **3 Különböző Elemző Modell**:
  - *AI Ensemble* (Gépi tanulás + Momentum)
  - *Monte Carlo Szimuláció* (1000 iteráció sztochasztikus árpályákkal)
  - *DCF Alapú* (Diszkontált cash-flow fundamentális modell)
- **Konfidencia intervallum sáv** (85%-os valószínűségi zóna)
- **Időtáv váltó**: 1 Hónap (1M), 3 Hónap (3M), 6 Hónap (6M), 1 Év (1Y)

### 3. 💰 Befektetési Profit és Hozam Kalkulátor
- Számold ki forintban (HUF) vagy dollárban (USD), hogy egy adott befektetett összeg mennyit érhet 3, 6 vagy 12 hónap múlva.
- Automatikus nyereség és százalékos megtérülés kalkuláció.

### 4. 🔍 Piaci Részvényszűrő (Stock Screener)
- Több mint 20 nemzetközi piacvezető részvény (MSFT, AMZN, GOOGL, AMD, ASML, ARM, COIN, UBER stb.)
- Keresés név és szimbólum szerint
- Szűrés szektorok szerint (AI, Félvezetők, Szoftver, Biotech, E-mobilitás, Kripto)
- Egy kattintásos grafikonbetöltés és mélyelemzés ablak

---

## 🚀 Futtatás és Használat

### 1. Legegyszerűbb módszer:
Csak **kattints duplán az `index.html` fájlra** a fájlkezelőben, és a weboldal azonnal megnyílik a kedvenc böngésződben internetkapcsolat vagy külső telepítés nélkül!

### 2. Futtatás helyi webszerverként:
Nyiss meg egy terminált a mappában, és futtasd:
```bash
py server.py
```
Ez elindítja a helyi kiszolgálót a `http://localhost:8080` címen, és automatikusan megnyitja a böngésződet.
