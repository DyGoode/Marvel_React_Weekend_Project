import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Thor',
        alias: 'former King of Asgard',
        powers: 'weilding thunder, super strength, blah blah',
        history: 'former Prince/King of Asgard, son of Odin',
        allegiance: 'Hero'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseAlias: (state, action) => { state.alias = action.payload},
        choosePowers: (state, action) => {state.powers = action.payload},
        chooseHistory: (state, action) => {state.history = action.payload},
        chooseAllegiance: (state, action) => {state.allegiance = action.payload}
    }
})


export const reducer  = rootSlice.reducer;
export const {
    chooseName, 
    chooseAlias,
    choosePowers,
    chooseHistory,
    chooseAllegiance
} = rootSlice.actions;