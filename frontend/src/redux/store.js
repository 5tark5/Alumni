import { configureStore } from "@reduxjs/toolkit";

// Import your reducers (slices) here. For example:
// import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here.
    // The key is the name of the slice of state, and the value is the reducer function.
    // For example:
    // auth: authReducer,
  },
  // Adding the Redux DevTools middleware is automatically handled by configureStore,
  // so you can inspect the store's state and actions in your browser.
  devTools: process.env.NODE_ENV !== "production",
});

export default store;