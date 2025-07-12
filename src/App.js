import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Context for authentication state
export const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// A wrapper for routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true, // Start in a loading state
  });

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const storedUser = localStorage.getItem("salesTrackingUser");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          // In a real app, you would validate the token with your backend here
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        // Clear corrupted data
        localStorage.removeItem("salesTrackingUser");
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    checkAuthentication();
  }, []); // Run only once on component mount

  // Login function to be passed via context
  const login = (userData) => {
    localStorage.setItem("salesTrackingUser", JSON.stringify(userData));
    setAuthState({
      isAuthenticated: true,
      user: userData,
      loading: false,
    });
  };

  // Logout function to be passed via context
  const logout = () => {
    localStorage.removeItem("salesTrackingUser");
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  // While checking auth, show a loader to prevent premature navigation
  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              // If user is authenticated, redirect from login to dashboard
              authState.isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              // Default route redirects based on authentication status
              <Navigate
                to={authState.isAuthenticated ? "/dashboard" : "/login"}
                replace
              />
            }
          />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-md rounded-lg">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">Page Not Found</h2>
                  <p className="text-gray-600 mb-6">The page you are looking for doesn"t exist or has been moved.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => (window.location.href = "/")}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Go to Home
                    </button>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
