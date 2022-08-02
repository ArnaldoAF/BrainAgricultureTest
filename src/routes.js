import React from "react";
import { Route, BrowserRouter, Routes,Switch, } from "react-router-dom";
import useLocalStorage from './hooks/useLocalStorage.js';

import Dashboard from "./pages/dashboard/dashboard";
import ListaFazenda from "./pages/listaFazenda/listaFazenda";
import FormFazenda from "./pages/formFazenda/formFazenda";
import Navbar from './components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';

const Rotas = () => {
   const [farms, setFarms] = useLocalStorage('books', []);

   return (
      <BrowserRouter>
         <Navbar />
         <Container maxWidth="xl" sx={{ marginTop: 2 }}>
            <Card sx={{ minWidth: 275 }}>
               <CardContent>
                  <Routes>
                     <Route element={<Dashboard />} path="/" exact />
                     <Route element={<Dashboard />} path="/dashboard" />
                     <Route element={<ListaFazenda />} path="/listaFazenda" />
                     <Route element={<FormFazenda />} path="/formFazenda" />
                     
                  </Routes>
               </CardContent>
            </Card>
         </Container>
      </BrowserRouter>

   )
}

export default Rotas;