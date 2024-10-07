import { useState, useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Auth/mode/AuthUser";
import { User } from "../domain/User";

import Button2 from "./Button2";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // Usuario, se deja null para que no genere errores el return
  const [user, setUser] = useState<User | null>(null);

  const { logout } = useAuth();

  const userInfo = useCallback(async (): Promise<User | null> => {
    const url = import.meta.env.VITE_BACK_URL;

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

  return (
    <section>
      <Button2 onClick={() => setIsOpen(!isOpen)}>Perfil</Button2>
      {isOpen && (
        <div className="absolute right-3 mt-2 w-48 bg-white border rounded-md shadow-lg">
          <div className="flex items-center mb-4">
            <div className="ml-4">
              <h3 className="text-lg font-medium pt-2">
                {user && `${user.givenName} ${user.lastName}`}
              </h3>
              <p className="text-gray-500">{user && user.email}</p>
              {user?.isAdmin && (<p className="text-sky-600">Administrador</p>)}
            </div>
          </div>
          <ul className="space-y-2">
            <li>
              <a
                onClick={() => (navigate(`/reservations/${user?.id}`), setIsOpen(!isOpen))}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                Mis reservas
              </a>
            </li>
            {user?.isAdmin && (
              <li>
                <a
                  onClick={() => (navigate("/backoffice/hotels"), setIsOpen(!isOpen))}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  Ajustes Hoteleria
                </a>
              </li>
            )}
            <li>
              <a
                onClick={() => (navigate(`/settings/${user?.id}`), setIsOpen(!isOpen))}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                Mis datos
              </a>
            </li>
          </ul>
          <a
            href="#"
            className="block mt-2 py-2 text-center text-blue-500 hover:underline hover:text-red-500"
            onClick={() => logout()}
          >
            Cerrar sesión
          </a>
        </div>
      )}
    </section>
  );
};

export default ProfileMenu;
