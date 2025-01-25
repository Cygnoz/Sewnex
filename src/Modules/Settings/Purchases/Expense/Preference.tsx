import { useState } from "react";
import RadioButton from "../../../../Components/Form/RadioButton";
import Select from "../../../../Components/Form/Select";
import Trash from "../../../../assets/icons/Trash";
import Pen from "../../../../assets/icons/Pen";
import Button from "../../../../Components/Button";

type Props = {};

const Preference = ({}: Props) => {
  const [selected, setSelected] = useState<string>("Km");

  // Columns for the table
  const [columns] = useState([
    { id: "StartDate", label: "Start Date", visible: true },
    { id: "MileageRate", label: "Mileage Rate", visible: true },
    { id: "action", label: "Action", visible: true },
  ]);

  // Dummy data for the table
  const [data] = useState([
    { StartDate: "2024-01-01", MileageRate: "$0.50" },
    { StartDate: "2024-02-01", MileageRate: "$0.55" },
    { StartDate: "2024-03-01", MileageRate: "$0.60" },
  ]);

  const handleRadioChange = (value: string, name: string) => {
    console.log(`Selected ${name}: ${value}`);
    setSelected(value);
  };

  return (
    <div>
      <div className="bg-white my-4 p-5 rounded-xl text-sm space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-text_tertiary text-xs whitespace-nowrap">
            Default Mileage Account
          </p>
          <span className="w-[25%]">
            <Select options={[]} placeholder="Select Account" />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-text_tertiary text-xs whitespace-nowrap mt-1">
            Default Unit
          </p>
          <div className="flex items-center space-x-4 text-textColor text-sm mt-2">
            <RadioButton
              id="Km"
              name="DefaultUnit"
              label="Km"
              selected={selected}
              onChange={handleRadioChange}
            />
            <RadioButton
              id="Mile"
              name="DefaultUnit"
              label="Mile"
              selected={selected}
              onChange={handleRadioChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-white my-4 p-5 rounded-xl text-sm space-y-2 text-text_tertiary">
        <p className="text-sm font-semibold">Mileage Preference</p>
        <p className="pt-2 pe-5">
          Any mileage expense recorded on or after the start date will have the
          corresponding mileage rate. You can create a default rate (created
          without specifying a date), which will be applicable for mileage
          expenses recorded before the initial start date.
        </p>
      </div>
      <div className="bg-white my-4 p-5 rounded-xl text-sm space-y-2 text-text_tertiary">
        <table className="min-w-full bg-white mb-5 border rounded-2xl ">
          <thead className="text-[12px] w-full text-center rounded-lg text-dropdownText sticky bg-red-500">
            <tr
              className=""
              style={{ backgroundColor: "#F9F7F0", height: "44px" }}
            >
              {columns.map((heading, index) => (
                <th
                  className="py-2 px-4 font-medium border-b border-tableBorder"
                  key={index}
                >
                  {heading.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-xs border">
            {data.map((item: any, index: number) => (
              <tr className="relative" key={index}>
                <td className="py-4 px-4  border-y border-tableBorder">
                  <p>{item.StartDate}</p>
                </td>

                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.MileageRate}
                </td>

                <td className="border-y px-4 py-2.5 border-tableBorder">
                  <div className="flex items-center justify-center gap-2">
                    <Pen color={"#3d7fbc"} />
                    <Trash color={"#EA1E4F"} size={18} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
     <div className="flex justify-end"> <Button>Save</Button></div>
    </div>
  );
};

export default Preference;
