import { useState } from "react";
import { BILLING_CYCLES } from "../utils/constants";
import { calculatePrice } from "../utils/priceCalculator";

export const usePricingCalculation = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const getPriceForPlan = (plan) => {
    return calculatePrice(plan, billingCycle);
  };

  const getSelectedPlanData = (plan) => {
    return {
      ...plan,
      pricing: getPriceForPlan(plan),
      cycle: BILLING_CYCLES[billingCycle].label,
    };
  };

  return {
    billingCycle,
    setBillingCycle,
    getPriceForPlan,
    getSelectedPlanData,
    BILLING_CYCLES,
  };
};
