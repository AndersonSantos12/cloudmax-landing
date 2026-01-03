import { useState } from "react";

export const useModalState = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState(null);

  const openLogin = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
    setShowModal(false);
    setShowCheckoutModal(false);
  };

  const openSignup = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
    setShowModal(false);
    setShowCheckoutModal(false);
  };

  const openCheckout = (planData) => {
    setSelectedPlanData(planData);
    setShowCheckoutModal(true);
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const proceedToLogin = () => {
    setShowCheckoutModal(false);
    setShowLoginModal(true);
  };

  const proceedToSignup = () => {
    setShowCheckoutModal(false);
    setShowSignupModal(true);
  };

  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowCheckoutModal(false);
    setShowModal(false);
  };

  return {
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal,
    showCheckoutModal,
    setShowCheckoutModal,
    showModal,
    setShowModal,
    selectedPlanData,
    setSelectedPlanData,
    openLogin,
    openSignup,
    openCheckout,
    proceedToLogin,
    proceedToSignup,
    closeAllModals,
  };
};
