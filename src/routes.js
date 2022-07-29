import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import dashboard from "./pages/dashboard/dashboard";
import listaFazenda from "./pages/listaFazenda/listaFazenda";
import formFazenda from "./pages/formFazenda/formFazenda";
import Navbar from './components/Navbar/Navbar';

const Rotas = () => {
   return(
    <BrowserRouter>
        <Navbar />
        <Routes>
           <Route component = { dashboard }  path="/" exact />
           <Route component = { dashboard }  path="/dashboard"  />
           <Route component = { listaFazenda }  path="/listaFazenda" />
           <Route component = { formFazenda }  path="/formFazenda" />
        </Routes>
    </BrowserRouter>
       
   )
}

export default Rotas;