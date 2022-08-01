import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


const FormFarm = (props) => {
    const [farm, setFarm] = useState({
        cpf: props.farm ? props.farm.bookname : '',
        farmName: props.farm ? props.farm.farmName : '',
        producerName: props.farm ? props.farm.producerName : '',
        city: props.farm ? props.farm.city : '',
        state: props.farm ? props.farm.state : '',
        totalArea: props.farm ? props.farm.totalArea : '',
        agrArea: props.farm ? props.farm.agrArea : '',
        vegArea: props.farm ? props.farm.vegArea : '',
        cultureList: props.farm ? props.farm.cultureList : ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const { cpf, farmName, producerName, city, state, totalArea, agrArea, vegArea, cultureList } = farm;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [cpf, farmName, producerName, city, state, totalArea, agrArea, vegArea, cultureList];
        let errorMsg = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if (allFieldsFilled) {
            const farm = {
                cpf, farmName, producerName, city, state, totalArea, agrArea, vegArea, cultureList
            };
            props.handleOnSubmit(farm);
        } else {
            errorMsg = 'Please fill out all the fields.';
        }
        setErrorMsg(errorMsg);
    };



    return (
        <div>
            <h1>CRIAR FAZENDA</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="CPF"
                        type="number"
                    />
                    <TextField
                        required
                        id="outlined-disabled"
                        label="Nome da Fazenda"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nome do Produtor"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Cidade"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Estado"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Área Total"
                        type="number"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Área Agrícula"
                        type="number"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Área Vegetal"
                        type="number"
                    />
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>


                </div>
            </Box>

        </div>
    );
}

export default FormFarm;