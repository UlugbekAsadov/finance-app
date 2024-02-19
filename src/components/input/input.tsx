import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

import "./input.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  leftIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
  ({ className = "", leftIcon: LeftIcon, ...props }, ref) => {
    return (
      <div className={`input__wrapper ${className}`}>
        {LeftIcon ? LeftIcon : null}
        <input ref={ref} {...props} className="input" />
      </div>
    );
  },
);
