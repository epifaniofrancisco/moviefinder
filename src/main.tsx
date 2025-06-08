import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './styles/index.css'
import Home from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/movie/:id",
        element: <MovieDetailsPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
