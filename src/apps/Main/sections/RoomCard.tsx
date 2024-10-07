import { FC, useCallback, ComponentProps } from "react";

import { Room } from "../../Shared/domain/Room";

type RoomCardProps = object &
  ComponentProps<"article"> & {
    room: Room;
  };

const RoomCard: FC<RoomCardProps> = ({ room }) => {

  const handleLimitDescription = useCallback(
    (limit: number) => {
      if (room?.description?.length > limit) {
        return `${room?.description?.slice(0, limit)}...`;
      }
      return room.description;
    },
    [room.description]
  );

  return (
    <article className="grow min-h-[280px] min-w-[250px] h-full w-full max-h-[370px] max-w-[310px] bg-white rounded-xl border border-gray-300 shadow-md">
      <div className="h-full w-full p-4 flex flex-col">
        <div className="relative w-full h-[120px]">
          <img
            className="h-full w-full object-cover"
            src={room?.photos}
            alt={room?.codeName}
          />
        </div>
        <div className="size-full flex flex-col">
          <h3 className="font-primary-alt font-bold text-2xl">Codigo: {room?.codeName}</h3>
          <span className="mt-1 text-sm text-gray-700">
            {handleLimitDescription(100)}
          </span>
          
          <p className="mt-1 text-sm font-bold text-gray-700">Precio por noche: 
            <span className="mt-1 text-xs text-gray-500 font-normal">
                {room.pricePerNight}
            </span>
          </p>
          
          <p className="mt-1 text-sm font-bold text-gray-700">
            Capacidad: 
            <span className="mt-1 text-xs text-gray-500 font-normal">
                {room.capacity}
                </span>
          </p>
          
          <p className="mt-1 text-sm font-bold text-gray-700">
            Cantidad de camas: 
            <span className="mt-1 text-xs text-gray-500 font-normal">
                {room.bedsQuantity}
                </span>
          </p>
          
          <div className="mt-auto ml-auto">
          </div>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
