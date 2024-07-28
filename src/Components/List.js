import React, { useState, useEffect } from 'react'
import { useDispatch, useSelectio, useSelector } from 'react-redux'
import { setTodoList, addTodo, updateTodo, toggleCompleted } from '../features/todoSlice'
import './todoList.css'
import { PlusIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/16/solid'
import { PencilSquareIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid'


function TodoList() {

    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todo.todoList)

    const [currentTodo, setCurrentTodo] = useState(null)
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        if (todoList.length > 0) {
            localStorage.setItem('todolist', JSON.stringify(todoList));
        }
    }, [todoList]);
    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem('todoList'));
        if (localTodoList) {
            dispatch(setTodoList(localTodoList))
        }
    },
        []);


    const handleAddTodo = (task) => {
        if (task.trim().length === 0) {
            alert('please enter a task');
        } else {
            dispatch(addTodo({
                task: task,
                id: Date.now(),
            }));
            setNewTask('')

        }
    }

    const handleUpdateTodoList = (id, task) => {
        if (task.trim().length === 0) {
            alert('please enter a task');
        } else {
            dispatch(updateTodo({
                task: task,
                id: id,
            }));

        }
    }

    const handleDeleteTodo = (id) => {
        const updateTodoList = todoList.filter((todo) =>
            todo.id != id);
        dispatch(setTodoList(updateTodoList));
        localStorage.setItem('todoList', JSON.stringify(updateTodoList));
    }


    const handleToggleComleted = (id) => {
        dispatch(toggleCompleted({ id }))
    }
    return (

        <>
            <div className="todo">
                <div className="add-task-input">
                    <input
                        type='text'
                        className="input"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder={currentTodo ? 'update your task here' : 'enter your task here'}
                    />

                </div>


                {currentTodo ? (
                    <>
                        <button
                            className="edit-btn confirmEditing"
                            onClick={() => {
                                handleUpdateTodoList(currentTodo.id, newTask)
                                setCurrentTodo(null)
                                setNewTask('')
                            }}
                        >
                            < CheckIcon className='editing ' strokeWidth={1.2} />
                        </button>
                        <button
                            className="edit-btn cancelEditing"
                            onClick={() => {
                                setCurrentTodo(null)
                                setNewTask('')
                            }}
                        >
                            < XMarkIcon className='editing' strokeWidth={1.2} />
                        </button>
                    </>

                ) : (
                    <button
                        className="btn"
                        onClick={() => {
                            handleAddTodo(newTask)
                        }}
                    >
                        <PlusIcon className='plusIcon' strokeWidth={1.2} />
                    </button>
                )
                }
            </div>

            <ul>
                {
                    todoList.map((todo) => (


                        <div className='item' key={todo.id}>
                            <div className='task' onClick={() => { handleToggleComleted(todo.id) }}>
                                <CheckCircleIcon widths={24} height={24} className={todo.completed ? 'checkIcon checked ' : 'checkIcon notChecked '} />
                                <span style={{ 'textDecorationLine': todo.completed ? 'line-through' : 'none' }}  > {todo.task} </span>
                            </div>
                            <div className="edittingIcons">
                                <button
                                    className='edit'
                                    onClick={() => {
                                        setCurrentTodo(todo)
                                        setNewTask(todo.task)
                                    }}
                                >
                                    <PencilSquareIcon widths={24} height={24} className="editIcon Icon" />
                                </button>
                                <button
                                    className='delete'
                                    onClick={() => handleDeleteTodo(todo.id)} >
                                    <TrashIcon widths={24} height={24} className="trashIcon Icon" />
                                </button>
                            </div>
                        </div>

                    ))
                }
            </ul>


        </>
    )
}

export default TodoList