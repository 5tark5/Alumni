import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Import all your components
import Home from "./pages/Home.jsx";
import InstituteLogin from "./components/InstituteLogin.jsx";
import InstituteRegister from "./components/InstituteRegister.jsx";
import InstituteDashboard from "./components/InstituteDashboard.jsx";
import DashboardHome from "./pages/DashboardHome.jsx"; 
import InstituteProfile from "./components/InstitudeProfile.jsx"; 

// Create a router instance
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} element={<Home />} />
      <Route path="institute/login" element={<InstituteLogin />} />
      <Route path="institute/register" element={<InstituteRegister />} />

      {/* ✅ Dashboard Layout Route with Nested Children */}
      <Route path="institute/dashboard" element={<InstituteDashboard />}>
        <Route index={true} element={<DashboardHome />} />
        <Route path="profile" element={<InstituteProfile />} />
        {/* You can add more nested routes here later */}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);