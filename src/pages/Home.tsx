import Header from "../components/Header";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-primary-color">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                <Header />

                <main className="pt-16 pb-8" role="main">
                    <section className="mx-auto max-w-4xl text-center text-white">
                        <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            Encontre os melhores filmes
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
                            Pesquise qualquer filme para descobrir informações
                            detalhadas, classificações e muito mais.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;
