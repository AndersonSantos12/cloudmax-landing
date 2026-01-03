import React from "react";
import { BILLING_CYCLES } from "../../utils/constants";

export const BillingCycleSelector = ({ selectedCycle, onChangeCycle }) => {
  return (
    <div className="flex justify-center mb-12 px-4">
      <div
        className="bg-slate-100 p-2 rounded-xl flex flex-wrap md:flex-nowrap gap-2 md:gap-1 
        justify-center w-full max-w-3xl"
      >
        {Object.keys(BILLING_CYCLES).map((cycleKey) => (
          <button
            key={cycleKey}
            onClick={() => onChangeCycle(cycleKey)}
            className={`
          px-3 sm:px-4 py-2 rounded-lg 
          text-xs sm:text-sm md:text-base 
          font-medium transition-all duration-200 
          whitespace-nowrap
          ${
            selectedCycle === cycleKey
              ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-800"
          }
        `}
          >
            {BILLING_CYCLES[cycleKey].label}
            {BILLING_CYCLES[cycleKey].discount > 0 && (
              <span className="ml-2 text-[10px] sm:text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                -{BILLING_CYCLES[cycleKey].discount * 100}%
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
