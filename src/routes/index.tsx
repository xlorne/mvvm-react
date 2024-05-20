import {createBrowserRouter} from "react-router-dom";
import Home from "../page/home";
import About from "../page/about";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/about',
        element: <About/>,
    },
]);
