import { Outlet } from "react-router"
import { SideBar } from "../../SideBar/SideBar.component"
import "./Dashboard.styles.scss"

export const DashBoard = () => {
    return (
        <div className="dashboard-layout">
      <SideBar/>
      <div className="content">
        <Outlet />
      </div>
      </div>
    )
}