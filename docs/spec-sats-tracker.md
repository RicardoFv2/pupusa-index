# 📄 Specification: Sats & Inflation AI Tracker View

Especificación técnica formal para la vista **Sats & Inflation AI Tracker** construida en `pupusa-index` (`D:\CHAMBING\PersonalProyects\pupusa-index`).

---

## 📌 Requisitos de Arquitectura

### 1. Navegación y UI Header
- Agregar pestañas de navegación en el componente Header (`App.tsx`):
  - **Índice Clásico (USD)**: Vista original del Pupusa Index.
  - **Sats & AI Tracker**: Nueva vista con analítica de Satoshis, gráfico de doble eje y escáner Firecrawl.

### 2. Servicio de Precio de Bitcoin (`src/lib/btcApi.ts`)
- Consultar el precio en tiempo real de Bitcoin a través de `https://mempool.space/api/v1/prices` (con respaldo en CoinGecko API).
- Convertir precios de pupusas ($ USD) a Satoshis (`1 BTC = 100,000,000 Sats`).

### 3. Servicio de Scraping Firecrawl (`src/lib/firecrawlScraper.ts`)
- Utilizar `@mendable/firecrawl-js` para auditar/extraer precios de pupuserías o menús.
- Si no está presente `VITE_FIRECRAWL_API_KEY`, retornar un resultado estructurado de fallback indicando la simulación.

### 4. Componente Principal (`src/components/SatsTrackerView.tsx`)
- **Key Metrics**: Precio en Satoshis de 1 pupusa revuelta, variación de Sats en 30 días, paridad de salario mínimo diario en Sats.
- **Dual Y-Axis Chart**: Gráfico interactivo con Recharts mostrando USD en el eje izquierdo y Satoshis en el eje derecho a lo largo del tiempo.
- **Calculadora en Satoshis**: Convertidor interactivo (USD ↔ Sats ↔ Cantidad de Pupusas).
- **Panel de Escaneo Firecrawl**: Interfaz para auditar sitios web de pupuserías y guardar nuevos precios.

---

## 📂 Archivos a Crear / Modificar

- `[NEW] src/lib/btcApi.ts`
- `[NEW] src/lib/firecrawlScraper.ts`
- `[NEW] src/components/SatsTrackerView.tsx`
- `[NEW] src/components/SatsCalculator.tsx`
- `[NEW] src/components/SatsPriceChart.tsx`
- `[MODIFY] src/App.tsx`
- `[MODIFY] src/utils/translations.ts`
