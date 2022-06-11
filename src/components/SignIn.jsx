import { useEffect, useState } from "react";
import { getUserByUsername } from "../apiRequests";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setUser, user }) => {
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const submitHandle = (event) => {
    event.preventDefault();
    getUserByUsername(userInput).then((user) => {
      if (user.user) {
        setUser(user);
        localStorage.setItem("user", user.user.username);
        navigate("/");
      } else {
        setMessage(user.msg);
      }
    });
  };
  useEffect(() => {}, [user]);
  //
  return (
    <section>
      <h3>Sign in</h3>
      {user ? user.user.username : <p>You have not Logged in</p>}
      <form onSubmit={submitHandle}>
        <input onChange={(event) => setUserInput(event.target.value)}></input>
        <button type="submit">Log in </button>
      </form>
      {message ? <p>{message}</p> : <></>}
      <button onClick={() => navigate("/sign-up")}> Create Account</button>
    </section>
  );
};

export default SignIn;
