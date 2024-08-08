interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: 'button' | 'submit' | 'reset';
    children: any;
    onClick: any;
  }

const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return (
    <button type={type} className="btn" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;