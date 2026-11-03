import app from "./app.js";
import { insert } from "./data/assignmentStore.js";

insert({ name: "Essay 2", course: "ENG 101", dueDate: "2026-11-15", completed: false });
insert({ name: "Problem Set 4", course: "MATH 210", dueDate: "2026-11-10", completed: false });

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});