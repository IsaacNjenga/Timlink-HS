import { useState, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

export function useFetchServiceJob() {
  const { token } = useAuth();
  const openNotification = useNotification();
  const [serviceJob, setServiceJob] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchServiceJob = useCallback(
    async (ServiceJobId) => {
      if (!token) {
        console.warn("No token");
        return;
      } else if (!ServiceJobId) {
        console.warn("No ID");
        return;
      }
      try {
        setLoading(true);

        const response = await axios.get(
          `/service-jobs/get-service-job/${ServiceJobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const { data, message, success } = response.data;

        if (success) {
          setServiceJob(data);
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
    serviceJob,
    loading,
    fetchServiceJob,
  };
}
