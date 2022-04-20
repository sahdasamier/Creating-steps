import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//thunk is a function that returns another function and tunk is new action which dispatch from our coponents this will in turn dispatch its own action when the response compelets with the data from api callas the payload 
export const getTodosAsync =createAsyncThunk('todos/getTodosAsync',
async()=>{ 
   const response =await fetch ('http://localhost:7000/todos');
   //async makes a function return a Promise
   //await makes a function wait for a Promise
   if (response.ok){
     const todos =await response.json();//if the response is good ,it takes the data it converts it to json "listen to that vidio in 39min to more explanition of thunk"
     return {todos}
   }
 }
 );
 //that for adding todo in the list from submit 
 export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);
export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const response = await fetch(`http://localhost:7000/todos/${payload.id}`, //beacause we are updatingand existing to do , we need to pass inthe id of the todo that we are updating  
    {
			method: 'PATCH', //because we are updating an existing entityon the api 
      headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({completed: payload.completed }),
		
		});
    if (response.ok) {
			return { id: payload.id,completed: payload.completed }; //here we should to add completed to fetch update without refreshing the page 
		}
	}
);
export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			return { id: payload.id };
		}
	}
);
 //it is a function that returns another function
const TodoSlice = createSlice({
name:"todos",
initialState:[
  {id:1 , title:"todo1", completed:false},
  {id:2 , title:"todo2", completed:false},
  {id:3 , title:"todo3", completed:true},
],
reducers:{ //it take the current state and create new state based on the action payload
 addTodo:(state,action) =>{
   const newTodo={
     id:Date.now(),// that should be unique
     title:action.payload.title,
     completed:false,
   }
state.push(newTodo);
},// by this we can add any newTodo to our my todo list
toggleComlete: (state , action ) =>{
  const index = state.findIndex((todo) => todo.id === action.payload.id);
  //that finding the index of the to do an array based on the id so if id is 1 the index will be 0 and so on 
state[index].completed =action.payload.completed;
//in this point redux update the state ,our selector will detect the change re-render any components which we will see in the minute with our reducer in place
},
deleteTodo: (state, action) => {
    			return state.filter((todo) => todo.id !== action.payload.id);

   		},
  },
  
  //this action for fulfilled "extraReduser" and this mean the api call is completed and dispatch this action successfully 
  extraReducers:{ // after refresh the page all the changed still found 
    [getTodosAsync.pending]:(state,action)=>{
     console.log('fetching data.....')
    },
    [getTodosAsync.fulfilled]: (state, action) => 
    { console.log('fetching data successfully!');
      return action.payload.todos;
    },
    //our dunk will dispatch a number of actions 
    // that mean the api call and our thunk has completed and dispatch this action successfully
  [addTodoAsync.fulfilled]:(state,action) => {
    state.push (action.payload.todo);
  },
  [toggleCompleteAsync.fulfilled]:(state ,action ) =>{
    const index = state.findIndex((todo) => todo.id === action.payload.id);
    state[index].completed =action.payload.completed;
  },
  [deleteTodoAsync.fulfilled]: (state, action) => {
  	return state.filter((todo) => todo.id !== action.payload.id);
  }
  },
});
export const {addTodo,
toggleComlete,
deleteTodo,
} 
=TodoSlice.actions;
export default TodoSlice.reducer
// we do that beacuse add it to the store 