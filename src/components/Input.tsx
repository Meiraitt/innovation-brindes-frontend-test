import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
  startIcon?: ReactNode;
};

export function Input({
  className,
  error,
  id,
  label,
  startIcon,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const iconClassName = startIcon ? "pl-11" : "";
  const errorClassName = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
    : "";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-zinc-800" htmlFor={inputId}>
        {label}
      </label>
      <div className="relative">
        {startIcon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          >
            {startIcon}
          </span>
        ) : null}
        <input
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          className={`h-12 w-full rounded-md border border-zinc-300 bg-white px-4 text-base text-zinc-900 shadow-sm placeholder:text-zinc-500 focus:border-[#76c900] focus:outline-none focus:ring-2 focus:ring-[#76c900]/30 ${iconClassName} ${errorClassName} ${className ?? ""}`}
          id={inputId}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-sm font-medium text-red-600" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
