import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class formFazenda extends Component {
    render() {
        return (
            <div>
                formFazenda
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(formFazenda);