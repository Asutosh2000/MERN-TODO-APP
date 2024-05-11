import { useCallback, useEffect, useState } from "react";

function App() {
  const [todos, setAllTodos] = useState(null);
  const [input, setInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoName, setEditTodoName] = useState("");

  const getAllTodos = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URI}/todos`);
    const data = await res.json();
    setAllTodos(data);
  }, []);

  const addTodo = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URI}/todos/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input,
        }),
      });
      await getAllTodos();
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URI}/todos/delete/${id}`, {
        method: "DELETE",
      });
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id) => {
    setEditTodoId(null);
    try {
      await fetch(`${import.meta.env.VITE_BASE_URI}/todos/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editTodoName,
        }),
      });
      setEditTodoName("");
      await getAllTodos();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <div className="container">
      <h1>Todos</h1>
      <div className="add_input_container">
        <input
          type="text"
          id="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button id="add" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="todos_list">
        {todos &&
          todos
            .slice()
            .reverse()
            .map((todo) => (
              <div key={todo._id}>
                {editTodoId === todo._id ? (
                  <input
                    type="text"
                    id="editTodo"
                    style={{
                      fontSize: "20px",
                      padding: "0.5em",
                      background: "transparent",
                    }}
                    value={editTodoName}
                    onChange={(e) => setEditTodoName(e.target.value)}
                  />
                ) : (
                  <span className="todo_name">{todo.name}</span>
                )}
                <div style={{ display: "flex", gap: "10px", padding: "0" }}>
                  {editTodoId == todo._id ? (
                    <span
                      className="edit_btn"
                      onClick={() => updateTodo(todo._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                        version="1.1"
                        id="Capa_1"
                        width="16"
                        height="16"
                        viewBox="0 0 407.096 407.096"
                        xml:space="preserve"
                      >
                        <g>
                          <g>
                            <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086    c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032    C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z" />
                            <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08    c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z" />
                          </g>
                        </g>
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="edit_btn"
                      onClick={() => {
                        setEditTodoName(todo.name);
                        setEditTodoId(todo._id);
                      }}
                    >
                      &#9998;
                    </span>
                  )}
                  <span
                    className="delete_btn"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
