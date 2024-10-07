
import { Outlet } from 'react-router-dom';
import SideBar from './SideBarS';

const DashboardLayoutS = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayoutS;
