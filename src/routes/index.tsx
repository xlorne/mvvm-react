import {createBrowserRouter} from "react-router-dom";
import Home from "../page/home";
import About from "../page/about";
import {UserComponent} from "../page/user";
import userPresenter from "../presenter/user";

export const routes = createBrowserRouter([
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
        element: <UserComponent userPresenter={()=>userPresenter()}/>,
    },
]);
