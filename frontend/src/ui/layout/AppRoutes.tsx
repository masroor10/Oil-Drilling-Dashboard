import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import { Layout } from '.';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
