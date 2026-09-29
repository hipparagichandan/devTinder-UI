import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import feedReducer from "./slices/feedSLice"
import connectionsReducer from "./slices/connectionsSlice"
import requestsReducer from "./slices/requestSlice"

const store = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer,
        requests : requestsReducer
    }
    
})

export default store;