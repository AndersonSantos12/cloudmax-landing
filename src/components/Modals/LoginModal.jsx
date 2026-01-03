import React from "react";
import { X } from "lucide-react";

export const LoginModal = ({
  isOpen,
  onClose,
  loginForm,
  loginErrors,
  isSubmitting,
  onInputChange,
  onSubmit,
  onSwitchToSignup,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl">Entrar</h3>
            <p className="text-indigo-100 text-sm mt-1">
              Acesse sua conta CloudMax.
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={onInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  loginErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                placeholder="voce@exemplo.com"
                disabled={isSubmitting}
              />
              {loginErrors.email && (
                <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={onInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  loginErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {loginErrors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={loginForm.remember}
                  onChange={onInputChange}
                  disabled={isSubmitting}
                  className="rounded border-slate-300"
                />
                Lembrar de mim
              </label>
              <button
                type="button"
                className="text-indigo-600 font-medium hover:underline disabled:opacity-50"
                onClick={() => console.log("Recuperação de senha")}
                disabled={isSubmitting}
              >
                Esqueci a senha
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-xs text-center text-slate-500">
              Novo por aqui?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                disabled={isSubmitting}
                className="text-indigo-600 font-semibold hover:underline disabled:opacity-50"
              >
                Criar conta
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
