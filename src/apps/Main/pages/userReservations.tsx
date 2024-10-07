import { FC, useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Button from "../../Shared/Components/Button";

import { User } from "../../Shared/domain/User";
import { Reservation } from "../../Shared/domain/Reservation";
import ReservationCard from "../sections/ReservationCard";

type SelectedHotelProps = object;

const SelectedHotel: FC<SelectedHotelProps> = () => {

  const [user, setUser] = useState<User | null>(null);

  const [reservation, setReservations,] = useState<Array<Reservation>>([]);

  const url = import.meta.env.VITE_BACK_URL;

  const userInfo = useCallback(async (): Promise<User | null> => {

    try {
      const request = await fetch(`${url}/users/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!request.ok) {
        console.error("Algo salio mal: ", request.statusText);
        return null;
      }

      const response = await request.json();
      
      return response.data;

    } catch (error) {
      console.error("Algo salio mal, error:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    userInfo()
      .then((data) => {
        if (isSubscribed) {
          setUser(data);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      isSubscribed = false;
    };
  }, [userInfo]);

  const getAllReservations: () => Promise<Array<Reservation>> = useCallback(async () => {

    const request = await fetch(`${url}/reservations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const response = await request.json();
    return response.data as Array<Reservation>;
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getAllReservations()
        .then(setReservations)
        .catch(err => console.error(err))
        .finally()
    
    return () => {
      isSubscribed = false;
    }
  }, [getAllReservations,]);

  return (
    <>
      <section>
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:px-8 xl:px-12">
          <h1 className="text-3xl font-bold mb-4">Mis reservas</h1>
          <p className="mb-4">Usuario: {user?.email}</p>

          <div className="space-y-4">
            <div className="p-4">
            {reservation ? reservation.map(pass => (
                    <ReservationCard key={pass.id} reservation={pass} />
                )) : (<p>El usuario no tiene reservas registradas. Intente de nuevo mas tarde.</p>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectedHotel;
