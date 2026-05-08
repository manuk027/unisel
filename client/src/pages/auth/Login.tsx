import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import navLogo from "../../assets/images/navbar.png";
import { type AppDispatch, type RootState } from "../../app/store";
import { loginUser } from "../../features/auth/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../features/auth/firebase";
import { googleLogin } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, formState: { errors }, } = useForm<LoginForm>();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) { navigate("/"); }
  }, [token, navigate]);

  const onSubmit = async (data: LoginForm) => {
    await dispatch(loginUser(data));
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email || "";
      const name = user.displayName || "";
      const googleId = user.uid || "";
      const avatar = user.photoURL || "";
      await dispatch(googleLogin({ email, name, googleId, avatar }));
      toast.success("LoggedIn successfully", { containerId: "authToast", });
    } catch (error) {
      toast.error("Error Logginin", { containerId: "authToast", });
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F8F9FC] flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="mb-6 shrink-0">
        <img src={navLogo} alt="Unisel Logo" className="h-12 md:h-14 w-auto object-contain" />
      </div>
      <div className="bg-white w-full max-w-md lg:max-w-lg rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-6 md:p-10 border border-gray-50 flex flex-col">
        <div className="text-center mb-8 shrink-0">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-400 mt-1 text-xs md:text-sm font-medium">
            Login to continue to Unisel and start connecting.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Email ID</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <i className="fa-regular fa-envelope text-sm"></i>
              </span>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
              {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <button type="button" className="text-blue-600 text-[10px] font-bold hover:underline">
                Forgot?
              </button>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <i className="fa-solid fa-lock text-sm"></i>
              </span>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required.",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-12 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
              {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-xs`}></i>
              </button>
            </div>
          </div>
          {error && (<p className="text-red-500 text-sm text-center">{error}</p>)}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="relative my-8 shrink-0">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <span className="bg-white px-4">or continue with</span>
          </div>
        </div>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full shrink-0 flex items-center justify-center gap-3 bg-white border border-gray-100 py-3.5 rounded-2xl hover:bg-gray-50 transition-all font-bold text-slate-700 text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google Icon" />
          Continue with Google
        </button>
        <p className="text-center mt-8 text-gray-500 text-xs md:text-sm font-medium shrink-0">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;