import { configureStore } from '@reduxjs/toolkit'
import outgoingReducer from './features/resource/outgoing/outgoingSlice'

export default configureStore({
    reducer: {
        outgoing: outgoingReducer
    },
})