import { useState } from "react";
import { Link } from "react-router-dom";

// what each field starts at when no starting values are given
const EMPTY_VALUES = { name: "", course: "", dueDate: "" };

// this form is used by the create page and edit page
//initialValues: what the fields start as (empty for create, existing data for edit)
//onSubmit: an async function that talks to the API (it throws if the request fails)
//submitLabel: the text on the submit button
//cancelTo: where the Cancel link goes
export default function AssignmentForm({
  initialValues = EMPTY_VALUES,
  onSubmit,
  submitLabel,
  cancelTo,
}) {
  const [values, setValues] = useState(initialValues); // what's currently typed in the fields
  const [fieldErrors, setFieldErrors] = useState({}); // per-field messages from the server
  const [submitError, setSubmitError] = useState(null); // overall failure message
  const [submitting, setSubmitting] = useState(false); // true while the request is in flight

  // this runs on every single keystroke, one function can update any field
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  // runs when the form is submitted
  async function handleSubmit(event) {
    event.preventDefault(); // stops browser from reloading page
    setSubmitting(true);
    setFieldErrors({}); // clear old errors before trying again
    setSubmitError(null);

    try {
      await onSubmit(values);
      // on success the page navigates away so there is nothing else to do here
    } catch (err) {
      if (err.fields) setFieldErrors(err.fields); 
      setSubmitError(err.message);
      setSubmitting(false); // lets the user fix the problem and try again
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Assignment Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          aria-invalid={fieldErrors.name ? "true" : undefined}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />
        {fieldErrors.name && (
          <p className="field-error" id="name-error">{fieldErrors.name}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="course">Course:</label>
        <input
          type="text"
          id="course"
          name="course"
          value={values.course}
          onChange={handleChange}
          required
          aria-invalid={fieldErrors.course ? "true" : undefined}
          aria-describedby={fieldErrors.course ? "course-error" : undefined}
        />
        {fieldErrors.course && (
          <p className="field-error" id="course-error">{fieldErrors.course}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={values.dueDate}
          onChange={handleChange}
          required
          aria-invalid={fieldErrors.dueDate ? "true" : undefined}
          aria-describedby={fieldErrors.dueDate ? "dueDate-error" : undefined}
        />
        {fieldErrors.dueDate && (
          <p className="field-error" id="dueDate-error">{fieldErrors.dueDate}</p>
        )}
      </div>

      {submitError && (
        <div className="error-message" role="alert">
          <p>{submitError}</p>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
        <Link to={cancelTo} className="secondary-button">
          Cancel
        </Link>
      </div>
    </form>
  );
}