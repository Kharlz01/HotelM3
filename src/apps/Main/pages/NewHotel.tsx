import { ChangeEvent, FC, useState } from "react";

import { useNavigate } from "react-router-dom";

interface Hotel {
  name: string;
  description: string;
  photo: string;
  country: string;
  city: string;
  address: string;
  ranking: number;
}

type HotelProps = object;

const NewHotel: FC<HotelProps> = () => {
  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { setToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<Hotel>({
    name: "",
    description: "",
    photo: "",
    country: "",
    city: "",
    address: "",
    ranking: 0,
  });

  const handleName: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      name: value,
    }));
  };

  const handleDescription: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      description: value,
    }));
  };

  const handlePhoto: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      photo: value,
    }));
  };

  const handleCountry: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      country: value,
    }));
  };

  const handleCity: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      city: value,
    }));
  };

  const handleAddress: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      address: value,
    }));
  };

  const handleRanking: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = +e.target.value;
    setData((previousState) => ({
      ...previousState,
      ranking: value,
    }));
  };

  const onCreate: () => void = async () => {
    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/backoffice/hotels`;
    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.success) {
      setPass(`${response.message}, sera redirigido al menu de configuracion.`);
      setLoading(false);
      setError("");

      setTimeout(() => {
        navigate("/backoffice/hotels");
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
                  Creacion de nuevo hotel
                </h2>
                <p className="text-center pt-4 font-serif">
                  Recuerda llenar todos los campos para la integración del hotel
                </p>
              </div>
              <div className="size-full grid grid-cols-1 gap-y-4">
                <input
                  placeholder="Nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.name}
                  onChange={handleName}
                />
                <input
                  placeholder="Descripción"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.description}
                  onChange={handleDescription}
                />
                <input
                  placeholder="Enlace de la foto o vista previa"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="url"
                  value={data?.photo}
                  onChange={handlePhoto}
                />
                <input
                  placeholder="Pais"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.country}
                  onChange={handleCountry}
                />
                <input
                  placeholder="Ciudad"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.city}
                  onChange={handleCity}
                />
                <input
                  placeholder="Direccion"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data?.address}
                  onChange={handleAddress}
                />
                <div className="flex items-center">
                  <p className="block text-gray-700 font-bold mr-3">Ranking:</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="ranking"
                          value={star}
                          className="form-radio text-yellow-500"
                          checked={data.ranking === star}
                          onChange={handleRanking}
                        />
                        <svg
                          className="w-6 h-6 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545-4.755-4.634 6.586-.957L10 0l2.924 5.954 6.586.957-4.755 4.634 1.123 6.545z" />
                        </svg>
                      </label>
                    ))}
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                {pass && (
                  <div className="text-green-500 text-sm mb-4">{pass}</div>
                )}
                <div className="flex justify-between">
                  <button
                    className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-min rounded focus:outline-none focus:shadow-outline"
                    onClick={() => onCreate()}
                  >
                    {!loading ? "Enviar" : "Cargando..."}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default NewHotel;
