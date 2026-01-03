// Ciclos de faturamento
export const BILLING_CYCLES = {
  monthly: { label: "Mensal", discount: 0, months: 1 },
  bimonthly: { label: "Bimestral", discount: 0.05, months: 2 },
  quarterly: { label: "Trimestral", discount: 0.1, months: 3 },
  semiannual: { label: "Semestral", discount: 0.15, months: 6 },
  annual: { label: "Anual", discount: 0.25, months: 12 },
};

export const PERIOD_SUFFIXES = {
  monthly: "mês",
  bimonthly: "bimestre",
  quarterly: "trimestre",
  semiannual: "semestre",
  annual: "ano",
};

// Planos de preço
export const PLANS = [
  {
    id: 1,
    name: "Starter",
    size: "1 GB",
    description:
      "Ideal para backup de fotos do celular e documentos essenciais.",
    basePrice: 59.99,
    customDiscounts: {
      bimonthly: 0.27,
      quarterly: 0.48,
      semiannual: 0.0,
      annual: -0.2,
    },
    features: [
      "1 Usuário",
      //  "Acesso em 3 dispositivos",
      "Histórico de 30 dias",
      "Suporte via Email",
    ],
    recommended: false,
  },
  {
    id: 2,
    name: "Pro",
    size: "15 GB",
    description:
      "Espaço de sobra para toda sua vida digital, vídeos em 4K e projetos.",
    basePrice: 159.9,
    features: [
      "Até 2 Usuários",
      "Gestão de permissões",
      "Criptografia Zero-Knowledge",
      "Ferramentas de IA",
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Business",
    size: "100 GB",
    description: "Para equipes e criadores que precisam de performance máxima.",
    basePrice: 549.9,
    features: [
      "Usuários Ilimitados",
      "Gestão de permissões",
      "API de acesso",
      "Suporte Prioritário 24/7",
    ],
    recommended: false,
  },
];
