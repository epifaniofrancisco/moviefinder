import React from "react";

interface MovieInfoCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const MovieInfoCard: React.FC<MovieInfoCardProps> = ({
    title,
    children,
    className = "",
}) => {
    return (
        <div
            className={`rounded-xl bg-[#540B16]/30 p-6 ring-1 ring-[#540B16]/50 transition-all duration-300 hover:ring-button-secondary/30 ${className}`}
        >
            <h3 className="mb-4 text-sm font-medium tracking-wider text-gray-300 uppercase">
                {title}
            </h3>
            {children}
        </div>
    );
};

export default MovieInfoCard;
