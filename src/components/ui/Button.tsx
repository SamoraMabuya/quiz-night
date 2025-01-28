import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children?: ReactNode;
  label?: string; // Explicit aria-label
}

export default function Button({
  variant = "primary",
  className,
  label,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className || ""}`}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
