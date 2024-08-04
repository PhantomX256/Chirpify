interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: 'button' | 'submit' | 'reset';
    children: any;
  }

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button type={type} className="btn">
      {children}
    </button>
  )
}

export default Button;