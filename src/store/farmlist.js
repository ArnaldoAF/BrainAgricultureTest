import { createSlice } from '@reduxjs/toolkit'
import React, { Component, useState } from 'react';

export const farmListSlicer = createSlice({
    name: 'farmlist',
    initialState: {
        list: [],
    },
    reducers: {
        fillFarmList: (state, action) => { 
            try {
                const localValue = window.localStorage.getItem("farms");
                state.list = localValue ? JSON.parse(localValue) : [];

              } catch (error) {
                state.list = [];
              }
        },
        getFarmList: (state) => {
            
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            return state.list
        },
        addFarm: (state, action) => {
            state.list = [action.payload, ...state.list];
            window.localStorage.setItem("farms", JSON.stringify(state.list));
        },
        setFarmList: (state, action) => {
            state.list = action.payload
            window.localStorage.setItem("farms", JSON.stringify(state.list));
        },
        deleteFarm: (state, action) => {
            state.list = state.list.filter(x => x.cpf != action.payload.cpf)
            window.localStorage.setItem("farms", JSON.stringify(state.list));
        },
        editFarm: (state, action) => {
            const index = state.list.findIndex(x => x.cpf == action.payload.cpf);
            state.list.splice(index, 1, action.payload);
            window.localStorage.setItem("farms", JSON.stringify(state.list));
        }
    },
})

// Action creators are generated for each case reducer function
export const { getFarmList, addFarm, setFarmList, fillFarmList, deleteFarm, editFarm } = farmListSlicer.actions

export default farmListSlicer.reducer