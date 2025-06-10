import axios from "axios";
import type { Movie } from "../types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
    params: {
        language: "pt-pt",
    },
});

interface TMDBSearchResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface TMDBMovieDetails {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    overview: string;
    genres: { id: number; name: string }[];
    production_companies: { id: number; name: string }[];
    budget: number;
    revenue: number;
    tagline: string;
    vote_count: number;
}

export const getImageUrl = (
    path: string | null,
    size: string = "w500",
): string => {
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const searchMovies = async (
    query: string,
    page: number = 1,
): Promise<TMDBSearchResponse> => {
    try {
        const response = await tmdbApi.get("/search/movie", {
            params: {
                query,
                page,
                include_adult: false,
            },
        });

        if (!response.data.results) {
            throw new Error("No results in response");
        }

        const moviesWithImages = response.data.results.map((movie: Movie) => ({
            ...movie,
            poster_path: getImageUrl(movie.poster_path),
        })); // !fix: not working

        return {
            ...response.data,
            results: moviesWithImages,
        };
    } catch (error) {
        console.error("Error searching movies:", error);

        if (axios.isAxiosError(error)) {
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);

            if (error.response?.status === 401) {
                throw new Error(
                    "API Key inválida ou ausente. Verifique seu arquivo .env",
                );
            }
        }

        throw new Error("Falha ao buscar filmes. Tente novamente.");
    }
};

export const getMovieDetails = async (
    movieId: string,
): Promise<TMDBMovieDetails> => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`);

        if (!response.data) {
            throw new Error("No data in response");
        }

        console.log(response)

        const movieDetails = {
            ...response.data,
            poster_path: getImageUrl(response.data.poster_path),
            backdrop_path: getImageUrl(response.data.backdrop_path, "w1280"),
        };

        return movieDetails;
    } catch (error) {
        console.error("Error fetching movie details:", error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error(
                    "API Key inválida ou ausente. Verifique seu arquivo .env",
                );
            }
        }

        throw new Error("Falha ao carregar detalhes do filme.");
    }
};
