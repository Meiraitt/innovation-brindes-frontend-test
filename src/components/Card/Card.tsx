import type { HTMLAttributes } from "react";

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`rounded-md border border-zinc-200 bg-white shadow-sm ${className ?? ""}`}
      {...props}
    />
  );
};
