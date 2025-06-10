import { useState, useCallback } from "react";

interface SearchFormProps {
    onSearch: (query: string) => Promise<void>;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) return;

            await onSearch(trimmedQuery);
        },
        [searchQuery, onSearch],
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
        },
        [],
    );

    const isDisabled = !searchQuery.trim();

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
                        className="focus:ring-opacity-50 w-full rounded-lg border border-[#540B16] bg-[#540B16] px-4 py-3 text-white placeholder-gray-300 shadow-sm transition-all duration-200 focus:border-button-secondary focus:ring-1 focus:ring-button-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        spellCheck="false"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="focus:ring-opacity-50 mx-auto w-48 cursor-pointer rounded-lg bg-button-primary px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-button-secondary focus:ring-2 focus:ring-button-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Pesquisar filme"
                >
                    Pesquisar filme
                </button>
            </form>
        </section>
    );
};

export default SearchForm;
