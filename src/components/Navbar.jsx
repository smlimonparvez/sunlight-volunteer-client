import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, NavLink } from "react-router";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "mr-3 text-base font-semibold text-blue-700 underline"
            : "mr-3 text-gray-500 text-base font-semibold hover:text-blue-700 hover:underline"
        }
        
      >
        Home
      </NavLink>
      <NavLink
        to="/all-visas"
        className={({ isActive }) =>
          isActive
            ? "mr-3 text-base font-semibold text-blue-700 underline"
            : "mr-3 text-gray-500 text-base font-semibold hover:text-blue-700 hover:underline"
        }
      >
        All Visas
      </NavLink>
      <NavLink
        to="/add-visa"
        className={({ isActive }) =>
          isActive
            ? "mr-3 text-base font-semibold text-blue-700 underline"
            : "mr-3 text-gray-500 text-base font-semibold hover:text-blue-700 hover:underline"
        }
      >
        Add Visa
      </NavLink>
      <NavLink
        to="/my-added-visas"
        className={({ isActive }) =>
          isActive
            ? "mr-3 text-base font-semibold text-blue-700 underline"
            : "mr-3 text-gray-500 text-base font-semibold hover:text-blue-700 hover:underline"
        }
      >
        My Added Visas
      </NavLink>
      <NavLink
        to="/my-visa-applications"
        className={({ isActive }) =>
          isActive
            ? "mr-3 text-base font-semibold text-blue-700 underline"
            : "mr-3 text-gray-500 text-base font-semibold hover:text-blue-700 hover:underline"
        }
      >
        My Visa applications
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl md:text-2xl">Visa Republic</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-2 md:flex-row justify-end">
        
        {/* dark light mode swap */}
        <DarkMode></DarkMode>

        {user && (
          <div
            className="flex justify-center items-center gap-1 md:mr-2 tooltip-left tooltip"
            data-tip={`Welcome, ${user.displayName}`}
          >
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full border border-blue-500"
            />
          </div>
        )}

        {user ? (
          <button onClick={handleLogOut} className="btn">
            Log Out
          </button>
        ) : (
          <div className="flex flex-col md:flex-row gap-2">
            <Link to="/signin" className="btn">
              Sign In
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;