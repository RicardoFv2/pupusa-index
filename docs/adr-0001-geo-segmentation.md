# 📑 ADR 0001: Segmentación Departamental y Mapa SVG Interactivo

- **Estado:** Aprobado (*Accepted*)
- **Fecha:** 24 de Agosto, 2026
- **Autores:** Equipo Pupusa Index & Antigravity Agent

---

## 💡 Contexto
El costo de vida e inflación varía sustancialmente entre los 14 departamentos de El Salvador (ej. zona metropolitana vs. zonas rurales). Para brindar un análisis más preciso, se requiere desglosar el Pupusa Index geográficamente tanto en USD como en Satoshis.

---

## 🎯 Decisión Arquitectónica
1. **Componente Visual:** Implementar un mapa interactivo vectorial en formato SVG de El Salvador (`ElSalvadorMap.tsx`), complementado con una tabla comparativa clasificada de menor a mayor costo.
2. **Resiliencia de Datos (Fallback):** En caso de que un departamento no posea registros en el mes activo, el sistema utilizará el promedio nacional asignando la etiqueta identificadora `"Estimado Nacional"`.
3. **Conversión Moneda:** Cada valor departamental calculará dinámicamente su precio equivalente en Satoshis utilizando el tipo de cambio BTC/USD de la Mempool API en vivo.

---

## ⚖️ Consecuencias
- **Positivas:**
  - Mayor valor analítico para usuarios en diferentes regiones de El Salvador.
  - Interfaz gráfica moderna e interactiva sin dependencias pesadas de mapas de terceros (e.g. Mapbox o Google Maps).
- **Desafíos:**
  - Requiere mantener datos geográficos vectoriales limpios en SVG para los 14 departamentos.
