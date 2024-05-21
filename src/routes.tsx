import {createHashRouter} from "react-router-dom";
import Home from "./page/home";
import About from "./page/about";
import User from "./page/user";

export const routes = createHashRouter(
    [
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/about',
            element: <About/>,
        },
        {
            path: '/user',
            element: <User/>,
        },
    ]
);
