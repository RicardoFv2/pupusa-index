import { usdToSats } from "./btcApi";

export interface BasketItems {
  harinaLb: number; // lbs
  quesoLb: number; // lbs
  chicharronLb: number; // lbs
  frijolLb: number; // lbs
  tomateLb: number; // lbs
  gasJornadas: number; // jornadas
}

export const UNIT_PRICES_USD = {
  harinaLb: 0.9,
  quesoLb: 3.5,
  chicharronLb: 3.8,
  frijolLb: 1.25,
  tomateLb: 0.75,
  gasJornadas: 0.45,
};

export interface BasketSummary {
  totalUsd: number;
  totalSats: number;
  laborHours: number;
  laborMinutes: number;
  pupusasEquivalentes: number;
}

/**
 * Calculates total basket cost in USD, Satoshis, and labor time required
 */
export function calculateBasketSummary(
  items: BasketItems,
  btcPriceUsd: number,
  monthlyWageUsd: number = 365
): BasketSummary {
  const totalUsd =
    items.harinaLb * UNIT_PRICES_USD.harinaLb +
    items.quesoLb * UNIT_PRICES_USD.quesoLb +
    items.chicharronLb * UNIT_PRICES_USD.chicharronLb +
    items.frijolLb * UNIT_PRICES_USD.frijolLb +
    items.tomateLb * UNIT_PRICES_USD.tomateLb +
    items.gasJornadas * UNIT_PRICES_USD.gasJornadas;

  const totalSats = usdToSats(totalUsd, btcPriceUsd);

  // Hourly wage based on 30 days / 8 hours per day = 240 work hours/month or 160 standard
  // Standard ES labor month = 30 days * (44 hrs / week / 7) ~ 176 hours per month
  const hourlyWage = monthlyWageUsd / 176;
  const totalLaborHours = hourlyWage > 0 ? totalUsd / hourlyWage : 0;
  const totalLaborMinutes = totalLaborHours * 60;

  // Assuming an average pupusa costs $0.75
  const pupusasEquivalentes = Math.round(totalUsd / 0.75);

  return {
    totalUsd: Number(totalUsd.toFixed(2)),
    totalSats,
    laborHours: Number(totalLaborHours.toFixed(1)),
    laborMinutes: Math.round(totalLaborMinutes),
    pupusasEquivalentes,
  };
}
