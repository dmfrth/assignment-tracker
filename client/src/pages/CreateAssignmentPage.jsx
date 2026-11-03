import { useNavigate } from "react-router-dom";
import { createAssignment } from "../api/assignmentsApi.js";
import AssignmentForm from "../components/AssignmentForm.jsx";

export default function CreateAssignmentPage() {
  const navigate = useNavigate();

  async function handleSubmit(values) {
    await createAssignment(values); 
    navigate("/"); 
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