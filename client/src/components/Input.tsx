import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ label, type, name, setState, value, placeholder }) => {
  // Handle change in values
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState(e.target.value);

  return (
    <span>
      {/* The form label goes here */}
      <span className="input-field-label">{label}</span>

      {/* Container for the input field */}
      <div className="input-field-container">

        {/* The actual input field */}
        <input required className="input-field" type={type} placeholder={placeholder} name={name} value={value} onChange={handleChange} />
      </div>
    </span>
  );
};

export default Input;
