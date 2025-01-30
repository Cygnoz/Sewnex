import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { navList } from "../../assets/constants/Navlist.ts";

type Props = {
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
};

const SideBar = ({ activeIndex, setActiveIndex }: Props) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const location = useLocation();

  // Sync activeIndex with the current route
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedIndex = navList.findIndex((item) => item.route === currentPath);
    if (matchedIndex !== -1) {
      setActiveIndex(matchedIndex);
    }
  }, [location.pathname, setActiveIndex]);

  // Scroll to the active item smoothly
  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center", // Align the active item to the center of the container
      });
    }
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("savedIndex", index.toString());
    localStorage.setItem("savedSelectedIndex", "0");
  };

  return (
    <aside className="bg-[#004D4D] h-[100vh] overflow-y-scroll hide-scrollbar w-52 text-white">
      <div className="text-center py-6">
        <span className="font-bold text-xl">Sewnex</span>
      </div>

      <ul>
        {navList.map((item, index) => (
          <Link to={item.route} key={index}>
            <li
              ref={(el) => (itemRefs.current[index] = el)} // Add ref to each list item
              onClick={() => handleClick(index)}
              className={`relative flex items-center space-x-4 p-3.5 mb-1 cursor-pointer ${
                activeIndex === index ? "bg-[#E6E9EC14]" : "hover:bg-[#006666]"
              }`}
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
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
