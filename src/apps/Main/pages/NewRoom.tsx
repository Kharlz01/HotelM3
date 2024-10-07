import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Hotel } from "../../Shared/domain/Hotel";

interface Room {
  photos: string;
  codeName: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  bedsQuantity: number;
  hotelId: string;
}

type RoomProps = object;

const NewHotel: FC<RoomProps> = () => {
  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [idHotel, setIdHotel] = useState<string>("");

  const [hotels, setHotels] = useState<Array<Hotel>>([]);

  const getAllHotels: () => Promise<Array<Hotel>> = useCallback(async () => {
    const url = import.meta.env.VITE_BACK_URL;

    const request = await fetch(`${url}/hotels`, {
      method: "GET",
    });

    const response = await request.json();
    return response.data as Array<Hotel>;
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getAllHotels()
        .then(setHotels)
        .catch((err) => console.error(err))
        .finally();

    return () => {
      isSubscribed = false;
    };
  }, [getAllHotels]);

  const navigate = useNavigate();

  const [data, setData] = useState<Room>({
    photos: "",
    codeName: "",
    description: "",
    pricePerNight: 0,
    capacity: 0,
    bedsQuantity: 0,
    hotelId: "",
  });

  const handleHotel: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setIdHotel(value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const onCreate: () => void = async () => {
    setLoading(true);

    const value2 = hotels.flat().find((hotel) => hotel.name === idHotel);
    setData({...data, hotelId: `${value2 ? value2.id : ""}`});

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    if (
      data.pricePerNight <= 0 ||
      data.capacity <= 0 ||
      data.bedsQuantity <= 0
    ) {
      setError("Hay campos numericos con valores inferiores a 1");
      throw new Error(`Valor numero invalido`);
    }

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/backoffice/rooms`;
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
      setPass(`${response.message}, sera redirigido al menu de configuracion.`);
      setLoading(false);

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
                  Creacion de nueva habitacion
                </h2>
                <p className="text-center pt-4 font-serif">
                  Recuerda llenar todos los campos para la integración de la
                  habitacion
                </p>
              </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="hotelId"
                  >
                    Hotel:
                  </label>
                  <input
                    id="hotelId"
                    list="hoteles"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={idHotel}
                    onChange={handleHotel}
                  />
                  <datalist id="hoteles">
                    {hotels &&
                      hotels.length > 0 &&
                      hotels.map((hotel) => (
                        <option key={hotel.id} value={`${hotel.name}`} />
                      ))}
                  </datalist>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="codeName"
                  >
                    Identificador de la habitacion:
                  </label>
                  <input
                    id="codeName"
                    placeholder="# unico de habitacion"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={data?.codeName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Descripcion:
                  </label>
                  <input
                    id="description"
                    placeholder="..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={data?.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="photos"
                  >
                    Foto de la habitacion:
                  </label>
                  <input
                    placeholder="Enlace de la foto"
                    id="photos"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={data?.photos}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Precio por noche:
                  </label>
                  <input
                    id="pricePerNight"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={data?.pricePerNight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Capacidad:
                  </label>
                  <input
                    id="capacity"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={data?.capacity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Cantidad de camas:
                  </label>
                  <input
                    id="bedsQuantity"
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={data?.bedsQuantity}
                    onChange={handleInputChange}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                {pass && (
                  <div className="text-green-500 text-sm mb-4">{pass}</div>
                )}

                <button
                  className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit" onClick={onCreate}
                >
                  {!loading ? "Confirmar" : "Cargando..."}
                </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default NewHotel;
