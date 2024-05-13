import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'

import Check from './Check'

const TodoItem = ({ todo, changeTodo, removeTodo, editTodo }) => {
	const [isEditing, setIsEditing] = useState(true)
	const [editedTitle, setEditedTitle] = useState(todo)

	const handleEdit = () => {
		setIsEditing(true)
		setEditedTitle(editedTitle) // Устанавливаем начальное значение для редактирования равным текущему тексту задачи
		console.log(todo)
	}

	const handleSave = () => {
		if (editedTitle.trim() !== '') {
			editTodo(todo, editedTitle)
		}
		setIsEditing(false)
	}

	return (
		<div className='flex items-start justify-start mb-4 rounded-2xl bg-zinc-800 p-5 w-full'>
			{/* Change check */}
			<button onClick={() => changeTodo(todo)}>
				<Check isCompleted={todo.isCompleted} />
			</button>

			<div className=' overflow-hidden'>{isEditing ? <input type='text' value={editedTitle} onChange={e => setEditedTitle(e.target.value)} onBlur={handleSave} autoFocus className={` ${todo.isCompleted ? 'line-through' : ''} bg-transparent border-none outline-none`} /> : <span className={` ${todo.isCompleted ? 'line-through' : ''}`}>{todo.title}</span>}</div>

			<div className='ml-auto flex items-center'>
				{/* Edit */}
				{!isEditing && (
					<button onClick={handleEdit} className='pl-4'>
						<FaRegEdit size={24} className='text-gray-500 hover:text-emerald-500 transition-colors ease-in-out duration-300' />
					</button>
				)}

				{/* Remove */}
				<button onClick={() => removeTodo(todo.title)} className='ml-4'>
					<BsTrash size={24} className='text-gray-500 hover:text-red-500 transition-colors ease-in-out duration-300' />
				</button>
			</div>
		</div>
	)
}

export default TodoItem
