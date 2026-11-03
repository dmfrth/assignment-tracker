import { useEffect, useState } from "react";
import {
  listAssignments,
  updateAssignment,
  deleteAssignment,
} from "../api/assignmentsApi.js";
import AssignmentItem from "../components/AssignmentItem.jsx";

// home page! list of assignments with a filter, checkboxes, and delete button
export default function AssignmentListPage() {
  // server data plus loading and error states
  const [assignments, setAssignments] = useState([]); // list from the server
  const [loading, setLoading] = useState(true); // true until first fetch finishes
  const [error, setError] = useState(null); // message if loading the list failed

  // state that only this page requires
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState(null); // id of the row with a request in progress
  const [actionError, setActionError] = useState(null); // failure from a toggle or delete
  const [reloadCount, setReloadCount] = useState(0); // bump this to re-run the fetch

  // fetch the list when the page loads, and again if try again is clicked
  useEffect(() => {
    // allows us to cancel the requet if the page is closed before it finishes
    const controller = new AbortController();

    listAssignments(controller.signal)
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; 
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); 
  }, [reloadCount]);

  // called by the try again button
  function handleRetry() {
    setError(null);
    setLoading(true);
    setReloadCount((count) => count + 1);
  }

  // called when a checkbox is clicked, changes the assignment's completed value
  async function handleToggle(assignment) {
    setBusyId(assignment.id); // locks the row while the request is running
    setActionError(null);
    try {
      const updated = await updateAssignment(assignment.id, {
        completed: !assignment.completed,
      });
      // use the server's response as the source of truth, swap old version of the assignment for the updated one
      setAssignments((current) =>
        current.map((a) => (a.id === updated.id ? updated : a))
      );
    } catch (err) {
      setActionError(`Could not update "${assignment.name}": ${err.message}`);
    } finally {
      setBusyId(null); // unlocks the row
    }
  }

  // called when Delete is clicked, removes assignment from server, then from the list
  async function handleDelete(assignment) {
    setBusyId(assignment.id);
    setActionError(null);
    try {
      await deleteAssignment(assignment.id);
      setAssignments((current) => current.filter((a) => a.id !== assignment.id));
    } catch (err) {
      setActionError(`Could not delete "${assignment.name}": ${err.message}`);
    } finally {
      setBusyId(null);
    }
  }

  // filter and sort in the browser so changing the filter requires no extra request
  const visible = assignments
    .filter((a) => {
      if (filter === "active") return !a.completed;
      if (filter === "completed") return a.completed;
      return true;
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate)); // earliest due date first

  // decide what to show in the main area...loading, error, empty, or list
  let content;
  if (loading) {
    content = (
      <p className="status-message" role="status">
        Loading assignments...
      </p>
    );
  } else if (error) {
    content = (
      <div className="error-message" role="alert">
        <p>Could not load assignments: {error}</p>
        <button type="button" onClick={handleRetry}>
          Try again
        </button>
      </div>
    );
  } else if (visible.length === 0) {
    // two different empty messages
    content = (
      <p className="status-message" role="status">
        {assignments.length === 0
          ? 'You have no assignments yet. Use "Add Assignment" to create one.'
          : `No ${filter} assignments to show.`}
      </p>
    );
  } else {
    content = (
      <ul>
        {visible.map((assignment) => (
          <AssignmentItem
            key={assignment.id}
            assignment={assignment}
            busy={busyId === assignment.id}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    );
  }

  return (
    <section className="card" aria-labelledby="list-heading">
      <h2 id="list-heading">My Assignments</h2>

      <div className="filter-field">
        <label htmlFor="filter">Show:</label>
        <select
          id="filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {actionError && (
        <div className="error-message" role="alert">
          <p>{actionError}</p>
        </div>
      )}

      {content}
    </section>
  );
}