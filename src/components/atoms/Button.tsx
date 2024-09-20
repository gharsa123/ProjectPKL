import React from "react";
interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  className,
  disabled,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
