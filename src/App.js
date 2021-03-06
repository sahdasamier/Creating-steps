import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItem';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	return (
		<div className='container bg-white p-4 mt-5'>
			<h1>Steps to achive your goal </h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
};

export default App;
