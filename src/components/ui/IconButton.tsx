import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string; // Make label required for accessibility
}

export function IconButton({
  icon,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button className={className} label={label} {...props}>
      <span className={"w-6 h-6 text-white-50 border-white"} aria-hidden="true">
        {icon}
      </span>
    </Button>
  );
}
