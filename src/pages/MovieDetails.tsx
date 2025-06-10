import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Star, Calendar, Clock } from "lucide-react";
import { formatRating, formatRuntime, formatYear } from "../utils";
import { getMovieDetails } from "../services/tmdbApi";
import LoadingSpinner from "../components/LoadingSpinner";
import BackButton from "../components/BackButton";
import MoviePoster from "../components/MoviePoster";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieInfoCard from "../components/MovieInfoCard";

interface MovieDetails {
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

export default function MovieDetailsPage() {
    const params = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!params.id) return;

            setLoading(true);
            setError("");

            try {
                const movieData = await getMovieDetails(params.id);
                setMovie(movieData);
            } catch (err) {
                setError("Failed to load movie details. Please try again.");
                console.error("Movie details error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [params.id]);

    const formatCurrency = (amount: number) => {
        if (!amount) return "";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-primary-color">
            <LoadingSpinner message="Carregando detalhes do filme..." />;
        </div>;
    }

    if (error || !movie) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-primary-color">
                <div className="space-y-4 text-center">
                    <p className="text-sm text-gray-400">
                        {error || "Filme não encontrado"}
                    </p>
                    <BackButton />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-color">
            <BackButton />
            <MovieBackdrop
                backdropPath={movie.backdrop_path}
                title={movie.title}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-6 py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <MoviePoster
                        posterPath={movie.poster_path}
                        title={movie.title}
                    />

                    {/* Details */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Title and Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-medium text-gray-100 md:text-4xl">
                                    {movie.title}
                                </h1>
                                {movie.tagline && (
                                    <p className="text-lg text-gray-400 italic">
                                        {movie.tagline}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                {movie.vote_average > 0 && (
                                    <div className="flex items-center gap-2 rounded-lg bg-[#540B16]/50 px-3 py-2 ring-1 ring-[#540B16]/50">
                                        <Star className="h-4 w-4 fill-current text-amber-400" />
                                        <span className="font-medium text-gray-100">
                                            {formatRating(movie.vote_average)}
                                        </span>
                                        <span className="text-gray-400">
                                            ({movie.vote_count.toLocaleString()}
                                            )
                                        </span>
                                    </div>
                                )}
                                {movie.release_date && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {formatYear(movie.release_date)}
                                        </span>
                                    </div>
                                )}
                                {movie.runtime > 0 && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {formatRuntime(movie.runtime)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Genres */}
                        {movie.genres.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium tracking-wider text-gray-300 uppercase">
                                    Gêneros
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="rounded-full border border-button-secondary/20 bg-gradient-to-r from-button-secondary/10 to-button-primary/10 px-3 py-1 text-xs font-medium text-button-secondary"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Overview */}
                        {movie.overview && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium tracking-wider text-gray-300 uppercase">
                                    Sinopse
                                </h3>
                                <p className="leading-relaxed text-gray-300">
                                    {movie.overview}
                                </p>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {(movie.budget > 0 || movie.revenue > 0) && (
                                <MovieInfoCard title="Bilheteria">
                                    <div className="space-y-3 text-sm">
                                        {movie.budget > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">
                                                    Orçamento
                                                </span>
                                                <span className="font-medium text-gray-200">
                                                    {formatCurrency(
                                                        movie.budget,
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movie.revenue > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">
                                                    Receita
                                                </span>
                                                <span className="font-medium text-gray-200">
                                                    {formatCurrency(
                                                        movie.revenue,
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movie.budget > 0 &&
                                            movie.revenue > 0 && (
                                                <div className="flex justify-between border-t border-[#540B16]/50 pt-2">
                                                    <span className="text-gray-400">
                                                        Lucro
                                                    </span>
                                                    <span
                                                        className={`font-medium ${
                                                            movie.revenue -
                                                                movie.budget >
                                                            0
                                                                ? "text-emerald-400"
                                                                : "text-red-400"
                                                        }`}
                                                    >
                                                        {formatCurrency(
                                                            movie.revenue -
                                                                movie.budget,
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                </MovieInfoCard>
                            )}

                            {movie.production_companies.length > 0 && (
                                <MovieInfoCard title="Produção">
                                    <div className="space-y-2 text-sm">
                                        {movie.production_companies
                                            .slice(0, 4)
                                            .map((company) => (
                                                <div
                                                    key={company.id}
                                                    className="text-gray-300"
                                                >
                                                    {company.name}
                                                </div>
                                            ))}
                                    </div>
                                </MovieInfoCard>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
