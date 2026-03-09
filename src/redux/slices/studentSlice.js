import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ page, limit, search }) => {
    const res = await fetch(
      `${BASE_URL}/students?page=${page}&limit=${limit}&search=${search}`
    );
    return res.json();
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const res = await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    return res.json();
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, data }) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await fetch(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    rows: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.rows = action.payload.data;
      state.total = action.payload.total;
    });
  },
});      

export default studentSlice.reducer;