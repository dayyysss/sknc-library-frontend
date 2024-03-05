import DashboardNav from '../DashboardNav';
import Sidebar from '../SidebarAdmin';
import MainDashboard from '../Dashboard/Main'
import './style.css'

function HomeAdmin() {
  document.title = "Dashboard Admin";
  return (
      <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <Sidebar />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <DashboardNav />
          
          <div>
          <MainDashboard />
          </div>
        </div>
      </div>
  );
}

export default HomeAdmin
