'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        // Start countdown timer
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    router.push('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup on unmount
        return () => {
            clearInterval(countdownInterval);
        };
    }, [router]);

    const handleGoBack = () => {
        router.back();
    };

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center px-4 max-w-2xl">
                {/* 404 Number */}
                <h1 className="text-9xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4 animate-pulse">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Countdown Timer */}
                <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <p className="text-gray-300 text-sm">
                        Redirecting to home in{' '}
                        <span className="text-yellow-400 font-bold text-xl">{countdown}</span>{' '}
                        seconds
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* Back Button */}
                    <button
                        onClick={handleGoBack}
                        className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 w-full sm:w-auto"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                            Go Back
                        </span>
                    </button>

                    {/* Home Button */}
                    <button
                        onClick={handleGoHome}
                        className="group relative px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30 w-full sm:w-auto"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            Go Home
                        </span>
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 opacity-20">
                    <svg
                        className="w-32 h-32 mx-auto text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
