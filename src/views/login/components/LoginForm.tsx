"use client";

import { CheckIcon, LockIcon, UserIcon } from "@/assets/icons";
import { Button, Input } from "@/components";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
  const {
    error,
    fieldErrors,
    handleFieldFocus,
    handlePasswordBlur,
    handlePasswordChange,
    handleRememberChange,
    handleSubmit,
    handleUserBlur,
    handleUserChange,
    hasFieldErrors,
    isLoggingIn,
    formData,
  } = useLoginForm();
  const formError = error || fieldErrors.user || fieldErrors.password;

  return (
    <form
      className="relative flex w-full max-w-150 gap-8 rounded-lg flex-col bg-[#76c900] px-6 py-10 shadow-2xl sm:px-12 md:px-20 md:py-16"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-6">
        <Input
          className="h-14 rounded-full border-0 pl-12 text-lg"
          error={fieldErrors.user}
          hideErrorMessage
          label="Usuário"
          labelClassName="sr-only"
          name="user"
          onBlur={handleUserBlur}
          onChange={handleUserChange}
          onFocus={handleFieldFocus}
          placeholder={fieldErrors.user ?? "Usuario"}
          startIcon={<UserIcon />}
          value={formData.user}
        />

        <Input
          className="h-14 rounded-full border-0 pl-12 text-lg"
          error={fieldErrors.password}
          hideErrorMessage
          label="Senha"
          labelClassName="sr-only"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          onFocus={handleFieldFocus}
          placeholder={fieldErrors.password ?? "Senha"}
          startIcon={<LockIcon />}
          type="password"
          value={formData.password}
        />

        <div className="flex flex-col gap-3 text-sm font-semibold text-white sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2">
            <input
              checked={formData.rememberMe}
              className="peer sr-only"
              onChange={handleRememberChange}
              type="checkbox"
            />
            <span
              aria-hidden="true"
              className="flex size-5 items-center justify-center border-2 border-white bg-transparent text-white peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white"
            >
              {formData.rememberMe ? <CheckIcon /> : null}
            </span>
            Manter logado
          </label>
          <a className="underline-offset-4 hover:underline" href="#">
            Esqueceu a senha?
          </a>
        </div>

        {formError ? (
          <p
            className="absolute whitespace-nowrap left-1/2 bottom-25 -translate-x-1/2 rounded-md text-center text-sm font-semibold text-red-700 sm:bottom-26 md:bottom-32"
            role="alert"
          >
            {formError}
          </p>
        ) : null}
      </div>

      <Button
        className="mx-auto h-14 min-w-48 rounded-full bg-white px-10 text-lg text-zinc-700 hover:bg-zinc-50"
        disabled={hasFieldErrors}
        isLoading={isLoggingIn}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};
