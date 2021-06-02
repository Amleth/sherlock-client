import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { sparqlEndpoint } from "../../common/sparql"
import { Q, getIdentities } from "./identityQuery";
import predicatesQuery from "./predicatesQuery";
import {
    resourcesByPredicateAndObjectQuery,
    resourcesByPredicateAndSubjectQuery
} from "./resourcesByPredicateAndResourceQuery";

const adapter = createEntityAdapter()
const initialState = adapter.getInitialState({
    root: null,
    unfoldedPaths: [],
    status: 'idle'
})

export const getResourceIdentity = createAsyncThunk('tree/fetchResourceIdentity', async (uri, thunkAPI) => {
    const identity = thunkAPI.getState().tree.ids[uri];
    if (identity)
        return identity
    const response = await sparqlEndpoint(Q(uri));
    return { id: uri, identity: response.results.bindings };
})

export const getResourcePredicates = createAsyncThunk('tree/fetchResourcePredicates', async (uri, thunkAPI) => {
    const predicates = thunkAPI.getState().tree.entities[uri].predicates;
    if (predicates)
        return { id: uri, predicates };
    const response = await sparqlEndpoint(predicatesQuery(uri));
    return { id: uri, predicates: response.results.bindings };
})

export const getResourcesByPredicateAndLinkedResource = createAsyncThunk('tree/fetchResourcesByPredicateAndLinkedResource', async (payload, thunkAPI) => {
    const predicate = thunkAPI.getState().tree.entities[payload.uri].predicates.find(predicate => predicate.p.value === payload.p.p.value && predicate.direction.value === payload.p.direction.value);
    if (predicate.resources) {
        return { id: payload.uri, p: predicate.p.value, direction: predicate.direction.value, resources: predicate.resources };
    }
    const response = predicate.direction.value === "o"
        ? await sparqlEndpoint(resourcesByPredicateAndSubjectQuery(payload.p.p.value, payload.uri))
        : await sparqlEndpoint(resourcesByPredicateAndObjectQuery(payload.p.p.value, payload.uri));
    const identities = await sparqlEndpoint(getIdentities(response.results.bindings));
    const entities = response.results.bindings.map(resource => ({ id: resource.r.value, identity: identities.results.bindings.filter(identity => identity.id.value === resource.r.value) }))
    thunkAPI.dispatch(resourcesAdded(entities));
    return { id: payload.uri, p: payload.p.p.value, direction: predicate.direction.value, resources: response.results.bindings };
})

export const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
        rootSet: (state, action) => {
            state.root = action.payload;
        },
        resourcesAdded: (state, action) => {
            adapter.addMany(state, action.payload)
        },
        pathUnfoldStatusChanged: (state, action) => {
            state.unfoldedPaths.includes(action.payload)
                ? state.unfoldedPaths = state.unfoldedPaths.filter(item => item !== action.payload)
                : state.unfoldedPaths.push(action.payload);
        }
    },
    extraReducers: {
        [getResourceIdentity.fulfilled]: (state, action) => {
            adapter.addOne(state, action.payload)
            state.status = 'idle';
        },
        [getResourceIdentity.pending]: (state, action) => {
            state.status = 'loading';
        },

        [getResourcePredicates.fulfilled]: (state, action) => {
            state.entities[action.payload.id].predicates = action.payload.predicates;
            state.status = 'idle';
        },
        [getResourcePredicates.pending]: (state, action) => {
            state.status = 'loading';
        },

        [getResourcesByPredicateAndLinkedResource.fulfilled]: (state, action) => {
            state.entities[action.payload.id].predicates.find(predicate => predicate.p.value === action.payload.p && predicate.direction.value === action.payload.direction).resources = action.payload.resources;
            state.status = 'idle';
        },
        [getResourcesByPredicateAndLinkedResource.pending]: (state, action) => {
            state.status = 'loading';
        },
    }
})

export const { rootSet, pathUnfoldStatusChanged, resourcesAdded } = treeSlice.actions
export const { selectById: selectResourceByUri } = adapter.getSelectors(state => state.tree)

export default treeSlice.reducer
