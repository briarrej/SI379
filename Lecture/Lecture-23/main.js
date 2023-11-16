import React from "React"
function MyTodoList(props) {
    const [todos, setTodos] = React.useState(["Buy milk", "Buy eggs"]);
    const todoElements = todos.map((todo, idx) => <li key={idx}>
    {todo}
    <button onClick={() => handleDone(idx)}>Done</button>
    </li>);
    const inputRef = React.useRef();
    const handleClick = () => {
    const inputElement = inputRef.current;
    setTodos(todos.concat(inputElement.value));
    inputElement.value = "";
    };
    const handleDone = (idx) => {
    setTodos(todos.filter((todo, todoIdx) => todoIdx !== idx));
    };
    const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
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