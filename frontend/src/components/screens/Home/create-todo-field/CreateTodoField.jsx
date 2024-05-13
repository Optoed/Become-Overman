import React from 'react'
import { useState } from 'react'

const CreateTodoField = ({ addTodo }) => {
	const [title, setTitle] = useState('')

	const handleChange = e => {
		setTitle(e.target.value)
	}

	const handleAddTodo = () => {
		if (title.trim() !== '') {
			addTodo(title)
			setTitle('') // Очистить поле ввода после добавления задачи
		}
	}

	return (
		<div className='flex items-center justify-between mb-4 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full max-w-full mt-20'>
			<input type='text' onChange={handleChange} value={title} onKeyUp={e => e.key === 'Enter' && handleAddTodo()} className='bg-transparent w-full max-w-full border-none outline-none' placeholder="What's next, Hero?" />
		</div>
	)
}

export default CreateTodoField
