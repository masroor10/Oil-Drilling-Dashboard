import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import { Layout } from '.';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="unauthorized" element={<UnAuthorized />} /> */}
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
