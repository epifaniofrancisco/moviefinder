interface HeroSectionProps {
    title: string;
    subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
    return (
        <section className="mx-auto max-w-4xl text-center text-white">
            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                {title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
                {subtitle}
            </p>
        </section>
    );
};

export default HeroSection;
