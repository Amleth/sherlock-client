import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    focusedResourceUri: null,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        focusedResourceUriSet(state, action) {
            state.focusedResourceUri = action.payload
        }
    },
})

export const { focusedResourceUriSet } = settingsSlice.actions

export default settingsSlice.reducer