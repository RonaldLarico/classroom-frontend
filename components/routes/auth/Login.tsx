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

const Login: React.FC = () => {
  const [resErrors, setResErrors] = useState<ResErrors | null>(null);
  const [form, setForm] = useState<AuthData>({ user: "", password: "" });

  const handleFormData = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    textField: string
  ) => {
    const { value } = target;
    setForm({ ...form, [textField]: value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/student/login`,
        form
      );
      const token = response.data.token; // Suponiendo que el token se obtiene de la respuesta
      if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/home'
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setResErrors(error.response.data);
      } else {
        console.error("Error desconocido al intentar iniciar sesión", error);
      }
    }
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
              onSubmit(e);
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
