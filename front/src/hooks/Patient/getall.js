import { useState, useEffect } from "react";

export function usePatient(patientId) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent state updates if patientId isn't provided yet
    if (!patientId) return;

    const controller = new AbortController();

    async function fetchPatient() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/patients/${patientId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setPatient(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch patient data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPatient();

    // Cleanup function cancels in-flight requests on unmount/re-render
    return () => controller.abort();
  }, [patientId]);

  return { patient, loading, error };
}
