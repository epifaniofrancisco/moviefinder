import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './styles/index.css'
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
