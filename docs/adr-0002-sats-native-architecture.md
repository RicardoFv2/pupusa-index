# 📑 ADR 0002: Arquitectura Naranja (Sats-First) y Métrica Directa de Satoshis

- **Estado:** Aprobado (*Accepted*)
- **Fecha:** 25 de Agosto, 2026
- **Autores:** Equipo Pupusa Index & Antigravity Agent

---

## 💡 Contexto
Inicialmente, la aplicación trataba los dólares estadounidenses (USD) como la unidad de cuenta principal y los Satoshis como un cálculo secundario. Para alinearse con la adopción de Bitcoin en El Salvador y la naturaleza deflacionaria de la criptomoneda, la plataforma se reorienta a ser **Sats-First (Bitcoin Nativo)**.

---

## 🎯 Decisión Arquitectónica
1. **Unidad de Cuenta Primaria:** Todas las métricas del dashboard (Key Metric, Calculadora, Gráficos y Desglose Departamental) mostrarán los **Satoshis (Sats)** como moneda principal.
2. **Métrica Directa sin Normalización Compleja:** El indicador principal será `Sats por Pupusa` (ej. `789 Sats`) indicando la variación porcentual directa respecto al período anterior.
3. **Panel de Comparativa Deflacionaria:** Incluir una tarjeta visual comparativa que muestre la pérdida de poder adquisitivo del dinero FIAT (inflación USD +%) en contraste con la ganancia de poder adquisitivo en Bitcoin (deflación Sats -%).

---

## ⚖️ Consecuencias
- **Positivas:**
  - Comunicación clara y directa sobre el impacto del Bitcoin en el costo de vida cotidiano.
  - Experiencia visual "Sats-First" coherente e innovadora.
- **Desafíos:**
  - Requiere asegurar que el precio del Bitcoin (Mempool API) se actualice sin latencia para mantener exactitud en las conversiones.
