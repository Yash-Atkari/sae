import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Get the GA measurement ID from environment variables
    const measurementId = import.meta.env?.VITE_GA_MEASUREMENT_ID || 'G-WHQCG5TS5J';
    
    // Initialize gtag.js if not already done
    if (!window.dataLayer) {
      // Load gtag.js script dynamically
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head?.appendChild(script);

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      function gtag(...args) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location?.href,
      });
    }

    // Send page_view event on route changes
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location?.href,
        page_path: location?.pathname + location?.search,
      });
    }
  }, [location]);

  // Return tracking functions for components to use
  const trackEvent = (eventName, parameters = {}) => {
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        page_path: location?.pathname,
        ...parameters,
      });
    }
  };

  const trackProductView = (productName, productId, category) => {
    trackEvent('view_item', {
      item_id: productId,
      item_name: productName,
      item_category: category,
      currency: 'USD',
    });
  };

  const trackButtonClick = (buttonName, section = '') => {
    trackEvent('button_click', {
      button_name: buttonName,
      section: section,
      page: location?.pathname,
    });
  };

  const trackFormSubmission = (formName, formType = '') => {
    trackEvent('form_submit', {
      form_name: formName,
      form_type: formType,
      page: location?.pathname,
    });
  };

  return {
    trackEvent,
    trackProductView,
    trackButtonClick,
    trackFormSubmission,
  };
}

export default useGoogleAnalytics;