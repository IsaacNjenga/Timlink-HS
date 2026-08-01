import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchDoctors() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchDoctors = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`/doctors/get-doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setDoctors(data.doctors);
        setTotalDoctors(data.totalDoctors);
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
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    totalPages,
    totalDoctors,
    currentPage,
    refresh: fetchDoctors,
  };
}
