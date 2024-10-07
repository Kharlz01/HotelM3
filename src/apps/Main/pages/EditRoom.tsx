import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Room } from "../../Shared/domain/Room";

// interface Rooms {
//   id: string;
//   photos: string;
//   codeName: string;
//   description: string;
//   pricePerNight: number;
//   capacity: number;
//   bedsQuantity: number;
// }

type RoomProps = object;

const EditRooms: FC<RoomProps> = () => {
  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [idRoom, setIdRoom] = useState<string>("");
  const url = import.meta.env.VITE_BACK_URL;

  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [data, setData] = useState<Room>({
    id: "",
    photos: "",
    codeName: "",
    description: "",
    pricePerNight: 0,
    capacity: 0,
    bedsQuantity: 0,
  });

  const getAllRooms: () => Promise<Array<Room>> = useCallback(async () => {

    const request = await fetch(`${url}/search`, {
      method: "GET",
    });

    const response = await request.json();
    console.log(response.data.rooms);
    return response.data.rooms as Array<Room>;
    
  }, []);
  

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getAllRooms()
        .then(setRooms)
        .catch((err) => console.error(err))
        .finally();

    return () => {
      isSubscribed = false;
    };
  }, [getAllRooms]);

  const navigate = useNavigate();

  const handleRoom: (event: ChangeEvent<HTMLInputElement>) => void = async (e) => {
    const roomName = e.target.value;
    setIdRoom(roomName);
    const room = rooms.find((r) => r.codeName === roomName);

    if (room) {
      setData(room);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const onCreate: () => void = async () => {
    setLoading(true);

    const value2 = rooms.flat().find((room) => room.codeName === idRoom);
    // setData({...data, hotelId: `${value2 ? value2.id : ""}`});

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value2} invalido para la columna ${key}`);
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

    const endpoint = `${url}/backoffice/rooms/${data.codeName}`;
    console.log(data.id);
    
    const request = await fetch(endpoint, {
      method: "PUT",
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
                  Editar habitacion existente
                </h2>
                <p className="text-center pt-4 font-serif">
                  Rellena los espacion necesarios de la habitacion
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="roomId"
                >
                  Habitacion:
                </label>
                <input
                  id="roomId"
                  list="rooms"
                  className="shadow appearance-none border font-bold rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={idRoom}
                  onChange={handleRoom}
                />
                <datalist id="rooms">
                  {rooms &&
                    rooms.length > 0 &&
                    rooms.map((room) => (
                      <option key={room.id} value={room.codeName} />
                    ))}
                </datalist>
              </div>
              {/* <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="roomId"
                >
                  Habitacion:
                </label>
                <input
                  id="roomId"
                  list="rooms"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={!idHotel}
                  value={idRoom}
                  onChange={handleRoom}
                />
                <datalist id="rooms">
                  {rooms.length > 0 &&
                    rooms.map((room) => (
                      <option key={room.id} value={room.codeName} />
                    ))}
                </datalist>
              </div> */}
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

export default EditRooms;