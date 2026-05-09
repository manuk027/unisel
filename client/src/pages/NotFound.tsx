import { useEffect, useState } from "react";
import { Smartphone, BookOpen, Shirt, PawPrint, Car, Bike, Building2, MonitorSmartphone, Wrench, Sofa, } from "lucide-react";

import Navbar from "../components/Navbar";

const categories = [Smartphone, BookOpen, Shirt, PawPrint, Car, Bike, Building2, MonitorSmartphone, Wrench, Sofa,];

const NotFound = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [count, setCount] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => { setActiveIndex((prev) => (prev + 1) % categories.length); }, 700);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let start = 100;
        const counter = setInterval(() => {
            start += 10;
            if (start >= 404) {
                start = 404;
                clearInterval(counter);
            }
            setCount(start);
        }, 20);

        return () => clearInterval(counter);
    }, []);

    const CurrentIcon = categories[activeIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="h-16 w-full">
                <Navbar />
            </div>
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
                <div className="text-center">
                    <div className="mb-8 flex justify-center">
                        <div key={activeIndex} className="animate-[swap_0.5s_ease]">
                            <CurrentIcon className="w-16 h-16 text-blue-600" strokeWidth={1.8} />
                        </div>
                    </div>
                    <h1 className="text-8xl md:text-9xl font-black tracking-tight text-blue-950">{count}</h1>
                    <p className="mt-4 text-sm md:text-base tracking-[0.2em] uppercase text-blue-500 font-medium">Page Not Found</p>
                    <button onClick={() => window.history.back()} className=" mt-10 rounded-2xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 ">
                        Go Home
                    </button>
                </div>
            </div>
            <style>
                {`@keyframes swap {0% {opacity: 0;transform: translateY(12px) scale(0.85);filter: blur(4px);}100% {opacity: 1;transform: translateY(0) scale(1);filter: blur(0);}}`}
            </style>
        </div>
    );
};

export default NotFound;