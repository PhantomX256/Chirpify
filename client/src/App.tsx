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
import EditPost from "./_root/pages/EditPost";
import PostDetails from "./_root/pages/PostDetails";
import SavedPosts from "./_root/pages/SavedPosts";

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
            <Route path="/saved" element={<SavedPosts />} />
            <Route path="/profile/:id" />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
