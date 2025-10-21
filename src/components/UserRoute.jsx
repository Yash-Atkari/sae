import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ADMIN_EMAIL = "atkari.help@gmail.com"; // Same admin email

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" />;

  // Redirect admin users away from user routes
  if (user.email === ADMIN_EMAIL) return <Navigate to="/admin/products" />;

  return children;
};

export default UserRoute;
