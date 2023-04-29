import {createBrowserRouter} from "react-router-dom";
import {About, Home, Flights} from "../pages";
import MainLayout from "../layout/MainLayout";
import FlightsProvider from "../hooks/useFlights";

const router = createBrowserRouter([
    {
        id: "home",
        path: "/",
        element: <FlightsProvider><MainLayout><Home/></MainLayout></FlightsProvider>,
    },
    {
        id: "about",
        path: "/about",
        element: <MainLayout><About/></MainLayout>
    },
    {
        id: "flights",
        path: "/flights",
        element: <FlightsProvider><MainLayout><Flights/></MainLayout></FlightsProvider>
    },
]);

export default router;
