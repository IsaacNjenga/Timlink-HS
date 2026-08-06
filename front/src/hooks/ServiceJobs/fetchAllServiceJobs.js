import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchServiceJobs() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [serviceJobs, setServiceJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalServiceJobs, setTotalServiceJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchServiceJobs = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`/service-jobs/get-service-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setServiceJobs(data.serviceJobs);
        setTotalServiceJobs(data.totalServiceJobs);
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
    fetchServiceJobs();
  }, [fetchServiceJobs]);

  return {
    serviceJobs,
    loading,
    totalPages,
    totalServiceJobs,
    currentPage,
    refresh: fetchServiceJobs,
  };
}
