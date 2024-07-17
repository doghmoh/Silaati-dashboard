import React, { Suspense, Fragment, lazy, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import { AuthContext } from 'contexts/userContext';

const PrivateRoute = ({ children, roles }) => {
  const { state } = useContext(AuthContext);
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  if (state.isLoggedIn || token) {
    if (roles && roles.includes(role)) {
      return children;
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
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
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        exact: 'true',
        path: '/orders',
        element: lazy(() => import('./views/orders/orders')),
        guard: (props) => <PrivateRoute {...props} roles={['admin','agent']} />
      },
      {
        exact: 'true',
        path: '/retailers',
        element: lazy(() => import('./views/customers/retailers')),
        guard: (props) => <PrivateRoute {...props} roles={['admin','agent']} />
      },
      {
        exact: 'true',
        path: '/suppliers',
        element: lazy(() => import('./views/customers/suppliers')),
        guard: (props) => <PrivateRoute {...props} roles={['admin','agent']} />
      },
      {
        exact: 'true',
        path: '/company',
        element: lazy(() => import('./views/customers/company')),
        guard: (props) => <PrivateRoute {...props} roles={['admin','agent']} />
      },
      {
        exact: 'true',
        path: '/products',
        element: lazy(() => import('./views/products/products')),
        guard: (props) => <PrivateRoute {...props} roles={['admin','agent']} />
      },
      {
        exact: 'true',
        path: '/ads',
        element: lazy(() => import('./views/ads/ads')),
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        exact: 'true',
        path: '/userdetails',
        element: lazy(() => import('./views/profile/profile')),
        guard: (props) => <PrivateRoute {...props} roles={['agent', 'admin']} />
      },
      {
        exact: 'true',
        path: '/retailerdetails',
        element: lazy(() => import('./views/retailerProfile/profile')),
        guard: (props) => <PrivateRoute {...props} roles={['admin','agent']} />
      },
      {
        path: '/businessTypes',
        element: lazy(() => import('./views/variable/businessTypes')),
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        path: '/categoryTypes',
        element: lazy(() => import('./views/variable/categoryTypes')),
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        path: '/itemTypes',
        element: lazy(() => import('./views/variable/itemTypes')),
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        path: '/packagingTypes',
        element: lazy(() => import('./views/variable/packagingTypes')),
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        exact: 'true',
        path: '/feedback',
        element: lazy(() => import('./views/feedback/feedback')),
        guard: (props) => <PrivateRoute {...props} roles={['user', 'admin']} />
      },
      {
        exact: 'true',
        path: '/admin',
        element: lazy(() => import('./views/settings/admin')),
        guard: (props) => <PrivateRoute {...props} roles={['admin']} />
      },
      {
        exact: 'true',
        path: '/404',
        element: lazy(() => import('./views/error/404')),
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