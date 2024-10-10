import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./lib/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the main App component
import App from "./App";

// Create a new instance of QueryClient with default options
const queryClient = new QueryClient({
  // Set default options for queries
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000, // Set stale time to 1 hour
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
