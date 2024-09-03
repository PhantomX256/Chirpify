// Importing necessary css files
import "./CSS/global.css";

// Importing libraries
import { Routes, Route } from "react-router-dom";

// Importing necessary components
import { SignInForm, SignUpForm } from "./_auth/forms";
import { Home, CreatePost } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";

// Importing public and private routes
import { PublicRoute, PrivateRoute } from "./routes";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" />
            <Route path="/people" />
            <Route path="/saved" />
            <Route path="/profile/:id" />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
