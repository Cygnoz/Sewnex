import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navList } from "../../assets/constants/Navlist";

type Props = {
  activeIndex: number | null;
};

const SubHeader = ({ activeIndex }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  useEffect(() => {
    const savedSelectedIndex = localStorage.getItem("savedSelectedIndex");
    if (savedSelectedIndex !== null) {
      setSelectedIndex(Number(savedSelectedIndex));
    }
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem("savedSelectedIndex", index.toString());
  };

  return (
    <div className="bg-[#FFFFFF] flex  p-[4px]  items-center rounded-full ">
      <div className="flex items-center gap-4">
        {/* <Link to={"/landing"}>
          <div className="bg-white px-3 py-2 rounded-full text-sm">
          </div>
        </Link> */}
        {activeIndex !== null &&
          navList[activeIndex] &&
          navList[activeIndex]?.subhead &&
          navList[activeIndex]?.subhead.map((item, index) => (
            <Link to={item.subRoute} key={index}>
              <div
                className={`font-medium text-[12px] text-[#585953] py-2 px-4 rounded-full cursor-pointer ${
                  selectedIndex === index ? "bg-[#F7ECD9]" : "hover:bg-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                {item.headName}
              </div>
            </Link>
          ))}
      </div>
      {/* <div>{activeIndex === 1 && <ItemEllipsis />}</div> */}
    </div>
  );
};

export default SubHeader;
