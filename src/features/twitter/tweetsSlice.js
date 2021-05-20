import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const a = createEntityAdapter()

const initialState = a.getInitialState({
    status: 'idle',
})

export const fetchTweet = createAsyncThunk('tweets/fetchTweet', async (uri, thunkAPI) => {
    // if (thunkAPI.getState().tweets.ids.includes(uri))
    //     return { id: uri, data: thunkAPI.getState().tweets.entities[uri] }
    const response = await fetch('https://cors-anywhere.herokuapp.com/' + uri)
    return { id: uri, data: response.blob() }
})

export const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTweet.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTweet.fulfilled, (state, action) => {
                a.addOne(state, action.payload)
                state.status = 'idle'
            })
    }
})

export const {
    selectById: selectTweetById
} = a.getSelectors(state => state.tweets)

export default tweetsSlice.reducer