export const getTokenByCredentials = async credentials => {
  return await fetch(process.env.REACT_APP_SHERLOCK_BACKEND_ENDPOINT + "/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    cache: 'no-cache',
    body: JSON.stringify(credentials)})
}
