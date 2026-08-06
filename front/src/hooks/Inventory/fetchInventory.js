import { useState, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchInventory() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchInventory = useCallback(
    async (inventoryId) => {
      if (!token) {
        console.warn("No token");
        return;
      } else if (!inventoryId) {
        console.warn("No ID");
        return;
      }
      try {
        setLoading(true);

        const response = await axios.get(
          `/inventory/get-inventory/${inventoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const { data, message, success } = response.data;

        if (success) {
          setInventory(data);
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
    },
    [openNotification, token],
  );

  return {
    inventory,
    loading,
    fetchInventory,
  };
}
