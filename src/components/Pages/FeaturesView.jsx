import React from "react";
import {
  HardDrive,
  Zap,
  Smartphone,
  FileText,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";

export const FeaturesView = ({ onNavigate }) => (
  <div className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Todos os Recursos</h2>
        <p className="text-slate-600 mt-4 text-lg">
          Uma suíte completa de ferramentas para gerenciar sua vida digital.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <HardDrive size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Backup Automático</h3>
          <p className="text-slate-600">
            Configure uma vez e esqueça. Fazemos backup das suas pastas
            importantes em tempo real.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Sincronização Rápida</h3>
          <p className="text-slate-600">
            Nossa tecnologia SmartSync™ atualiza apenas as partes alteradas dos
            arquivos.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <Smartphone size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">App Universal</h3>
          <p className="text-slate-600">
            Acesse no iOS, Android, Windows, Mac e Linux com a mesma experiência
            fluida.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Editor de Documentos</h3>
          <p className="text-slate-600">
            Edite documentos, planilhas e slides diretamente no navegador sem
            instalar nada.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Compartilhamento</h3>
          <p className="text-slate-600">
            Crie links públicos ou protegidos por senha. Defina data de
            expiração para downloads.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Histórico de Versões</h3>
          <p className="text-slate-600">
            Errou? Volte no tempo. Mantemos versões dos seus arquivos por até
            180 dias.
          </p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate("pricing")}
          className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
        >
          Ver qual plano tem esses recursos <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);
