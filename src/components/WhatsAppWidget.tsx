import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const whatsappNumber = "+234123456789"; // Replace with actual Gitech Africa WhatsApp number
  const defaultMessage = "Hello! I'm interested in learning more about Gitech Africa's solutions.";
  
  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg animate-bounce"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Preview (Optional) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl p-4 w-80 border animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Gitech Africa</h4>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="bg-gray-100 rounded-lg p-2 text-sm">
              👋 Hi there! Welcome to Gitech Africa.
            </div>
            <div className="bg-gray-100 rounded-lg p-2 text-sm">
              How can we help you with our smart ICT solutions today?
            </div>
          </div>
          
          <Button 
            onClick={openWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Start Chat on WhatsApp
          </Button>
        </div>
      )}
    </>
  );
};