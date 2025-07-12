import React, { useState } from "react";
import { useAuth } from "../App";
import ManagerDashboard from "./manager/ManagerDashboard";
import SalesDashboard from "./sales/SalesDashboard";

const Dashboard = () => {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This component will only render if a user is authenticated,
  // as enforced by ProtectedRoute in App.js.
  // Therefore, we can safely assume `user` is not null.

  if (!user) {
    // This is a fallback, but should not be reached in normal flow.
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Error: User data not found.</p>
        </div>
      </div>
    );
  }

  // The Demo Mode Selector is for testing/demonstration purposes.
  // It allows switching between user roles on the fly.
  const DemoModeSelector = () => {
    // This function simulates a new login with a different role.
    const handleRoleSwitch = (role) => {
      const dummyUser = {
        id: role === "manager" ? "MGR001" : "EMP123",
        name: role === "manager" ? "Sarah Johnson" : "John Smith",
        email: role === "manager" ? "sarah.j@example.com" : "john.s@example.com",
        role: role,
      };
      // Use the login function from AuthContext to update the global state and localStorage.
      login(dummyUser);
    };

    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50 border border-gray-200">
        <p className="text-xs text-gray-500 mb-2 font-medium">Demo Mode: Switch Role</p>
        <div className="flex space-x-2">
          <button
            onClick={() => handleRoleSwitch("sales")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              user.role === "sales"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sales Employee
          </button>
          <button
            onClick={() => handleRoleSwitch("manager")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              user.role === "manager"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manager
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-auto"
                  src="https://images.unsplash.com/photo-1706774792414-6601d607ff25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDE1NTN8&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sales Tracking System"
                />
              </div>
              <div className="ml-4 text-xl font-semibold text-gray-800 capitalize">
                {user.role} Dashboard
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  >
                    <span className="mr-2">{user.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M167.77,223.44c-12.08,3.09-26.72-7.56-39.77-7.56s-27.69,10.65-39.77,7.56c-12.5-3.2-18.53-22.69-29.57-28.76-11.21-6.17-33.4-2.09-42.66-10.78,0,0,56-20,56-103.93a56,56,0,0,1,112,0c0,83.89,56,103.93,56,103.93-9.26,8.69-31.45,4.61-42.66,10.78C186.3,200.75,180.27,220.24,167.77,223.44Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="66.31" y1="122.53" x2="40" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="189.69" y1="122.53" x2="216" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </button>
                </div>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Render appropriate dashboard based on user role from context */}
      <main className="py-6">
        {user.role === "manager" ? <ManagerDashboard /> : <SalesDashboard />}
      </main>

      {/* Demo mode selector for testing both views */}
      <DemoModeSelector />
    </div>
  );
};

export default Dashboard;
