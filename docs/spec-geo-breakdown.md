# 📄 Specification: Departmental Breakdown & Interactive El Salvador Map

Especificación técnica para la funcionalidad de **Desglose Departamental del Pupusa Index**.

---

## 📌 Componentes y Estructura de Datos

### 1. Datos Geográficos (`src/data/departmentData.ts`)
- Arreglo estático de los 14 departamentos de El Salvador (San Salvador, La Libertad, Santa Ana, San Miguel, Sonsonate, Usulután, Ahuachapán, La Paz, La Unión, Cuscatlán, Chalatenango, Morazán, San Vicente, Cabañas).
- Precios base promedio en USD y método para obtener precio ajustado o fallback nacional.

### 2. Componente de Mapa Vectorial (`src/components/ElSalvadorMap.tsx`)
- Renderizado interactivo SVG de la geografía salvadoreña con respuesta al hover/clic para seleccionar un departamento.

### 3. Componente de Tabla y Métricas (`src/components/DepartmentBreakdown.tsx`)
- Tabla comparativa de los 14 departamentos ordenada de menor a mayor precio en Satoshis.
- Tarjeta de detalle del departamento seleccionado.

### 4. Integración (`src/components/SatsTrackerView.tsx`)
- Montar el módulo `DepartmentBreakdown` en la vista **Sats & AI Tracker**.
