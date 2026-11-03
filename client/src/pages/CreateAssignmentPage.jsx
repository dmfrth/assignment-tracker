import { useNavigate } from "react-router-dom";
import { createAssignment } from "../api/assignmentsApi.js";
import AssignmentForm from "../components/AssignmentForm.jsx";

// this is the add assignment page
// the form handles typing and errors, this page only says what to do once submit is clicked
export default function CreateAssignmentPage() {
  const navigate = useNavigate();

  // called by the form when the user submits
  async function handleSubmit(values) {
    await createAssignment(values); // throws on failure, form shows the error
    navigate("/"); // navigates back to the list
  }

  return (
    <section className="card" aria-labelledby="create-heading">
      <h2 id="create-heading">Add Assignment</h2>
      <AssignmentForm
        onSubmit={handleSubmit}
        submitLabel="Add Assignment"
        cancelTo="/"
      />
    </section>
  );
}