export type LoginFieldErrors = {
  password?: string;
  user?: string;
};

const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

export const validateLoginFields = (user: string, password: string) => {
  return {
    password: validatePassword(password),
    user: validateUser(user),
  };
};

export const validateUser = (user: string) => {
  const trimmedUser = user.trim();

  if (!trimmedUser) {
    return "Informe seu usuario.";
  }

  if (trimmedUser.length < 3) {
    return "Usuario minimo: 3 caracteres.";
  }

  if (!USERNAME_REGEX.test(trimmedUser)) {
    return "Use apenas letras e numeros.";
  }
};

export const validateUserCharacters = (user: string) => {
  if (user && !USERNAME_REGEX.test(user.trim())) {
    return "Use apenas letras e numeros.";
  }
};

export const validatePassword = (password: string) => {
  const trimmedPassword = password.trim();

  if (!trimmedPassword) {
    return "Informe sua senha.";
  }

  if (trimmedPassword.length < 3) {
    return "Senha minima: 3 caracteres.";
  }
};
