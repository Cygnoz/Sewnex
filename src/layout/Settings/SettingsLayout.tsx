import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import SettingsSidebar from "./SettingsSideBar";

type Props = {
};

const SettingsLayout = ({}: Props) => {
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
console.log(location)
  return (
    <div className="flex ">
      <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="w-[100%] h-[100vh] overflow-y-scroll hide-scrollbar">
        <Header />
        <div className="flex gap-6 m-6">
          {location.pathname !== "/settings" && <SettingsSidebar />}
          <div className="w-full bg-[#F3F3F3] p-7">
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
