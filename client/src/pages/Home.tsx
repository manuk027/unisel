import { useState, useEffect } from 'react';
import navLogo from "../assets/images/navbar.png";
import Navbar from '../components/navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen lg:h-screen w-full overflow-x-hidden lg:overflow-hidden bg-white font-sans text-gray-900 select-none flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 relative lg:h-[75vh]">
                <div className="z-20 w-full lg:w-[45%] flex flex-col justify-center text-center lg:text-left py-10 lg:py-0">
                    <p className="text-blue-600 font-bold tracking-widest text-xs md:text-sm mb-2 uppercase">Buy. Sell. Connect.</p>
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-slate-900">
                        Everything you need, <br className="hidden xl:block" />
                        from <span className="text-blue-600">people you trust.</span>
                    </h1>
                    <p className="mt-4 text-gray-500 text-sm md:text-base xl:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">Unisel is your C2C marketplace to buy and sell products easily, safely, and locally.</p>
                    <div className="mt-8 xl:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
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
                <div className="relative w-full lg:w-[55%] h-[500px] sm:h-[600px] lg:h-full flex items-center justify-center">
                    <div
                        className="absolute right-[-2rem] lg:right-[-5rem] top-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[110%] lg:h-[120%] bg-blue-600 rounded-full lg:rounded-none z-0 opacity-100"
                        style={{
                            clipPath: window.innerWidth > 1024 ? 'circle(45% at 85% 50%)' : 'none',
                            maxWidth: '100vw'
                        }}
                    />
                    <div className="relative z-10 flex items-center justify-center w-full h-full scale-[0.75] sm:scale-[0.9] lg:scale-[0.8] xl:scale-100 transition-transform">
                        <div className="absolute left-[-20px] xl:left-0 top-[40%] bg-white p-3 rounded-[28px] shadow-2xl w-40 transform -rotate-6 z-30 border border-gray-50 hidden sm:block">
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
                                <div className="flex gap-1.5"><i className="fa-solid fa-wifi text-[10px]"></i><i className="fa-solid fa-battery-full text-[10px]"></i></div>
                            </div>
                            <div className="p-5 flex justify-between items-center shrink-0">
                                <img src={navLogo} alt="Unisel Logo" className="h-6 w-auto object-contain" />
                                <div className="flex gap-3 text-gray-400 text-sm">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <i className="fa-regular fa-bell"></i>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 space-y-5 pb-8 no-scrollbar">
                                <div className="bg-blue-600 rounded-3xl p-5 relative overflow-hidden text-white shrink-0">
                                    <div className="relative z-10 w-2/3">
                                        <h3 className="font-bold text-lg leading-tight">Find great deals near you</h3>
                                        <button className="bg-white text-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-bold mt-3">Explore Now</button>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=200" className="absolute right-[-10px] bottom-0 w-24 h-24 object-contain" alt="banner" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-xs text-slate-800">Categories</h4>
                                        <span className="text-blue-600 text-[10px] font-bold">See all</span>
                                    </div>
                                    <div className="flex justify-between px-1">
                                        {['fa-tv', 'fa-shirt', 'fa-house', 'fa-car'].map((icon, idx) => (
                                            <div key={idx} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 text-sm"><i className={`fa-solid ${icon}`}></i></div>
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
                        <div className="absolute right-[-10px] xl:right-0 top-[10%] bg-white p-3 rounded-[28px] shadow-2xl w-40 transform rotate-3 z-30 border border-gray-50 hidden md:block">
                            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300" className="w-full h-28 object-cover rounded-[20px] mb-3" alt="camera" />
                            <h4 className="font-bold text-xs text-slate-800">Canon EOS</h4>
                            <p className="text-blue-600 font-bold text-sm">Rs.350</p>
                        </div>
                        <div className="absolute right-[-20px] xl:right-[-20px] bottom-[15%] bg-white p-5 rounded-[32px] shadow-2xl w-52 border border-blue-50 transform -translate-x-2 z-30 hidden lg:block">
                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3"><i className="fa-solid fa-shield-check text-lg"></i></div>
                            <h4 className="font-bold text-sm text-slate-800">Safety First</h4>
                            <p className="text-[10px] text-gray-400 mt-2">Your safety is our priority. Follow guidelines.</p>
                            <div className="text-blue-600 text-[10px] font-bold mt-3 flex items-center gap-1">Learn More <i className="fa-solid fa-arrow-right"></i></div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="w-full bg-white lg:h-[15vh] px-6 md:px-20 py-8 lg:py-4 flex items-center shrink-0">
                <div className="w-full bg-[#F8F9FC] md:bg-white md:border md:border-gray-100 md:shadow-xl rounded-[30px] md:rounded-[40px] py-6 flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0 z-20">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl"><i className="fa-solid fa-users"></i></div>
                        <div><h3 className="text-lg xl:text-2xl font-black text-slate-800">50K+</h3><p className="text-[8px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Users</p></div>
                    </div>
                    <div className="hidden md:block h-10 w-px bg-gray-100" />
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl"><i className="fa-solid fa-tag"></i></div>
                        <div><h3 className="text-lg xl:text-2xl font-black text-slate-800">100K+</h3><p className="text-[8px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Listings</p></div>
                    </div>
                    <div className="hidden md:block h-10 w-px bg-gray-100" />
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 xl:w-12 xl:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl"><i className="fa-solid fa-cart-shopping"></i></div>
                        <div><h3 className="text-lg xl:text-2xl font-black text-slate-800">75K+</h3><p className="text-[8px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Sold</p></div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;