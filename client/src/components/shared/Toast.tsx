import { useState } from "react";

interface ToastProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Toast: React.FC<ToastProps> = ({ error, setError }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={`toast ${error && "slide-bottom"} ${toggle && "slide-top"}`}
    >
      <img
        onClick={() => {
          setToggle(true);
          setError(null);
        }}
        width={20}
        height={20}
        className="toast-cross"
        src="../../../public/assets/icons/cross.svg"
      />
      <h2 className="toast-heading">Error</h2>
      <p className="toast-error">{error}</p>
    </div>
  );
};

export default Toast;
