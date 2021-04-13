import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { sparqlEndpoint } from '../../../common/sparql'
import { restructureSparqlResults } from '../helpers_rdf'
import query from './query'

const a = createEntityAdapter()

const initialState = a.getInitialState({
    status: 'idle',
})

export const fetchIdentity = createAsyncThunk('identity/fetchIdentity', async (uri, thunkAPI) => {
    const existingData = thunkAPI.getState().identity.ids[uri]
    if (existingData) return existingData
    const response = await sparqlEndpoint(query(uri))
    const data = restructureSparqlResults(response.results.bindings, 'o')
    return { id: uri, data }
})

export const identitySlice = createSlice({
    name: 'identity',
    initialState,
    reducers: {
        identityAdded(state, action) {
            a.addOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIdentity.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchIdentity.fulfilled, (state, action) => {
                a.addOne(state, action.payload)
                state.status = 'idle'
            })
    }
})

export const { selectById: selectIdentityByUri } = a.getSelectors(state => state.identity)
export const { identityAdded } = identitySlice.actions

export default identitySlice.reducer

