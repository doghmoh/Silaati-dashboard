import React, { Suspense, Fragment, lazy, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import { AuthContext } from 'contexts/userContext';

const PrivateRoute = ({ children, roles }) => {
  const { state } = useContext(AuthContext);
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = state.isLoggedIn || token;
  const hasRequiredRole = roles ? roles.includes(role) : true;

  return isAuthenticated && hasRequiredRole ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
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
    exact: true,
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: true,
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: true,
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard')),
        guard: () => <PrivateRoute roles={['admin']} />,
      },
      {
        exact: true,
        path: '/orders',
        element: lazy(() => import('./views/orders/orders')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/retailers',
        element: lazy(() => import('./views/customers/retailers')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/suppliers',
        element: lazy(() => import('./views/customers/suppliers')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/company',
        element: lazy(() => import('./views/customers/company')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/products',
        element: lazy(() => import('./views/products/products')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/ads',
        element: lazy(() => import('./views/ads/ads')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/userdetails',
        element: lazy(() => import('./views/profile/profile')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/retailerdetails',
        element: lazy(() => import('./views/retailerProfile/profile')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/admin',
        element: lazy(() => import('./views/settings/admin')),
        guard: () => <PrivateRoute roles={['admin']} />,
      },
      {
        exact: true,
        path: '/feedback',
        element: lazy(() => import('./views/feedback/feedback')),
        guard: () => <PrivateRoute roles={['admin', 'agent']} />,
      },
      {
        exact: true,
        path: '/businessTypes',
        element: lazy(() => import('./views/variable/businessTypes')),
        guard: () => <PrivateRoute roles={['admin']} />,
      },
      {
        exact: true,
        path: '/categoryTypes',
        element: lazy(() => import('./views/variable/categoryTypes')),
        guard: () => <PrivateRoute roles={['admin']} />,
      },
      {
        exact: true,
        path: '/itemTypes',
        element: lazy(() => import('./views/variable/itemTypes')),
        guard: () => <PrivateRoute roles={['admin']} />,
      },
      {
        exact: true,
        path: '/packagingTypes',
        element: lazy(() => import('./views/variable/packagingTypes')),
        guard: () => <PrivateRoute roles={['admin']} />,
      },
      {
        exact: true,
        path: '*',
        element: () => <Navigate to={BASE_URL} />,
        guard: PrivateRoute
      },
    ]
  }
];


export default routes;
