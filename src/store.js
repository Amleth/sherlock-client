import { configureStore } from '@reduxjs/toolkit'
import incomingReducer from './features/resource/incoming/incomingSlice'
import outgoingReducer from './features/resource/outgoing/outgoingSlice'
import settingsReducer from './features/settings/settingsSlice'
import treeReducer from './features/tree/treeSlice'

export default configureStore({
    reducer: {
        incoming: incomingReducer,
        outgoing: outgoingReducer,
        settings: settingsReducer,
        tree: treeReducer
    },
})