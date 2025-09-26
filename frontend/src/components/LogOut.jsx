import { useContext } from "react";
import { AuthContext } from "../context/contextCreator";
import axios from "axios";
import toast from "react-hot-toast";

const LogOut = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/sign-out",
        undefined,
        {
          validateStatus: (status) => status < 500,
          withCredentials: true, //to send and recive cookies
        }
      );

      if (data.success) {
        setUser(null);
        return toast.success("Sign out successfully");
      }
      if (!data.success) return toast.error(data.message);
    } catch (error) {
      toast.error("something went wrong, Please try again later", error);
    }
  };

  return (
    <button
      className="bg-red-600 px-3 py-2 border-none rounded-md text-white font-bold cursor-pointer hover:bg-red-600/70 active:scale-95"
      onClick={handleLogOut}
    >
      LogOut
    </button>
  );
};

export default LogOut;
