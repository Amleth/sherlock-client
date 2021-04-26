import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    focusedResourceUri: null,
    isTreeDisplayed: true
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        focusedResourceUriSet(state, action) {
            state.focusedResourceUri = action.payload
        },
        isTreeDisplayedToggled(state, action) {
            state.isTreeDisplayed = !state.isTreeDisplayed
        }
    }
})

export const { focusedResourceUriSet, isTreeDisplayedToggled } = settingsSlice.actions

export default settingsSlice.reducer