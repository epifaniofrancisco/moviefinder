import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-6 left-6 z-20">
            <button
                onClick={() => {
                    navigate(-1);
                }}
                className="focus:ring-opacity-50 cursor-pointer flex items-center gap-2 rounded-lg border border-[#540B16]/50 bg-primary-color/90 px-4 py-2 text-white backdrop-blur-sm transition-all duration-200 hover:border-button-secondary/50 hover:bg-[#540B16]/80 focus:ring-2 focus:ring-button-secondary focus:outline-none"
                aria-label="Voltar à página anterior"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </button>
        </div>
    );
};

export default BackButton;
