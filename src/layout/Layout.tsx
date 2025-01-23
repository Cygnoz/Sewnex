import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";
import SubHeader from "./SubHeader/Subheader";
import { navList } from "../assets/constants/Navlist";

type Props = {};

const Layout = ({}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const location = useLocation(); 

  useEffect(() => {
    const savedIndex = localStorage.getItem("savedIndex");
    if (savedIndex !== null) {
      setActiveIndex(Number(savedIndex));
    }
  }, []);
  
  const shouldShowSubHeader =
  location.pathname !== "/accountant/viewOne" &&
  location.pathname !== "/accountant/newJournal" &&
  location.pathname !== "/accountant/viewOneJournal";


  return (
    <div className="flex">
      <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="w-[100%] h-[100vh] overflow-y-scroll hide-scrollbar">
        <Header />
        <div className="py-3 px-6">
          {shouldShowSubHeader && activeIndex !== null && navList[activeIndex]?.subhead && (
            <SubHeader activeIndex={activeIndex} />
          )}
          <div className="my-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
