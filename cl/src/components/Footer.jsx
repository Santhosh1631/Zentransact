import React from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { FaTwitter, FaDiscord, FaTelegram, FaGithub, FaEnvelope, FaHeart } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 border-t border-white border-opacity-10">
    <div className="container mx-auto px-4 py-16">
      {/* Main Footer Content */}
      <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <SiEthereum className="h-7 w-7 text-white" />
              </div>
              <span className="text-white text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ZenTransact
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the future of cryptocurrency transactions with security, speed, and simplicity at its core.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FaTwitter className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FaDiscord className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FaTelegram className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FaGithub className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
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

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-3 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="h-4 w-4 text-white" />
                </div>
                <a href="mailto:srisan3012@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                  info@zentransact.com
                </a>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Have questions or need support? We're here to help you navigate the crypto world safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent mb-8"></div>

      {/* Bottom Footer */}
      <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>© 2024 ZenTransact. Built with</span>
            <FaHeart className="h-3 w-3 text-red-400 animate-pulse" />
            <span>for the crypto community</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10">
              Privacy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10">
              Terms
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
