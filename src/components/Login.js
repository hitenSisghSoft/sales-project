import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../App";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const auth = useAuth(); // Use the auth context

  // Login validation schema remains the same
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Please select a role"),
  });

  // Handle login form submission
  const handleLogin = async (values, { setSubmitting }) => {
    setLoginError("");

    try {
      // In a real application, this would be an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll accept any credentials with valid format
      // and use the selected role to determine the user type
      const user = {
        id: values.role === "manager" ? "MGR001" : "EMP123",
        name: values.role === "manager" ? "Sarah Johnson" : "John Smith",
        email: values.email,
        role: values.role,
      };

      // Call the login function from AuthContext.
      // This updates the state in App.js, which handles the redirect.
      auth.login(user);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setSubmitting(false); // Ensure isSubmitting is false on error
    }
    // No need to setSubmitting(false) here because the component will unmount on success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img
              className="h-16 w-auto"
              src="https://images.unsplash.com/photo-1662467150540-e2bba9eecf05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTIxNDE1ODl8&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sales Activity Tracking"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Track and manage field sales activities
          </p>
        </div>

        {loginError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          </div>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
            role: "sales", // Default to sales role
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-xs mt-1 p-1"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-xs mt-1 p-1"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login as
                </label>
                <div role="group" aria-labelledby="role-group" className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="role"
                      value="sales"
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Sales Employee</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="role"
                      value="manager"
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Reporting Manager</span>
                  </label>
                </div>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="40" y="88" width="176" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,88V56a40,40,0,0,1,80,0V88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </span>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            For demonstration purposes, you can use any email/password that meets the format requirements.
            <br />
            <span className="text-xs text-gray-500 mt-1 block">
              Just select your desired role to access the corresponding view.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
