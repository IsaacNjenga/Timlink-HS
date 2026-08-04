import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchCases() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCases, setTotalCases] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCase = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`/cases/get-cases`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setCases(data.cases);
        setTotalCases(data.totalCases);
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
    fetchCase();
  }, [fetchCase]);

  return {
    cases,
    loading,
    totalPages,
    totalCases,
    currentPage,
    refresh: fetchCase,
  };
}
