# 📄 Specification: Pupusa Inflation Basket & Wage Parity Simulator

Especificación técnica para el **Simulador de Canasta Básica Pupusera y Paridad Salarial en Satoshis**.

---

## 📌 Requisitos de Arquitectura

### 1. Cálculo de Canasta de Insumos (`src/lib/basketCalculator.ts`)
- Modelar el precio e insumos por libra/unidad:
  - Harina de maíz/arroz: $0.90 USD/lb
  - Queso Quesillo: $3.50 USD/lb
  - Chicharrón molido: $3.80 USD/lb
  - Frijoles rojos: $1.25 USD/lb
  - Tomates: $0.75 USD/lb
  - Gas propano: $0.45 USD por jornada
- Calcular el costo total en USD, su conversión a Satoshis y las horas de trabajo requeridas según el salario mínimo ($365 USD Comercio / $408 USD Maquila).

### 2. Componente de Simulación UI (`src/components/PupusaBasketSimulator.tsx`)
- Sliders interactivos para ajustar cantidades de cada insumo.
- Selector de sector de salario mínimo ($365 / $408 USD).
- Métricas en vivo: Costo Total ($ USD), Costo Total (Satoshis) y Horas de trabajo equivalentes.

### 3. Integración en el Dashboard (`src/components/SatsTrackerView.tsx`)
- Agregar el módulo `PupusaBasketSimulator` dentro de la vista **Sats & AI Tracker**.
