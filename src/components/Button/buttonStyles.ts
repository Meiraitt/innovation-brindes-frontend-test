export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#76c900] text-white hover:bg-[#68b500] focus-visible:outline-[#76c900]",
  secondary:
    "bg-white text-zinc-800 ring-1 ring-zinc-200 hover:bg-zinc-50 focus-visible:outline-[#76c900]",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:outline-[#76c900]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-8 text-lg",
};

type GetButtonClassNameParams = {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const getButtonClassName = ({
  className,
  size = "md",
  variant = "primary",
}: GetButtonClassNameParams) => {
  const roundedClassName = className?.includes("rounded-") ? "" : "rounded-md";

  return `inline-flex cursor-pointer items-center justify-center gap-2 font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${roundedClassName} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`;
};
