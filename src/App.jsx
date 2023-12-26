import { useState } from "react";

export default function App() {
  // const taskList = [
  //   {
  //     id: 1,
  //     description: "Hello World",
  //     completed: false,
  //   },
  //   {
  //     id: 2,
  //     description: "Hello React",
  //     completed: false,
  //   },
  //   {
  //     id: 3,
  //     description: "Hello Javascript",
  //     completed: false,
  //   },
  // ];

  const [list, setList] = useState([]);

  //random id generator
  function randomGenerator() {
    const randomNumber = Math.round(Math.random() * 600);
    return randomNumber;
  }

  //add task to the list
  function handleAddItems(item) {
    setList((li) => [item, ...li]);
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
      <Input onAdd={handleAddItems} randomGenerator={randomGenerator} />
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

function Input({ onAdd, randomGenerator }) {
  const [message, setMessage] = useState("");

  //create a new task
  function createTask() {
    const newItem = {
      id: randomGenerator(), // to create id...
      description: message,
      completed: false,
    };

    onAdd(newItem);
    setMessage("");
  }

  //handle the submit function
  function handleSubmit(e) {
    e.preventDefault();
    createTask();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="message"
        type="text"
        value={message}
        placeholder="Enter text here..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <input type="submit" value="Add" className="add-btn" />
    </form>
  );
}

function ShowList({ lists, onTickList, onDelete }) {
  let sortedList = lists.sort(
    (a, b) => Number(a.completed) - Number(b.completed),
  );

  return (
    <ul>
      {sortedList.map((list) => (
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
