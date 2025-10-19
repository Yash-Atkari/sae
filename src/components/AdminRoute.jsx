import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ADMIN_EMAIL = "atkari.help@gmail.com"; // <-- your admin account email

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" />;

  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
