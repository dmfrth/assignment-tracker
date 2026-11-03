import { Link } from "react-router-dom";

export default function AssignmentItem({ assignment, busy, onToggle, onDelete }) {
  const { id, name, course, dueDate, completed } = assignment;

  return (
    <li className={`assignment${completed ? " is-complete" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        disabled={busy}
        onChange={() => onToggle(assignment)}
        aria-label={`Mark "${name}" as complete`}
      />

      <div className="assignment-details">
        <h3>
          <Link to={`/assignments/${id}`}>{name}</Link>
        </h3>
        <p>Course: {course}</p>
        <p>Due: {dueDate}</p>
      </div>

      <button
        type="button"
        className="delete-button"
        disabled={busy}
        onClick={() => onDelete(assignment)}
        aria-label={`Delete "${name}"`}
      >
        Delete
      </button>
    </li>
  );
}