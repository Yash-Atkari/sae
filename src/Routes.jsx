import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/referral-offers" element={<ReferralOffers />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
