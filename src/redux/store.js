import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './TodoSlice';

export default configureStore({
reducer:{
    //remember to store holds all our reducers and manages them for us
    todos: TodoReducer,
    
}
})
