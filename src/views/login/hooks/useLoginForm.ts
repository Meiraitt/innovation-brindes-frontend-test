"use client";

import {
  useState,
  type ChangeEventHandler,
  type ReactEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/stores/authStore";
import {
  type LoginFieldErrors,
  validateLoginFields,
  validatePassword,
  validateUser,
  validateUserCharacters,
} from "../utils/validation";

type LoginFormData = {
  password: string;
  rememberMe: boolean;
  user: string;
};

export const useLoginForm = () => {
  const router = useRouter();
  const { isLoggingIn, loginUser } = useLogin();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    rememberMe: true,
    user: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const formValidation = validateLoginFields(formData.user, formData.password);
  const hasFieldErrors = Object.values(formValidation).some(Boolean);

  const handleUserChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextUser = event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      user: nextUser,
    }));

    setFieldErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
        user: validateUserCharacters(nextUser),
      };

      clearErrorWhenFieldsAreValid(nextErrors);

      return nextErrors;
    });
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const nextPassword = event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      password: nextPassword,
    }));

    setFieldErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
        password: undefined,
      };

      clearErrorWhenFieldsAreValid(nextErrors);

      return nextErrors;
    });
  };

  const handleRememberChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setFormData((currentData) => ({
      ...currentData,
      rememberMe: event.target.checked,
    }));
  };

  const handleFieldFocus = () => {
    setError("");
  };

  const handleUserBlur = () => {
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      user: formData.user.trim() ? validateUser(formData.user) : undefined,
    }));
  };

  const handlePasswordBlur = () => {
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      password: formData.password.trim()
        ? validatePassword(formData.password)
        : undefined,
    }));
  };

  const handleSubmit: ReactEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setError("");

    const validationErrors = validateLoginFields(
      formData.user,
      formData.password,
    );

    if (hasFieldErrors) {
      setFieldErrors(validationErrors);
      setError("Confira os campos destacados antes de continuar.");
      return;
    }

    setFieldErrors({});

    loginUser(
      {
        password: formData.password.trim(),
        rememberMe: formData.rememberMe,
        user: formData.user.trim(),
      },
      {
        onSuccess: (loginResponse) => {
          if (loginResponse.user) {
            setUser(loginResponse.user);
          }

          router.push("/produtos");
        },
        onError: (loginError) => {
          setError(
            loginError instanceof Error
              ? loginError.message
              : "Nao foi possivel fazer login. Tente novamente.",
          );
        },
      },
    );
  };

  function clearErrorWhenFieldsAreValid(nextErrors: LoginFieldErrors) {
    if (!Object.values(nextErrors).some(Boolean)) {
      setError("");
    }
  }

  return {
    error,
    fieldErrors,
    handleFieldFocus,
    handlePasswordChange,
    handlePasswordBlur,
    handleRememberChange,
    handleSubmit,
    handleUserChange,
    handleUserBlur,
    hasFieldErrors,
    isLoggingIn,
    formData,
  };
};
