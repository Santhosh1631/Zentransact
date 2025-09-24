import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineClockCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { FaHome, FaChartLine, FaGraduationCap, FaWallet } from "react-icons/fa";
import logo from "/images/pixelcut-export.png";

const NavBarItem = ({ to, title, icon: Icon, classprops, isActive }) => (
  <li className={`${classprops}`}>
    <Link 
      to={to} 
      className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
          : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
      }`}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {title}
    </Link>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { to: "/", title: "Home", icon: FaHome },
    { to: "/market", title: "Market", icon: FaChartLine },
    { to: "/education", title: "Education", icon: FaGraduationCap },
    { to: "/wallets", title: "Wallets", icon: FaWallet },
    { to: "/schedule", title: "Schedule", icon: AiOutlineClockCircle }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <SiEthereum className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ZenTransact
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <NavBarItem 
                key={index} 
                to={item.to} 
                title={item.title} 
                icon={item.icon}
                isActive={location.pathname === item.to}
              />
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
            >
              {toggleMenu ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <HiMenuAlt4 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {toggleMenu && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => setToggleMenu(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    location.pathname === item.to
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
