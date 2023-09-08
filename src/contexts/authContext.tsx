"use client";

import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { RegisterUser } from "../components/RegisterForm";
import { LoginUser } from "../components/LoginForm";
import api from "../services/api";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  user_id: string;
  user_data: any;
  getUser: (id: string) => any;
  register: (registerData: RegisterUser) => void;
  login: (loginData: LoginUser) => void;
  logout: () => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const [user_id, setUserId] = useState("");
  const [user_data, setUserData] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const id: string | undefined = cookies["serenity.app.user_id"];
    if (id) {
      setUserId(id);
      getUser(id);
    }
  }, []);

  const router = useRouter();

  const register = (registerData: RegisterUser) => {
    api
      .post("/users", registerData)
      .then(() => {
        toast.success("Usuário cadastrado com sucesso!");
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao cadastrar usuário");
      });
  };

  const getUser = async (id: string) => {
    const cookies = parseCookies();
    const token = cookies["serenity.app.token"];

    try {
      const response = await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const login = (loginData: LoginUser) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setUserId(response.data.user_id);
        console.log(response);
        setCookie(null, "serenity.app.token", response.data.token),
          {
            maxAge: 31536 * 1000,
            path: "/",
          };
        setCookie(null, "serenity.app.user_id", response.data.user_id),
          {
            maxAge: 31536 * 1000,
            path: "/",
          };
        toast.success("Login efetuado com sucesso!");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao efetuar login");
      });
  };

  const logout = () => {
    // Limpar os cookies
    destroyCookie(null, "serenity.app.token");
    destroyCookie(null, "serenity.app.user_id");

    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ register, getUser, login, logout, user_id, user_data }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
