import { Heart, Linkedin, Twitter, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-dark to-primary text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Gitech Africa</h3>
            <p className="text-primary-light mb-6 leading-relaxed">
              Empowering Africa through innovative ICT solutions in health, smart infrastructure, 
              and agriculture. Building a sustainable and prosperous future for the continent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:info@gitech.africa" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Subsidiaries */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Subsidiaries</h4>
            <ul className="space-y-2 text-primary-light">
              <li>
                <a href="https://health.gitech.africa" className="hover:text-white transition-colors">
                  iTechnology Global
                </a>
              </li>
              <li>
                <a href="https://smart.gitech.africa" className="hover:text-white transition-colors">
                  Ginno Technology
                </a>
              </li>
              <li>
                <a href="https://agro.gitech.africa" className="hover:text-white transition-colors">
                  iAgroConstruct Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-primary-light">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">info@gitech.africa</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+234 908 000 1559</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-light text-sm mb-4 md:mb-0">
            © 2024 Gitech Africa. All rights reserved.
          </div>
          
          <div className="flex items-center text-primary-light text-sm">
            Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> for Africa's future
          </div>
        </div>
      </div>
    </footer>
  );
};