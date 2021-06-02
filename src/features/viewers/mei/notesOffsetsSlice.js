import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { sparqlEndpoint } from '../../../common/sparql'
import query from './query'

const a = createEntityAdapter()

const initialState = a.getInitialState({
    status: 'idle',
})

export const fetchNoteOffsets = createAsyncThunk('mei/fetchNoteOffsets', async (iri, thunkAPI) => {
    if (thunkAPI.getState().notesOffsets.ids.includes(iri))
        return { id: iri, data: thunkAPI.getState().noteOffsets.entities[iri] }
    const response = await sparqlEndpoint(query(iri))
    return { id: iri, data: response.results.bindings }
})

export const s = createSlice({
    name: 'mei',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchNoteOffsets.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchNoteOffsets.fulfilled, (state, action) => {
                a.addOne(state, action.payload)
                state.status = 'idle'
            })
    }
})

export const {
    selectAll: selectNoteOffsets,
    selectById: selectNoteOffsetsByNoteIri
} = a.getSelectors(state => state.noteOffsets)

export default s.reducer