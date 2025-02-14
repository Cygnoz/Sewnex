import { useState } from "react";
import ScanEye from "../../../assets/icons/ScanEye";
import Select from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";

type Props = {
  state: any;
  setState: (value: any) => void;
  page?: string;
  allAccounts?: any;
};

const ViewMore = ({ state, page, allAccounts }: Props) => {
  const [viewDetails, setViewDetails] = useState<boolean>(false);

  console.log(allAccounts,state)
  return (
    <>
      {viewDetails ? (
        <>
          <button
            onClick={() => setViewDetails(false)}
            className="flex items-center text-textColor font-semibold text-sm"
          >
            <ScanEye /> View Less Details
          </button>
          <div
            className={`${
              page == "bill"
                ? "grid grid-cols-3 gap-4 my-4 text-textColor text-sm"
                : "grid grid-cols-2 gap-4 my-4 text-textColor text-sm"
            }`}
          >
            {page === "bill" && (
              <div>
                <div className="relative w-full">
                  <Select
                    options={[]}
                    label=" Other Expense Account ID"
                    placeholder="Select Account"
                  />
                </div>
              </div>
            )}
            <div className="text-sm">
              <Input label="Other Expense Amount" placeholder="Enter Amount" />
            </div>

            <div className="text-sm">
              <Input placeholder="Enter reason" label="Other Expense Reason" />
            </div>
            {page === "bill" && (
              <Select
                label=" Freight Account"
                placeholder="Select Account"
                options={[]}
              />
            )}

            <Input label="Freight Amount" placeholder="Enter Amount" />

            <Input placeholder="enter Amount" label="Enter amount" />

            <Input label=" Vehicle Number" placeholder="Enter vehicle number" />
          </div>
        </>
      ) : (
        <button
          onClick={() => setViewDetails(true)}
          className="flex items-center text-textColor font-semibold text-sm"
        >
          <ScanEye /> View More
        </button>
      )}
    </>
  );
};

export default ViewMore;
