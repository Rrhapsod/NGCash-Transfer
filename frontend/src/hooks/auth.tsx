import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export interface UserData {
  user?: string;
  token?: string;
}

export interface UserProps {
  id?: string;
  username: string;
  password: string;
}

export interface ContextType {
  user?: UserProps;
  signIn: ({}: UserProps) => void;
  signOut: () => void;
}

const AuthContext = createContext<ContextType>({ signIn({}) {}, signOut() {} });

function AuthProvider({ children }: any) {
  const [data, setData] = useState<UserData>({});

  async function signIn({ username, password }: UserProps) {
    try {
      const response = await api.post("/sessions", { username, password });
      const { user, token } = response.data;

      localStorage.setItem("@ngcashtransfer:user", JSON.stringify(user));
      localStorage.setItem("@ngcashtransfer:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@ngcashtransfer:user");
    localStorage.removeItem("@ngcashtransfer:token");

    setData({});
  }

  useEffect(() => {
    const user = localStorage.getItem("@ngcashtransfer:user");
    const token = localStorage.getItem("@ngcashtransfer:token");

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        user: JSON.parse(user),
        token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
