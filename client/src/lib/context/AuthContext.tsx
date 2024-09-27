// Importing all the necessary libraries
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
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
import Toast from '../../components/shared/Toast';

//  ###########
//  NOTE: Somehow this piece of code works. DO NOT MESS WITH IT!!!!!!! EVER....
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
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  serverError: string | null;
  fatalError: string | null;
  setToast: React.Dispatch<React.SetStateAction<string[] | null>>;
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
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) =>
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
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [toast, setToast] = useState<string[] | null>(null);

  const { data: fetchedUser, isLoading: isUserFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.getCurrentUser();
        return response.data.user;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  // use effect for when the user is fetched
  useEffect(() => {
    setUser(fetchedUser !== undefined ? fetchedUser : null);
    setIsLoading(isUserFetching);
  }, [fetchedUser, isUserFetching]);

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
    // if any errors occur
    onError: (error: any) => {
      if (error.response?.data?.error)
        setServerError(error.response?.data?.error);
      else setFatalError("An unexpected error occured");
    },
  });

  // Function for login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      api.login(credentials.email, credentials.password),
    onSuccess: (data) => {
      setServerError(null);
      // Set the cookies to contain the token
      Cookies.set("token", data.data.token, { expires: 1 });

      // Set query data of user to user data
      queryClient.setQueryData(["user"], data.data.user); // <-- Corrected here

      // Set user state to contain the user details
      setUser(data.data.user);
    },
    // If any errors occur
    onError: (error: any) => {
      if (error.response?.data?.error)
        setServerError(error.response?.data?.error);
      else setFatalError("An unexpected error occurred");
    },
  });

  // Function for logout mutation
  const logoutMutation = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      setServerError(null);

      // Remove token from cookies
      Cookies.remove("token");

      // Set query data user to null
      queryClient.setQueryData(["user"], null); // <-- Corrected here

      // Invalidate all queries
      queryClient.clear();

      // Set user state to null
      setUser(null);
    },
    // If any errors occur
    onError: () => {
      setFatalError("Failed to logout. Try again later.");
    },
  });

  // Actual logic for registering
  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await registerMutation.mutateAsync({
      name,
      username,
      email,
      password,
      confirmPassword,
    });
  };

  // Actual logic for login
  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  // Actual logic for logout
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // Return the context
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        serverError,
        fatalError,
        setToast
      }}
    >
      <Toast error={toast} setError={setToast} />
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
