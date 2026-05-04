import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

interface ButtonLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const ButtonLink = ({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={getButtonClassName({ className, size, variant })}
      {...props}
    >
      <span>{children}</span>
    </Link>
  );
};
