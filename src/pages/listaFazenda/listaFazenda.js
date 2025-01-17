import React, { Component, useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes,Switch, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { Link, NavLink } from 'react-router-dom';
import { fillFarmList, getFarmList, deleteFarm } from '../../store/farmlist';
import { setCurrentFarm } from '../../store/currentFarm';

import { useSelector, useDispatch } from 'react-redux'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function mapStateToProps(state) {
    return {

    };
}

const ListaFazenda = () => {
    const dispatch = useDispatch();
    const lista = useSelector((state) => state.farmlist.list)
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fillFarmList())
        dispatch(setCurrentFarm(null));
    }, []);

    const deleteFazenda = async (farm) => {
        dispatch(deleteFarm(farm))
    }

    const sendEditFazenda = async (farm) => {
        dispatch(setCurrentFarm(farm));
        navigate('/formFazenda');
    }



    return (
        <Container >
            <NavLink to='/formFazenda' >
                <Button variant="contained">CRIAR </Button>
            </NavLink>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>CPF</TableCell>
                            <TableCell align="right">CNPJ</TableCell>
                            <TableCell align="right">Nome do Produtor</TableCell>
                            <TableCell align="right">Nome da Fazenda</TableCell>
                            <TableCell align="right">Cidade</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Area Total</TableCell>
                            <TableCell align="right">Area Agriculturavel</TableCell>
                            <TableCell align="right">Area Vegetação</TableCell>
                            <TableCell align="right">Culturas</TableCell>
                            <TableCell align="right">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista.length > 0 && lista.map((farm) => (
                            <TableRow
                                key={farm.cpf}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {farm.cpf}
                                </TableCell>
                                <TableCell align="right">{farm.cnpj}</TableCell>
                                <TableCell align="right">{farm.producerName}</TableCell>
                                <TableCell align="right">{farm.farmName}</TableCell>
                                <TableCell align="right">{farm.city}</TableCell>
                                <TableCell align="right">{farm.state}</TableCell>
                                <TableCell align="right">{farm.totalArea}</TableCell>
                                <TableCell align="right">{farm.agrArea}</TableCell>
                                <TableCell align="right">{farm.vegArea}</TableCell>
                                <TableCell align="right">{farm.cultureList.map(x => x.name).join()}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={2}>
                                        <IconButton aria-label="edit" color="primary" onClick={() => sendEditFazenda(farm)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="error" onClick={() => deleteFazenda(farm)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    );
}


export default ListaFazenda;