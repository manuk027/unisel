import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import navLogo from "../assets/images/navbar.png";
import { type RootState, type AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const cartCount = useSelector((state: RootState) => state.cart.items.length);
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        setProfileOpen(false);
    };

    return (
        <>
            <header className="hidden md:flex h-[10vh] min-h-[70px] items-center px-4 md:px-10 shrink-0 relative">
                <div className="w-full max-w-6xl mx-auto flex items-center justify-between bg-[#F8F9FC] px-6 md:px-10 py-2 rounded-full shadow-sm z-50">
                    <div className="flex-shrink-0">
                        <img src={navLogo} alt="Unisel Logo" className="h-8 md:h-9 w-auto object-contain" />
                    </div>
                    <nav className="hidden md:flex flex-grow justify-evenly items-center px-4 lg:px-8 text-gray-600 font-medium text-sm">
                        <Link to="/" className={`flex items-center gap-2 pb-1 transition ${location.pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}>
                            <i className="fa-solid fa-house"></i>
                            Home
                        </Link>
                        <Link to="/sell" className={`flex items-center gap-2 pb-1 transition ${location.pathname === "/sell" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}>
                            <i className="fa-solid fa-tag"></i>
                            Sell
                        </Link>
                        <Link to="/buy" className={`flex items-center gap-2 pb-1 transition ${location.pathname === "/buy" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}>
                            <i className="fa-solid fa-store"></i>
                            Buy
                        </Link>
                        <Link to="/my-products" className={`flex items-center gap-2 pb-1 transition ${location.pathname === "/my-products" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}>
                            <i className="fa-solid fa-box"></i>
                            My Products
                        </Link>
                        <Link to="/cart" className={`relative flex items-center gap-2 pb-1 transition ${location.pathname === "/cart" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}>
                            <div className="relative">
                                <i className="fa-solid fa-cart-shopping"></i>
                                {cartCount > 0 && (<span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold">{cartCount}</span>)}
                            </div>
                            Cart
                        </Link>
                    </nav>
                    <div className="hidden md:flex items-center space-x-6">
                        {!token ? (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                                <Link to="/register" className="px-5 py-2 bg-blue-600 text-white rounded-xl">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <span className="text-blue-600 font-medium flex items-center gap-2 text-sm">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="user" className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <i className="fa-regular fa-user text-sm"></i>
                                        </div>
                                    )}
                                    {user?.name}
                                </span>
                                <button onClick={handleLogout} className="text-black hover:text-gray-700 font-medium flex items-center gap-2">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-[100]">
                <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl px-6 py-3 flex items-center justify-between">
                    <Link to="/" className={`flex flex-col items-center text-xs ${location.pathname === "/" ? "text-blue-600" : "text-gray-500"}`}>
                        <i className="fa-solid fa-house text-lg"></i>
                        Home
                    </Link>
                    <Link to="/sell" className={`flex flex-col items-center text-xs ${location.pathname === "/sell" ? "text-blue-600" : "text-gray-500"}`}>
                        <i className="fa-solid fa-tag text-lg"></i>
                        Sell
                    </Link>
                    <Link to="/buy" className={`flex flex-col items-center text-xs ${location.pathname === "/buy" ? "text-blue-600" : "text-gray-500"}`}>
                        <i className="fa-solid fa-store text-lg"></i>
                        Buy
                    </Link>
                    <button onClick={() => setProfileOpen(true)} className="flex flex-col items-center text-xs text-gray-500">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="user" className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                            <i className="fa-regular fa-user text-lg"></i>
                        )}
                        Profile
                    </button>
                </div>
            </div>
            {profileOpen && (
                <div className="md:hidden fixed inset-0 bg-black/40 z-[200] flex items-end">
                    <div className="w-full bg-white rounded-t-[35px] p-6 animate-in slide-in-from-bottom duration-200">
                        <div className="flex items-center gap-3 mb-6">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="user" className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <i className="fa-regular fa-user"></i>
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-gray-800">{user?.name || "Guest"}</h3>
                                <p className="text-sm text-gray-500">Profile Menu</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <Link to="/cart" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 text-gray-700">
                                <div className="relative w-5">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    {cartCount > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-semibold">{cartCount}</span>)}
                                </div>
                                Cart
                            </Link>
                            <Link to="/my-products" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 text-gray-700">
                                <i className="fa-solid fa-box w-5"></i>
                                My Products
                            </Link>
                            {token && (
                                <button onClick={handleLogout} className="flex items-center gap-3 text-black text-left">
                                    <i className="fa-solid fa-right-from-bracket w-5"></i>
                                    Logout
                                </button>
                            )}
                            {!token && (
                                <>
                                    <Link to="/login" className="flex items-center gap-3 text-gray-700">
                                        <i className="fa-solid fa-right-to-bracket w-5"></i>
                                        Login
                                    </Link>
                                    <Link to="/register" className="flex items-center gap-3 text-blue-600">
                                        <i className="fa-solid fa-user-plus w-5"></i>
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                        <button onClick={() => setProfileOpen(false)} className="w-full mt-8 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
