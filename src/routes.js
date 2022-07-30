import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import ListaFazenda from "./pages/listaFazenda/listaFazenda";
import FormFazenda from "./pages/formFazenda/formFazenda";
import Navbar from './components/Navbar/Navbar';

const Rotas = () => {
   
   return(
    <BrowserRouter>
        <Navbar />
        <Routes>
           <Route element={<Dashboard />}  path="/" exact />
           <Route element={<Dashboard />}  path="/dashboard"  />
           <Route element={<ListaFazenda />} path="/listaFazenda" />
           <Route element={<FormFazenda />} path="/formFazenda" />
        </Routes>
    </BrowserRouter>
       
   )
}

export default Rotas;