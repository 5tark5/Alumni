import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// components
import Home from "./pages/Home.jsx"; // Corrected import name
import InstituteLogin from "./components/Institutelogin.jsx";
import InstituteRegister from "./components/InstituteRegister.jsx";
import InstituteDashboard from "./components/InstituteDashboard.jsx";

// Create a router instance
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path="institute/login" element={<InstituteLogin />} />
        <Route path="institute/register" element={<InstituteRegister />} />
        <Route path="institute/dashboard" element={<InstituteDashboard />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);