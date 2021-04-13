import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { sparqlEndpoint } from '../../../common/sparql'
import { restructureSparqlResults, separateSparqlResults } from '../helpers_rdf'
import query from './query'
import { identityAdded } from '../identity/identitySlice'

const a = createEntityAdapter()

const initialState = a.getInitialState({
    status: 'idle',
})

export const fetchOutgoing = createAsyncThunk('outgoing/fetchOutgoing', async (uri, thunkAPI) => {
    const existingData = thunkAPI.getState().outgoing.ids[uri]
    if (existingData) return existingData
    const response = await sparqlEndpoint(query(uri))
    let { i, s } = separateSparqlResults(response.results.bindings)
    i = restructureSparqlResults(i, 'o')
    thunkAPI.dispatch(identityAdded({ id: uri, data: i }))
    const data = restructureSparqlResults(s, 'o')
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

export const { selectById: selectOutgoingByUri } = a.getSelectors(state => state.outgoing)

export default outgoingSlice.reducer

