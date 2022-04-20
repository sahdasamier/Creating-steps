import React ,{useEffect} from 'react';
import TodoItem from './TodoItem';
import { useSelector , useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/TodoSlice';
const TodoList = () => {
	const dispatch =useDispatch();
	const todos = useSelector((state)=>state.todos);
		// this is going to go to the store pickout all the todos from state assign it to the todos  variable"action"
	console.log(todos)
	// const todos = [
	// 	{ id: 1, title: 'todo1', completed: false },
	// 	{ id: 2, title: 'todo2', completed: false },
	// 	{ id: 3, title: 'todo3', completed: false },
	// 	{ id: 4, title: 'todo4', completed: false },
	// 	{ id: 5, title: 'todo5', completed: false },
	// ]; in this step we dont need that we will jump to the date in the TodoSlice.js
useEffect(()=>{
 dispatch(getTodosAsync());
},[dispatch]// we use dispatch arry to avoid any crazy useefect
);

	return (
		<ul className='list-group'>
			{todos.map((todo) => ( 
				<TodoItem id={todo.id} key={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
