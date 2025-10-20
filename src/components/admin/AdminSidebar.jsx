import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ChevronLeft, ChevronRight, Menu, LogOut, Package, Plus } from "lucide-react";

const AdminSidebar = ({ onLogout }) => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { 
      path: "products", 
      label: "Manage Products", 
      icon: <Package className="w-5 h-5" />
    },
    { 
      path: "products/add", 
      label: "Add Product", 
      icon: <Plus className="w-5 h-5" />
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // Extract username from email
  const getUsername = (email) => {
    return email?.split('@')[0] || 'User';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div  
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden fixed top-4 left-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        bg-white shadow-xl
        transition-all duration-300 ease-in-out
        flex flex-col justify-between
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8`}>
            {!isCollapsed && (
              <h2 className="text-xl font-bold text-blue-600 truncate">
                Admin Panel
              </h2>
              
            )}

            {/* Mobile Toggle Button (visible only on mobile) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
            
            {/* Desktop Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-colors duration-200 ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}`
                }
                title={isCollapsed ? item.label : ''}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className={`border-t p-4 ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 truncate">
                Logged in as
              </p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {getUsername(user?.email)}
              </p>
            </div>
          )}
          
          <button
            onClick={onLogout}
            className={`
              w-full flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 
              rounded-lg font-medium transition-colors duration-200
              ${isCollapsed ? 'justify-center p-3' : 'px-1 py-2'}
            `}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="ml-3">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;