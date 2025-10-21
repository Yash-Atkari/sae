import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ReferralOffers from './pages/referral-offers';
import ProductCatalog from './pages/product-catalog';
import ContactSupport from './pages/contact-support';
import EMICalculator from './pages/emi-calculator';
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { useAuth } from "./contexts/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute"; // <-- Import UserRoute
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

// Protected Route Component (for both users and admins - legacy, consider removing)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>

          {/* Public Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* User Routes - Only accessible by regular users */}
          <Route
            path="/"
            element={
              <UserRoute>
                <Homepage />
              </UserRoute>
            }
          />
          <Route
            path="/homepage"
            element={
              <UserRoute>
                <Homepage />
              </UserRoute>
            }
          />
          <Route
            path="/referral-offers"
            element={
              <UserRoute>
                <ReferralOffers />
              </UserRoute>
            }
          />
          <Route
            path="/product-catalog"
            element={
              <UserRoute>
                <ProductCatalog />
              </UserRoute>
            }
          />
          <Route
            path="/contact-support"
            element={
              <UserRoute>
                <ContactSupport />
              </UserRoute>
            }
          />
          <Route
            path="/emi-calculator"
            element={
              <UserRoute>
                <EMICalculator />
              </UserRoute>
            }
          />

          {/* Admin Routes - Only accessible by admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
