import { Outlet } from "react-router-dom";
import Sidebar from "./index";
const AppLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 330px'
    }}>
        <Sidebar />
        <Outlet />
    </div>
};

export default AppLayout;