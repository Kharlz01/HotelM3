import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Room } from "../../Shared/domain/Room";

import RoomCard from '../sections/RoomCard';

type DeleteHotelProps = object;

const deleteRoom: FC<DeleteHotelProps> = () => {
    const [error, setError] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const [idRoom, setIdRoom] = useState<string>("");
    const url = import.meta.env.VITE_BACK_URL;
    const navigate = useNavigate();
  
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
  
    const handleRoom: (event: ChangeEvent<HTMLInputElement>) => void = async (e) => {
      const roomName = e.target.value;
      setIdRoom(roomName);
      const room = rooms.find((r) => r.codeName === roomName);
  
      if (room) {
        setData(room);
      }
    };
  
    const onDelete: () => void = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar este hotel? Esta acción no se puede deshacer."
        );

        if (confirmDelete) {
            setLoading(true);
  
            const endpoint = `${url}/backoffice/rooms/${data.codeName}`;
            console.log(data.id);
            console.log(data);
            
            
            const request = await fetch(endpoint, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(data),
            });
            
        
            const response = await request.json();

            console.log(response);

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
                  Eliminar habitacion
                </h2>
                <p className="text-center pt-4 font-serif">
                  Selecciona la habitacion a eliminar de la base de datos
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="hotelId"
                >
                  Habitacion:
                </label>
                <input
                  id="roomId"
                  list="rooms"
                  className="shadow appearance-none border font-semibold rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={idRoom}
                  onChange={handleRoom}
                />
                <datalist id="rooms">
                  {rooms &&
                    rooms.length > 0 &&
                    rooms.map((room) => (
                      <option key={room.id} value={`${room.codeName}`} />
                    ))}
                </datalist>
              </div>
              <div className="flex justify-center items-center mx-auto mt-2 mb-6">
                  {idRoom ? (
                    <RoomCard key={idRoom} room={data}/>
                  ) : <></>}
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              {pass && (
                <div className="text-green-500 text-sm mb-4">{pass}</div>
              )}

              <button
                className="bg-cyan-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={onDelete}
              >
                {!loading ? "Eliminar" : "Confirmar"}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default deleteRoom;