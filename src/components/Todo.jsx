import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Items from './Items';

import addSound from '../assets/addsound.mp3';
import deleteSound from '../assets/deletesound.mp3';

const Todo = () => {
    const [todolist, setTodoList] = useState(
        localStorage.getItem("todos")
            ? JSON.parse(localStorage.getItem("todos"))
            : []
    );

    const inputRef = useRef();

    // Sound players
    const addAudio = new Audio(addSound);
    const deleteAudio = new Audio(deleteSound);

    const handleAddTask = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
        addAudio.play();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        deleteAudio.play();
    };

    const toggle = (id) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todolist));
    }, [todolist]);

    return (
        <div className="bg-gray-600 w-11/12 max-w-xl border-4 border-gray-700 mx-auto my-12 p-8 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <img className="w-8" src={todo_icon} alt="To-Do Icon" />
                <h1 className="text-3xl font-bold text-white tracking-wide">To-do List</h1>
            </div>

            {/* Input field and button */}
            <div className="flex items-center gap-2 bg-[#2A2A40] p-2 rounded-full">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add your next task..."
                    className="bg-transparent flex-1 px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                    onKeyDown={handleKeyDown} // 🎯 ENTER key support
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-md"
                >
                    ADD +
                </button>
            </div>

            {/* Task List */}
            <div className="mt-8 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">
                {todolist.length === 0 && (
                    <p className="text-center text-white-500 italic underline mt-10">No tasks yet. Add one above 👆</p>
                )}
                {todolist.map((item) => (
                    <Items
                        key={item.id}
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
