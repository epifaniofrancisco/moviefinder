import React from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";
import LoadingSpinner from "./LoadingSpinner";

interface MovieResultsProps {
    movies: Movie[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
}

const MovieResults: React.FC<MovieResultsProps> = ({
    movies,
    isLoading,
    error,
    hasSearched,
}) => {
    if (isLoading) {
        return (
            <div className="py-12">
                <LoadingSpinner message="A buscar o filme..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto mt-8 max-w-md text-center">
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    if (hasSearched && movies.length === 0) {
        return (
            <div className="mx-auto mt-8 max-w-md text-center">
                <p className="text-gray-400">
                    Nenhum filme encontrado. Tente uma pesquisa diferente.
                </p>
            </div>
        );
    }

    if (movies.length > 0) {
        return (
            <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-white">
                    Resultados da Pesquisa ({movies.length})
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        );
    }

    return null;
};

export default MovieResults;
