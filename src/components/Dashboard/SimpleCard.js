import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function mapStateToProps(state) {
    return {

    };
}
const SimpleCard = ({ name, value }) => {

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {name}
                </Typography>
                <Typography variant="h5" component="div">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}


export default SimpleCard;