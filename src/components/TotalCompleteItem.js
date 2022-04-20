import React from 'react';
import { useSelector,useStore } from 'react-redux';

const TotalCompleteItems = () => {
	//selector here is the total stitch tree which is why we need to specify state dot todos in here 
	const completedTodo =useSelector((state)=>state.todos.filter((todo)=>todo.completed ===true))
	const data = useStore()
	console.log(data)
	return (<h4 className='mt-3'>
		Total Complete Items: {completedTodo.length}
		</h4>);
};

export default TotalCompleteItems;
