# 🎟️ Tickets de Implementación: Sats & Inflation AI Tracker

## Ticket 1: Servicio BTC API & Utilitarios de Conversión a Satoshis
- **Archivo:** `src/lib/btcApi.ts`
- **Tarea:** Implementar consultas a Mempool API (`mempool.space/api/v1/prices`) y métodos para calcular `usdToSats(usdPrice, btcUsdRate)` y `satsPerPupusa(pupusaPriceUsd, btcUsdRate)`.
- **Verificación:** Pruebas unitarias o verificación de respuesta de la API.

## Ticket 2: Integración de Firecrawl Scraper
- **Archivo:** `src/lib/firecrawlScraper.ts`
- **Tarea:** Crear el wrapper para `@mendable/firecrawl-js` con fallback limpio si no hay API Key configurada.
- **Verificación:** Ejecutar extracción de prueba o fallback simulado.

## Ticket 3: Componentes de Visualización (SatsCalculator & SatsPriceChart)
- **Archivos:** `src/components/SatsCalculator.tsx`, `src/components/SatsPriceChart.tsx`
- **Tarea:** Crear la calculadora interactiva USD ↔ Sats y el gráfico Recharts con Eje Dual (USD en eje Y izquierdo, Satoshis en eje Y derecho).
- **Verificación:** Renderizado correcto de gráficos y cálculo interactivo.

## Ticket 4: Componente Principal SatsTrackerView & Integración en App.tsx
- **Archivos:** `src/components/SatsTrackerView.tsx`, `src/App.tsx`, `src/utils/translations.ts`
- **Tarea:** Agregar pestañas en el Header para alternar vistas y montar el `SatsTrackerView`.
- **Verificación:** Comprobar la navegación fluida entre la vista clásica en USD y la nueva vista en Satoshis.
