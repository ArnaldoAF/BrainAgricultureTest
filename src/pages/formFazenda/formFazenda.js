import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFarm from '../../components/FormFarm/FormFarm'

function mapStateToProps(state) {
    return {

    };
}

const formFazenda = ({ history, farms, setFarms }) => {


    const handleOnSubmit = (farm) => {
        setFarms([farm, ...farms]);
        history.push('/');
    };
    return (
        <React.Fragment>
            <FormFarm handleOnSubmit={handleOnSubmit} />
        </React.Fragment>

    );

}

export default formFazenda