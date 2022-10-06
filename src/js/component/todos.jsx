import React, { useState, useEffect } from "react";

export const Todo = () => {
  const [listTodos, setListTodos] = useState([]);
  const [usuario, setUsuario] = useState("");
  const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";

  // start | Load tooltips
  // start | Load tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
  // Stop | Load tooltips
  // Stop | Load tooltips

  // start | Create user
  // start | Create user
  const CreateUser = async () => {
    let URI = `${BASE_URL}user/${usuario}`;

    try {
      let userCreateRes = await fetch(URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      if (userCreateRes.ok) {
        alert(`User: ${usuario} has been successfully created.`);
        return;
      } else {
        alert(`Error: User ${usuario} Already exist!`);
      }
      let userCreateResJSON = await userCreateRes.json();
    } catch {
      (e) => console.log(e);
    }
  };
  // End | create user
  // End | create user



  // Start | Get TaskList from user
  // Start | Get TaskList from user
  const getTaskListFromUser = async () => {
    let URI = `${BASE_URL}user/${usuario}`;
    try {
      let userCreateResJSON = await fetch(URI);
      if (userCreateResJSON.ok) {
        let userCreateResJSONJSON = await userCreateResJSON.json();
        setListTodos(userCreateResJSONJSON);
      } else {
        console.log("No username detected.");
        setListTodos([]);
      }
    } catch {
      (err) => console.log(err);
    }
  };

  useEffect(() => {
    getTaskListFromUser();
  }, [usuario]);
  // End | Get TaskList from user
  // End | Get TaskList from user



  //Start | Delete note from user(API)
  //Start | Delete note from user(API)
  const deleteNote = async (i) => {
    let URI = `${BASE_URL}user/${usuario}`;
    let auxArr = listTodos.filter((item, index) => {
      return index !== i;
    });

    if (auxArr.length > 0) {
      try {
        let respuesta = await fetch(URI, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auxArr),
        });

        if (respuesta.ok) {
          console.log("The task was successfully deleted");
          traerListaTareas();
        } else {
          console.log("erro");
        }
      } catch {
        (e) => console.log(e);
      }
    }else{
      let respuesta = await fetch(URI, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auxArr),
      });
    }
  };
  //End | Delete note from user(API)
  //End | Delete note from user(API)



  // Start | Delete note from user(UI)
  // Start | Delete note from user(UI)
  const deleteTodo = (indiceTarea) => {
    setListTodos((prevState) => {
      return prevState.filter((item, index) => {
        // console.log('prevState.item: ', item);
        return index !== indiceTarea;
      });
    });
  };
  // End | Delete note from user(UI)
  // End | Delete note from user(UI)



  // Start | ADD new note(UI)
  // Start | ADD new note(UI)
  const addNewNote = (id) => {
    let label = id;
    let done = false;
    let NewNote = {
      "label": label,
      "done": done,
    };
    return NewNote;
  };
  // Stop | ADD new note(UI)
  // Stop | ADD new note(UI)


  
  // Start | ADD new note(API)
  // Start | ADD new note(API)
  const addNewNoteOnAPI = async (myid) => { 
    let URI = `${BASE_URL}user/${usuario}`;
    let auxArr = myid.filter((item, index) => {
      return index !== myid;
    });

    if (auxArr.length > 0) {
      try {
        let respuesta = await fetch(URI, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auxArr),
        });
        
        if (respuesta.ok) {
          console.log("Task added successfully");
          traerListaTareas();
        } else {
          console.log("Error: Task could not be added correctly");
        }
      } catch {
        (e) => console.log('Error: Cannot send task to API.', e);
      }
    }
  };
  // Stop | ADD new note(API)
  // Stop | ADD new note(API)



  // START | Delete All notes from user (API-UI)
  // START | Delete All notes from user (API-UI)
  const removeAllNotes = async (myRes) => { 
    let URI = `${BASE_URL}user/${usuario}`;
    let auxArr = listTodos.filter((item, index) => {
      return index !== listTodos;
    });

    if (auxArr.length > 0) {
      try {
        let respuesta = await fetch(URI, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: [],
        });
        if (respuesta.ok) {
          console.log("All Task's Deleted successfully from API");
          traerListaTareas();
        } else {
          console.log("Error: All Task's could not be deleted correctly");
        }
      } catch {
        (e) => console.log('Error: ', e);
      }
    }
    getTaskListFromUser()
  };
  // STOP | Delete All notes from user (API-UI)
  // STOP | Delete All notes from user (API-UI)






// ---------------|
// # Start
// # Rendering
// # HTML
// ---------------|
  return (
    <div className="card">
      <div className="row bg-secondary p-3 rounded">
        <div className="col-6">
        <input
        type="text"
        placeholder="Type your username then press ENTER"
        className="mt-2 inputMod"
        // onKeyUp={(e) => {
        //     //setUsuario(e.target.value);
        //     console.log('heyy', e.target.value);
        // }}
        // onChange={e => setUsuario(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            setUsuario(e.target.value);
          }
        }}
        />
        </div>
        <div className="col-6 p-2">
        <button
            type="button"
            className="btn bg-success text-white me-2"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Create New user"
            onClick={() => CreateUser()}
            >
            Create User
        </button>
        <button
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Refresh Task"
            className="btn bg-primary text-white me-2"
            onClick={() => getTaskListFromUser()}
            >
            Check Task's
        </button>
        <button
            type="button"
            className="btn bg-danger text-white"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete all existing user tasks"
            //onClick={() => { if (window.confirm('Are you sure you wish to delete ALL Notes?')) this.onCancel(item) } }  //other method
            onClick={() => { window.confirm( 'Are you sure you wish to delete ALL Tasks?', ) && removeAllNotes() }}
            >
            Delete
        </button>
        </div>
        <div className="row">
          <div className="col-12">
          <input
              type="text"
              className="inputMod2 mt-3"
              placeholder="Write a new Task and then press ENTER to add it."
              onKeyUp={(e) => {
                if (e.keyCode == "13") {
                  let arrAux = listTodos.slice();
                  let newResArr = addNewNote(e.target.value)
                  arrAux.push(newResArr);
                  setListTodos(arrAux);
                  addNewNoteOnAPI(arrAux)
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-4">Tittle</div>
        <div className="col-4">Status</div>
        <div className="col-4">Delete</div>
      </div>
      <ul id='lust' className="list-group">
        {listTodos.map((item, indice) => {
          return (
            <li
              className="p-3 list-group-item d-flex justify-content-between subsection"
              key={indice}
            >
            <span>📝 {item.label}</span>
            <span>{JSON.stringify(item.done)}</span>
            <button
              type="button"
              className="bd-highlight btnMod"
              //className="btn p-2 bd-highlight"
              onClick={(e) => {
              deleteNote(indice);
              deleteTodo(indice)
              }}
              >
              <i className="fa fa-times"></i>
              </button>
            </li>
          );
        })}
      </ul>
    <div>
    {listTodos.length > 0 ? (
        <div>
        <p className="pt-3">📝 {listTodos.length} saved task's.</p>
        </div>
      ) : (
        <p className="p-2">There are no tasks loaded at the moment</p>
      )
    }
    </div>
  
    </div>
  );
};