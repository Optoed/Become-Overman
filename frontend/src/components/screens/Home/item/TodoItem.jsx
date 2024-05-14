import React, { useState, useEffect } from "react";
import cn from "classnames";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

import Check from "./Check";

const TodoItem = ({ todo, changeTodo, removeTodo, editTodo }) => {
	//если не отображаются - сделай true
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedTitle(editedTitle); // Устанавливаем начальное значение для редактирования равным текущему тексту задачи
        console.log(todo);
    };

    const handleSave = () => {
        if (editedTitle.trim() !== "") {
            editTodo(todo, editedTitle);
        }
        setIsEditing(false);
    };

    //Вспомогательная функция для поиска задачи
    const findTask = (tasksArray, taskToFind) => {
        for (let i = 0; i < tasksArray.length; i++) {
            if (tasksArray[i] === taskToFind) {
                return tasksArray[i];
            }
        }
        return null;
    };

    const todoChangeStatus = async (userId, todo) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }
            const response = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            const tasksCompleted = response.data.tasks;

			const tryFindTodo = findTask(tasksCompleted, todo);

			console.log(response.data.tasks);

			if (tryFindTodo) {
				return false;
			}
			else {
				return true;
			}

            //console.log('response.data.tasks:' + response.data.tasks[0])
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

	const todoIsCompleted = async (userId, todo) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }
            const response = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            const tasksCompleted = response.data.tasks;

			const tryFindTodo = findTask(tasksCompleted, todo);

			console.log(response.data.tasks);

			if (tryFindTodo) {
				return true;
			}
			else {
				return false;
			}

            //console.log('response.data.tasks:' + response.data.tasks[0])
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

    return (
        <div className="flex items-start justify-start mb-4 rounded-2xl bg-zinc-800 p-5 w-full">
            {/* Change check */}
            <button onClick={() => changeTodo(todo)}>
                <Check isCompleted={() => todoChangeStatus(userId, todo)} />
            </button>

            <div className=" overflow-hidden">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleSave}
                        autoFocus
                        className={` ${
                            () => todoIsCompleted(userId, todo) ? "line-through" : ""
                        } bg-transparent border-none outline-none`}
                    />
                ) : (
                    <span
                        className={` ${() => todoIsCompleted(userId, todo) ? "line-through" : ""}`}
                    >
                        {todo}
                    </span>
                )}
            </div>

            <div className="ml-auto flex items-center">
                {/* Edit */}
                {!isEditing && (
                    <button onClick={handleEdit} className="pl-4">
                        <FaRegEdit
                            size={24}
                            className="text-gray-500 hover:text-emerald-500 transition-colors ease-in-out duration-300"
                        />
                    </button>
                )}

                {/* Remove */}
                <button onClick={() => removeTodo(todo)} className="ml-4">
                    <BsTrash
                        size={24}
                        className="text-gray-500 hover:text-red-500 transition-colors ease-in-out duration-300"
                    />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
