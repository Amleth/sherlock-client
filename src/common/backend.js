import {tokenSet} from "../features/user/userSlice";

export const getTokenByCredentials = async credentials => {
  return await fetch(process.env.REACT_APP_SHERLOCK_BACKEND_LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    cache: 'no-cache',
    body: JSON.stringify(credentials)})
}

export const authenticatedRequest = async (url, method, body, dispatch, token, refresh_token) => {
  let request = {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    body: body,
    cache: 'no-cache'
  }
  let response = await fetch(process.env.REACT_APP_SHERLOCK_BACKEND_ENDPOINT + url, request);
  if (response.status === 401) {
    const updatedToken = await refreshToken(dispatch, refresh_token);
    request = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + updatedToken
      },
      body: body,
      cache: 'no-cache'
    }
    response = await fetch(process.env.REACT_APP_SHERLOCK_BACKEND_ENDPOINT + url, request);
  }
  return response.json();
}

export const refreshToken = async (dispatch, refresh_token) => {
  const response = await fetch(process.env.REACT_APP_SHERLOCK_BACKEND_REFRESH_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      refresh_token: refresh_token,
      grant_type: "refresh_token"
    })
  });
  const responseAsObject = await response.json()
  dispatch(tokenSet(responseAsObject.access_token))
  return responseAsObject.access_token;
}

export const postE13 = async (p140_assigned_attribute_to, p141_assigned, p177_assigned_property_type, p141_type, token, refresh_token, dispatch) => {
  return await authenticatedRequest("/sherlock/api/e13", "POST", JSON.stringify({
    "p140_assigned_attribute_to": p140_assigned_attribute_to,
    "p177_assigned_property_type": p177_assigned_property_type,
    "p141_type": p141_type,
    "p141_assigned": p141_assigned,
  }), dispatch, token, refresh_token);
}
