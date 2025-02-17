import { useState } from "react";
import ScanEye from "../../../assets/icons/ScanEye";
import CheveronDown from "../../../assets/icons/CheveronDown";


type Props = {
  state: any;
  setState: (value: any) => void;
  page?: string;
  allAccounts?: any;
};

const ViewMore = ({
  state,
  setState,
  page,
  allAccounts,
}: Props) => {
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {viewDetails ? (
        <>
          <button
            onClick={() => setViewDetails(false)}
            className="flex items-center text-textColor font-semibold text-xs"
          >
            <ScanEye /> View Less Details
          </button>
          <div
            className={`${
              page == "bill"
                ? "grid grid-cols-3 gap-4 my-4 text-textColor text-xs"
                : "grid grid-cols-2 gap-4 my-4 text-textColor text-xs"
            }`}
          >
            {page === "bill" && (
              <div>
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Other Expense Account ID
                </label>
                <div className="relative w-full">
                  <select
                    onChange={handleChange}
                    value={state.otherExpenseAccountId}
                    name="otherExpenseAccountId"
                    className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-xs h-9 pl-3 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <option value="" selected hidden disabled>
                      Select Account
                    </option>
                    {allAccounts
                      .filter(
                        (item: { accountHead: string }) =>
                          item.accountHead === "Expenses"
                      )
                      .map((item: { _id: string; accountName: string }) => (
                        <option key={item._id} value={item._id}>
                          {item.accountName}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>
              </div>
            )}
            <div className="text-xs">
              <label htmlFor="otherExpense" className="text-[#4b4f63]">
                Other Expense Amount
                <input
                  type="text"
                  value={state.otherExpenseAmount || ""}
                  name="otherExpenseAmount"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
                      handleChange(e);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter expense amount"
                  className="border-inputBorder w-full text-xs border rounded-[36px] p-2 h-9 mt-1 text-[#495160]"
                />
              </label>
            </div>

            <div className="text-xs">
              <label htmlFor="otherExpenseReason" className="text-[#4b4f63]">
                Other Expense Reason
                <input
                  value={state.otherExpenseReason}
                  name="otherExpenseReason"
                  onChange={handleChange}
                  placeholder="Enter reason"
                  className="border-inputBorder w-full text-xs border rounded-[36px] p-2 h-9 mt-1"
                />
              </label>
            </div>
            {page === "bill" && (
              <div>
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Freight Account
                </label>
                <div className="relative w-full">
                  <select
                    onChange={handleChange}
                    value={state.freightAccountId}
                    name="freightAccountId"
                    className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-xs h-[39px] pl-3 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <option value="" selected hidden disabled>
                      Select Account
                    </option>
                    {allAccounts
                      .filter(
                        (item: { accountSubhead: string }) =>
                          item.accountSubhead === "Expense"
                      )
                      .map((item: { _id: string; accountName: string }) => (
                        <option key={item._id} value={item._id}>
                          {item.accountName}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>
              </div>
            )}
            <div className="text-xs">
              <label htmlFor="freight" className="text-[#4b4f63]">
                Freight Amount
                <input
                  type="text"
                  step="0.01"
                  value={state.freightAmount || ""}
                  name="freightAmount"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
                      handleChange(e); // Update state only if the input is valid
                    }
                  }}
                  onKeyDown={(e) => {
                    // Prevent 'e', 'E', '+', and '-' keys
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter freight amount"
                  className="border-inputBorder w-full text-xs border rounded-[36px] p-2 h-9 mt-1"
                />
              </label>
            </div>
            <div className="text-xs">
              <label htmlFor="roundOff" className="text-[#4b4f63]">
                Round Off Amount
                <input
                  type="text"
                  step="0.01"
                  value={state.roundOffAmount || ""}
                  name="roundOffAmount"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
                      handleChange(e); // Update state only if the input is valid
                    }
                  }}
                  onKeyDown={(e) => {
                    // Prevent 'e', 'E', '+', and '-' keys
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter round-off amount"
                  className="border-inputBorder w-full text-xs border rounded-[36px] p-2 h-9 mt-1"
                />
              </label>
            </div>
            <div className="text-xs">
              <label htmlFor="vehicleNo" className="text-[#4b4f63]">
                Vehicle Number
                <input
                  value={state.vehicleNo}
                  name="vehicleNo"
                  onChange={handleChange}
                  placeholder="Enter vehicle number"
                  className="border-inputBorder w-full text-xs border rounded-[36px] p-2 h-9 mt-1"
                />
              </label>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => setViewDetails(true)}
          className="flex items-center text-textColor font-semibold text-xs"
        >
          <ScanEye /> View More
        </button>
      )}
    </>
  );
};

export default ViewMore;
