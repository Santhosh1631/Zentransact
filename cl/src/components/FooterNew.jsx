import React from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { FaTwitter, FaDiscord, FaTelegram, FaGithub, FaEnvelope, FaHeart } from "react-icons/fa";

const FooterNew = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 border-t border-white border-opacity-10 py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <SiEthereum className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-xl font-bold">
                ZenTransact
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the future of cryptocurrency transactions with security, speed, and simplicity at its core.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Discord" className="text-gray-300 hover:text-white transition-colors">
                <FaDiscord className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Telegram" className="text-gray-300 hover:text-white transition-colors">
                <FaTelegram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-white transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/market" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Market
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/wallets" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Wallets
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Security Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="md:col-span-3 lg:col-span-1 space-y-6">
            <h3 className="text-white text-lg font-semibold">Get in Touch</h3>
            <div className="flex items-center space-x-3 bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-10">
              <FaEnvelope className="h-5 w-5 text-purple-400" />
              <a href="mailto:info@zentransact.com" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                info@zentransact.com
              </a>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Have questions or need support? We're here to help you navigate the crypto world safely.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white border-opacity-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>© 2024 ZenTransact. Built with</span>
              <FaHeart className="h-3 w-3 text-red-400" />
              <span>for the crypto community</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
