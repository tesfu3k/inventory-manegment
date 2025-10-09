import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InviteEmploye = () => {
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  // useEffect once load
  /**
   * check if the id in the model is not expire or not submited then
   * in the api
   * - check if the id is exisit
   * - not expired or not submited if yes then show a message in the page "registration like arleady expired or submitted"
   * - other wise show the form and take the data then filep the isSubmited = true then save the data
   */
  // after save change the isSubmited true

  useEffect(() => {
    const validateURL = async () => {
      const { data } = await axios.get("", {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });
      if (!data.success) return setIsError(true);
    };
    validateURL();
  }, []);
  if (isError) return <>display error page here</>;
  return <div>InviteEmploye {id}</div>;
};

export default InviteEmploye;
