import React from "react";
import { NavLink } from "react-router";
import { Play, Star, Calendar } from "lucide-react";
import type { Movie } from "../types";
import { formatYear, formatRating } from "../utils";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { id, title, poster_path, vote_average, release_date } = movie;

    const hasRating = vote_average > 0;
    const formattedRating = formatRating(vote_average);
    const releaseYear = formatYear(release_date);

    return (
        <NavLink
            to={`/movie/${id}`}
            className="group block rounded-xl transition-transform duration-200 hover:scale-[1.02]"
            aria-label={`Ver detalhes do filme ${title} (${releaseYear})`}
        >
            <article className="h-full space-y-3 overflow-hidden rounded-xl bg-gradient-to-b from-[#540B16]/5 to-transparent">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[#540B16]/30 transition-all duration-300 group-hover:border-button-secondary/60 group-hover:shadow-xl group-hover:shadow-button-secondary/10">
                    <img
                        src={poster_path}
                        alt={`Poster do filme ${title}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />

                    {hasRating && (
                        <div className="absolute top-1 right-1 flex items-center gap-1.5 rounded-lg border border-amber-400/20 bg-black/60 px-2 py-1 backdrop-blur-md">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-semibold text-amber-400">
                                {formattedRating}
                            </span>
                        </div>
                    )}

                    {/* Play Button */}
                    <div className="absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <div className="rounded-full border border-white/20 bg-button-primary/90 p-4 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110">
                            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 px-2 py-1">
                    <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white transition-colors duration-200 group-hover:text-button-secondary">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{releaseYear}</span>
                    </div>
                </div>
            </article>
        </NavLink>
    );
};

export default MovieCard;
