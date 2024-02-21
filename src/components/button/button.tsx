import "./button.css";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "solid" | "outline" | "disabled" | "danger";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ isLoading, className = "", variant = "solid", children, size = "sm", ...props }, ref) => {
    const buttonClass = `button ${variant} ${size} ${className} ${isLoading ? "disabled" : ""}`;

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);
