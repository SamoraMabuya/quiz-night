import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children?: ReactNode;
}

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => (
  <button className={`btn btn-${variant} ${className || ""}`} {...props} />
);
