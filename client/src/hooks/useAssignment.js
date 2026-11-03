import { useEffect, useState } from "react";
import { getAssignment } from "../api/assignmentsApi.js";

// custom hook that loads a single assignment by its id and tracks the loading / error states

export default function useAssignment(id) {
  const [assignment, setAssignment] = useState(null); // loaded assignment
  const [loading, setLoading] = useState(true); // true until the request has finished
  const [error, setError] = useState(null); // an ApiError, so pages can check error.status
  const [reloadCount, setReloadCount] = useState(0);  // bump this number to fetch again

  // this will run when the page first appears, when the id changes, and when retry() is called
  useEffect(() => {
    // allows the user to cancel the request if the page is closed before it finishes
    const controller = new AbortController();

    getAssignment(id, controller.signal)
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // page closed
        setError(err);
        setLoading(false);
      });

    return () => controller.abort(); // basically acts as cleanup, cancels the request if the page goes away
  }, [id, reloadCount]);

  // called by the "Try Again" button, clears the error and loads again
  function retry() {
    setError(null);
    setLoading(true);
    setReloadCount((count) => count + 1);
  }

  return { assignment, loading, error, retry };
}