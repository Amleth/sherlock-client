import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTokenByCredentials} from "../../common/backend";

const initialState = loadUserFromLocalStorage();


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
  initialState: initialState ? initialState : {status: 'idle'},
  reducers: {
    userDisconnected: (state) => {
      saveUserToLocalStorage(undefined);
      return {
        status: 'idle'
      };
    },
    tokenSet: (state, action) => {
      state.access_token = action.payload
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.status = 'idle';
      saveUserToLocalStorage(state);
    },
    [getUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUser.rejected]: (state, action) => {
      state.status = action.payload ? action.payload : -1;
    }
  }
});

function loadUserFromLocalStorage() {
  try {
    const user = localStorage.getItem("user");
    if (user === null) return undefined;
    return JSON.parse(user);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}


function saveUserToLocalStorage(user) {
  try {
    const userSerialized = JSON.stringify(user);
    localStorage.setItem("user", userSerialized);
  } catch (e) {
    console.warn(e);
  }
}

export default userSlice.reducer
export const {userDisconnected, tokenSet} = userSlice.actions
