import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: 'button' | 'submit' | 'reset';
    children: any;
    onClick?: React.MouseEventHandler;
    className?: string;
  }

const Button: React.FC<ButtonProps> = ({ type, children, onClick, className }) => {
  return (
    <button type={type} className={`default-button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;