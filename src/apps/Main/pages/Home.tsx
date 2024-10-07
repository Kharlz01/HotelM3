import { FC, useCallback, useEffect, useState, } from 'react';

import { Hotel, } from '../../Shared/domain/Hotel';
import HotelCard from '../sections/HotelCard';

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  const [hotels, setHotels,] = useState<Array<Hotel>>([]);

  const getAllHotels: () => Promise<Array<Hotel>> = useCallback(async () => {
    const url = import.meta.env.VITE_BACK_URL;

    const request = await fetch(`${url}/hotels`, {
      method: 'GET',
    });

    const response = await request.json();
    return response.data as Array<Hotel>;
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getAllHotels()
        .then(setHotels)
        .catch(err => console.error(err))
        .finally()
    
    return () => {
      isSubscribed = false;
    }
  }, [getAllHotels,]);

  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='size-full max-w-screen-2xl mx-auto px-6 py-6'>
        <div className='size-full flex flex-wrap gap-4'>
          {hotels && hotels.length > 0 && hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;