import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page, limit, search }) => {
    const res = await fetch(
      `${BASE_URL}/books?page=${page}&limit=${limit}&search=${search}`
    );
    return res.json();
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (book) => {
    const res = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    return res.json();
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, data }) => {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    rows: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.rows = action.payload.data;
      state.total = action.payload.total;
    });
  },
});

export default bookSlice.reducer;