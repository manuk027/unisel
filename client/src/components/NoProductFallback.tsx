const NoProductFallback = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1400 800"
                    fill="none"
                    preserveAspectRatio="none"
                >
                    {/* Dotted curve from icon to Add Product button */}
                    <path
                        d="M 700 400C 760 420, 820 360, 930 380 C 1040 400, 1140 260, 1240 120"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeDasharray="10 12"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Arrow head */}
                    <path
                        d="M 1220 125 L 1240 120 L 1235 142"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </div>

            {/* EMPTY STATE CONTENT */}
            <div className="text-center z-10 flex flex-col items-center translate-y-12">
                {/* Box Icon in Circle */}
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100/50">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                    </svg>
                </div>

                <h2 className="text-3xl font-black text-gray-900 mb-2">
                    No products
                </h2>

                <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">
                    You haven&apos;t added any products yet.<br />
                    Start by adding your first product.
                </p>
            </div>
        </div>
    );
};

export default NoProductFallback;