import React from "react";
import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";

export const SecurityView = () => (
  <div className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
          <Shield size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">
          Segurança em Primeiro Lugar
        </h2>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
          Não somos apenas um pen-drive na nuvem. Somos um cofre digital. Sua
          privacidade é nosso modelo de negócio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Criptografia Zero-Knowledge
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Diferente de outros serviços, nós usamos uma arquitetura onde{" "}
            <strong>apenas você possui a chave de descriptografia</strong>. Isso
            significa que mesmo se o governo ou hackers invadissem nossos
            servidores, eles veriam apenas dados embaralhados ilegíveis. Nem
            nós, funcionários da CloudMax, conseguimos ver seus arquivos.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={20} className="text-green-500" /> Chaves
              privadas geradas no seu dispositivo
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={20} className="text-green-500" /> Criptografia
              AES-256 de nível militar
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={20} className="text-green-500" /> Autenticação
              de dois fatores (2FA) forçada
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <Lock className="text-indigo-600" />
              <div>
                <div className="text-sm text-slate-500">
                  Status da Criptografia
                </div>
                <div className="font-bold text-green-600">
                  Ativa (Client-Side)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <Eye className="text-red-500" />
              <div>
                <div className="text-sm text-slate-500">Acesso da CloudMax</div>
                <div className="font-bold text-red-500">
                  Bloqueado (Sem chaves)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <Server className="text-blue-600" />
              <div>
                <div className="text-sm text-slate-500">
                  Localização dos Dados
                </div>
                <div className="font-bold text-slate-800">
                  Múltiplos Data Centers (Redundância)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
