import React from 'react';

interface MovieBackdropProps {
    backdropPath: string;
    title: string;
}

const MovieBackdrop: React.FC<MovieBackdropProps> = ({ backdropPath, title }) => {
    return (
        <div className="relative h-[50vh] overflow-hidden">
            <img
                src={backdropPath}
                alt={`Backdrop do filme ${title}`}
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-color via-primary-color/80 to-primary-color/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-color/50 via-transparent to-primary-color/50" />
        </div>
    );
};

export default MovieBackdrop;
