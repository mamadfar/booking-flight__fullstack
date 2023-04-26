import {createBrowserRouter} from "react-router-dom";
import {About, Home, Login} from "../pages";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
    {
        id: "home",
        path: "/",
        element: <MainLayout><Home/></MainLayout>,
    },
    {
        id: "about",
        path: "/about",
        element: <MainLayout><About/></MainLayout>
    },
    {
        id: "login",
        path: "/login",
        element: <Login/>
    },
]);

export default router;
