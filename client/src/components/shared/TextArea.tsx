import { ChangeEvent } from "react";

interface TextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>
}

const TextArea: React.FC<TextAreaProps> = ({ label, placeholder, value, setState }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setState(e.target.value);

  return (
    <span>
      <span className="input-field-label">{label}</span>
      <div className="text-area-container">
        <textarea onChange={handleChange} className="text-area" placeholder={placeholder}>{value}</textarea>
      </div>
    </span>
  );
};

export default TextArea;
