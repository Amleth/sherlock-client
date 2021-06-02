import { configureStore } from '@reduxjs/toolkit'
import incomingReducer from './features/resource/incoming/incomingSlice'
import outgoingReducer from './features/resource/outgoing/outgoingSlice'
import settingsReducer from './features/settings/settingsSlice'
import treeReducer from './features/tree/treeSlice'
import tweetsReducer from './features/twitter/tweetsSlice'
import userReducer from './features/user/userSlice'
import meiNotesOffsetsReducer from './features/viewers/mei/notesOffsetsSlice'

export const store = configureStore({
    reducer: {
        incoming: incomingReducer,
        meiNotesOffsets: meiNotesOffsetsReducer,
        outgoing: outgoingReducer,
        settings: settingsReducer,
        tree: treeReducer,
        tweets: tweetsReducer,
        user: userReducer
    }
})