import React from "react";
import { CheckCircle, HardDrive, AlertTriangle, Star } from "lucide-react";
import { PERIOD_SUFFIXES } from "../../utils/constants";

export const PricingCard = ({ plan, pricing, isAttractive, onSelectPlan }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl border transition-all duration-300 flex flex-col 
      ${
        plan.recommended
          ? "md:border-indigo-500 md:shadow-xl md:scale-105 md:z-10 border-slate-200 shadow-sm"
          : isAttractive
          ? "md:border-green-400 md:shadow-lg md:scale-105 md:z-10 border-slate-200 shadow-sm"
          : "border-slate-200 shadow-sm"
      }
      hover:shadow-lg hover:border-indigo-300
      `}
    >
      {plan.recommended && (
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
            Mais Escolhido
          </span>
        </div>
      )}
      {isAttractive && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
            Melhor Custo-Benefício
          </span>
        </div>
      )}

      <div className="p-8 flex-grow">
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <HardDrive size={18} className="text-indigo-600" />
          <span className="text-2xl font-bold text-slate-900">{plan.size}</span>
        </div>
        <p className="text-slate-500 text-sm mt-2 mb-6 min-h-[40px]">
          {plan.description}
        </p>

        <div className="mb-6 p-4 bg-slate-50 rounded-xl">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-slate-500 font-medium">R$</span>
            <span className="text-4xl font-extrabold text-slate-900">
              {pricing.totalBilled.split(".")[0]}
            </span>
            <span className="text-xl font-bold text-slate-900">
              ,{pricing.totalBilled.split(".")[1]}
            </span>
            <span className="text-slate-500 text-sm font-medium">
              /{PERIOD_SUFFIXES.monthly}
            </span>
          </div>

          {pricing.discountPercent > 0 && (
            <div className="mt-2 space-y-1 border-t border-slate-200 pt-2">
              {pricing.isSurcharge ? (
                <p className="text-sm font-medium text-amber-600 flex items-center gap-1">
                  <AlertTriangle size={14} fill="currentColor" />
                  Taxa adicional de administração
                </p>
              ) : (
                <p
                  className={`text-sm font-medium flex items-center gap-1 ${
                    pricing.isCustomDiscount
                      ? "text-green-700 font-bold"
                      : "text-green-600"
                  }`}
                >
                  <Star size={14} fill="currentColor" />
                  Economia de R$ {pricing.savings}{" "}
                  {pricing.isCustomDiscount && "🔥"}
                </p>
              )}
            </div>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-slate-600 text-sm"
            >
              <CheckCircle className="text-green-500 shrink-0" size={18} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 pt-0 mt-auto">
        <button
          onClick={() => onSelectPlan(plan)}
          className={`
            w-full py-3 rounded-xl font-bold text-lg transition shadow-md
            bg-indigo-600 text-white hover:bg-indigo-700
            md:${
              plan.recommended
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                : isAttractive
                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }
          `}
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};
