import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUpPage from "./pages/auth/Signup";
import Home from "./pages/Home";
import SellProduct from "./pages/Sell";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";


const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><SignUpPage /></PublicRoute>} />
      <Route path="/sell" element={<PrivateRoute><SellProduct /></PrivateRoute>} />
    </Routes>
  );
};

export default App;