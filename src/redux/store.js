import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./slices/studentSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    books: bookReducer,
    borrow: borrowReducer,
    admin: adminReducer,
  },
});