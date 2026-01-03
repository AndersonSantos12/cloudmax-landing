import React, { useEffect } from "react";
import { Cloud, Menu, X, User, LogIn, UserPlus } from "lucide-react";

// Hooks customizados
import { useModalState } from "./hooks/useModalState";
import { useFormValidation } from "./hooks/useFormValidation";
import { usePricingCalculation } from "./hooks/usePricingCalculation";

// Componentes de Página
import { HomeView } from "./components/Pages/HomeView";
import { FeaturesView } from "./components/Pages/FeaturesView";
import { SecurityView } from "./components/Pages/SecurityView";
import { EnterpriseView } from "./components/Pages/EnterpriseView";
import { PricingView } from "./components/Pages/PricingView";
import { PaymentPage } from "./components/Pages/PaymentPage";

// Modais
import { LoginModal } from "./components/Modals/LoginModal";
import { SignupModal } from "./components/Modals/SignupModal";
import { CheckoutModal } from "./components/Modals/CheckoutModal";
import { PaymentModal } from "./components/Modals/PaymentModal";

// Componentes Comuns
import { Footer } from "./components/Common/Footer";

const StorageApp = () => {
  // Estado da página
  const [activePage, setActivePage] = React.useState("home");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const [paymentPlanData, setPaymentPlanData] = React.useState(null);

  // Hooks de estado compartilhado
  const {
    showLoginModal,
    showSignupModal,
    showCheckoutModal,
    showModal,
    selectedPlanData,
    openLogin,
    openSignup,
    openCheckout,
    proceedToLogin,
    proceedToSignup,
    closeAllModals,
  } = useModalState();

  const {
    loginForm,
    signupForm,
    paymentForm,
    loginErrors,
    signupErrors,
    isSubmitting,
    handleLoginChange,
    handleSignupChange,
    handlePaymentChange,
    handleLoginSubmit,
    handleSignupSubmit,
    handlePaymentSubmit,
  } = useFormValidation();

  const { billingCycle, setBillingCycle, getPriceForPlan } =
    usePricingCalculation();

  // Rola para topo ao mudar de página
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [activePage]);

  // Handlers
  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const handleSelectPlan = (plan) => {
    const pricing = getPriceForPlan(plan);
    const cycleLabelsPt = {
      monthly: "Mensal",
      bimonthly: "Bimestral",
      quarterly: "Trimestral",
      semiannual: "Semestral",
      annual: "Anual",
    };
    openCheckout({
      ...plan,
      pricing,
      cycle: cycleLabelsPt[billingCycle],
    });
  };

  const handleCheckoutLogin = () => {
    if (selectedPlanData) {
      setPaymentPlanData(selectedPlanData);
      closeAllModals();
      setActivePage("payment");
    }
  };
  const handleCheckoutSignup = () => proceedToSignup();

  const handleLoginSuccess = () => {
    closeAllModals();
  };

  const handleSignupSuccess = () => {
    closeAllModals();
  };

  const handlePaymentSuccess = () => {
    closeAllModals();
    alert("Pagamento processado com sucesso! Bem-vindo à CloudMax!");
  };

  // Renderiza conteúdo da página
  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <HomeView onNavigate={handleNavigate} />;
      case "features":
        return <FeaturesView onNavigate={handleNavigate} />;
      case "security":
        return <SecurityView />;
      case "enterprise":
        return <EnterpriseView />;
      case "pricing":
        return (
          <PricingView
            billingCycle={billingCycle}
            onChangeBillingCycle={setBillingCycle}
            onSelectPlan={handleSelectPlan}
            getPriceForPlan={getPriceForPlan}
          />
        );
      case "payment":
        return (
          <PaymentPage onNavigate={handleNavigate} planData={paymentPlanData} />
        );
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => handleNavigate(page)}
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
      onClick={() => handleNavigate(page)}
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
            {/* Logo */}
            <button
              onClick={() => handleNavigate("home")}
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
              <NavLink page="pricing" label="Preços" />
              <NavLink page="security" label="Segurança" />

              <NavLink page="enterprise" label="Empresas" />
            </div>

            {/* Desktop Profile Dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
              >
                <User size={20} className="text-white" />
              </button>

              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        openLogin();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 text-slate-700 transition"
                    >
                      <LogIn size={18} />
                      <span className="font-medium">Login</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        openSignup();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 text-slate-700 transition"
                    >
                      <UserPlus size={18} />
                      <span className="font-medium">Criar Conta</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full z-50">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <MobileNavLink page="home" label="Início" />
              <MobileNavLink page="features" label="Recursos" />
              <MobileNavLink page="security" label="Segurança" />
              <MobileNavLink page="pricing" label="Preços" />
              <MobileNavLink page="enterprise" label="Empresas" />
              <div className="pt-4 border-t border-slate-100 mt-2">
                <button
                  className="w-full text-left bg-white text-indigo-700 border border-indigo-100 px-3 py-3 rounded-md font-bold mb-2"
                  onClick={openLogin}
                >
                  Login
                </button>
                <button
                  className="w-full text-left bg-indigo-600 text-white px-3 py-3 rounded-md font-bold"
                  onClick={openSignup}
                >
                  Criar Conta
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{renderContent()}</main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modais */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={closeAllModals}
        planData={selectedPlanData}
        onLoginClick={handleCheckoutLogin}
        onSignupClick={handleCheckoutSignup}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={closeAllModals}
        loginForm={loginForm}
        loginErrors={loginErrors}
        isSubmitting={isSubmitting}
        onInputChange={handleLoginChange}
        onSubmit={(e) => handleLoginSubmit(e, handleLoginSuccess)}
        onSwitchToSignup={proceedToSignup}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={closeAllModals}
        signupForm={signupForm}
        signupErrors={signupErrors}
        isSubmitting={isSubmitting}
        onInputChange={handleSignupChange}
        onSubmit={(e) => handleSignupSubmit(e, handleSignupSuccess)}
        onSwitchToLogin={proceedToLogin}
      />

      <PaymentModal
        isOpen={showModal}
        onClose={closeAllModals}
        paymentForm={paymentForm}
        paymentErrors={{}}
        isSubmitting={isSubmitting}
        onInputChange={handlePaymentChange}
        onSubmit={(e) => handlePaymentSubmit(e, handlePaymentSuccess)}
      />
    </div>
  );
};

export default StorageApp;
