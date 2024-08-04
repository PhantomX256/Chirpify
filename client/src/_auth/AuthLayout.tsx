// This component is for generalizing the layout of the sign up and sign in page

import { CSSProperties } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = false; // checks if the user has already signed in

  // Image contanier style
  const imageContainerStyle: CSSProperties = {
    position: "relative",
    height: "100vh",
    width: "50vw",
  };

  // Overlay on the image
  const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  // Image styles
  const imageStyle: CSSProperties = {
    height: "99.5vh",
    width: "50vw",
    objectFit: "cover",
    backgroundRepeat: 'no-repeat',
  };

  // This is the container for the form
  const mainAuthFormStyle: CSSProperties = {
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px",
  };

  const nameLogoStyles: CSSProperties = {
    width: "250px",
    marginBottom: '25px'
  };

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <div style={imageContainerStyle}>
          <img
              style={imageStyle}
              src="../../public/assets/images/auth-side-img.png"
            />
            <div style={overlayStyle}></div>
          </div>
          <section style={mainAuthFormStyle}>
            <img
              style={nameLogoStyles}
              src="../../public/assets/icons/logo-name.png"
            />
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
