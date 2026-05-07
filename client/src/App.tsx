import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUpPage from "./pages/auth/Signup";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;