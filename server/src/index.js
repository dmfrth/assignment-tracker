import app from "./app.js";
import { insert } from "./data/assignmentStore.js";

// starting point of the server. npm run dev

// two sample assignments so the list isn't empty, helps with testing later on
// these two assignments are stored in memory, so they come back every time the server restarts
insert({ name: "Essay 2", course: "ENG 101", dueDate: "2026-11-15", completed: false });
insert({ name: "Problem Set 4", course: "MATH 210", dueDate: "2026-11-10", completed: false });

// the vite dev server forwards /api requests to this port (3001)
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});