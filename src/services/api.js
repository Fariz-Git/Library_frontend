const BASE_URL = "http://localhost:3001";

export const api = {
  getStudents: () => fetch(`${BASE_URL}/students`).then(res => res.json()),

  createStudent: (data) =>
    fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  getBooks: () => fetch(`${BASE_URL}/books`).then(res => res.json()),

  createBook: (data) =>
    fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  issueBook: (data) =>
    fetch(`${BASE_URL}/borrow/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  getBorrows: () =>
    fetch(`${BASE_URL}/borrow`).then(res => res.json()),
};