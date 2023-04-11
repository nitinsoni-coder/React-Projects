import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [values, setValues] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values) {
      const obj = { value: values, showModal: false };
      setItems([...items, obj]);
      setValues("");
    } else {
      toast.warning("Please enter your task");
    }
  };

  const handleUpdate = (e, index) => {
    e.preventDefault();
    const updatedItems = [...items];
    updatedItems[index].value = updatedContent;
    updatedItems[index].showModal = false;
    setItems(updatedItems);
    setUpdatedContent("");
  };

  const handleEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index].showModal = true;
    setItems(updatedItems);
  };

  const deleteTodo = (itemIndex) => {
    const filteredList = items.filter((item) => item !== itemIndex);
    setItems(filteredList);
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <input
          type="text"
          value={values}
          placeholder="Please enter the text here..."
          onChange={(e) => setValues(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Add Todo
        </button>
      </form>

      {items?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="todo-card">
              <span>{item.value}</span>
              <div className="action-btn">
                <i
                  className="far fa-edit"
                  onClick={() => handleEdit(index)}
                ></i>
                <i
                  className="fas fa-trash-alt red"
                  onClick={() => deleteTodo(item)}
                ></i>
              </div>
            </div>
            {item.showModal && (
              <div className="updated-input">
                <form onSubmit={(e) => handleUpdate(e, index)}>
                  <input
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    placeholder="Update your above text..."
                  />
                  <button type="submit">Update</button>
                </form>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
