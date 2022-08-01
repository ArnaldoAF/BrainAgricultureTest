import React, { Component, useState } from 'react';
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
        farmName: props.farm ? props.farm.farmName : '',
        producerName: props.farm ? props.farm.producerName : '',
        city: props.farm ? props.farm.city : '',
        state: props.farm ? props.farm.state : '',
        totalArea: props.farm ? props.farm.totalArea : '',
        agrArea: props.farm ? props.farm.agrArea : '',
        vegArea: props.farm ? props.farm.vegArea : '',
        cultureList: props.farm ? props.farm.cultureList : []
    });

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
    const { cpf, farmName, producerName, city, state, totalArea, agrArea, vegArea, cultureList } = farm;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [cpf, farmName, producerName, city, state, totalArea, agrArea, vegArea];
        let errorMsg = '';
        console.log(values);

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if (allFieldsFilled && cultureList.length > 0) {
            const farm = {
                cpf, farmName, producerName, city, state, totalArea, agrArea, vegArea, cultureList
            };
            props.handleOnSubmit(farm);
        } else {
            errorMsg = 'Preencha os campos obrigatórios';
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
                    />
                </FormControl>
                <TextField
                    required
                    id="outlined-disabled"
                    label="Nome da Fazenda"
                    name="farmName"
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Nome do Produtor"
                    name="city"
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Cidade"
                    name="state"
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Estado"
                    name="cpf"
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Área Total"
                    type="number"
                    name="totalArea"
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Área Agrícula"
                    type="number"
                    name="agrArea"
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Área Vegetal"
                    type="number"
                    name="vegArea"
                    variant="standard"
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