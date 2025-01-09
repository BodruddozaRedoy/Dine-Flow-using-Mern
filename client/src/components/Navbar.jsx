import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "zustand";
import { authStore } from "../store/authStore";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";


const navList = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "All Foods",
    link: "/all-foods",
  },
  {
    title: "Gallery",
    link: "/gallery",
  },
];

const Navbar = () => {
  const { user, googleLogOut, setUser } = useStore(authStore);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    googleLogOut();
    setUser(null);
    await axiosInstance.post("/api/auth/logout");
  };

  return (
    <div className="flex items-center justify-between py-5 bg-white dark:bg-gray-800 md:px-20 px-5">
      {/* Nav Start */}
      <div>
        <h1 className="text-2xl font-bold text-primary dark:text-white">
          Dine Flow
        </h1>
      </div>

      {/* Nav Middle */}
      <div className="hidden lg:flex relative">
        <ul className="flex items-center gap-5">
          {navList.map((nav, i) => (
            <NavLink
              key={i}
              to={nav.link}
              className={({ isActive }) =>
                `relative font-semibold py-2 px-5 rounded-lg ${
                  isActive
                    ? "text-white bg-primary"
                    : "text-black dark:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {nav.title}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary rounded-lg z-[-1]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Nav End */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="btn hidden md:flex border border-primary bg-primary text-white hover:bg-transparent hover:text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          {theme === "light" ? <FaMoon/> : <FaSun/>}
        </button>

        {user && (
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="w-[50px] h-[50px] rounded-full overflow-hidden object-cover border-2 border-primary"
            >
              <img src={user?.profilePic} alt="User Profile" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-5 space-y-4 shadow-md"
            >
              <NavLink
                className={({ isActive }) =>
                  `${isActive && "bg-white text-primary"} hover:text-primary hover:bg-white p-3 rounded-xl`
                }
                to={"/my-foods"}
              >
                My Foods
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive && "bg-white text-primary"} hover:text-primary hover:bg-white p-3 rounded-xl`
                }
                to={"/add-food"}
              >
                Add Food
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive && "bg-white text-primary"} hover:text-primary hover:bg-white p-3 rounded-xl`
                }
                to={"/my-orders"}
              >
                My Orders
              </NavLink>
            </ul>
          </div>
        )}

        {!user && (
          <Link
            to={"/login"}
            className="btn bg-primary border border-primary text-white hover:bg-transparent hover:text-black"
          >
            Login
          </Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="btn btn-md bg-primary border border-primary text-white hover:bg-transparent hover:text-black"
          >
            Log Out
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl dark:text-white"
          >
            &#9776; {/* Hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:hidden absolute top-[90px] left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-10 dark:text-white"
        >
          <motion.ul className="flex flex-col items-center space-y-4 py-4">
            {navList.map((nav, i) => (
              <NavLink
                key={i}
                to={nav.link}
                className={({ isActive }) =>
                  `${isActive && "bg-primary text-white"} font-semibold py-2 px-5`
                }
              >
                {nav.title}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="btn py-2 px-7 border border-primary bg-primary text-white hover:bg-transparent hover:text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              {theme === "light" ? <FaMoon/> : <FaSun/>}
            </button>
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
