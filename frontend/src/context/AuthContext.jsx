import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ Children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {Children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
