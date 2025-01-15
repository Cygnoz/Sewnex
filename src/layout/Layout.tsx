import {  useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";
type Props = {
};
 
const Layout = ({}: Props) => { 

  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  return (
    <div className="flex">
      <SideBar  activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="w-[100%] h-[100vh] overflow-y-scroll hide-scrollbar">
        <Header />
      <div className="p-7">  <Outlet /></div>
      </div>
    </div>
  );
};
 
export default Layout;