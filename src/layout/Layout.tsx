import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";

type Props = {}

function Layout({ }: Props) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="flex-grow p-7 flex overflow-y-scroll hide-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
