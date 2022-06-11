import React from "react";
import { useState, useContext } from "react"
import {createUser} from "../apiRequests"
import { UserContext } from "./contexts/User"
import { useNavigate } from "react-router-dom";
// Consistency

function SignUp() {
  const [usernameInput, setUsernameInput] = useState();
  const [urlInput, setUrlInput] = useState();
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const submitHandle = (event) => {
    event.preventDefault();
    createUser(usernameInput, urlInput)
    .then((newUser) => {
      if(newUser.msg) {
        setErrorMessage(newUser.msg)
      }else {
        setUser(newUser);
        navigate("/");
      }
    })
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <label htmlFor="username">Username:</label>
        <input onChange={(event) => setUsernameInput(event.target.value)} id="username"></input>
        <label htmlFor="img-url">Image Url :</label>
        <input onChange={(event) => setUrlInput(event.target.value)} id="img-rul"></input>
        <button type="submit">Submit</button>
      </form>
      {errorMessage?<p>{errorMessage}</p>:<></>}
    </div>
  );
}

export default SignUp;
