import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


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
        console.log(values);

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        switch (name) {
          case 'quantity':
            if (value === '' || parseInt(value) === +value) {
                setFarm((prevState) => ({
                ...prevState,
                [name]: value
              }));
            }
            break;
          case 'price':
            if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
                setFarm((prevState) => ({
                ...prevState,
                [name]: value
              }));
            }
            break;
          default:
            setFarm((prevState) => ({
              ...prevState,
              [name]: value
            }));
        }
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
                onSubmit={handleOnSubmit}
            >
                
                    <TextField
                        required
                        id="outlined-required"
                        label="CPF"
                        type="number"
                        name="cpf"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-disabled"
                        label="Nome da Fazenda"
                        name="farmName"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nome do Produtor"
                        name="city"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Cidade"
                        name="state"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Estado"
                        name="cpf"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Área Total"
                        type="number"
                        name="totalArea"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Área Agrícula"
                        type="number"
                        name="agrArea"
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Área Vegetal"
                        type="number"
                        name="vegArea"
                        onChange={handleInputChange}
                    />

                    <TextField
                        id="filled-select-currency"
                        select
                        label="Cultura"
                        name="cultureList"
                        value={cultureList}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>

                    <Button variant="contained" onClick={handleOnSubmit}>Submit</Button>
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                
                <div>



                </div>
            </Box>

        </div>
    );
}

export default FormFarm;