import { usdToSats } from "../lib/btcApi";

export interface DepartmentPrice {
  id: string;
  name: string;
  priceUsd: number;
  isEstimated: boolean;
  sampleCount: number;
}

export const DEPARTMENTS_DATA: Record<string, Omit<DepartmentPrice, "id">> = {
  "san-salvador": { name: "San Salvador", priceUsd: 0.85, isEstimated: false, sampleCount: 142 },
  "la-libertad": { name: "La Libertad", priceUsd: 0.9, isEstimated: false, sampleCount: 98 },
  "santa-ana": { name: "Santa Ana", priceUsd: 0.75, isEstimated: false, sampleCount: 64 },
  "san-miguel": { name: "San Miguel", priceUsd: 0.7, isEstimated: false, sampleCount: 52 },
  sonsoante: { name: "Sonsonate", priceUsd: 0.7, isEstimated: false, sampleCount: 38 },
  usulutan: { name: "Usulután", priceUsd: 0.65, isEstimated: false, sampleCount: 29 },
  ahuachapan: { name: "Ahuachapán", priceUsd: 0.65, isEstimated: false, sampleCount: 21 },
  "la-paz": { name: "La Paz", priceUsd: 0.75, isEstimated: false, sampleCount: 31 },
  "la-union": { name: "La Unión", priceUsd: 0.8, isEstimated: false, sampleCount: 19 },
  cuscatlan: { name: "Cuscatlán", priceUsd: 0.75, isEstimated: true, sampleCount: 12 },
  chalatenango: { name: "Chalatenango", priceUsd: 0.7, isEstimated: true, sampleCount: 8 },
  morazan: { name: "Morazán", priceUsd: 0.7, isEstimated: true, sampleCount: 6 },
  "san-vicente": { name: "San Vicente", priceUsd: 0.75, isEstimated: true, sampleCount: 9 },
  cabanas: { name: "Cabañas", priceUsd: 0.75, isEstimated: true, sampleCount: 5 },
};

export function getDepartmentList(btcPriceUsd: number) {
  return Object.entries(DEPARTMENTS_DATA).map(([id, data]) => ({
    id,
    ...data,
    satsPrice: usdToSats(data.priceUsd, btcPriceUsd),
  }));
}
