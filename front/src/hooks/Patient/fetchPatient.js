import { useState, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchPatient() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPatient = useCallback(async (patientId) => {
    if (!token) {
      console.warn("No token");
      return;
    } else if (!patientId) {
      console.warn("No ID");
      return;
    }
    try {
      setLoading(true);

      const response = await axios.get(`/patients/get-patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setPatient(data);
      } else {
        openNotification(
          "error",
          `${message}. Refresh and try again`,
          "Something went wrong...",
        );
      }
    } catch (err) {
      openNotification(
        "error",
        `${err.message}. Refresh and try again`,
        "Something went wrong...",
      );
      console.log(err);
    } finally {
      setLoading(false);
    }

    //eslint-disable-next-line
  }, [openNotification]);

  return {
    patient,
    loading,
    fetchPatient,
  };
}
