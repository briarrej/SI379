import React from "react"

const todoItems = JSON.parse(localStorage.getItem('todos') || []);

function MyTodoList(props) {
    const [todos, setTodos] = React.useState(todoItems); //useState returns an itema and a setter
    const todoElements = todos.map((todo, idx) => <li key={idx}>
    {todo}
    <button onClick={() => handleDone(idx)}>Done</button>
    </li>);
    const inputRef = React.useRef(); //points to the DOM element 


    const handleClick = () => {
      const inputElement = inputRef.current;
      const newTodos = todos.concat(inputElement.value);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos)); ////// important line
      inputElement.value = "";
    };

    const handleDone = (idx) => {
      const newTodos = todos.filter((todo, todoIdx)  => todoIdx !== idx);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };
    

    const handleKeyDown = (event) => {
    if (event.key === 'Enter') { //if i hit "enter"
    handleClick();
    }
    };


    return <div>
    <ul>{todoElements}</ul>
    <input type="text" ref={inputRef} onKeyDown={handleKeyDown} />
    <button onClick={handleClick}>Add</button>
    </div>
    }
    export default MyTodoList;