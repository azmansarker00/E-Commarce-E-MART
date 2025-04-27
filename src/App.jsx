import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// pages
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import Allproducts from "./pages/allproducts/AllProducts";
import Profile from "./pages/profile/profile";
import User from "./pages/UserInfo/user";

// context
import MyState from "./context/data/myState";

// toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// components
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

const App = () => {
  return (
    <MyState>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutesForAdmin>
              <Dashboard />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoutesForAdmin>
              <AddProduct />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route
          path="/updateproduct"
          element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/userdetails/:id"
          element={
            <ProtectedRoutesForAdmin>
              <User />
            </ProtectedRoutesForAdmin>
          }
        />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      
      {/* extra */}
      <ScrollToTopButton />

      <ToastContainer />
    </MyState>
  );
};

export default App;

// Your Protected Routes
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.user.uid === "HQa0SbPtCbQt7TfbC9rCkoJ1muo1") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
