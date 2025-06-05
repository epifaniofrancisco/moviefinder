import FilmIcon from "../assets/icons/film-icon.svg";
import GithubIcon from "../assets/icons/github-icon.svg";

function Header() {
    return (
        <header className="flex h-15 w-full items-center justify-between text-white">
            <div className="flex items-center space-x-1">
                <img
                    src={FilmIcon}
                    alt="Film Icon"
                    className="h-8 w-8 text-white"
                />{" "}
                <span className="text-xl">MovieFinder</span>
            </div>
            <a
                href="https://github.com/epifaniofrancisco/moviefinder#"
                target="_blank"
                className="flex cursor-pointer items-center space-x-1 text-white hover:text-gray-300"
            >
                <img
                    src={GithubIcon}
                    alt="Github Icon"
                    className="h-6 w-6"
                />{" "}
                <span className="hidden md:inline-block">Github</span>
            </a>
        </header>
    );
}

function Home() {
    return (
        <main className="h-screen px-4 md:px-6 bg-primary-color">
            <Header />
        </main>
    );
}

export default Home;
