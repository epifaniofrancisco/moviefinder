import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MovieResults from "../components/MovieResults";
import SearchForm from "../components/SearchForm";
import { useMovieSearch } from "../hooks/useMovieSearch";

const Home: React.FC = () => {
    const { searchMovie, movies, isSearching, error, hasSearched } = useMovieSearch();

    return (
        <div className="min-h-screen bg-primary-color">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                <Header />

                <main className="pt-16 pb-8" role="main">
                    <HeroSection
                        title="Encontre os melhores filmes"
                        subtitle="Pesquise qualquer filme para descobrir informações detalhadas, classificações e muito mais."
                    />

                    <SearchForm onSearch={searchMovie} />

                    <MovieResults
                        movies={movies}
                        isLoading={isSearching}
                        error={error}
                        hasSearched={hasSearched}
                    />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Home;
