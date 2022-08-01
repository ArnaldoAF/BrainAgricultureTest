import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

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

        </div>
    );
}

export default connect(
    mapStateToProps,
)(FormFarm);