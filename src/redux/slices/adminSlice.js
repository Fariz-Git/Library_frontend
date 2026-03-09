import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001";

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (form) => {

    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    return data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default adminSlice.reducer;