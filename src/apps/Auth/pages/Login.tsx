import { ChangeEvent, FC, useState, FormEvent } from "react";

// import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../Auth/mode/AuthUser";

interface User {
  email: string;
  password: string;
}

type LoginProps = object;

const Login: FC<LoginProps> = () => {
  // const navigate = useNavigate();

  // Se obtiene datos de usuario

  const [data, setData] = useState<User>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { setToken } = useAuth();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = import.meta.env.VITE_BACK_URL;
    setLoading(true);

    const endpoint = `${url}/auth/login`;

    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if ('success' in response && response.success) {
      localStorage.setItem("token", response.data.token);
      setToken(response.token);
      // navigate('/.');
      window.location.href = "/.";
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  return (
    <section className="h-screen w-full overflow-hidden">
      <div className="size-full flex justify-center items-center">
        <div className="bg-white shadow-md border border-gray-300 rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-4">Ingresa a tu cuenta</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo Electronico
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={data?.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Contraseña"
                value={data?.password}
                onChange={handleInputChange}
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <button
              className={`bg-cyan-500  hover:bg-blue-700 text-white 
                font-bold py-2 px-4 rounded focus:outline-none 
                focus:shadow-outline ${loading && ("animate-bounce mt-2")}`}
              type="submit"
            >
              {!loading ? "Confirmar" : "Cargando..."}
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-4">
            ¿No tienes una cuenta?
            <span> </span>
            <a href="./signup" className="text-blue-500 hover:text-blue-800">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
