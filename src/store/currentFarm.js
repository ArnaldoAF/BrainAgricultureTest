import { createSlice } from '@reduxjs/toolkit'
import React, { Component, useState } from 'react';

export const currentFarmSlicer = createSlice({
    name: 'currentFarm',
    initialState: {
        farm: null,
    },
    reducers: {
        setCurrentFarm: (state, action) => {
            state.farm = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentFarm} = currentFarmSlicer.actions

export default currentFarmSlicer.reducer