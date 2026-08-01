import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";

export function useDeleteDoctor() {
  const { token } = useAuth();
  const openNotification = useNotification();

  const deleteDoctor = async (id) => {
    try {
      const response = await axios.delete(`doctors/delete-doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { success, message } = response.data;
      if (success) {
        openNotification("success", message, "Success!");
      } else {
        openNotification("error", message, "Something went wrong...");
      }
    } catch (err) {
      console.log(err);
      openNotification("error", err.message, "Something went wrong...");
    }
  };

  return { deleteDoctor };
}
