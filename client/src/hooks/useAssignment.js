import { useEffect, useState } from "react";
import { getAssignment } from "../api/assignmentsApi.js";

export default function useAssignment(id) {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [reloadCount, setReloadCount] = useState(0); 

  useEffect(() => {
    const controller = new AbortController();

    getAssignment(id, controller.signal)
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; 
        setError(err);
        setLoading(false);
      });

    return () => controller.abort(); 
  }, [id, reloadCount]);

  function retry() {
    setError(null);
    setLoading(true);
    setReloadCount((count) => count + 1);
  }

  return { assignment, loading, error, retry };
}