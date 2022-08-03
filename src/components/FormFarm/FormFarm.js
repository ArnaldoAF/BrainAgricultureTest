import React, { Component, useState, useEffect } from 'react';

import { Route, BrowserRouter, Routes, Switch, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import IMask from 'imask';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import useLocalStorage from '../../hooks/useLocalStorage';

import { useSelector, useDispatch } from 'react-redux'
import { addFarm, editFarm } from '../../store/farmlist'
import { setCurrentFarm } from '../../store/currentFarm';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="000.000.000-00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const TextMaskCustomCNPJ = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00.000.000/0000-00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const FormFarm = (props) => {
    const [farm, setFarm] = useState({
        cpf: props.farm ? props.farm.cpf : '',
        cnpj: props.farm ? props.farm.cnpj : '',
        farmName: props.farm ? props.farm.farmName : '',
        producerName: props.farm ? props.farm.producerName : '',
        city: props.farm ? props.farm.city : '',
        state: props.farm ? props.farm.state : '',
        totalArea: props.farm ? props.farm.totalArea : '',
        agrArea: props.farm ? props.farm.agrArea : '',
        vegArea: props.farm ? props.farm.vegArea : '',
        cultureList: props.farm ? props.farm.cultureList : []
    });
    const currentFarm = useSelector((state) => state.currentFarm.farm)

    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [farms, setFarms] = useLocalStorage('farms', []);

    useEffect(() => {
        if (currentFarm) {
            console.log("useEffect")
            console.log(currentFarm);
            setFarm(() => ({
                cpf: currentFarm.cpf,
                cnpj: currentFarm.cnpj,
                farmName: currentFarm.farmName,
                producerName: currentFarm.producerName,
                city: currentFarm.city,
                state: currentFarm.state,
                totalArea: currentFarm.totalArea,
                agrArea: currentFarm.agrArea,
                vegArea: currentFarm.vegArea,
                cultureList: currentFarm.cultureList.map(x => x.id),
            }));
/*
            cpf = currentFarm.cpf;
            cnpj = currentFarm.cnpj;
            farmName = currentFarm.farmName;
            producerName = currentFarm.producerName;
            city = currentFarm.city;
            state = currentFarm.state;
            totalArea = currentFarm.totalArea;
            agrArea = currentFarm.agrArea;
            vegArea = currentFarm.vegArea;
            cultureList = currentFarm.cultureList.map(x => x.id);
*/
        }

    }, []);

    const cultures = [
        {
            id: 0,
            name: 'Soja'
        },
        {
            id: 1,
            name: 'Milho'
        },
        {
            id: 2,
            name: 'Algodão'
        },
        {
            id: 3,
            name: 'Café'
        },
        {
            id: 4,
            name: 'Cana de Açucar'
        },
    ]

    const [errorMsg, setErrorMsg] = useState('');
    const { cpf, cnpj, farmName, producerName, city, state, totalArea, agrArea, vegArea, cultureList } = farm;

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        const values = [farmName, producerName, city, state, totalArea, agrArea, vegArea];
        const documents = [cpf, cnpj];
        let errorMsg = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        const allFieldsFilledDocuments = documents.some((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });
        console.log("handleOnSubmit");
        console.log(totalArea);
        console.log(agrArea);
        console.log(vegArea);
        
        const areaValid = parseFloat(totalArea) >= parseFloat(agrArea) + parseFloat(vegArea);
        console.log(areaValid);

        if (allFieldsFilled && cultureList.length > 0 & allFieldsFilledDocuments && areaValid) {
            console.log("valido")
            const localFarm = {
                cpf, cnpj, farmName, producerName, city, state, totalArea, agrArea, vegArea,
                cultureList: cultures.filter(c => cultureList.includes(c.id))
            };

            console.log(localFarm);
            if(currentFarm) await dispatch(editFarm(localFarm))
            else await dispatch(addFarm(localFarm));
            await dispatch(setCurrentFarm(null));
            //await setFarms([farm, ...farms]);
            console.log(farms);
            navigate('/listaFazenda');
        } else if (!areaValid) {
            errorMsg = 'A soma da area agricultural e da vegeração não deve ser mais que o total';
        } else {
            errorMsg = 'Preencha os campos obrigatórios';
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFarm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };




    return (
        <div>
            <h1>{currentFarm ? 'EDITAR ' : 'CRIAR '}FAZENDA</h1>
            <Box
                component="form"
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(2, 1fr)'
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleOnSubmit}
            >
                <FormControl variant="standard">
                    <InputLabel htmlFor="formatted-text-mask-input">CPF</InputLabel>
                    <Input
                        value={farm.cpf}
                        id="outlined-required"
                        name="cpf"
                        onChange={handleInputChange}
                        inputComponent={TextMaskCustom}
                        disabled={currentFarm}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="formatted-text-mask-input">CNPJ</InputLabel>
                    <Input
                        value={farm.cnpj}
                        id="outlined-required"
                        name="cnpj"
                        onChange={handleInputChange}
                        inputComponent={TextMaskCustomCNPJ}
                        disabled={currentFarm}
                    />
                </FormControl>
                <TextField
                    required
                    id="outlined-disabled"
                    label="Nome da Fazenda"
                    name="farmName"
                    variant="standard"
                    value={farm.farmName}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Nome do Produtor"
                    name="producerName"
                    variant="standard"
                    value={farm.producerName}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Cidade"
                    name="city"
                    variant="standard"
                    value={farm.city}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Estado"
                    name="state"
                    variant="standard"
                    value={farm.state}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Área Total"
                    type="number"
                    name="totalArea"
                    variant="standard"
                    value={farm.totalArea}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Área Agrícula"
                    type="number"
                    name="agrArea"
                    variant="standard"
                    value={farm.agrArea}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Área Vegetal"
                    type="number"
                    name="vegArea"
                    variant="standard"
                    value={farm.vegArea}
                    onChange={handleInputChange}
                />
                <FormControl >
                    <InputLabel id="demo-multiple-chip-label">Culturas</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={cultureList}
                        name="cultureList"
                        onChange={handleInputChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={cultures[value].name} />
                                ))}
                            </Box>
                        )}
                    >
                        {cultures.map((culture) => (
                            <MenuItem
                                key={culture.id}
                                value={culture.id}
                            >
                                {culture.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Button variant="contained" onClick={handleOnSubmit}>Submit</Button>
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                <div>
                </div>
            </Box>
        </div>
    );
}

export default FormFarm;