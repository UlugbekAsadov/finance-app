import "./button.css";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "solid" | "outline" | "disabled" | "danger";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ className = "", variant = "solid", children, size = "sm", ...props }, ref) => {
    const buttonClass = `button ${variant} ${size} ${className}`;

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);
