import { configureStore } from '@reduxjs/toolkit'
import outgoingReducer from './features/resource/outgoing/outgoingSlice'
import identityReducer from './features/resource/identity/identitySlice'

export default configureStore({
    reducer: {
        outgoing: outgoingReducer,
        identity: identityReducer
    },
})