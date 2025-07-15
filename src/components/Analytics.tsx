import { useEffect } from "react";

// Google Analytics configuration
const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Replace with actual Google Analytics ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const Analytics = () => {
  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function() {
      (window.gtag as any).q = (window.gtag as any).q || [];
      (window.gtag as any).q.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(`script[src*="${GA_TRACKING_ID}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

// Utility functions for tracking events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title,
      page_location,
    });
  }
};