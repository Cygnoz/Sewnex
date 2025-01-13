import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { navList } from "../../assets/constants/Navlist.ts";

type Props = {};

function SideBar({ }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const savedIndex = localStorage.getItem("index");
    if (savedIndex !== null) {
      const index = Number(savedIndex);
      setActiveIndex(index);

      // Scroll to the saved index
      if (index >= 0 && index < navList.length && itemRefs.current[index]) {
        itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (index >= 0 && index < navList.length) {
        navigate(navList[index].route);
      }
    }
  }, [navigate]);

  // Function to handle item click
  const handleClick = (index: number, route: string) => {
    setActiveIndex(index);
    if (route !== "/pos") {
      localStorage.setItem("index", index.toString());
    }
    navigate(route);
    itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <aside className="bg-[#004D4D] h-[100vh] overflow-y-scroll hide-scrollbar w-52 text-white">
      <div className="text-center py-6">
        <span className="font-bold text-xl">Swenex</span>
      </div>

      <ul className="">
        {navList.map((item, index) => (
          <li
            key={index}
            ref={(el) => (itemRefs.current[index] = el)} 
            onClick={() => handleClick(index, item.route)}
            className={`relative flex items-center space-x-4 p-3.5 mb-1 cursor-pointer 
              ${activeIndex === index ? "bg-[#E6E9EC14]" : "hover:bg-[] "}`}
          >
            {activeIndex === index && (
              <div className="absolute left-0 w-1.5 h-14 bg-white rounded-r-2xl"></div>
            )}
            <div className="ms-4">
              {item.icon && <item.icon color={activeIndex === index ? "white" : "#A3A9B3"} />}
            </div>
            <span
              className={`text-sm mt-1 font-medium ${
                activeIndex === index ? "text-white" : "text-[#A3A9B3]"
              }`}
            >
              {item.nav}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
