import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { sparqlEndpoint } from '../../../common/sparql'
import { restructureSparqlResults } from '../helpers_rdf'
import query from './query'

const a = createEntityAdapter()

const initialState = a.getInitialState({
    status: 'idle',
})

export const fetchIncoming = createAsyncThunk('incoming/fetchIncoming', async (uri, thunkAPI) => {
    if (thunkAPI.getState().incoming.ids.includes(uri))
        return { id: uri, data: thunkAPI.getState().incoming.entities[uri] }
    const response = await sparqlEndpoint(query(uri))
    const data = restructureSparqlResults(response.results.bindings, 's')
    return { id: uri, data }
})

export const incomingSlice = createSlice({
    name: 'incoming',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchIncoming.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchIncoming.fulfilled, (state, action) => {
                a.addOne(state, action.payload)
                state.status = 'idle'
            })
    }
})

export const {
    selectAll: selectIncomings,
    selectById: selectIncomingByUri
} = a.getSelectors(state => state.incoming)

export default incomingSlice.reducer