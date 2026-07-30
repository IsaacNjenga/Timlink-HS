import { useState, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchHospital() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [hospital, setHospital] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHospital = useCallback(
    async (hospitalId) => {
      if (!token) {
        console.warn("No token");
        return;
      } else if (!hospitalId) {
        console.warn("No ID");
        return;
      }
      try {
        setLoading(true);

        const response = await axios.get(
          `/hospitals/get-hospital/${hospitalId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const { data, message, success } = response.data;

        if (success) {
          setHospital(data);
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
    hospital,
    loading,
    fetchHospital,
  };
}
