interface ToastProps {
  error: string[] | null;
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const Toast: React.FC<ToastProps> = ({ error, setError }) => {
  const heading = error && error[0];
  const body = error && error[1];

  return (
    <div
      className={`toast ${heading ? "slide-bottom" : ""} ${!heading ? "slide-top" : ""}`}
    >
      <img
        onClick={() => {
          setError(null);
        }}
        width={20}
        height={20}
        className="toast-cross"
        src="../../../public/assets/icons/cross.svg"
      />
      <h2 className="toast-heading">
        {heading}
      </h2>
      <p className="toast-error">{body}</p>
    </div>
  );
};

export default Toast;
