import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"; // ✅ Import Outlet
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/instituteApiSlice.js";
import { logout } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

// --- SVG Icon Components ---
const HomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const LogOutIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const XIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// --- Main Dashboard Layout Component ---
export default function InstituteDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { instituteInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/institute/login");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen flex font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/80 backdrop-blur-sm p-6 flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-slate-800/50`}
      >
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Alum.io</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {/* ✅ These NavLinks now control the routes */}
            <NavLink
              to="/institute/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-lg py-2 px-3 transition-colors ${
                  isActive
                    ? "text-white bg-blue-500/20"
                    : "hover:bg-slate-700/50"
                }`
              }
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/institute/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-lg py-2 px-3 transition-colors ${
                  isActive
                    ? "text-white bg-blue-500/20"
                    : "hover:bg-slate-700/50"
                }`
              }
            >
              <UserIcon className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>
        <button
          onClick={logoutHandler}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-red-600/80 hover:bg-red-700 transition-colors text-white font-semibold"
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* ✅ Main Content now renders the active child route */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mr-4 p-1 text-slate-300"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-3xl font-bold text-white">
              Institute Portal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* ✅ Use the actual profile image URL from the Redux store */}
              <img
                src={
                  instituteInfo?.profileImage ||
                  `https://placehold.co/40x40/6366f1/ffffff?text=${
                    instituteInfo?.name?.charAt(0) || "I"
                  }`
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover" // Added object-cover for better image scaling
              />
              <div className="hidden sm:block">
                <span className="text-white font-semibold">
                  {instituteInfo?.name || "Institute"}
                </span>
              </div>
            </div>
          </div>
        </header>
        {/* ✅ The <Outlet> renders the matched child component */}
        <Outlet />
      </main>
    </div>
  );
}
