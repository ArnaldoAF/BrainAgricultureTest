import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFarm from '../../components/FormFarm/FormFarm'

function mapStateToProps(state) {
    return {

    };
}

class formFazenda extends Component {
    render() {
        const handleOnSubmit = (book) => {
            console.log(book);
          };
        return (
            <div>
                <FormFarm handleOnSubmit={handleOnSubmit} />
            </div>
        );
    }
}

export default formFazenda