// Validação de email
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validação de formulário de login
export const validateLoginForm = (form) => {
  const errors = {};
  if (!form.email) errors.email = "Email obrigatório";
  else if (!validateEmail(form.email)) errors.email = "Email inválido";
  if (!form.password) errors.password = "Senha obrigatória";
  else if (form.password.length < 6) errors.password = "Mínimo 6 caracteres";
  return errors;
};

// Validação de formulário de cadastro
export const validateSignupForm = (form) => {
  const errors = {};
  if (!form.name) errors.name = "Nome obrigatório";
  if (!form.email) errors.email = "Email obrigatório";
  else if (!validateEmail(form.email)) errors.email = "Email inválido";
  if (!form.password) errors.password = "Senha obrigatória";
  else if (form.password.length < 6) errors.password = "Mínimo 6 caracteres";
  return errors;
};
