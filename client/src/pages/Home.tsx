import { useState, useEffect } from 'react';
import navLogo from "../assets/images/navbar.png";
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen w-full overflow-hidden bg-white font-sans text-gray-900 select-none">
            <div className="md:hidden h-screen flex flex-col overflow-hidden bg-white">
                <div className="px-6 pt-6 pb-4 shrink-0">
                    <div className="flex items-center justify-between">
                        <img src={navLogo} alt="Unisel Logo" className="h-9 object-contain" />
                        <button className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className="px-6 shrink-0">
                    <div className="bg-[#F8F9FC] rounded-[32px] p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold mb-4">
                                <i className="fa-solid fa-shield-halved"></i>
                                Trusted Marketplace
                            </div>
                            <h1 className="text-4xl font-black leading-[1.05] text-slate-900">
                                Buy & Sell
                                <br />
                                products nearby
                            </h1>
                            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-[280px]">
                                Discover products from trusted local sellers instantly.
                            </p>
                            <div className="flex items-center gap-3 mt-6">
                                <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-blue-100">Start Selling</button>
                                <button className="border border-gray-200 text-gray-700 px-5 py-3 rounded-2xl text-sm font-semibold">Explore</button>
                            </div>
                        </div>

                        <div className="absolute right-[-40px] top-[-20px] w-40 h-40 rounded-full bg-blue-100"></div>
                    </div>
                </div>
                <div className="px-6 mt-5 shrink-0">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { icon: 'fa-users', value: '50K+', label: 'Users' },
                            { icon: 'fa-box', value: '100K+', label: 'Listings' },
                            { icon: 'fa-cart-shopping', value: '75K+', label: 'Sold' }
                        ].map((item, index) => (
                            <div key={index} className="bg-[#F8F9FC] rounded-3xl py-4 flex flex-col items-center justify-center">
                                < div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2" >
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <h3 className="text-lg font-black text-slate-900">{item.value}</h3>
                                <p className="text-[11px] text-gray-500 mt-1">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-6 mt-6 flex-1 overflow-hidden pb-28">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900">Categories</h3>
                        <div className="flex items-center gap-2">
                            <button className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className="w-9 h-9 rounded-xl bg-blue-600 text-white">
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {[
                            { icon: 'fa-mobile-screen', label: 'Mobiles' },
                            { icon: 'fa-laptop', label: 'Electronics' },
                            { icon: 'fa-shirt', label: 'Fashion' },
                            { icon: 'fa-couch', label: 'Furniture' },
                            { icon: 'fa-car', label: 'Vehicles' },
                            { icon: 'fa-house', label: 'Property' }
                        ].map((item, index) => (
                            <div key={index} className="min-w-[88px] flex flex-col items-center">
                                <div className="w-20 h-20 rounded-[28px] bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-3">
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <span className="text-xs text-gray-600 font-medium text-center">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Navbar />
            </div >
            < div className="hidden md:flex h-screen w-full overflow-hidden bg-white font-sans text-gray-900 select-none flex-col" >
                <Navbar />
                <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-10 lg:px-20 relative overflow-hidden">
                    <div className="z-20 w-full lg:w-[45%] flex flex-col justify-center text-center lg:text-left py-4 lg:py-0">
                        <p className="text-blue-600 font-bold tracking-widest text-xs md:text-sm mb-2 uppercase">Buy. Sell. Connect.</p>
                        <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-slate-900">
                            Everything you need,
                            <br className="hidden xl:block" />
                            from <span className="text-blue-600">people you trust.</span>
                        </h1>
                        <p className="mt-4 text-gray-500 text-sm md:text-base xl:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">Unisel is your C2C marketplace to buy and sell products easily, safely, and locally.</p>
                        <div className="hidden lg:grid mt-8 xl:mt-10 grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
                            {[
                                { icon: 'fa-tag', label: 'Great Deals' },
                                { icon: 'fa-shield-halved', label: 'Safe & Secure' },
                                { icon: 'fa-location-dot', label: 'Local & Easy' },
                                { icon: 'fa-users', label: 'Real People' }
                            ].map((f, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2 shadow-sm text-lg">
                                        <i className={`fa-solid ${f.icon}`}></i>
                                    </div>
                                    <h4 className="font-bold text-[10px] uppercase text-slate-700 text-center leading-tight">{f.label}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative w-full lg:w-[55%] h-[360px] sm:h-[500px] lg:h-full flex items-center justify-center">
                        <div className="hidden lg:block absolute right-[-5rem] top-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-blue-600 rounded-none z-0 opacity-100" style={{ clipPath: 'circle(45% at 85% 50%)' }} />
                        <div className="relative z-10 flex items-center justify-center w-full h-full scale-[0.75] sm:scale-[0.9] lg:scale-[0.8] xl:scale-100 transition-transform">
                            <div className="absolute left-0 top-[40%] bg-white p-3 rounded-[28px] shadow-2xl w-40 transform -rotate-6 z-30 border border-gray-50 hidden lg:block">
                                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300" className="w-full h-28 object-cover rounded-[20px] mb-3" alt="sofa" />
                                <h4 className="font-bold text-xs text-slate-800">Modern Sofa</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-blue-600 font-bold text-sm">Rs.250</span>
                                    <i className="fa-regular fa-heart text-gray-300"></i>
                                </div>
                            </div>
                            <div className="relative bg-white w-72 h-[560px] rounded-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[10px] border-white overflow-hidden z-20 flex flex-col shrink-0">
                                <div className="h-8 flex justify-between px-8 pt-4 items-center shrink-0">
                                    <span className="text-[12px] font-bold">{time}</span>
                                    <div className="flex gap-1.5">
                                        <i className="fa-solid fa-wifi text-[10px]"></i>
                                        <i className="fa-solid fa-battery-full text-[10px]"></i>
                                    </div>
                                </div>
                                <div className="p-5 flex justify-between items-center shrink-0">
                                    <img src={navLogo} alt="Unisel Logo" className="h-6 w-auto object-contain" />
                                    <div className="flex gap-3 text-gray-400 text-sm">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        <i className="fa-regular fa-bell"></i>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-hidden px-4 space-y-5 pb-8 no-scrollbar">
                                    <div className="bg-blue-600 rounded-3xl p-5 relative overflow-hidden text-white shrink-0 min-h-[160px]">
                                        <div className="relative z-10 w-[60%]">
                                            <h3 className="font-bold text-lg leading-tight">Find great deals near you</h3>
                                            <button className="bg-white text-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-bold mt-3">Explore Now</button>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=200" className="absolute right-0 bottom-0 w-28 h-28 object-cover rounded-tl-3xl" alt="banner" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-bold text-xs text-slate-800">Categories</h4>
                                            <span className="text-blue-600 text-[10px] font-bold">See all</span>
                                        </div>
                                        <div className="flex justify-between px-1">
                                            {['fa-tv', 'fa-shirt', 'fa-house', 'fa-car'].map((icon, idx) => (
                                                <div key={idx} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 text-sm">
                                                    <i className={`fa-solid ${icon}`}></i>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-slate-800 mb-3">Recommended</h4>
                                        <div className="flex gap-3">
                                            <div className="flex-1 bg-gray-100/50 p-2 rounded-2xl">
                                                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=150" className="w-full h-16 object-contain mb-2" alt="p1" />
                                                <p className="text-[10px] font-bold truncate">iPhone 13</p>
                                                <p className="text-[10px] text-blue-600 font-bold">Rs.450</p>
                                            </div>
                                            <div className="flex-1 bg-gray-100/50 p-2 rounded-2xl">
                                                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150" className="w-full h-16 object-contain mb-2" alt="p2" />
                                                <p className="text-[10px] font-bold truncate">Nike Air</p>
                                                <p className="text-[10px] text-blue-600 font-bold">Rs.120</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 top-[10%] bg-white p-3 rounded-[28px] shadow-2xl w-40 transform rotate-3 z-30 border border-gray-50 hidden lg:block">
                                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300" className="w-full h-28 object-cover rounded-[20px] mb-3" alt="camera" />
                                <h4 className="font-bold text-xs text-slate-800">Canon EOS</h4>
                                <p className="text-blue-600 font-bold text-sm">Rs.350</p>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="hidden lg:flex w-full bg-white lg:h-[15vh] px-6 md:px-20 py-8 lg:py-4 items-center shrink-0">
                    <div className="w-full bg-[#F8F9FC] md:bg-white md:border md:border-gray-100 md:shadow-xl rounded-[30px] md:rounded-[40px] py-6 flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0 z-20">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div>
                                <h3 className="text-lg xl:text-2xl font-black text-slate-800">50K+</h3>
                                <p className="text-[8px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Users</p>
                            </div>
                        </div>
                        <div className="hidden md:block h-10 w-px bg-gray-100" />
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                                <i className="fa-solid fa-tag"></i>
                            </div>
                            <div>
                                <h3 className="text-lg xl:text-2xl font-black text-slate-800">100K+</h3>
                                <p className="text-[8px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Listings</p>
                            </div>
                        </div>
                        <div className="hidden md:block h-10 w-px bg-gray-100" />
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div>
                                <h3 className="text-lg xl:text-2xl font-black text-slate-800">75K+</h3>
                                <p className="text-[8px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Sold</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >
        </div >
    );
};

export default Home;