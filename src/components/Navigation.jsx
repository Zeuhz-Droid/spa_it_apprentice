import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const listStyles =
  "w-full md:w-auto text-center p-4 transition-colors duration-200 hover:underline hover:underline-offset-4";

const iconStyles = "w-6 h-6 md:w-12 md:h-12 text-gray-500";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between relative border-b border-gray-600 p-3 w-full text-base">
      <img
        src="/src/assets/react.svg"
        alt="react_logo"
        className="w-6 h-6 md:w-12 md:h-12"
      />
      <ul
        className={`border border-x-0 border-y-gray-500 md:border-0 absolute md:ml-auto flex-grow md:relative w-full flex-col divide-y-[1px] md:divide-y-0 divide-gray-500 md:flex-row items-center md:space-x-4 top-full left-0 md:justify-end transition-transform duration-300 bg-[#202020] ${
          isMenuOpen
            ? "translate-y-0 flex visible"
            : "-translate-x-full md:translate-x-0 md:flex invisible md:visible"
        }`}
      >
        <li className={listStyles}>
          <NavLink to="/home">home</NavLink>
        </li>
        <li className={listStyles}>
          <NavLink to="/tasks">Items</NavLink>
        </li>
      </ul>
      <div className="md:hidden z-20">
        {isMenuOpen ? (
          <HiOutlineXMark
            onClick={() => setIsMenuOpen(false)}
            className={iconStyles}
          />
        ) : (
          <HiOutlineBars3
            onClick={() => setIsMenuOpen(true)}
            className={iconStyles}
          />
        )}
      </div>
    </div>
  );
}

export default Navigation;
