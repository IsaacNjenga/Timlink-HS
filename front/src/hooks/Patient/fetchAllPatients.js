import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchPatients() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPatient = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`/patients/get-patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setPatients(data.patients.patients);
        setTotalPatients(data.patients.totalPatients);
        setCurrentPage(data.patients.currentPage);
        setTotalPages(data.patients.totalPages);
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
  }, [refreshKey, openNotification]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return {
    patients,
    loading,
    totalPages,
    totalPatients,
    currentPage,
    refresh: () => setRefreshKey((prev) => prev + 1),
  };
}
