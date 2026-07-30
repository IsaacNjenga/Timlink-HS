import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchHospitals() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchHospitals = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`/hospitals/get-hospitals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setHospitals(data.hospitals);
        setTotalHospitals(data.totalHospitals);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
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
  }, [token, openNotification]);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return {
    hospitals,
    loading,
    totalPages,
    totalHospitals,
    currentPage,
    refresh: fetchHospitals,
  };
}
