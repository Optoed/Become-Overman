import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TodoItem from './item/TodoItem'
import CreateTodoField from './create-todo-field/CreateTodoField'
import { Link } from 'react-router-dom'

const Home = () => {
	const [todosCompleted, setTodosCompleted] = useState([])
	const [todosUnCompleted, setTodosUnCompleted] = useState([])
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		const storedUserId = localStorage.getItem('userId')
		if (storedUserId) {
			setUserId(storedUserId)
			fetchTasksUnCompleted(storedUserId)
			fetchTasksCompleted(storedUserId)
		}
	}, [])

	const fetchTasksCompleted = async userId => {
		try {
			if (!userId) {
				console.error('User ID is not defined.')
				return
			}
			const response = await axios.get(`http://localhost:8000/user/${userId}/get_completed_tasks/`)
			setTodosCompleted(response.data.tasks)
			console.log(response.data.tasks)
			console.log('response.data.tasks:' + response.data.tasks[0])
		} catch (error) {
			console.error('Error fetching completed tasks:', error)
		}
	}

	const fetchTasksUnCompleted = async userId => {
		try {
			if (!userId) {
				console.error('User ID is not defined.')
				return
			}
			const response = await axios.get(`http://localhost:8000/user/${userId}/get_uncompleted_tasks/`)
			setTodosUnCompleted(response.data.tasks)
			console.log(response.data.tasks)
			console.log('response.data.tasks:' + response.data.tasks[0])
		} catch (error) {
			console.error('Error fetching uncompleted tasks:', error)
		}
	}

	const changeTodo = async id => {
		// Your changeTodo function implementation
	}

	const removeTodo = async id => {
		// Your removeTodo function implementation
	}

	const addTodo = async title => {
		// Your addTodo function implementation
	}

	const editTodo = async (id, newTitle) => {
		// Your editTodo function implementation
	}

	return (
		<div className=''>
			{userId ? (
				<div className='flex justify-between flex-container'>
					<div className='w-1/2 max-w-1/2 mb-4 column mr-4'>
						<h2 className='text-xl font-bold flex items-center justify-center mb-2'>Uncompleted Tasks</h2>
						{todosUnCompleted.map(todo => (
							<TodoItem key={todo} todo={todo} changeTo={changeTodo} removeTodo={removeTodo} editTodo={editTodo} />
						))}
					</div>

					<div className='w-1/2 max-w-1/2 mb-4 column ml-4'>
						<h2 className='text-xl font-bold flex items-center justify-center mb-2'>Completed Tasks</h2>
						{todosCompleted.map(todo => (
							<TodoItem key={todo} todo={todo} changeTodo={changeTodo} removeTodo={removeTodo} editTodo={editTodo} />
						))}
					</div>
				</div>
			) : (
				<div className='text-center'>
					<h1 className='text-2xl font-bold mb-4'>Welcome to Our Task Management App</h1>
					<p className='mb-2'>Please log in to view your tasks.</p>
					{/* Здесь можете добавить кнопку или ссылку на страницу логина */}
					<Link to='/login' className='border-2 rounded-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700'>
						Login
					</Link>
				</div>
			)}

			<CreateTodoField addTodo={addTodo} />
		</div>
	)
}

export default Home
