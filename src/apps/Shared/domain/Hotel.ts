import { Room, } from './Room';

export interface Hotel {
  id: string;
  name: string;
  description: string;
  photo: string;
  country: string;
  city: string;
  address: string;
  ranking: number;
  rooms?: Array<Room>;
}