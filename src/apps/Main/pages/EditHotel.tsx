import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Hotel } from "../../Shared/domain/Hotel";

type EditHotelProps = object;

const EditHotel: FC<EditHotelProps> = () => {
  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [idHotel, setIdHotel] = useState<string>("");
  const url = import.meta.env.VITE_BACK_URL;

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

  const navigate = useNavigate();
  const handleHotel: (event: ChangeEvent<HTMLInputElement>) => void = async (
    e
  ) => {
    const hotelName = e.target.value;
    setIdHotel(hotelName);
    const hotel = hotels.find((h) => h.name === hotelName);

    if (hotel) {
      setData(hotel);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const handleRanking: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = +e.target.value;
    setData((previousState) => ({
      ...previousState,
      ranking: value,
    }));
  };

  const onEdit: () => void = async () => {
    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/backoffice/hotels/${data.id}`;
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
                  Editar hotel existente
                </h2>
                <p className="text-center pt-4 font-serif">
                  Selecciona el hotel y corrige la informacion necesaria
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre:
                </label>
                <input
                  id="name"
                  placeholder="# unico de habitacion"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.name}
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
                  value={data.photo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Pais:
                </label>
                <input
                  placeholder="Enlace de la foto"
                  id="country"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  Ciudad:
                </label>
                <input
                  id="city"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Direccion:
                </label>
                <input
                  id="address"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 flex">
              <p className="block text-gray-700 font-bold text-sm mr-3">Ranking:</p>
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
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              {pass && (
                <div className="text-green-500 text-sm mb-4">{pass}</div>
              )}

              <button
                className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={onEdit}
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

export default EditHotel;
