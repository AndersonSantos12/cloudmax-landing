# CloudMax - Landing Page

🚀 Landing page moderna e responsiva para CloudMax, uma plataforma de armazenamento em nuvem seguro com criptografia de ponta a ponta.

## 📋 Visão Geral

CloudMax é uma solução de armazenamento em nuvem que oferece:

- **Backup Automático** - Sincronização em tempo real dos seus arquivos
- **Segurança Máxima** - Criptografia Zero-Knowledge (AES-256)
- **Múltiplos Planos** - Starter (200GB), Pro (2TB), Business (10TB)
- **Ciclos de Faturamento Flexíveis** - Mensal, Bimestral, Trimestral, Semestral, Anual
- **Descontos Inteligentes** - Economia em ciclos mais longos

## 🛠️ Stack Tecnológico

- **React 19** - Framework UI moderno com hooks
- **Vite 7.2.4** - Build tool rápido e eficiente
- **Tailwind CSS 3.4.18** - Styling utilitário responsivo
- **Lucide React 0.559.0** - Ícones SVG de alta qualidade
- **JavaScript ES6+** - Código moderno e limpo

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── Common/             # Componentes globais
│   │   ├── Footer.jsx
│   │   └── PricingCard.jsx
│   ├── Modals/             # Componentes de modal
│   │   ├── CheckoutModal.jsx
│   │   ├── LoginModal.jsx
│   │   ├── SignupModal.jsx
│   │   └── PaymentModal.jsx
│   ├── Navigation/         # Navegação
│   │   └── Navigation.jsx
│   ├── Pages/              # Páginas/Views
│   │   ├── HomeView.jsx
│   │   ├── FeaturesView.jsx
│   │   ├── SecurityView.jsx
│   │   ├── EnterpriseView.jsx
│   │   └── PricingView.jsx
│   └── PricingControls/    # Controles de precificação
│       └── BillingCycleSelector.jsx
├── hooks/                  # Custom hooks
│   ├── useFormValidation.js
│   ├── useModalState.js
│   └── usePricingCalculation.js
├── utils/                  # Utilitários
│   ├── constants.js        # Constantes (ciclos, planos)
│   ├── validation.js       # Validação de formulários
│   └── priceCalculator.js  # Cálculo de preços
├── StorageApp.jsx          # Componente principal
└── main.jsx                # Entrada da aplicação
```

## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone <seu-repositorio>
cd cloudmax-landing

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:5173` (ou porta alternativa se 5173 estiver em uso).

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados em `dist/`.

### Preview de Produção

```bash
npm run preview
```

## 🎨 Funcionalidades Principais

### 1. **Seletor de Ciclos de Faturamento**

- 5 opções: Mensal, Bimestral, Trimestral, Semestral, Anual
- Descontos dinâmicos (até 50% em trimestral)
- Taxa adicional em anual (-20% de acréscimo)

### 2. **Cálculo de Preços Inteligente**

- Descontos customizados por plano
- Mostra economia real
- Detecta taxas adicionais
- Equivalente mensal sempre visível

### 3. **Fluxo de Checkout**

1. Usuário clica "Começar Agora"
2. Modal com resumo da compra aparece
3. Opção de continuar ou comprar
4. Redirecionamento para login/signup se necessário

### 4. **Modais Responsivos**

- CheckoutModal - Resumo do plano
- LoginModal - Autenticação
- SignupModal - Registro de novo usuário
- PaymentModal - Confirmação de pagamento

### 5. **Formulários Validados**

- Email validation com regex
- Campos obrigatórios
- Feedback em tempo real
- Estados de carregamento

## 🔐 Segurança

- **Zero-Knowledge Encryption** - Seus dados, apenas suas chaves
- **AES-256** - Criptografia de nível militar
- **2FA** - Autenticação de dois fatores
- **Conformidade** - LGPD, GDPR, HIPAA

## 📊 Performance

- **81% redução de código** - Refatoração de 1.429 para 265 linhas no componente principal
- **Modularização** - 12 componentes independentes
- **Custom Hooks** - 3 hooks reutilizáveis
- **Sem animações bloqueantes** - UX otimizada
- **Fast Refresh** - HMR ativo em desenvolvimento

## 🎯 Páginas Disponíveis

| Página    | Rota       | Descrição                      |
| --------- | ---------- | ------------------------------ |
| Início    | `/` (home) | Hero com CTA e 3 features      |
| Recursos  | features   | Grid de 6 recursos principais  |
| Segurança | security   | Explicação Zero-Knowledge      |
| Preços    | pricing    | Ciclos, cards de planos        |
| Empresas  | enterprise | Soluções para grandes negócios |

## 📱 Responsividade

- ✅ Mobile First design
- ✅ Tablets (768px+)
- ✅ Desktop (1024px+)
- ✅ Menu hamburger em mobile
- ✅ Navegação sticky

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://api.cloudmax.com
VITE_STRIPE_KEY=seu_stripe_key
```

## 📦 Dependências Principais

```json
{
  "react": "^19.2.0",
  "vite": "^7.2.4",
  "tailwindcss": "^3.4.18",
  "lucide-react": "^0.559.0"
}
```

## 🧪 Testing

Para adicionar testes, recomendamos:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

## 📈 Roadmap

- [ ] Integração com Stripe
- [ ] Dashboard do usuário
- [ ] API backend
- [ ] Testes automatizados
- [ ] Analytics
- [ ] Notificações email
- [ ] Suporte multilíngue

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 📞 Suporte

Para suporte, envie um email para support@**\*\*\***.com ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ para CloudMax**
