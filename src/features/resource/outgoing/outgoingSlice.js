import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { sparqlEndpoint } from '../../../common/sparql'
import { restructureSparqlResults } from '../helpers_rdf'
import query from './query'

const a = createEntityAdapter()

const initialState = a.getInitialState({
    status: 'idle',
})

export const fetchOutgoing = createAsyncThunk('outgoing/fetchOutgoing', async (uri, thunkAPI) => {
    if (thunkAPI.getState().outgoing.ids.includes(uri))
        return { id: uri, data: thunkAPI.getState().outgoing.entities[uri] }
    const response = await sparqlEndpoint(query(uri))
    const data = restructureSparqlResults(response.results.bindings)
    return { id: uri, data }
})

export const outgoingSlice = createSlice({
    name: 'outgoing',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOutgoing.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchOutgoing.fulfilled, (state, action) => {
                a.addOne(state, action.payload)
                state.status = 'idle'
            })
    }
})

export const {
    selectAll: selectOutgoings,
    selectById: selectOutgoingByUri
} = a.getSelectors(state => state.outgoing)

export default outgoingSlice.reducer