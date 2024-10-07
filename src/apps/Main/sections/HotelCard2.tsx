import { FC, useCallback, ComponentProps } from "react";

import { Hotel } from "../../Shared/domain/Hotel";

type HotelCardProps = object &
  ComponentProps<"article"> & {
    hotel: Hotel;
  };

const HotelCard2: FC<HotelCardProps> = ({ hotel }) => {

  const handleLimitDescription = useCallback(
    (limit: number) => {
      if (hotel?.description?.length > limit) {
        return `${hotel?.description?.slice(0, limit)}...`;
      }
      return hotel.description;
    },
    [hotel.description]
  );

  return (
    <article className="grow min-h-[280px] min-w-[250px] h-full w-full max-h-[370px] max-w-[310px] bg-white rounded-xl border border-gray-300 shadow-md">
      <div className="h-full w-full p-4 flex flex-col">
        <div className="relative w-full h-[120px]">
          <img
            className="h-full w-full object-cover"
            src={hotel?.photo}
            alt={hotel?.name}
          />
        </div>
        <div className="size-full flex flex-col">
          {hotel?.ranking && (
            <span className="flex mt-2">
              {[...Array(hotel.ranking)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545-4.755-4.634 6.586-.957L10 0l2.924 5.954 6.586.957-4.755 4.634 1.123 6.545z" />
                </svg>
              ))}
            </span>
          )}
          <h3 className="font-primary-alt font-bold text-2xl">{hotel?.name}</h3>
          <span className="mt-1 text-sm text-gray-700">
            {handleLimitDescription(100)}
          </span>
          <span className="mt-1 text-xs text-gray-500">
            {hotel.city}, {hotel.country}
          </span>
          <div className="mt-auto ml-auto">
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelCard2;
