import React from 'react';
import './App.scss';
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import {RouterProvider} from "react-router-dom";
import router from "./routes";

function App() {
    return (
            <RouterProvider router={router}/>
    );
}

export default App;
