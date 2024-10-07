import { FC, ComponentProps } from "react";

import { Room } from "../../Shared/domain/Room";

type RoomCardProps = object &
  ComponentProps<"article"> & {
    room: Room;
  };

const RoomCard: FC<RoomCardProps> = ({ room }) => {

  return (
    <article className="my-4 p-2 rounded shadow-md border-4 border-double border-blue-400 bg-violet-200">
      <div className="h-full w-full p-4 flex flex-col">
        <div className="flex justify-start items-center">
          <div className="flex items-center justify-start mr-4">
            <img
              className="border-4 border-gray-500 rounded-xl h-[220px] p-2"
              src={`${room.photos}`}
              alt="room"
            />
          </div>
          <div>
            <div className="font-bold">
              Habitacion: 
              <span className="font-normal"> {room.codeName}</span>
            </div>
            <div className="font-bold">
              Descripcion:
              <span className="font-normal"> {room.description}
              </span>
            </div>
            <div className="font-bold">
              Precio por noche: 
              <span className="font-normal"> ${room.pricePerNight}
              </span>
            </div>
            <div className="font-bold">
              Capacidad:
              <span className="font-normal"> {room.capacity}</span>
            </div>
            <div className="font-bold">
              Cantidad de cama: <span className="font-normal"> {room.bedsQuantity}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
