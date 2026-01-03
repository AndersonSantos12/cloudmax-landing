import React from "react";
import { X } from "lucide-react";

export const PaymentModal = ({
  isOpen,
  onClose,
  paymentForm,
  paymentErrors,
  isSubmitting,
  onInputChange,
  onSubmit,
  onSwitchToLogin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            Finalizar Pagamento
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={paymentForm.email}
              onChange={onInputChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {paymentErrors.email && (
              <p className="text-red-500 text-sm mt-1">{paymentErrors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={paymentForm.password}
              onChange={onInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {paymentErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {paymentErrors.password}
              </p>
            )}
          </div>

          {/* Informações de Pagamento */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600">
              <strong>Método de Pagamento:</strong> Cartão de Crédito
            </p>
            <p className="text-sm text-slate-600 mt-2">
              <strong>Próxima etapa:</strong> Será redirecionado para Stripe
            </p>
          </div>

          {/* Botões */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Processando..." : "Prosseguir para Pagamento"}
          </button>

          <p className="text-center text-sm text-slate-600">
            Você será redirecionado para confirmar sua compra de forma segura.
          </p>
        </form>
      </div>
    </div>
  );
};
