// import React from "react";
// import { Link } from 'react-router-dom';
// import { HiMenuAlt4 } from "react-icons/hi";
// import { AiOutlineClose } from "react-icons/ai";
// import Market from "./Market.jsx"; // Import the CryptoPrice component


// const NavBarItem = ({ title, classprops }) => (
  //   <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
// );

// const Navbar = () => {
  //   const [toggleMenu, setToggleMenu] = React.useState(false);
  
//   return (
  //     <nav className="w-full flex md:justify-center justify-between items-center p-4">
//       <div className="md:flex-[1.5] items-center justify-between items-center">
//         {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
//       </div>
//       <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
//         {[<Link to="/market">Market</Link>, "Exchange", "Tutorials", "Wallets"].map((item, index) => (
  //           <NavBarItem key={item + index} title={item} />
  //         ))}
  
  
  //       </ul>
  //       <div className="flex relative">
  //         {!toggleMenu && (
    //           <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
    //         )}
    //         {toggleMenu && (
      //           <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
      //         )}
      //         {toggleMenu && (
        //           <ul
        //             className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
        //             flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
        //           >
        // import logo from "/images/pixelcut-export.png";
        //             <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
        //             {[<Link to="/market">Market</Link>, "Exchange", "Tutorials", "Wallets"].map(
          //               (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
//             )}

           
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "/images/pixelcut-export.png";

const NavBarItem = ({ to, title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    <Link to={to} className="text-white">{title}</Link>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[1.5] items-center justify-between items-center">
        {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[
          { to: "/", title: "Home" },
          { to: "/market", title: "Market" },
          // { to: "/exchange", title: "Exchange" },
          { to: "/education", title: "Education" },
          { to: "/wallets", title: "Wallets" }
        ].map((item, index) => (
          <NavBarItem key={index} to={item.to} title={item.title} />
        ))}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {[
              { to: "/", title: "Home" },
              { to: "/market", title: "Market" },
              // { to: "/exchange", title: "Exchange" },
              { to: "/education", title: "Education" },
              { to: "/wallets", title: "Wallets" }
            ].map((item, index) => (
              <NavBarItem key={index} to={item.to} title={item.title} classprops="my-2 text-lg" />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
