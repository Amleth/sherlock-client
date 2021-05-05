/** @jsxImportSource @emotion/react */
import {getUser} from "./userSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {input, submit} from "./User.css";

export const Login = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  return (
    <div>
      {computeMessage(user)}
      <input
        css={input}
        onChange={(e) => {
          setCredentials((values) => ({
            ...values,
            username: e.target.value
          }));
        }}
        value={credentials.username}
        placeholder={"username"}
      />
      <input
        css={input}
        onChange={(e) => {
          setCredentials((values) => ({
            ...values,
            password: e.target.value
          }));
        }}
        value={credentials.password}
        placeholder={"password"}
      />
      <input
        css={submit}
        type="submit"
        value={user.status && user.status === "loading" ? "..." : "LOGIN"}
        onClick={() => {
          if (credentials.username && credentials.password) {
            dispatch(getUser(credentials));
          }
        }}/>
    </div>

  )
}

function computeMessage(user) {
  if (user.status === 401) {
    return <span>Mauvais couple [username, password]</span>
  } else if (user.status === -1) {
    return <span>Impossible de joindre le serveur</span>
  }
  return null;
}