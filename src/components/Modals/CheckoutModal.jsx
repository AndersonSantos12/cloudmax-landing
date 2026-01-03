import React from "react";
import { X, ShoppingCart } from "lucide-react";

export const CheckoutModal = ({
  isOpen,
  onClose,
  planData,
  onLoginClick,
  onSignupClick,
}) => {
  if (!isOpen || !planData) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-white">Resumo da Compra</h3>
            <p className="text-indigo-100 text-sm mt-1">
              Verifique os detalhes do seu plano.
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-700">
                Plano {planData.name}
              </span>
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                {planData.size}
              </span>
            </div>

            <div className="flex justify-between text-sm text-slate-600 mb-1">
              <span>Faturamento:</span>
              <span className="font-medium">{planData.cycle}</span>
            </div>

            {planData.pricing.discountPercent > 0 && (
              <div className="flex justify-between text-sm bg-green-50 -mx-4 px-4 py-2 my-2">
                <span className="text-green-700 font-medium">
                  Desconto ({planData.pricing.discountPercent}%):
                </span>
                <span className="font-bold text-green-700">
                  -R$ {planData.pricing.savings}
                </span>
              </div>
            )}

            {planData.pricing.isSurcharge && (
              <div className="flex justify-between text-sm bg-amber-50 -mx-4 px-4 py-2 my-2">
                <span className="text-amber-700 font-medium">
                  Taxa adicional (20%):
                </span>
                <span className="font-bold text-amber-700">
                  +R$ {planData.pricing.savings}
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm text-slate-600 border-t border-slate-200 pt-2 mt-2">
              <span>Total hoje:</span>
              <span className="font-bold text-slate-900 text-lg">
                R$ {planData.pricing.totalBilled}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onLoginClick}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Comprar Agora
            </button>
            <button
              onClick={onClose}
              className="w-full bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-300 transition border border-slate-300"
            >
              Continuar comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
