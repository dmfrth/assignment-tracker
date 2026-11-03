import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAssignment } from "../api/assignmentsApi.js";
import useAssignment from "../hooks/useAssignment.js";

export default function AssignmentDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { assignment, loading, error, retry } = useAssignment(id);

  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function handleDelete() {
    if (!window.confirm(`Delete "${assignment.name}"? This cannot be undone.`)) return;

    setDeleting(true);
    setActionError(null);
    try {
      await deleteAssignment(assignment.id);
      navigate("/");
    } catch (err) {
      setActionError(`Could not delete: ${err.message}`);
      setDeleting(false);
    }
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
    <section className="card" aria-labelledby="detail-heading">
      <h2 id="detail-heading">{assignment.name}</h2>

      <dl className="detail-list">
        <dt>Course</dt>
        <dd>{assignment.course}</dd>
        <dt>Due date</dt>
        <dd>{assignment.dueDate}</dd>
        <dt>Status</dt>
        <dd>{assignment.completed ? "Completed" : "Not completed"}</dd>
      </dl>

      {actionError && (
        <div className="error-message" role="alert">
          <p>{actionError}</p>
        </div>
      )}

      <div className="form-actions">
        <Link to={`/assignments/${assignment.id}/edit`} className="secondary-button">
          Edit
        </Link>
        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
        <Link to="/" className="secondary-button">Back</Link>
      </div>
    </section>
  );
}