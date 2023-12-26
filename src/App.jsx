import { useState } from "react";

export default function App() {
  const taskList = [
    {
      id: 1,
      description: "Hello World",
      completed: false,
    },
    {
      id: 2,
      description: "Hello Sumit",
      completed: false,
    },
    {
      id: 3,
      description: "Hello Richa",
      completed: false,
    },
  ];

  const [list, setList] = useState(taskList);
  const [message, setMessage] = useState("");

  //random id generator
  function randomGenerator() {
    const randomNumber = Math.round(Math.random() * 600);
    return randomNumber;
  }

  //create a new task
  function handleChange(e) {
    const newItem = {
      id: randomGenerator(),
      description: e.target.value,
      completed: false,
    };

    setMessage(newItem);
  }

  //add task to the list
  function handleAddItems(e) {
    e.preventDefault();
    setList((li) => [...li, message]);
  }

  //check whether it is completed or not
  function handleCompletedTick(item) {
    setList((lists) =>
      lists.map((list) =>
        list.id === item.id ? { ...list, completed: !list.completed } : list,
      ),
    );
  }

  //delete item from the task list
  function deleteItem(item) {
    setList((lists) => lists.filter((list) => list.id != item.id));
  }

  return (
    <div className="App">
      <Heading />
      <Input onChange={handleChange} onAdd={handleAddItems} message={message} />
      <ShowList
        lists={list}
        onTickList={handleCompletedTick}
        onDelete={deleteItem}
      />
    </div>
  );
}

function Heading() {
  return <h1>TODO APP</h1>;
}

function Input({ onChange, onAdd, message, setMessage }) {
  return (
    <form>
      <input
        className="message"
        type="text"
        value={message}
        placeholder="Enter text here..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="add-btn" onClick={onAdd}>
        Add
      </button>
    </form>
  );
}

function ShowList({ lists, onTickList, onDelete }) {
  return (
    <ul>
      {lists.map((list) => (
        <ListItem
          list={list}
          key={list.id}
          onTickList={onTickList}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function ListItem({ list, onTickList, onDelete }) {
  return (
    <li>
      <input type="checkbox" onClick={() => onTickList(list)} />

      <span className={list.completed ? "checked" : ""}>
        {list.description}
      </span>

      <button className="delete-btn" onClick={() => onDelete(list)}>
        Delete
      </button>
    </li>
  );
}
