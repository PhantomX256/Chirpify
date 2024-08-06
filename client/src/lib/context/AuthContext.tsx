// Importing all the necessary libraries
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

//  ###########
//  NOTE: Somehow this piece of code works. DO NOT MESS WITH IT!!!!!!!
//  ###########

// Interface for users
interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

// Interface for AuthContext
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  serverError: string | null;
}

// Interface for api response
interface ApiResponse {
  user: User;
  token: string;
}

// Creating context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API functions
const api = {
  // Login Function
  login: (email: string, password: string) =>
    axios.post<ApiResponse>(
      "http://localhost:5000/api/auth/login",
      { email, password },
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        withCredentials: true,
      }
    ),

  // Register function
  register: (name: string, username: string, email: string, password: string, confirmPassword: string) =>
    axios.post<ApiResponse>(
      "http://localhost:5000/api/auth/register",
      { name, username, email, password, confirmPassword },
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        withCredentials: true,
      }
    ),

  // Logout function
  logout: () =>
    axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        withCredentials: true,
      }
    ),

  // Get User Function
  getCurrentUser: () =>
    axios.get<{ user: User }>("http://localhost:5000/api/auth/me", {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      withCredentials: true,
    }),
};

// Auth provider
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Declaring the query client
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Hooks for user and loading
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Side effect for user checking
  useEffect(() => {
    const checkUser = async () => {
      // Set Loading true
      setIsLoading(true);

      try {
        // Get the user data from database
        const { data } = await api.getCurrentUser();

        // Set current user to data.user
        setUser(data.user);
      } catch {
        // If no user exists then
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Uses cookies to check the token and get the corresponding user
    checkUser();
  }, []);

  // Function for register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: {
      name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) =>
      api.register(
        userData.name,
        userData.username,
        userData.email,
        userData.password,
        userData.confirmPassword
      ),
    onSuccess: (data) => {
      setServerError(null);

      // Set cookies to contain token
      Cookies.set("token", data.data.token, { expires: 1 });

      // Set query data of user to user data
      queryClient.setQueryData(["user"], data.data.user); // <-- Corrected here

      // Set user state to contain user details
      setUser(data.data.user);

      // Navigate to home
      navigate("/");
    },
    onError: (error: any) => {
      setServerError(error.response?.data?.error || "An unexpected error occurred");
    }
  });

  // Function for login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      api.login(credentials.email, credentials.password),
    onSuccess: (data) => {
      // Set the cookies to contain the token
      Cookies.set("token", data.data.token, { expires: 1 });

      // Set query data of user to user data
      queryClient.setQueryData(["user"], data.data.user); // <-- Corrected here

      // Set user state to contain the user details
      setUser(data.data.user);

      // Navigate to home
      navigate("/");
    },
    onError: (error: any) => {
      setServerError(error.response?.data?.error || "An unexpected error occurred");
    }
  });

  // Function for logout mutation
  const logoutMutation = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      // Remove token from cookies
      Cookies.remove("token");

      // Set query data user to null
      queryClient.setQueryData(["user"], null); // <-- Corrected here

      // Set user state to null
      setUser(null);

      // Navigate to sign in route
      navigate("/sign-in");
    },
    onError: () => {
      setServerError("Failed to logout. Try again later.");
    }
  });

  // Actual logic for registering
  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({ name, username, email, password, confirmPassword });
    } finally {
      setIsLoading(false);
    }
  };

  // Actual logic for login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ email, password });
    } finally {
      setIsLoading(false);
    }
  };

  // Actual logic for logout
  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutMutation.mutateAsync();
    } finally {
      setIsLoading(false);
    }
  };

  // Return the context
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, serverError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
