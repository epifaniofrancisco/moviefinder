import React from "react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="fixed right-0 bottom-0 left-0 z-10 border-t border-[#540B16] bg-primary-color"
            role="contentinfo"
        >
            <div className="container mx-auto max-w-6xl px-4 py-4 md:px-6">
                <div className="flex flex-col items-center justify-between gap-2 text-center text-gray-300 md:flex-row md:text-left">
                    <p className="text-base">
                        © {currentYear} MovieFinder. Todos os direitos
                        reservados.
                    </p>
                    <p className="text-base">
                        Desenvolvido por:{" "}
                        <a
                            href="https://github.com/epifaniofrancisco"
                            className="focus:ring-opacity-50 rounded px-1 transition-colors duration-200 hover:text-white focus:text-white focus:ring-2 focus:ring-white focus:outline-none"
                            aria-label="GitHub do desenvolvedor"
                        >
                            Epifanio Francisco👨‍💻
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
