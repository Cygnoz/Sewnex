import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { navList } from "../../assets/constants/Navlist.ts";

type Props = {
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
};

const SideBar = ({ activeIndex, setActiveIndex }: Props) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const savedIndex = localStorage.getItem("savedIndex");
    if (savedIndex !== null) {
      setActiveIndex(Number(savedIndex));
    }
  }, [setActiveIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("savedIndex", index.toString());
    localStorage.setItem("savedSelectedIndex", "0");
  };


  return (
    <aside className="bg-[#004D4D] h-[100vh] overflow-y-scroll hide-scrollbar w-52 text-white">
      <div className="text-center py-6">
        <span className="font-bold text-xl">Swenex</span>
      </div>

      <ul>
        {navList.map((item, index) => (
                      <Link to={item.route}>

          <li
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => handleClick(index)}
            className={`relative flex items-center space-x-4 p-3.5 mb-1 cursor-pointer ${activeIndex === index ? "bg-[#E6E9EC14]" : "hover:bg-[] "}`}
          >
              {activeIndex === index && (
                <div className="absolute left-0 w-1.5 h-14 bg-white rounded-r-2xl"></div>
              )}
              <div className="ms-4">
                {item.icon && <item.icon color={activeIndex === index ? "white" : "#A3A9B3"} />}
              </div>
              <span
                className={`text-sm mt-1 font-medium ${activeIndex === index ? "text-white" : "text-[#A3A9B3]"}`}
              >
                {item.nav}
              </span>
          </li>
          </Link>

        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
