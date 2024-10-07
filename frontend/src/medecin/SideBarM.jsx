import { Sidebar } from 'flowbite-react';
import { HiChartPie,  HiTable, HiUser } from 'react-icons/hi';

const SideBarM = () => {
  return (
    <div className="sidebar-container">
      <Sidebar aria-label="Sidebar with content separator example" className="custom-sidebar">
        <div className="sidebar-content">
          <Sidebar.Items>
            <Sidebar.ItemGroup className=''>
              <br /><br />
              <Sidebar.Item href="/medecin/dashboard" icon={HiChartPie} className="itemStyle">
                <span className="icon-title">Dashboard</span>
              </Sidebar.Item>
              <Sidebar.Item href="/medecin/dashboard/liste-patients" icon={HiUser} className="itemStyle">
                <span className="icon-title">Liste des patients</span>
              </Sidebar.Item>
              
              <Sidebar.Item href="/" icon={HiTable} className="itemStyle">
                <span className="icon-title">Log Out</span>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </Sidebar>
      <style>{`
        .sidebar-container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          width: 350px;
          z-index: 1000; /* Ensure sidebar is above other content */
        }

        .custom-sidebar {
          height: 100%;
          background-color: #2c3e50; /* Dark blue background */
          color: #ecf0f1; /* Light text color */

        }

        .sidebar-content {
          padding: 20px;
          height: 100%; /* Ensure content fills sidebar height */
          overflow-y: auto; /* Add scroll when content overflows */
        }

        .itemStyle {
          font-size: 24px; /* Increased font size for icons */
          margin-bottom: 55px; /* Increased space between items */
          display: flex;
          align-items: center;
        }

        .itemStyle:hover {
          background-color: #34495e; /* Darker blue for hover */
        }

        .itemStyle.active {
          background-color: #2980b9; /* Active link color */
        }

        .icon-title {

          margin-left: 20px; /* Add space between icon and title */
        }
      `}</style>
    </div>
  )
}

export default SideBarM;
