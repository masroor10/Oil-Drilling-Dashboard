import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '.';

const Dashboard = lazy(() => import('../pages/Dashboard'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
