import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

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
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// Creating context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API functions
const api = {
  login: (email: string, password: string) =>
    axios.post<{ user: User }>(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    ),
  register: (name: string, username: string, email: string, password: string) =>
    axios.post<{ user: User }>(
      "http://localhost:5000/api/auth/register",
      { name, username, email, password },
      { withCredentials: true }
    ),
  logout: () =>
    axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    ),
};

// Auth provider
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (userData: {
      name: string;
      username: string;
      email: string;
      password: string;
    }) =>
      api.register(
        userData.name,
        userData.username,
        userData.email,
        userData.password
      ),
    onSuccess: (data) => {
      queryClient.setQueryData("user", data.data.user);
      setUser(data.data.user);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      api.login(credentials.email, credentials.password),
    onSuccess: (data) => {
      queryClient.setQueryData("user", data.data.user);
      setUser(data.data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryClient.setQueryData("user", null);
      setUser(null);
    },
  });

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({ name, username, email, password });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ email, password });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutMutation.mutateAsync();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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