import { BILLING_CYCLES } from "./constants";

export const calculatePrice = (plan, billingCycle) => {
  const cycleData = BILLING_CYCLES[billingCycle];
  const basePrice = plan.basePrice;

  let discount = cycleData.discount;
  if (
    plan.customDiscounts &&
    plan.customDiscounts[billingCycle] !== undefined
  ) {
    discount = plan.customDiscounts[billingCycle];
  }

  const totalRaw = basePrice * cycleData.months;
  const discountAmount = totalRaw * discount;
  const finalTotal = totalRaw - discountAmount;
  const monthlyEquivalent = finalTotal / cycleData.months;

  return {
    monthlyEquivalent: monthlyEquivalent.toFixed(2),
    totalBilled: finalTotal.toFixed(2),
    discountPercent: (discount * 100).toFixed(0),
    savings: discountAmount.toFixed(2),
    isCustomDiscount:
      plan.customDiscounts && plan.customDiscounts[billingCycle] !== undefined,
    isSurcharge: discount < 0,
  };
};
