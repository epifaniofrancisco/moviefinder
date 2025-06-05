import { useState, useCallback } from "react";

interface SearchFormProps {
    onSearch: (query: string) => Promise<void>;
}

const LoadingSpinner: React.FC = () => (
    <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) return;

            setIsLoading(true);
            setError(null);

            try {
                await onSearch(trimmedQuery);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Erro ao pesquisar filme",
                );
            } finally {
                setIsLoading(false);
            }
        },
        [searchQuery, onSearch],
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            if (error) setError(null);
        },
        [error],
    );

    const isDisabled = !searchQuery.trim() || isLoading;

    return (
        <section
            className="mx-auto mt-10 max-w-2xl"
            aria-label="Busca de filmes"
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                role="search"
            >
                <div className="flex-1">
                    <label htmlFor="search-film" className="sr-only">
                        Pesquisar filme
                    </label>
                    <input
                        type="text"
                        name="search-film"
                        id="search-film"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Digite o nome do filme..."
                        disabled={isLoading}
                        className="focus:ring-opacity-50 w-full rounded-lg border border-[#540B16] bg-[#540B16] px-4 py-3 text-white placeholder-gray-300 shadow-sm transition-all duration-200 focus:border-button-secondary focus:ring-1 focus:ring-button-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="focus:ring-opacity-50 mx-auto w-48 cursor-pointer rounded-lg bg-button-primary px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-button-secondary focus:ring-2 focus:ring-button-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={
                        isLoading ? "Pesquisando..." : "Pesquisar filme"
                    }
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <LoadingSpinner />
                            Pesquisando...
                        </span>
                    ) : (
                        "Pesquisar"
                    )}
                </button>

                {error && (
                    <p
                        className="mt-2 text-center text-base text-red-400"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </p>
                )}
            </form>
        </section>
    );
};

export default SearchForm;
