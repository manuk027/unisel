import React, { Component, type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, };
    }

    static getDerivedStateFromError() {
        return { hasError: true, };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error Boundary Caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center border border-gray-100">
                        <h1 className="text-2xl font-bold text-red-500 mb-3">Something went wrong</h1>
                        <p className="text-gray-500 mb-6">An unexpected error occurred while rendering this page.</p>
                        <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition-all">
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;