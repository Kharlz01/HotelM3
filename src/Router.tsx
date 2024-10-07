import {
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';

import Root from './Root';

const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: '',
    element: <Root/>,
    children: [
      {
        id: 'home',
        path: '',
        lazy: () => import('./apps/Main/pages/Home')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'searchResults',
        path: 'search',
        lazy: () => import('./apps/Main/pages/Results')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'hotel',
        path: 'hotel/:id',
        lazy: () => import('./apps/Main/pages/SelectedHotel')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'reservation',
        path: 'hotel/:hotelId/reservation/:roomId',
        lazy: () => import('./apps/Main/pages/Reservation')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'newHotel',
        path: 'backoffice/hotels/newHotel',
        lazy: () => import('./apps/Main/pages/NewHotel')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'newRoom',
        path: 'backoffice/hotels/newRoom',
        lazy: () => import('./apps/Main/pages/NewRoom')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'editRoom',
        path: 'backoffice/hotels/editRoom',
        lazy: () => import('./apps/Main/pages/EditRoom')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'editHotel',
        path: 'backoffice/hotels/editHotel',
        lazy: () => import('./apps/Main/pages/EditHotel')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'deleteHotel',
        path: 'backoffice/hotels/deleteHotel',
        lazy: () => import('./apps/Main/pages/deleteHotel')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'deleteRoom',
        path: 'backoffice/hotels/deleteRoom',
        lazy: () => import('./apps/Main/pages/deleteRoom')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'userReservations',
        path: 'reservations/:id',
        lazy: () => import('./apps/Main/pages/userReservations')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'userInfo',
        path: 'settings/:id',
        lazy: () => import('./apps/Main/pages/EditUser')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'adminHotel',
        path: 'backoffice/hotels',
        lazy: () => import('./apps/Main/sections/AdminHotel')
          .then(module => ({ Component: module.default, })),
      },
    ],
  },
  {
    id: 'login',
    path: 'login',
    lazy: () => import('./apps/Auth/pages/Login')
      .then(module => ({ Component: module.default, })),
  },
  {
    id: 'signup',
    path: 'signup',
    lazy: () => import('./apps/Auth/pages/Signup')
      .then(module => ({ Component: module.default, })),
  }
];

const router = createBrowserRouter(routes);

export default router;