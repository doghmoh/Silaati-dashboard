import React, { Suspense, Fragment, lazy, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import { AuthContext } from 'contexts/userContext';

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  const token = localStorage.getItem('accessToken')
  return state.isLoggedIn || token ? children : <Navigate to="/login" />;
};

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/orders',
        element: lazy(() => import('./views/orders/orders')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/retailers',
        element: lazy(() => import('./views/customers/retailers')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/suppliers',
        element: lazy(() => import('./views/customers/suppliers')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/company',
        element: lazy(() => import('./views/customers/company')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/products',
        element: lazy(() => import('./views/products/products')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/ads',
        element: lazy(() => import('./views/ads/ads')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/userdetails',
        element: lazy(() => import('./views/profile/profile')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/admin',
        element: lazy(() => import('./views/settings/admin')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart')),
        guard: PrivateRoute
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps')),
        guard: PrivateRoute
      },

      {
        exact: 'true',
        path: '/login',
        element: lazy(() => import('./views/auth/signin/SignIn1'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />,
        guard: PrivateRoute
      },
    ]
  }
];

export default routes;
