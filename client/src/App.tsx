import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUpPage from "./pages/auth/Signup";
import Home from "./pages/Home";
import SellProduct from "./pages/Sell";
import PrivateRoute from "./routes/PrivateRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PrivateRoute><LoginPage /></PrivateRoute>} />
      <Route path="/register" element={<PrivateRoute><SignUpPage /></PrivateRoute>} />
      <Route path="/sell" element={<PrivateRoute><SellProduct /></PrivateRoute>} />
    </Routes>
  );
};

export default App;