import { useState } from "react";
import navLogo from "../../assets/images/navbar.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../app/store";
import { registerUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type SignupForm = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
};

const SignUpPage = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<SignupForm>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const password = watch("password");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, token } = useSelector(
        (state: RootState) => state.auth
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const onSubmit = async (data: SignupForm) => {
        const { confirm, phone, ...userData } = data;
        await dispatch(registerUser(userData));
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#F8F9FC] flex flex-col items-center justify-center p-4 font-sans select-none">
            <div className="mb-4 shrink-0">
                <img src={navLogo} alt="Unisel Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <div className="bg-white w-full max-w-md lg:max-w-lg rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-6 md:p-8 border border-gray-50 flex flex-col">
                <div className="text-center mb-4 shrink-0">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 overflow-y-auto no-scrollbar pr-1">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 ml-1 uppercase">Name</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <i className="fa-regular fa-user text-sm"></i>
                            </span>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required.",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Name must be at least 3 characters",
                                    },
                                    pattern: {
                                        value:
                                            /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                                        message: "Enter a valid name",
                                    },
                                })}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>
                        {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 ml-1 uppercase">Email</label>
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
                                        value:
                                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message:
                                            "Invalid email format",
                                    },
                                })}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 ml-1 uppercase">
                            Phone Number
                        </label>

                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <i className="fa-solid fa-phone-flip text-xs"></i>
                            </span>

                            <input
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message:
                                            "Phone number is required.",
                                    },
                                    minLength: {
                                        value: 10,
                                        message:
                                            "Phone number must be 10 digits",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message:
                                            "Phone number must be 10 digits",
                                    },
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message:
                                            "Enter a valid phone number",
                                    },
                                })}
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />
                        </div>

                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 ml-1 uppercase">
                            Password
                        </label>

                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <i className="fa-solid fa-lock text-sm"></i>
                            </span>

                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message:
                                            "Password is required.",
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                    maxLength: {
                                        value: 80,
                                        message:
                                            "Password cannot exceed 80 characters",
                                    },
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                                        message:
                                            "Password must contain uppercase, lowercase, number and special character",
                                    },
                                })}
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a password"
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-2.5 pl-11 pr-12 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                            >
                                <i
                                    className={`fa-solid ${showPassword
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                        } text-xs`}
                                ></i>
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 ml-1 uppercase">
                            Confirm Password
                        </label>

                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <i className="fa-solid fa-shield-check text-sm"></i>
                            </span>

                            <input
                                {...register("confirm", {
                                    required: {
                                        value: true,
                                        message:
                                            "Confirm Password is required.",
                                    },
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-2.5 pl-11 pr-12 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                            >
                                <i
                                    className={`fa-solid ${showConfirmPassword
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                        } text-xs`}
                                ></i>
                            </button>
                        </div>

                        {errors.confirm && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirm.message}
                            </p>
                        )}
                    </div>
                    {
                        error && (
                            <p className="text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )
                    }
                    <button disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-[0.98] mt-2 shrink-0">
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-4 shrink-0">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>

                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        <span className="bg-white px-4">or</span>
                    </div>
                </div>

                {/* Google Button */}
                <button className="w-full shrink-0 flex items-center justify-center gap-3 bg-white border border-gray-100 py-2.5 rounded-2xl hover:bg-gray-50 transition-all font-bold text-slate-700 text-sm shadow-sm">
                    <img
                        src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                        className="w-5 h-5 object-contain"
                        alt="Google"
                    />

                    <span>Continue with Google</span>
                </button>

                <p className="text-center mt-4 text-gray-500 text-xs font-medium shrink-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;