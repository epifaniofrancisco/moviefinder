import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = "Loading...", 
}) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-primary-color">
            <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-button-secondary"></div>
                <p className="text-sm text-gray-400">{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
