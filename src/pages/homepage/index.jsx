import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import EMIBanner from './components/EMIBanner';
import ShopIntroduction from './components/ShopIntroduction';
import ProductCategories from './components/ProductCategories';
import FeaturedProducts from './components/FeaturedProducts';
import ReferralSection from './components/ReferralSection';
import ContactSection from './components/ContactSection';
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';

const Homepage = () => {
  const { trackEvent, trackButtonClick } = useGoogleAnalytics();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track homepage view
    trackEvent('page_view', {
      page_title: 'ElectroMart - Homepage',
      page_location: window.location?.href,
      content_group1: 'homepage'
    });
  }, [trackEvent]);

  return (
    <>
      <Helmet>
        <title>ElectroMart - Premium Electronics & Appliances with Easy EMI</title>
        <meta name="description" content="Shop premium electronics and appliances at ElectroMart. Get flexible EMI options, exclusive deals, and 24/7 support. Free delivery on orders above $100." />
        <meta name="keywords" content="electronics, appliances, EMI, smartphones, laptops, home appliances, online shopping" />
        <meta property="og:title" content="ElectroMart - Premium Electronics & Appliances" />
        <meta property="og:description" content="Discover the latest electronics with flexible EMI options and unbeatable prices." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://electromart.com/homepage" />
        
        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WHQCG5TS5J"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WHQCG5TS5J');
          `}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* EMI Promotional Banner */}
            <EMIBanner trackButtonClick={trackButtonClick} />
            
            {/* Shop Introduction */}
            <ShopIntroduction trackButtonClick={trackButtonClick} />
            
            {/* Product Categories */}
            <ProductCategories trackButtonClick={trackButtonClick} />
            
            {/* Featured Products */}
            {/* <FeaturedProducts trackButtonClick={trackButtonClick} /> */}
            
            {/* Referral Section */}
            {/* <ReferralSection trackButtonClick={trackButtonClick} /> */}
            
            {/* Contact Section */}
            {/* <ContactSection trackButtonClick={trackButtonClick} /> */}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                © {new Date()?.getFullYear()} Sahil Mobiles & Enterprises. All rights reserved. | 
                <span className="ml-1">Secure Shopping with SSL Protection</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;