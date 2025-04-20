import React, { use } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import { useRef,useState,useEffect } from 'react'
function Todo() {
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  );
  const inputRef = useRef();
  const dateRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    const selectedDate = dateRef.current.value;

    if (inputText === '' || selectedDate === '') {
      alert('Please enter a task and select a date!');
      return null;
    }

    // Check if the input text already exists in the todo list
    const isDuplicate = todoList.some(
      (todo) => todo.text.toLowerCase() === inputText.toLowerCase()
    );
    if (isDuplicate) {
      alert('This task already exists in your todo list!');
      inputRef.current.value = '';
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      date: selectedDate,
      iscompleted: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
    dateRef.current.value = ''; // Clear the date input
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, iscompleted: !todo.iscompleted };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-[90%] place-self-center max-w-md flex flex-col p-7 rounded-xl min-h-[550px]">
      {/* ............ title......... */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="todo icon" />
        <h1 className="text-3xl font-semibold">Todo-list</h1>
      </div>

      {/* ............ input section......... */}
      <div className="flex flex-col my-7 gap-4">
        <div className="flex items-center bg-gray-200 rounded-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a new task"
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          />
        </div>
        <div className="flex items-center bg-gray-200 rounded-full">
          <input
            ref={dateRef}
            type="date"
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          />
        </div>
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-full h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* ............ todo list......... */}
      <div>
        {todoList.map((item, index) => (
          <TodoItems
            key={index}
            text={item.text}
            date={item.date}
            id={item.id}
            iscompleted={item.iscompleted}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;