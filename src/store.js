import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import incomingReducer from './features/resource/incoming/incomingSlice'
import outgoingReducer from './features/resource/outgoing/outgoingSlice'
import settingsReducer from './features/settings/settingsSlice'
import treeReducer from './features/tree/treeSlice'
import tweetsReducer from './features/twitter/tweetsSlice'
import userReducer from './features/user/userSlice'
import meiNotesOffsetsReducer from './features/viewers/mei/notesOffsetsSlice'
import { meiApi } from './services/mei'

export const store = configureStore({
    reducer: {
        incoming: incomingReducer,
        meiNotesOffsets: meiNotesOffsetsReducer,
        outgoing: outgoingReducer,
        settings: settingsReducer,
        tree: treeReducer,
        tweets: tweetsReducer,
        user: userReducer,
        [meiApi.reducerPath]: meiApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(meiApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)