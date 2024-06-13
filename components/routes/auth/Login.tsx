import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import loginbg from "@/assets/illustrations/login_bg.svg";
import InputText from "@/components/share/InputText";
import Button from "@/components/share/Button";
import Icon from "@/components/icon/Index";
import { loginUser, getUser } from "@/components/utils/auth/auth.server";
import { NextApiRequest, NextApiResponse } from "next";

type ResErrors = {
  message: string;
  errorContent: string;
};
type AuthData = {
    user: string;
    password: string;
  };
export const action = async ({ req , res } : {req: NextApiRequest; res: NextApiResponse} ) => {
const { user, password } = req.body;
if (!user || !password) {
    return res.status(400).json({ error: 'Se requiere nombre de usuario y contraseña' });
  }
  const authData: AuthData = {
    user,
    password,
  }
  try {
    const users = await loginUser(authData, req, res);
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(500).json({ error: 'Error de autenticación' });
  }
};

export const loader = async ({ request }: { request: NextApiRequest }) => {
    const router = useRouter();
  const token = await getUser(request);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getUser(request);
      if (token) {
        router.push('/');
      }
    };
    checkAuth();
  }, [request, router]);
};

const dataForm = {
  user: "",
  password: "",
};

const Login = () => {
  const [resErrors, setResErrors] = useState<ResErrors | null>(null);
  const [form, setForm] = useState(dataForm);

  const handleFormData = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    textField: string
  ) => {
    const { value } = target;
    setForm({ ...form, [textField]: value });
  };

  const onSubmit = () => {
    axios
      .post(`http://localhost:8000/api/v1/student/login`, form)
      .catch((error) => {
        if (error.response && error.response.data) {
          setResErrors(error.response.data);
        } else {
            console.error('Error desconocido al intentar iniciar sesion', error)
        }
      });
  };

  return (
    <div className="relative h-screen w-full bg-gray-200 lg:bg-cyan-500">
      <img src={loginbg} alt="" className="absolute bottom-0 w-full z-10" />
      <div className="flex items-center justify-center h-full w-full">
        <div className="hidden lg:block w-2/3 h-[90%]">
          <motion.img
            className="h-full mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            src="/Image/education.jpg"
            alt="Login"
          />
        </div>
        <div className="flex flex-col bg-white drop-shadow-lg h-2/3 md:h-4/5 lg:h-full w-10/12 lg:w-1/3 p-4 lg:p-0 items-center justify-center lg:rounded-l rounded">
          <img className=" w-4/5 lg:w-3/5" src="/image/logo.jpg" alt="logo" />
          <form
            className="flex flex-col gap-5 items-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="flex flex-col items-center w-[90%] lg:w-4/5">
              {resErrors?.message && (
                <span className="text-error text-sm">{resErrors.message}</span>
              )}
              <div className="flex items-center gap-4 w-full sm:w-10/12 md:w-10/12 lg:w-full">
                <Icon iconName="IdCard" className="fill-primary-color" />
                <InputText
                  id="user"
                  htmlFor="user"
                  name="user"
                  placeholder="DNI"
                  label="DNI"
                  onChange={(event) => handleFormData(event, "user")}
                />
              </div>
            </div>
            <div className="flex flex-col items-center w-[90%] lg:w-4/5">
              <div className="flex items-center gap-4 w-full sm:w-10/12 md:w-10/12 lg:w-full">
                <Icon iconName="Lock" className="fill-primary-color" />
                <InputText
                  label="Contraseña"
                  placeholder="contraseña"
                  htmlFor="password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  onChange={(event) => handleFormData(event, "password")}
                />
              </div>
            </div>
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              name="_action"
              value="login"
              text="Ingresar"
              className=" justify-center bg-secondary-color py-2 text-white w-5/6 sm:w-8/12 md:w-2/5 rounded-xl"
              onClick={() => {}}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
