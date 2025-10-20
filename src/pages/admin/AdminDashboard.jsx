import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - now manages its own toggle state */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 min-h-screen p-4 md:p-6 transition-all duration-300 lg:ml-0">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 min-h-[calc(100vh-2rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;