import { FC, ComponentProps, } from "react";

import { useNavigate } from "react-router-dom";

import { Reservation } from "../../Shared/domain/Reservation";

type ReservationCardProps = object &
  ComponentProps<"article"> & {
    reservation: Reservation;
  };

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Formatear la fecha
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

const ReservationCard: FC<ReservationCardProps> = ({ reservation }) => {
  const url = import.meta.env.VITE_BACK_URL;
  const navigate = useNavigate();

  const onUpdate: () => void = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas cancelar su reserva? Esta acción no se puede deshacer."
    );
    
    if (confirmDelete) {
        // Crea un nuevo objeto de datos con el estado actualizado
        const updatedData = {
          ...reservation,
          status: "cancel",
        };
      
        console.log(updatedData);
      
        const endpoint = `${url}/reservations/${reservation.id}`;
        const request = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData),
        });
      
        const response = await request.json();
      
        if ("success" in response && response.success) {
          console.log(response);
          navigate(`/.`);
        } else {
          console.log(response.message);
        }
      }
      
  };

  return (
    <article className="my-4 p-2 bg-white rounded shadow-md border-4 border-dashed border-blue-400">
      <div className="h-full w-full p-4 flex flex-col">
        <div className="flex justify-start items-center">
          <div className="flex items-center justify-start mr-4">
            <img
              className="border-4 rounded-xl h-[220px] p-2"
              src={`${reservation.room.photos}`}
              alt="room"
            />
          </div>
          <div>
            <div className="font-bold">
              Fecha inicial:{" "}
              <span className="font-normal">
                {formatDate(reservation.startDate)}
              </span>
            </div>
            <div className="font-bold">
              Fecha final:{" "}
              <span className="font-normal">
                {formatDate(reservation.endDate)}
              </span>
            </div>
            <div className="font-bold">
              Cantidad de noches:{" "}
              <span className="font-normal">{reservation.nightsQuantity}</span>
            </div>
            <div className="font-bold">
              Total: <span className="font-normal">${reservation.total}</span>
            </div>
            <div className="font-bold">
              Habitacion:{" "}
              <span className="font-normal">{reservation.room.codeName}</span>
            </div>
            {reservation.status == "active" && (
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 cursor-default">
                Activa
              </button>
            )}
            {reservation.status == "inactive" && (
              <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded mt-2 cursor-default">
                Inactiva
              </button>
            )}
            {reservation.status == "cancel" && (
              <button className="bg-red-600 text-white font-bold py-2 px-4 rounded mt-2 cursor-default">
                Cancelada
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {reservation.status == "active" && (
            <button
              onClick={() => onUpdate()}
              className="bg-gray-300 border hover:bg-gray-400 hover:border-red-600 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar Reserva
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ReservationCard;
