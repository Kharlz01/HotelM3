import { ChangeEvent, FC, useRef, useState } from "react";
// import { useAuth } from "../../Auth/mode/AuthUser";
import { useNavigate } from "react-router-dom";

interface Signup {
  givenName: string;
  lastName: string;
  email: string;
  password: string;
}

type SignupProps = object;

const Signup: FC<SignupProps> = () => {
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { setToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<Signup>({
    givenName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleGivenName: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      givenName: value,
    }));
  };

  const handleLastname: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      lastName: value,
    }));
  };

  const handleEmail: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      email: value,
    }));
  };

  const handlePassword: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      password: value,
    }));
  };

  const onSubmit: () => void = async () => {
    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    if (data?.password?.length < 8) {
      setError("La contraseña tiene menos de 8 caracteres");
      throw new Error(error);
    }

    if (data?.password !== confirmPasswordRef?.current?.value) {
      setError("Las contraseñas no coinciden");
      throw new Error(error);
    }

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/auth/signup`;
    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.success) {
      setPass(`${response.message} Sera redirigido al login.`);
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <section className="h-screen w-full overflow-hidden">
      <div className="size-full max-w-screen-2xl mx-auto">
        <div className="size-full flex justify-center items-center">
          <article className="h-auto w-full max-w-screen-md p-12 shadow-md border border-black rounded-lg">
            <div className="size-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-center text-4xl font-bold">
                  Registrate ahora
                </h2>
                <p className="text-center pt-4 font-serif">
                  Crea una cuenta ahora para poder gestionar reservaciones y
                  mas...
                </p>
              </div>
              <div className="size-full grid grid-cols-1 gap-y-4">
                <input
                  placeholder="Nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.givenName}
                  onChange={handleGivenName}
                />
                <input
                  placeholder="Apellido"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.lastName}
                  onChange={handleLastname}
                />
                <input
                  placeholder="Correo electronico"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  value={data?.email}
                  onChange={handleEmail}
                />
                <input
                  placeholder="Contraseña"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  value={data?.password}
                  onChange={handlePassword}
                />
                <input
                  ref={confirmPasswordRef}
                  placeholder="Confirmar contraseña"
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                {pass && (
                  <div className="text-green-500 text-sm mb-4">{pass}</div>
                )}
                <div className="flex justify-between">
                  <button
                    className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-min rounded focus:outline-none focus:shadow-outline"
                    onClick={() => onSubmit()}
                  >
                    {!loading ? "Enviar" : "Cargando..."}
                  </button>
                  <p className="text-gray-600 text-sm mt-4">
                    ¿Ya tienes una cuenta?
                    <span> </span>
                    <a
                      href="./login"
                      className="text-blue-500 hover:text-blue-800"
                    >
                      Inicia Sesión
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Signup;
