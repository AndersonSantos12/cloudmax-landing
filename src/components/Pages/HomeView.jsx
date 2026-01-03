import React from "react";
import { Lock, Smartphone, Users, ArrowRight } from "lucide-react";

export const HomeView = ({ onNavigate }) => (
  <div>
    {/* Hero Section */}
    <header className="relative bg-white overflow-hidden mb-12">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Seus arquivos, seguros e{" "}
            <span className="text-indigo-600">
              acessíveis em qualquer lugar
            </span>
            .
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Backup automático, sincronização em tempo real e colaboração segura.
            Experimente a nuvem mais rápida do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("pricing")}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Ver Planos <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate("features")}
              className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition"
            >
              Conhecer Recursos
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mini Features Preview */}
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <Lock className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Segurança Máxima</h3>
            <p className="text-slate-600 text-sm">
              Criptografia de ponta a ponta para seus dados.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <Smartphone className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Acesso Mobile</h3>
            <p className="text-slate-600 text-sm">
              Seus arquivos no bolso, em qualquer lugar.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <Users className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Colaboração</h3>
            <p className="text-slate-600 text-sm">
              Compartilhe pastas com um clique.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);
