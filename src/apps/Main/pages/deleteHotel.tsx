import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Hotel } from "../../Shared/domain/Hotel";

import HotelCard2 from '../sections/HotelCard2';

type DeleteHotelProps = object;

const deleteHotel: FC<DeleteHotelProps> = () => {
  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [idHotel, setIdHotel] = useState<string>("");
  const url = import.meta.env.VITE_BACK_URL;
  const navigate = useNavigate();

  const [hotels, setHotels] = useState<Array<Hotel>>([]);
  const [data, setData] = useState<Hotel>({
    id: "",
    name: "",
    description: "",
    photo: "",
    country: "",
    city: "",
    address: "",
    ranking: 0,
  });

  const getAllHotels: () => Promise<Array<Hotel>> = useCallback(async () => {
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

  const handleHotel: (event: ChangeEvent<HTMLInputElement>) => void = async (
    e
  ) => {
    const hotelName = e.target.value;
    setIdHotel(hotelName);
    const hotel = hotels.find((h) => h.name === hotelName);

    if (hotel) {
      setData(hotel);
    }
    console.log(data);
  };

  const onDelete: () => void = async () => {
    const confirmDelete = window.confirm(
        "¿Estás seguro de que deseas eliminar este hotel? Esta acción no se puede deshacer.")
        ;

    if (confirmDelete) {
      setLoading(true);
      
      const endpoint = `${url}/backoffice/hotels/${data.id}`;
      const request = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data), 
      });

      const response = await request.json();

      if ("success" in response && response.success) {
        setPass(`${response.message}, será redirigido al menú de configuración.`);
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
                  Eliminar hotel
                </h2>
                <p className="text-center pt-4 font-serif">
                  Selecciona el hotel a eliminar de la base de datos
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
                  id="hoteId"
                  list="hoteles"
                  className="shadow appearance-none border font-semibold rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <div className="flex justify-center items-center mx-auto mt-2 mb-6">
                  {idHotel ? (
                    <HotelCard2 key={idHotel} hotel={data}/>
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

export default deleteHotel;