// Importing necessary css files
import "./CSS/global.css";

// Importing libraries
import { Routes, Route } from "react-router-dom";

// Importing necessary components
import { SignInForm, SignUpForm } from "./_auth/forms";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";

const App = () => {
  return (
    <main
      style={{ display: "flex", height: "100vh", backgroundColor: "#222831" }}
    >
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
