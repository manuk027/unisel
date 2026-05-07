import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import navLogo from "../assets/images/navbar.png";
import { type RootState, type AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const dispatch = useDispatch<AppDispatch>();
    const { user, token, } = useSelector((state: RootState) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="h-[10vh] min-h-[70px] flex items-center px-4 md:px-10 shrink-0 relative">
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between bg-[#F8F9FC] px-6 md:px-10 py-2 rounded-full shadow-sm z-50">
                <div className="flex-shrink-0">
                    <img src={navLogo} alt="Unisel Logo" className="h-8 md:h-9 w-auto object-contain" />
                </div>
                <nav className="hidden md:flex flex-grow justify-evenly items-center px-4 lg:px-8 text-gray-600 font-medium text-sm">
                    <Link to="/" className="text-blue-600 border-b-2 border-blue-600 pb-1 flex items-center gap-2">
                        <i className="fa-solid fa-house"></i>
                        Home
                    </Link>
                    <Link to="/sell" className="hover:text-blue-600 transition flex items-center gap-2">
                        <i className="fa-solid fa-tag"></i>
                        Sell
                    </Link>
                    <Link to="/buy" className="hover:text-blue-600 transition flex items-center gap-2">
                        <i className="fa-solid fa-shapes"></i>
                        Buy
                    </Link>
                    <Link to="/cart" className="hover:text-blue-600 transition flex items-center gap-2 relative">
                        <i className="fa-solid fa-cart-shopping"></i>
                        Cart
                        <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
                    </Link>
                </nav>
                <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                    {!token ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-2 transition text-sm">
                                <i className="fa-regular fa-user"></i>
                                Login
                            </Link>
                            <Link to="/signup" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-md flex items-center gap-2 text-sm">
                                <i className="fa-solid fa-user-plus text-[10px]"></i>
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-6">
                            <span className="text-blue-600 font-medium flex items-center gap-2 text-sm">
                                {
                                    user?.avatar ? (
                                        <img src={user.avatar} alt="user" className="w-6 h-6 rounded-full object-cover" />
                                    ) : (
                                        <i className="fa-regular fa-user"></i>
                                    )
                                }

                                {user?.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="text-black hover:text-gray-700 font-medium flex items-center gap-2 transition text-sm"
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </button>
                        </div>
                    )}
                    <button onClick={toggleMenu} className="md:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                        <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars-staggered"} text-xl`}></i>
                    </button>
                </div>
            </div>
            {
                isOpen && (
                    <div className="absolute top-[85%] left-4 right-4 bg-white shadow-2xl rounded-3xl p-6 flex flex-col space-y-4 md:hidden z-[100] border border-gray-100 animate-in fade-in zoom-in duration-200">
                        <nav className="flex flex-col space-y-4 text-gray-600 font-medium">
                            <Link to="/" className="flex items-center gap-3 text-blue-600">
                                <i className="fa-solid fa-house w-5"></i>
                                Home
                            </Link>
                            <Link to="/sell" className="flex items-center gap-3">
                                <i className="fa-solid fa-tag w-5"></i>
                                Sell
                            </Link>
                            <Link to="/buy" className="flex items-center gap-3">
                                <i className="fa-solid fa-shapes w-5"></i>
                                Buy
                            </Link>
                            <Link to="/cart" className="flex items-center gap-3 relative">
                                <i className="fa-solid fa-cart-shopping w-5"></i>
                                Cart
                                <span className="ml-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
                            </Link>
                        </nav>
                        <div className="h-px bg-gray-100 w-full" />
                        {!token ? (
                            <div className="flex flex-col space-y-3">
                                <Link to="/login" className="w-full py-3 text-center text-gray-700 font-medium border border-gray-200 rounded-xl">Login</Link>
                                <Link to="/signup" className="w-full py-3 text-center bg-blue-600 text-white font-medium rounded-xl shadow-lg shadow-blue-100">Sign Up</Link>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <span className="text-blue-600 font-medium flex items-center gap-3">
                                    <i className="fa-regular fa-user w-5"></i>
                                    {user?.name}
                                </span>
                                <button onClick={handleLogout} className="w-full py-3 text-black font-medium border border-gray-200 rounded-xl">Logout</button>
                            </div>
                        )}
                    </div>
                )
            }
        </header >
    );
};

export default Navbar;