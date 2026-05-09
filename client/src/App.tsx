import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUpPage from "./pages/auth/Signup";
import Home from "./pages/Home";
import SellProduct from "./pages/Sell";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import ProductListing from "./pages/products/ProductListing";
import ProductDetails from "./pages/products/ProductDetails";
import MyProducts from "./pages/products/MyProducts";
import CartPage from "./pages/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./features/cart/cartSlice";
import { type RootState } from "./app/store";
import { useEffect } from "react";
import { type AppDispatch } from "./app/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart())
    }
  }, [user, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><SignUpPage /></PublicRoute>} />
      <Route path="/sell" element={<PrivateRoute><SellProduct /></PrivateRoute>} />
      <Route path="/my-products" element={<PrivateRoute><MyProducts /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
      <Route path="/buy" element={<ProductListing />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default App;