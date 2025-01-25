import { useState } from "react";
import SettingsIcon from "../../../../assets/icons/SettingsIcon";
import Banner from "../../Organization/Banner";
import Preference from "./Preference";
import Vehicle from "./Vehicle";
import Categories from "./Categories";

type Props = {};

const Expense = ({}: Props) => {
  const head = ["Preference", "Vehicle", "Categories"];
  const [activeTab, setActiveTab] = useState("Preference");

  return (
    <div className="h-[100vh] hide-scrollbar overflow-scroll">
      <Banner />

      <div className="my-2">
        <p className="font-bold text-text_primary">Expense</p>
        <div className="p-1 rounded-3xl bg-white flex gap-2 my-1">
          {head.map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              className={`flex gap-2 items-center justify-center px-2 py-1 rounded-3xl text-xs cursor-pointer ${
                activeTab === item ? "bg-[#f7ecda]" : ""
              }`}
            >
              <SettingsIcon color="#3c424f" strokeWidth="2" />
              <p
                className={`text-text_tertiary ${
                  activeTab === item ? " text-text_primary" : ""
                }`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        {activeTab === "Preference" && <div>
          <Preference/>
          </div>}
        {activeTab === "Vehicle" && <div>
          <Vehicle/></div>}
        {activeTab === "Categories" && <div>
          <Categories/>
          </div>}
      </div>
    </div>
  );
};

export default Expense;
