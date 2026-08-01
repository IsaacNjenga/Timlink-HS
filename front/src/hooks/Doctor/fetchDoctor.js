import { useState, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchDoctor() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchDoctor = useCallback(
    async (doctorId) => {
      if (!token) {
        console.warn("No token");
        return;
      } else if (!doctorId) {
        console.warn("No ID");
        return;
      }
      try {
        setLoading(true);

        const response = await axios.get(`/doctors/get-doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { data, message, success } = response.data;

        if (success) {
          setDoctor(data);
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
    doctor,
    loading,
    fetchDoctor,
  };
}
