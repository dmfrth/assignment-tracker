import { Link, useNavigate, useParams } from "react-router-dom";
import { updateAssignment } from "../api/assignmentsApi.js";
import AssignmentForm from "../components/AssignmentForm.jsx";
import useAssignment from "../hooks/useAssignment.js";

export default function EditAssignmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assignment, loading, error, retry } = useAssignment(id);

  async function handleSubmit(values) {
    await updateAssignment(id, values); 
    navigate(`/assignments/${id}`);
  }

  if (loading) {
    return (
      <section className="card">
        <p className="status-message" role="status">Loading assignment...</p>
      </section>
    );
  }

  if (error) {
    const notFound = error.status === 404;
    return (
      <section className="card">
        <div className="error-message" role="alert">
          <p>{notFound ? "That assignment doesn't exist." : `Could not load assignment: ${error.message}`}</p>
          {!notFound && (
            <button type="button" onClick={retry}>Try again</button>
          )}
        </div>
        <p><Link to="/">Back to My Assignments</Link></p>
      </section>
    );
  }

  return (
    <section className="card" aria-labelledby="edit-heading">
      <h2 id="edit-heading">Edit Assignment</h2>
      
      <AssignmentForm
        initialValues={{
          name: assignment.name,
          course: assignment.course,
          dueDate: assignment.dueDate,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        cancelTo={`/assignments/${id}`}
      />
    </section>
  );
}