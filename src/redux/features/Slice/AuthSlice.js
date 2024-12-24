import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // user: null,
  token: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, actions) => {
      // state.user = actions.payload.user;
      state.token = actions.payload.token;
    },
    logout: (state) => {
      // state.user = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
