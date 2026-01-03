import { useState } from "react";
import { validateLoginForm, validateSignupForm } from "../utils/validation";

export const useFormValidation = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [paymentForm, setPaymentForm] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e, onSuccess) => {
    e.preventDefault();
    const errors = validateLoginForm(loginForm);

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Login:", loginForm);
      onSuccess?.();
      setLoginForm({ email: "", password: "", remember: false });
      setLoginErrors({});
      setIsSubmitting(false);
    }, 400);
  };

  const handleSignupSubmit = async (e, onSuccess) => {
    e.preventDefault();
    const errors = validateSignupForm(signupForm);

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Signup:", signupForm);
      onSuccess?.();
      setSignupForm({ name: "", email: "", password: "" });
      setSignupErrors({});
      setIsSubmitting(false);
    }, 400);
  };

  const handlePaymentSubmit = async (e, onSuccess) => {
    e.preventDefault();
    const errors = validateLoginForm(paymentForm);

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Payment:", paymentForm);
      onSuccess?.();
      setPaymentForm({ email: "", password: "" });
      setLoginErrors({});
      setIsSubmitting(false);
    }, 400);
  };

  return {
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
    setLoginErrors,
    setSignupErrors,
  };
};
