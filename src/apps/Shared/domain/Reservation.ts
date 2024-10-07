export interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  nightsQuantity: number;
  total: number;
  userId: string;
  roomId: string;
  room: {id:string, codeName:string, photos:string}
}
