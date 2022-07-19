import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const [FullName, setFullName] = useState();
  const [Email, setEmail] = useState();
  const [Age, setAge] = useState();
  const [Address, setAddress] = useState();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    initialLoad();
  }, []);

  // ---------------------Post-------------------------------

  const SubmitHandler = (e) => {
    e.preventDefault();

    console.log("Submit button clicked");

    setFullName("");
    setEmail("");
    setAge("");
    setAddress("");

    // console.log("FullName:::", e.target["FullName"].value);
    // console.log("Email:::", e.target["Email"].value);
    // console.log("Age:::", e.target["Age"].value);
    // console.log("Address:::", e.target["Address"].value);

    const values = {
      fullName: e.target["FullName"].value,
      email: e.target["Email"].value,
      age: e.target["Age"].value,
      address: e.target["Address"].value,
    };

    console.log("values", values);

    fetch("https://5fc090c0fd14be0016749edd.mockapi.io/api/todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        initialLoad();
        console.log("ja raha hai :-", data);
      });
  };

  // ------------------------------Get------------------------------

  const [todolist, setTodoList] = useState();

  const initialLoad = () => {
    fetch("https://5fc090c0fd14be0016749edd.mockapi.io/api/todo", {
      method: "GET",
      headers: {
        "Content-Type": "appliction/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data);
        console.log("data is coming ", data);
      });
  };

  // ----------------------------edit--------------------------

  const editHandler = (item) => {
    console.log("edit clicked", item);

    setFullName(item.fullName);
    setEmail(item.email);
    setAge(item.age);
    setAddress(item.address);
    setId(item.id);

    setShow(true);

    window.scroll({
      top: 5,
    });
  };

  // -------------------------------updaate--------------------------------

  const updateHandler = (e) => {
    e.preventDefault();
    console.log("upDateHandler");

    setFullName("");
    setEmail("");
    setAge("");
    setAddress("");

    fetch(`https://5fc090c0fd14be0016749edd.mockapi.io/api/todo/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: FullName,
        email: Email,
        age: Age,
        address: Address,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        initialLoad();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // -------------------------------------delete--------------------------
  const deleteHander = (id) => {
    console.log("deleteHander");

    fetch(`https://5fc090c0fd14be0016749edd.mockapi.io/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        initialLoad();
      })
      .catch((error) => {
        console.log("Delete  error", error);
      });
  };
  return (
    <div>
      <div className="container my-5 ">
        <form
          onSubmit={show ? updateHandler : SubmitHandler}
          className=" form-div  m-auto py-5"
        >
          <div className="mb-3">
            <input
              type="text"
              className="w-100 form-input"
              placeholder="FullName"
              name="FullName"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="w-100 form-input"
              placeholder="Email"
              value={Email}
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="w-100 form-input"
              placeholder="Age"
              value={Age}
              name="Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="">
            <input
              type="text"
              className="w-100 form-input"
              placeholder="Address"
              value={Address}
              name="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="button-4 btn btn-success">
              {show ? "update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {todolist &&
              todolist.map((item) => (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => editHandler(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={() => deleteHander(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
