import { useState, useCallback } from "react";

interface UseMovieSearchReturn {
    searchMovie: (query: string) => Promise<void>;
    isSearching: boolean;
    error: string | null;
    clearError: () => void;
}

export const useMovieSearch = (): UseMovieSearchReturn => {
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchMovie = useCallback(async (query: string) => {

        setIsSearching(true);
        setError(null);

        try {
            console.log("Searching for movie:", query);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Erro inesperado ao pesquisar";
            setError(errorMessage);
            throw err;
        } finally {
            setIsSearching(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        searchMovie,
        isSearching,
        error,
        clearError,
    };
};
