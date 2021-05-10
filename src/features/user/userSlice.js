import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTokenByCredentials} from "../../common/backend";

const initialState = {token: loadTokenFromLocalStorage()};


export const getUser = createAsyncThunk('user/getUser', async (credentials, ThunkAPI) => {
  const response = await getTokenByCredentials(credentials);
  if (response.status === 200) {
    return await response.json()
  } else {
    return ThunkAPI.rejectWithValue(response.status)
  }
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDisconnected: (state) => {
      saveTokenToLocalStorage(undefined);
      return {
        ...state,
        token: null
      };
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.access_token;
      state.status = 'idle';
      saveTokenToLocalStorage(action.payload.access_token);
    },
    [getUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUser.rejected]: (state, action) => {
      state.status = action.payload ? action.payload : -1;
    }
  }
});

function loadTokenFromLocalStorage() {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return undefined;
    return JSON.parse(token);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}


function saveTokenToLocalStorage(token) {
  try {
    const serialisedToken = JSON.stringify(token);
    localStorage.setItem("token", serialisedToken);
  } catch (e) {
    console.warn(e);
  }
}

export default userSlice.reducer
export const {userDisconnected} = userSlice.actions
