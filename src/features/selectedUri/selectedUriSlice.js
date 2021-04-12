import { createSlice } from '@reduxjs/toolkit'

export const selectedUriSlice = createSlice({
    name: 'selectedUri',
    initialState: {
        selectedUri: null,
    },
    reducers: {
        uriSelected: (state, action) => {
            state.selectedUriSlice = action.payload
        },
    },
})

export const { add } = selectedUriSlice.actions

export default selectedUriSlice.reducer