// This component is for generalizing the layout of the sign up and sign in page

import { CSSProperties } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // Overlay on the image
  const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  // This is the container for the form
  const mainAuthFormStyle: CSSProperties = {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px",
    backgroundColor: '#222831',
    backgroundSize: 'cover'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="auth-image-container">
        <img
          className="auth-image-background"
          src="../../public/assets/images/auth-side-img.png"
        />
        <div style={overlayStyle}></div>
      </div>
      <section style={mainAuthFormStyle}>
        <img
          className="auth-name-logo"
          src="../../public/assets/icons/logo-name.png"
        />
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
