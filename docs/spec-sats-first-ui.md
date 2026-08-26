# 📄 Specification: Sats-First UI Architecture & Native Metric

Especificación técnica para transformar el dashboard completo de `pupusa-index` a una arquitectura **Sats-First**.

---

## 📌 Requisitos de Implementación

### 1. Hero & KeyMetric Componentes (`src/components/Hero.tsx` & `src/components/KeyMetric.tsx`)
- La métrica principal exhibirá la cifra en **Satoshis (Sats)** en tamaño grande destacado (`789 Sats`), con la variación porcentual en Satoshis.
- El valor equivalente en USD se mostrará como una etiqueta secundaria sutil.

### 2. Tarjeta de Comparativa Deflacionaria (`src/components/DeflationComparison.tsx`)
- Componente que muestra lado a lado la inflación en USD (+%) vs la deflación en Satoshis (-%).

### 3. Integración en `App.tsx`
- La vista principal por defecto se inicializa en el modo **Sats-First**.
