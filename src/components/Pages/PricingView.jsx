import React from "react";
import { PLANS } from "../../utils/constants";
import { BillingCycleSelector } from "../PricingControls/BillingCycleSelector";
import { PricingCard } from "../Common/PricingCard";

export const PricingView = ({
  billingCycle,
  onChangeBillingCycle,
  onSelectPlan,
  getPriceForPlan,
}) => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Planos e Preços</h2>
          <p className="text-slate-600 mt-4 text-lg">
            Escolha o espaço ideal para sua vida digital.
          </p>
        </div>

        <BillingCycleSelector
          selectedCycle={billingCycle}
          onChangeCycle={onChangeBillingCycle}
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const pricing = getPriceForPlan(plan);
            const isAttractive =
              plan.customDiscounts && plan.customDiscounts[billingCycle] > 0.15;

            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                pricing={pricing}
                isAttractive={isAttractive}
                onSelectPlan={onSelectPlan}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
