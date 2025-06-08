import React from "react";

interface MoviePosterProps {
    posterPath: string;
    title: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({
    posterPath,
    title,
}) => {
    return (
        <div className="lg:col-span-1">
            <div className="relative mx-auto aspect-[2/3] max-w-sm overflow-hidden rounded-xl bg-[#540B16]/30 ring-1 ring-[#540B16]/50 transition-all duration-300 hover:ring-button-secondary/50 lg:mx-0">
                <img
                    src={posterPath}
                    alt={`Poster do filme ${title}`}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                />
            </div>
        </div>
    );
};

export default MoviePoster;
