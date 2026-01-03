import React from "react";
import { Cloud } from "lucide-react";

export const Footer = ({ onNavigate }) => {
  return (
    <footer
      id="contato"
      className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl text-slate-900">
                Cloud<span className="text-indigo-600">Max</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              Armazenamento em nuvem seguro, rápido e confiável para pessoas e
              empresas modernas.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Site</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-indigo-600"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-indigo-600"
                >
                  Preços
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("features")}
                  className="hover:text-indigo-600"
                >
                  Recursos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("security")}
                  className="hover:text-indigo-600"
                >
                  Segurança
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Status do Servidor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Comunidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2024 CloudMax Inc. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
