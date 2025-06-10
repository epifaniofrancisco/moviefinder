import { useState, useCallback } from "react";
import type { Movie } from "../types";
import { searchMovies } from "../services/tmdbApi";

interface UseMovieSearchReturn {
    searchMovie: (query: string) => Promise<void>;
    movies: Movie[];
    isSearching: boolean;
    error: string | null;
    clearError: () => void;
    clearResults: () => void;
    hasSearched: boolean;
}

export const useMovieSearch = (): UseMovieSearchReturn => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const searchMovie = useCallback(async (query: string) => {
        setIsSearching(true);
        setError(null);
        setHasSearched(true);

        try {
            const response = await searchMovies(query);
            setMovies(response.results);

            if (response.results.length === 0) {
                setError(
                    "Nenhum filme encontrado. Tente uma pesquisa diferente.",
                );
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Erro inesperado ao pesquisar";
            setError(errorMessage);
            setMovies([]);
            throw err;
        } finally {
            setIsSearching(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const clearResults = useCallback(() => {
        setMovies([]);
        setError(null);
        setHasSearched(false);
    }, []);

    return {
        searchMovie,
        movies,
        isSearching,
        error,
        clearError,
        clearResults,
        hasSearched,
    };
};
