import { useState } from "react";
import { Link } from "react-router-dom";

const EMPTY_VALUES = { name: "", course: "", dueDate: "" };

export default function AssignmentForm({
  initialValues = EMPTY_VALUES,
  onSubmit,
  submitLabel,
  cancelTo,
}) {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({}); 
  const [submitError, setSubmitError] = useState(null); 
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault(); 
    setSubmitting(true);
    setFieldErrors({});
    setSubmitError(null);

    try {
      await onSubmit(values);
      
    } catch (err) {
      if (err.fields) setFieldErrors(err.fields); 
      setSubmitError(err.message);
      setSubmitting(false); 
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