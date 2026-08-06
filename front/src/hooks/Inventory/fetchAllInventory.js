import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchInventory() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalInventory, setTotalInventory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchInventory = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`/inventory/get-inventory`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, message, success } = response.data;

      if (success) {
        setInventory(data.inventory);
        setTotalInventory(data.totalInventory);
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
    fetchInventory();
  }, [fetchInventory]);

  return {
    inventory,
    loading,
    totalPages,
    totalInventory,
    currentPage,
    refresh: fetchInventory,
  };
}
