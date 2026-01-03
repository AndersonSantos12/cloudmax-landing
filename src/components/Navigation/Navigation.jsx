import React from "react";
import { Cloud, Menu, X } from "lucide-react";

export const Navigation = ({
  activePage,
  onNavigate,
  isMenuOpen,
  onToggleMenu,
  onOpenLogin,
  onOpenSignup,
}) => {
  const NavLink = ({ page, label }) => (
    <button
      onClick={() => onNavigate(page)}
      className={`font-medium transition ${
        activePage === page
          ? "text-indigo-600 font-bold"
          : "text-slate-600 hover:text-indigo-600"
      }`}
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ page, label }) => (
    <button
      onClick={() => onNavigate(page)}
      className={`block w-full text-left px-3 py-2 rounded-md ${
        activePage === page
          ? "bg-indigo-50 text-indigo-600 font-bold"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <Cloud className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-2xl text-slate-900">
              Cloud<span className="text-indigo-600">Max</span>
            </span>
          </button>

          <div className="hidden md:flex space-x-8">
            <NavLink page="home" label="Início" />
            <NavLink page="features" label="Recursos" />
            <NavLink page="security" label="Segurança" />
            <NavLink page="pricing" label="Preços" />
            <NavLink page="enterprise" label="Empresas" />
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={onOpenLogin}
              className="text-slate-600 font-medium hover:text-indigo-600"
            >
              Login
            </button>
            <button
              onClick={onOpenSignup}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Criar Conta
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={onToggleMenu} className="text-slate-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full z-50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <MobileNavLink page="home" label="Início" />
            <MobileNavLink page="features" label="Recursos" />
            <MobileNavLink page="security" label="Segurança" />
            <MobileNavLink page="pricing" label="Preços" />
            <MobileNavLink page="enterprise" label="Para Empresas" />
            <div className="pt-4 border-t border-slate-100 mt-2">
              <button
                className="w-full text-left bg-white text-indigo-700 border border-indigo-100 px-3 py-3 rounded-md font-bold mb-2"
                onClick={onOpenLogin}
              >
                Login
              </button>
              <button
                className="w-full text-left bg-indigo-600 text-white px-3 py-3 rounded-md font-bold"
                onClick={onOpenSignup}
              >
                Criar Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
