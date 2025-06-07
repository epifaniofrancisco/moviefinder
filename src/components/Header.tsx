import { Film } from "lucide-react";
import GithubIcon from "../assets/icons/github-icon.svg";
import { NavLink } from "react-router";

const Header: React.FC = () => {
    return (
        <header
            className="flex h-15 w-full items-center justify-between text-white"
        >
            <NavLink to="/" className="flex items-center space-x-2">
                <Film className="h-7 w-7" />
                <h1 className="text-xl font-semibold">MovieFinder</h1>
            </NavLink>
            <a
                href="https://github.com/epifaniofrancisco/moviefinder"
                target="_blank"
                rel="noopener noreferrer"
                className="focus:ring-opacity-50 flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-white transition-colors duration-200 hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
                aria-label="View source code on GitHub"
            >
                <img
                    src={GithubIcon}
                    alt=""
                    className="h-6 w-6"
                    loading="lazy"
                />
                <span className="hidden md:inline-block">GitHub</span>
            </a>
        </header>
    );
};

export default Header;
