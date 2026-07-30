import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";

export function useDeleteHospital() {
  const { token } = useAuth();
  const openNotification = useNotification();

  const deleteHospital = async (id) => {
    try {
      const response = await axios.delete(`hospitals/delete-hospital/${id}`, {
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

  return { deleteHospital };
}
