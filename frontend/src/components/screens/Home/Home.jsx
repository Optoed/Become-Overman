import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./item/TodoItem";
import CreateTodoField from "./create-todo-field/CreateTodoField";
import { Link } from "react-router-dom";

const Home = () => {
    const [todosCompleted, setTodosCompleted] = useState([]);
    const [todosUnCompleted, setTodosUnCompleted] = useState([]);
    const [userId, setUserId] = useState(null);

    //Вспомогательная функция для поиска задачи
    const findTask = (tasksArray, taskToFind) => {
        for (let i = 0; i < tasksArray.length; i++) {
            if (tasksArray[i] === taskToFind) {
                return tasksArray[i];
            }
        }
        return null;
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
            fetchTasksUnCompleted(storedUserId);
            fetchTasksCompleted(storedUserId);
        }
    }, []);

    const fetchTasksCompleted = async (userId) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }
            const response = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            setTodosCompleted(response.data.tasks);


            console.log(response.data.tasks);
            //console.log('response.data.tasks:' + response.data.tasks[0])
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

    const fetchTasksUnCompleted = async (userId) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }
            fetchTasksCompleted(storedUserId);
        } catch (error) {
            console.error("Error fetching uncompleted tasks:", error);
        }
    };

    const changeTodo = async (title) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }

            //Делай поиск по массиву competed и UnCompleted, если нашлось в обоих или ни в одном - ничего не меняй.
            //Если нашелся только в одном, то для него запускай Http-delete и из другого http-put (или просто сделай add)
            let tryFindTaskInCompleted = findTask(todosCompleted, title);
            let tryFindTaskInUnCompleted = findTask(todosUnCompleted, title);

            if (
                tryFindTaskInCompleted != null &&
                tryFindTaskInUnCompleted == null
            ) {
                //поменяй путь
                await axios.delete(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/completed_task/`
                );
                await axios.post(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/uncompleted_task/`
                );
            } else if (
                tryFindTaskInCompleted == null &&
                tryFindTaskInUnCompleted != null
            ) {
                //поменяй путь
                await axios.delete(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/uncompleted_task/`
                );
                await axios.post(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/completed_task/`
                );
            }

            const responseUnCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_uncompleted_tasks/`
            );
            const responseCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            setTodosUnCompleted(responseCompleted.data.tasks);
            setTodosCompleted(responseUnCompleted.data.tasks);

            fetchTasksCompleted(storedUserId);
            fetchTasksUnCompleted(storedUserId);

            console.log(responseCompleted.data.tasks);
            console.log(responseUnCompleted.data.tasks);
        } catch (error) {
            console.error("Error fetching uncompleted tasks:", error);
        }
    };

    const removeTodo = async (id) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }

            //Делай поиск по массиву competed и UnCompleted, если нашлось в обоих - удаляй оба
            //Если нашелся только в одном, то для него запускай Http-delete
            let tryFindTaskInCompleted = findTask(todosCompleted, title);
            let tryFindTaskInUnCompleted = findTask(todosUnCompleted, title);

            if (tryFindTaskInCompleted != null) {
                //поменяй путь
                await axios.delete(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/completed_task/`
                );
            }
            if (tryFindTaskInUnCompleted != null) {
                //поменяй путь
                await axios.delete(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/uncompleted_task/`
                );
            }

            const responseUnCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_uncompleted_tasks/`
            );
            const responseCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            setTodosUnCompleted(responseCompleted.data.tasks);
            setTodosCompleted(responseUnCompleted.data.tasks);

            fetchTasksCompleted(storedUserId);
            fetchTasksUnCompleted(storedUserId);

            console.log(responseCompleted.data.tasks);
            console.log(responseUnCompleted.data.tasks);
        } catch (error) {
            console.error("Error fetching uncompleted tasks:", error);
        }
    };

    const addTodo = async (title) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }

            //Делай поиск по массиву UnCompleted и по completed,
            //Если нашлось в UnCompleted или completed, то добавлять не будем
            //Если не нашлось в обоих, то добавим
            let tryFindTaskInUnCompleted = findTask(todosUnCompleted, title);
            let tryFindTaskInCompleted = findTask(todosCompleted, title);

            if (
                tryFindTaskInUnCompleted == null &&
                tryFindTaskInCompleted == null
            ) {
                //поменяй путь
                if (title) {
                    await axios.post(
                        `http://localhost:8000/user/${
                            (userId, title)
                        }/uncompleted_task/`
                    );
                } else {
                    console.log("задача не может быть с пустым названием");
                }
            } else {
                alert("Такая задача уже есть)");
            }

            const responseUnCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_uncompleted_tasks/`
            );

            //это уже не обязательно тк completed не меняются в данном случае
            const responseCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            setTodosUnCompleted(responseCompleted.data.tasks);
            setTodosCompleted(responseUnCompleted.data.tasks);

            fetchTasksCompleted(storedUserId);
            fetchTasksUnCompleted(storedUserId);

            console.log(responseCompleted.data.tasks);
            console.log(responseUnCompleted.data.tasks);
        } catch (error) {
            console.error("Error fetching uncompleted tasks:", error);
        }
    };

    const editTodo = async (id, newTitle) => {
        try {
            if (!userId) {
                console.error("User ID is not defined.");
                return;
            }

            //Делай поиск по массиву competed и UnCompleted, если нашлось в обоих или ни в одном - ничего не меняй.
            //Если нашелся только в одном, то для него запускай Http-delete и из другого http-put (или просто сделай add)
            let tryFindTaskInCompleted = findTask(todosCompleted, title);
            let tryFindTaskInUnCompleted = findTask(todosUnCompleted, title);

            if (tryFindTaskInCompleted != null) {
                //поменяй путь
                await axios.delete(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/completed_task/`
                );
                await axios.post(
                    `http://localhost:8000/user/${
                        (userId, newTitle)
                    }/completed_task/`
                );
            }

            if (tryFindTaskInUnCompleted != null) {
                //поменяй путь
                await axios.delete(
                    `http://localhost:8000/user/${
                        (userId, title)
                    }/uncompleted_task/`
                );
                await axios.post(
                    `http://localhost:8000/user/${
                        (userId, newTitle)
                    }/uncompleted_task/`
                );
            }

            const responseUnCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_uncompleted_tasks/`
            );
            const responseCompleted = await axios.get(
                `http://localhost:8000/user/${userId}/get_completed_tasks/`
            );
            setTodosUnCompleted(responseCompleted.data.tasks);
            setTodosCompleted(responseUnCompleted.data.tasks);

            fetchTasksCompleted(storedUserId);
            fetchTasksUnCompleted(storedUserId);

            console.log(responseCompleted.data.tasks);
            console.log(responseUnCompleted.data.tasks);
        } catch (error) {
            console.error("Error fetching uncompleted tasks:", error);
        }
    };

    return (
        <div className="">
            {userId ? (
                <>
                    <div className="flex justify-between flex-container">
                        <div className="w-1/2 max-w-1/2 mb-4 column mr-4">
                            <h2 className="text-xl font-bold flex items-center justify-center mb-2">
                                Uncompleted Tasks
                            </h2>
                            {todosUnCompleted.map((todo) => (
                                <TodoItem
                                    key={todo}
                                    todo={todo}
                                    changeTo={changeTodo}
                                    removeTodo={removeTodo}
                                    editTodo={editTodo}
                                />
                            ))}
                        </div>

                        <div className="w-1/2 max-w-1/2 mb-4 column ml-4">
                            <h2 className="text-xl font-bold flex items-center justify-center mb-2">
                                Completed Tasks
                            </h2>
                            {todosCompleted.map((todo) => (
                                <TodoItem
                                    key={todo}
                                    todo={todo}
                                    changeTodo={changeTodo}
                                    removeTodo={removeTodo}
                                    editTodo={editTodo}
                                />
                            ))}
                        </div>
                    </div>
                    <CreateTodoField addTodo={addTodo} />
                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Welcome to Our Task Management App
                    </h1>
                    <p className="mb-2">Please log in to view your tasks.</p>
                    {/* Здесь можете добавить кнопку или ссылку на страницу логина */}
                    <Link
                        to="/login"
                        className="border-2 rounded-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700"
                    >
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
