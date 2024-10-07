import {
  ChangeEvent,
  FC,
  // useRef,
  useState,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

type Reservation = {
  startDate: string;
  endDate: string;
  nightsQuantity: number;
  roomId: string;
};

type ReservationProps = object;

const Reservation: FC<ReservationProps> = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    roomId,
    // hotelId,
  } = useParams();

  const [data, setData] = useState<Reservation>({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    nightsQuantity: 1,
    roomId: roomId!,
  });

  const handleStartDate: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      startDate: value,
    }));
  };

  const handleEndDate: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      endDate: value,
    }));
  };

  const handleNightsQuantity: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = +e.target.value;
    setData((previousState) => ({
      ...previousState,
      nightsQuantity: value,
    }));
  };

  const onSubmit: () => void = async () => {
    setLoading(true);
    Object.entries(data).forEach(([value, key]) => {
      if (!value || value === "")
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
    });

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/reservations`;
    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if ("success" in response && response.success) {
      setError("");
      setPass(`${response.message}, sera redirigido al inicio.`);
      setLoading(false);

      setTimeout(() => {
        navigate("/.");
      }, 2000);
    } else {
      setError(response.message);
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-full overflow-hidden">
      <div className="size-full max-w-screen-2xl mx-auto">
        <div className="size-full flex justify-center items-center">
          <article className="h-auto w-full max-w-screen-md p-12 shadow-md border border-black rounded-lg">
            <div className="size-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-center text-4xl font-bold">
                  Crear reserva
                </h2>
              </div>
              <div className="size-full grid grid-cols-2 gap-y-4">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="email"
                >
                  Fecha de ingreso:
                </label>
                <input
                  type="datetime-local"
                  className="col-span-2"
                  value={data?.startDate}
                  onChange={handleStartDate}
                />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="email"
                >
                  Fecha de salida:
                </label>
                <input
                  type="datetime-local"
                  className="col-span-2"
                  value={data?.endDate}
                  onChange={handleEndDate}
                />
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="number"
                >
                  Cantidad de noches:
                </label>
                <input
                  type="number"
                  placeholder="1"
                  className="col-span-2"
                  value={data?.nightsQuantity}
                  onChange={handleNightsQuantity}
                />
                <div className="col-span-1">
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                {pass && (
                  <div className="text-green-500 text-sm mb-4">{pass}</div>
                )}
                  <button
                    className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-min rounded focus:outline-none focus:shadow-outline"
                    onClick={() => onSubmit()}
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

export default Reservation;
