import React from "react";
import { Users } from "lucide-react";

export const EnterpriseView = () => (
  <div className="py-20 bg-indigo-900 min-h-[60vh] flex items-center">
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <div className="inline-flex bg-indigo-800 text-indigo-200 px-4 py-1 rounded-full text-sm font-bold mb-6">
        CloudMax Enterprise
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
        Soluções Escalonáveis para Grandes Negócios
      </h2>
      <p className="text-indigo-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
        Deixe que nós cuidamos da infraestrutura enquanto você foca no seu
        negócio. Controle de acesso avançado (SSO), logs de auditoria, API
        dedicada e gerente de conta exclusivo.
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
        <div className="bg-indigo-800/50 p-6 rounded-xl border border-indigo-700">
          <h4 className="text-white font-bold mb-2">Conformidade</h4>
          <p className="text-indigo-200 text-sm">
            Atendemos aos requisitos da LGPD, GDPR e HIPAA para dados sensíveis.
          </p>
        </div>
        <div className="bg-indigo-800/50 p-6 rounded-xl border border-indigo-700">
          <h4 className="text-white font-bold mb-2">Migração Gratuita</h4>
          <p className="text-indigo-200 text-sm">
            Nossa equipe técnica migra seus dados do Google Drive ou Dropbox sem
            custo.
          </p>
        </div>
        <div className="bg-indigo-800/50 p-6 rounded-xl border border-indigo-700">
          <h4 className="text-white font-bold mb-2">SLA de 99.99%</h4>
          <p className="text-indigo-200 text-sm">
            Garantia contratual de disponibilidade e suporte técnico 24/7/365.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2 shadow-lg">
          <Users size={20} /> Falar com Especialista
        </button>
      </div>
    </div>
  </div>
);
