import React, { useState, useEffect } from "react";
import {
  Cloud,
  Lock,
  Smartphone,
  Zap,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Star,
  HardDrive,
  Globe,
  Server,
  Users,
  Shield,
  Key,
  Eye,
  FileText,
  Clock,
  AlertTriangle,
} from "lucide-react";

const StorageApp = () => {
  // Estado para controlar qual "página" está visível
  const [activePage, setActivePage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState(null);

  // Rola para o topo sempre que mudar de página
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [activePage]);

  // Definição dos ciclos
  const cycles = {
    monthly: { label: "Mensal", discount: 0, months: 1 },
    bimonthly: { label: "Bimestral", discount: 0.05, months: 2 },
    quarterly: { label: "Trimestral", discount: 0.1, months: 3 },
    semiannual: { label: "Semestral", discount: 0.15, months: 6 },
    annual: { label: "Anual", discount: 0.25, months: 12 },
  };

  const periodSuffixes = {
    monthly: "mês",
    bimonthly: "bimestre",
    quarterly: "trimestre",
    semiannual: "semestre",
    annual: "ano",
  };

  // Definição dos planos com lógica de desconto customizada
  const plans = [
    {
      id: 1,
      name: "Starter",
      size: "200 GB",
      description:
        "Ideal para backup de fotos do celular e documentos essenciais.",
      basePrice: 51.99, // Valor Base Solicitado
      // Estratégia: Incentivar Trimestral/Bimestral e Desincentivar Anual
      customDiscounts: {
        bimonthly: 0.3, // 30% OFF (Muito atraente)
        quarterly: 0.5, // 50% OFF (Irresistível)
        semiannual: 0.0, // Preço cheio
        annual: -0.2, // -20% significa 20% de ACRÉSCIMO (Bem mais caro)
      },
      features: [
        "1 Usuário",
        "Acesso em 3 dispositivos",
        "Histórico de 30 dias",
        "Suporte por Email",
      ],
      recommended: false,
    },
    {
      id: 2,
      name: "Pro",
      size: "2 TB",
      description:
        "Espaço de sobra para toda sua vida digital, vídeos em 4K e projetos.",
      basePrice: 129.9, // Valor ajustado para cima
      features: [
        "Até 5 Usuários",
        "Dispositivos ilimitados",
        "Criptografia Zero-Knowledge",
        "Ferramentas de IA",
      ],
      recommended: true,
    },
    {
      id: 3,
      name: "Business",
      size: "10 TB",
      description:
        "Para equipes e criadores que precisam de performance máxima.",
      basePrice: 349.9, // Valor ajustado para cima
      features: [
        "Usuários Ilimitados",
        "Gestão de permissões",
        "API de acesso",
        "Suporte Prioritário 24/7",
      ],
      recommended: false,
    },
  ];

  // Função atualizada para aceitar o objeto do plano e verificar descontos customizados
  const calculatePrice = (plan) => {
    const cycleData = cycles[billingCycle];
    const basePrice = plan.basePrice;

    // Verifica se o plano tem um desconto específico para o ciclo atual
    let discount = cycleData.discount;
    if (
      plan.customDiscounts &&
      plan.customDiscounts[billingCycle] !== undefined
    ) {
      discount = plan.customDiscounts[billingCycle];
    }

    const totalRaw = basePrice * cycleData.months;
    const discountAmount = totalRaw * discount;
    const finalTotal = totalRaw - discountAmount;
    const monthlyEquivalent = finalTotal / cycleData.months;

    return {
      monthlyEquivalent: monthlyEquivalent.toFixed(2),
      totalBilled: finalTotal.toFixed(2),
      discountPercent: (discount * 100).toFixed(0),
      savings: discountAmount.toFixed(2),
      isCustomDiscount:
        plan.customDiscounts &&
        plan.customDiscounts[billingCycle] !== undefined,
      isSurcharge: discount < 0, // Flag para identificar se é acréscimo
    };
  };

  const handleSelectPlan = (plan) => {
    const pricing = calculatePrice(plan);
    setSelectedPlanData({
      ...plan,
      pricing,
      cycle: cycles[billingCycle].label,
    });
    setShowModal(true);
  };

  // --- COMPONENTES DAS PÁGINAS ---

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="relative bg-white overflow-hidden mb-12">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/*         <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Zap size={16} /> Novo: Transferências 2x mais rápidas
            </div> */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Seus arquivos, seguros e{" "}
              <span className="text-indigo-600">
                acessíveis em qualquer lugar
              </span>
              .
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Backup automático, sincronização em tempo real e colaboração
              segura. Experimente a nuvem mais rápida do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActivePage("pricing")}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
              >
                Ver Planos <ArrowRight size={20} />
              </button>
              <button
                onClick={() => setActivePage("features")}
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

  const FeaturesView = () => (
    <div className="py-20 bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Todos os Recursos
          </h2>
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
              Nossa tecnologia SmartSync™ atualiza apenas as partes alteradas
              dos arquivos.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">App Universal</h3>
            <p className="text-slate-600">
              Acesse no iOS, Android, Windows, Mac e Linux com a mesma
              experiência fluida.
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
            onClick={() => setActivePage("pricing")}
            className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            Ver qual plano tem esses recursos <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const SecurityView = () => (
    <div className="py-20 bg-white animate-fade-in">
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
              <strong>apenas você possui a chave de descriptografia</strong>.
              Isso significa que mesmo se o governo ou hackers invadissem nossos
              servidores, eles veriam apenas dados embaralhados ilegíveis. Nem
              nós, funcionários da CloudMax, conseguimos ver seus arquivos.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={20} className="text-green-500" /> Chaves
                privadas geradas no seu dispositivo
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={20} className="text-green-500" />{" "}
                Criptografia AES-256 de nível militar
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={20} className="text-green-500" />{" "}
                Autenticação de dois fatores (2FA) forçada
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
                  <div className="text-sm text-slate-500">
                    Acesso da CloudMax
                  </div>
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

  const PricingView = () => (
    <div className="py-20 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Planos e Preços</h2>
          <p className="text-slate-600 mt-4 text-lg">
            Escolha o espaço ideal para sua vida digital.
          </p>
        </div>

        {/* Billing Cycle Selector */}
        {/* Billing Cycle Selector */}
        <div className="flex justify-center mb-12 px-4">
          <div
            className="bg-slate-100 p-2 rounded-xl flex flex-wrap md:flex-nowrap gap-2 md:gap-1 
          justify-center w-full max-w-3xl"
          >
            {Object.keys(cycles).map((cycleKey) => (
              <button
                key={cycleKey}
                onClick={() => setBillingCycle(cycleKey)}
                className={`
          px-3 sm:px-4 py-2 rounded-lg 
          text-xs sm:text-sm md:text-base 
          font-medium transition-all duration-200 
          whitespace-nowrap
          ${
            billingCycle === cycleKey
              ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-800"
          }
        `}
              >
                {cycles[cycleKey].label}
                {cycles[cycleKey].discount > 0 && (
                  <span className="ml-2 text-[10px] sm:text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                    -{cycles[cycleKey].discount * 100}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const pricing = calculatePrice(plan);
            const isAttractive =
              plan.customDiscounts && plan.customDiscounts[billingCycle] > 0.15; // Considera atraente descontos > 15%

            return (
              <div
                key={plan.id}
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
                {/* Badge específico para ofertas atraentes */}
                {isAttractive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                      Melhor Custo-Benefício
                    </span>
                  </div>
                )}

                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <HardDrive size={18} className="text-indigo-600" />
                    <span className="text-2xl font-bold text-slate-900">
                      {plan.size}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2 mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-slate-500 font-medium">
                        R$
                      </span>
                      <span className="text-4xl font-extrabold text-slate-900">
                        {pricing.totalBilled.split(".")[0]}
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        ,{pricing.totalBilled.split(".")[1]}
                      </span>
                      <span className="text-slate-500 text-sm font-medium">
                        /{periodSuffixes[billingCycle]}
                      </span>
                    </div>

                    {billingCycle !== "monthly" && (
                      <div className="mt-2 space-y-1 border-t border-slate-200 pt-2">
                        <p className="text-sm text-slate-500">
                          Equivalente a{" "}
                          <strong>R$ {pricing.monthlyEquivalent}</strong>/mês
                        </p>

                        {/* Lógica condicional para mostrar Economia ou Acréscimo */}
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
                        <CheckCircle
                          className="text-green-500 shrink-0"
                          size={18}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`
                        w-full py-3 rounded-xl font-bold text-lg transition shadow-md

                        /* MOBILE: todos iguais */
                        bg-indigo-600 text-white hover:bg-indigo-700

                        /* DESKTOP: estilos individuais */
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
          })}
        </div>
      </div>
    </div>
  );

  const EnterpriseView = () => (
    <div className="py-20 bg-indigo-900 animate-fade-in min-h-[60vh] flex items-center">
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
              Atendemos aos requisitos da LGPD, GDPR e HIPAA para dados
              sensíveis.
            </p>
          </div>
          <div className="bg-indigo-800/50 p-6 rounded-xl border border-indigo-700">
            <h4 className="text-white font-bold mb-2">Migração Gratuita</h4>
            <p className="text-indigo-200 text-sm">
              Nossa equipe técnica migra seus dados do Google Drive ou Dropbox
              sem custo.
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

  // --- RENDERIZAÇÃO DO CONTEÚDO PRINCIPAL ---

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <HomeView />;
      case "features":
        return <FeaturesView />;
      case "security":
        return <SecurityView />;
      case "pricing":
        return <PricingView />;
      case "enterprise":
        return <EnterpriseView />;
      default:
        return <HomeView />;
    }
  };

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => setActivePage(page)}
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
      onClick={() => setActivePage(page)}
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
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Click goes Home */}
            <button
              onClick={() => setActivePage("home")}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Cloud className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-2xl text-slate-900">
                Cloud<span className="text-indigo-600">Max</span>
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <NavLink page="home" label="Início" />
              <NavLink page="features" label="Recursos" />
              <NavLink page="security" label="Segurança" />
              <NavLink page="pricing" label="Preços" />
              <NavLink page="enterprise" label="Empresas" />
            </div>
            <div className="hidden md:flex gap-4">
              <button className="text-slate-600 font-medium hover:text-indigo-600">
                Login
              </button>
              <button
                onClick={() => setActivePage("pricing")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Criar Conta
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
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
                  className="w-full text-left bg-indigo-600 text-white px-3 py-3 rounded-md font-bold"
                  onClick={() => setActivePage("pricing")}
                >
                  Criar Conta
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area - Renders based on activePage */}
      <main className="flex-grow">{renderContent()}</main>

      {/* Footer (Global) */}
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
                    onClick={() => setActivePage("home")}
                    className="hover:text-indigo-600"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage("pricing")}
                    className="hover:text-indigo-600"
                  >
                    Preços
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage("features")}
                    className="hover:text-indigo-600"
                  >
                    Recursos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage("security")}
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
            <div className="flex gap-4 mt-4 md:mt-0">
              <Globe size={16} /> Português (Brasil)
            </div>
          </div>
        </div>
      </footer>

      {/* Modal is Global */}
      {showModal && selectedPlanData && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl">Criar sua conta</h3>
                <p className="text-indigo-100 text-sm mt-1">
                  Configuração rápida e segura.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">
                    Plano {selectedPlanData.name}
                  </span>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                    {selectedPlanData.size}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Faturamento:</span>
                  <span className="font-medium">{selectedPlanData.cycle}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 border-t border-slate-200 pt-2 mt-2">
                  <span>Total hoje:</span>
                  <span className="font-bold text-slate-900 text-lg">
                    R$ {selectedPlanData.pricing.totalBilled}
                  </span>
                </div>

                {/* Lógica condicional para Modal também */}
                {selectedPlanData.pricing.isSurcharge ? (
                  <p className="text-xs text-amber-600 mt-2 text-right">
                    Inclui taxa administrativa de 20%.
                  </p>
                ) : (
                  selectedPlanData.pricing.savings > 0 && (
                    <p className="text-xs text-green-600 mt-2 text-right">
                      Você economizou R$ {selectedPlanData.pricing.savings}
                    </p>
                  )
                )}
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Conta criada com sucesso! Verifique seu email.");
                  setShowModal(false);
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="voce@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 mt-2"
                >
                  Criar Conta e Pagar
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Ao clicar, você aceita nossos Termos de Serviço. A renovação é
                  automática.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageApp;
