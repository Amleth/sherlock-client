/** @jsxImportSource @emotion/react */
import {getUser} from "./userSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {css} from "@emotion/react";
import Button from "@material-ui/core/Button";

export const Login = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  return (
    <div css={css`
  font-family: 'Fira Code';
  font-size: 82%;
  display: block;
  margin: auto;
  width: 75%;
  margin-top: 5vh;
  `}>
      {computeMessage(user)}
      <TextField
        onChange={(e) => {
          setCredentials((values) => ({
            ...values,
            username: e.target.value
          }));
        }}
        variant="filled"
        fullWidth
        value={credentials.username}
        label="username"
      />
      <TextField
        css={css`margin-top: 5vh`}
        onChange={(e) => {
          setCredentials((values) => ({
            ...values,
            password: e.target.value
          }));
        }}
        value={credentials.password}
        variant="filled"
        fullWidth
        label="password"
      />
      <Button
        css={css`margin-top: 5vh`}
        fullWidth
        variant="contained"
        onClick={() => {
          if (credentials.username && credentials.password) {
            dispatch(getUser(credentials));
          }
        }}>{user.status && user.status === "loading" ? "..." : "LOGIN"}</Button>
    </div>

  )
}

function computeMessage(user) {
  if (user.status === 401) {
    return <span>Mauvais couple [username, password]</span>
  } else if (user.status === -1) {
    return <span>Impossible de joindre le serveur</span>
  } else if (Number.isInteger(user.status)) {
    return <span>Erreur {user.status}</span>
  }
  return null;
}