import { FC,} from "react";
import { useNavigate,} from "react-router-dom";

// import Button from "../../Shared/Components/Button";

type SelectedHotelProps = object;

const SelectedHotel: FC<SelectedHotelProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="h-screen w-full overflow-hidden">
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
          <div className="max-w-lg mx-auto p-10 bg-white rounded shadow-md">
            <h2 className="text-center text-lg font-bold mb-4">
              Configuracion de hoteles:
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-4 justify-between">
              <div className="w-full md:w-1/2 xl:w-max p-6 text-center bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-6">Hoteles:</h3>
                <a
                  onClick={() => navigate("/backoffice/hotels/NewHotel")}
                  className="block bg-gray-500 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded mb-2 cursor-pointer"
                >
                  Crear Hotel
                </a>
                <a
                  onClick={() => navigate("/backoffice/hotels/editHotel")}
                  className="block bg-black hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 cursor-pointer"
                >
                  Editar Hotel
                </a>
                <a
                  onClick={() => navigate("/backoffice/hotels/deleteHotel")}
                  className="block bg-white hover:bg-gray-100 text-black hover:text-red-500 font-bold py-2 px-4 rounded border border-gray-300 cursor-pointer"
                >
                  Eliminar Hotel
                </a>
              </div>
              <div className="w-full md:w-1/2 xl:w-max p-6 text-center bg-gray-100 rounded-lg mt-4 md:mt-0">
                <h3 className="text-lg font-bold mb-6">Habitaciones:</h3>
                <a
                  onClick={() => navigate("/backoffice/hotels/NewRoom")}
                  className="block bg-gray-500 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded mb-2 cursor-pointer"
                >
                  Crear habitacion
                </a>
                <a
                  onClick={() => navigate("/backoffice/hotels/editRoom")}
                  className="block bg-black hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 cursor-pointer"
                >
                  Editar habitacion
                </a>
                <a
                  onClick={() => navigate("/backoffice/hotels/deleteRoom")}
                  className="block bg-white hover:bg-gray-100 text-black hover:text-red-500 font-bold py-2 px-4 rounded border border-gray-300 cursor-pointer"
                >
                  Eliminar habitacion
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectedHotel;
