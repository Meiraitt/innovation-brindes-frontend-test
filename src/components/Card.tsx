import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`rounded-md border border-zinc-200 bg-white shadow-sm ${className ?? ""}`}
      {...props}
    />
  );
}
