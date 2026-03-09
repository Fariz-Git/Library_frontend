import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001";

export const fetchBorrow = createAsyncThunk(
  "borrow/fetchBorrow",
  async ({ page, limit, search }) => {
    const res = await fetch(
      `${BASE_URL}/borrow?page=${page}&limit=${limit}&search=${search}`
    );
    return res.json();
  }
);

export const issueBook = createAsyncThunk(
  "borrow/issueBook",
  async (data) => {
    const res = await fetch(`${BASE_URL}/borrow/issue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  }
);

export const returnBook = createAsyncThunk(
  "borrow/returnBook",
  async (id) => {
    await fetch(`${BASE_URL}/borrow/return/${id}`, {
      method: "POST",
    });

    return id;
  }
);

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    rows: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBorrow.fulfilled, (state, action) => {
      state.rows = action.payload.data;
      state.total = action.payload.total;
    });
  },
});

export default borrowSlice.reducer;