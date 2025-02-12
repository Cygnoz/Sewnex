import { Link } from "react-router-dom";
import ChevronLeft from "../../../../assets/icons/ChevronLeft";
import Trash from "../../../../assets/icons/Trash";
import Banner from "../Banner";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/modal/Modal";
import Input from "../../../../Components/Form/Input";
import { useState } from "react";
import bgImg from "../../../../assets/images/Group (1).png";
import bgimg2 from "../../../../assets/images/Mask group (2).png";
import CirclePlus from "../../../../assets/icons/circleplus";

type Props = {};

const ExchangeRate = ({}: Props) => {
  const tableHeaders = ["As Of Date", "Exchange Date", "Actions"];
  const [newCurrencyModal, setNewCurrencyModal] = useState(false);

  
  const openModal = () => {
    setNewCurrencyModal(true);
  };

  const closeModal = () => {
    setNewCurrencyModal(false);
  };
  // Dummy data
  const currenciesData = [
    {
      asOfDate: "2025-01-01",
      exchangeDate: "2025-01-05",
      currencyCode: "USD",
      currencyName: "United States Dollar",
      currencySymbol: "$",
      baseCurrency: true,
    },
    {
      asOfDate: "2025-01-02",
      exchangeDate: "2025-01-06",
      currencyCode: "EUR",
      currencyName: "Euro",
      currencySymbol: "€",
      baseCurrency: false,
    },
    {
      asOfDate: "2025-01-03",
      exchangeDate: "2025-01-07",
      currencyCode: "INR",
      currencyName: "Indian Rupee",
      currencySymbol: "₹",
      baseCurrency: false,
    },
  ];

  return (
    <div>
      <Banner />
      <div className="bg-white border rounded-2xl px-8 py-5 mt-5">
      <div className="flex mb-3 gap-5">
        <Link to={"/settings/organization/currencies"}>
          <div className="flex justify-center items-center h-11 w-11 bg-[#f3f3f3] rounded-full">
            <ChevronLeft color={"#0B1320"} strokeWidth="3" />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-base text-text_tertiary ">Exchange Rates</h4>
        </div>
        <div className="ml-auto">
            <Button variant="primary" size="sm" onClick={openModal} ><CirclePlus/>Add Exchange Rate</Button>
        </div>
      </div>
        <table className="min-w-full text-text_tertiary bg-white mb-5">
          <thead className="text-[12px] w-full text-center text-dropdownText sticky bg-red-500">
            <tr style={{ backgroundColor: "#F9F7F0", height: "44px" }}>
              {tableHeaders.map((heading, index) => (
                <th
                  className="py-2 px-4 font-medium border-b border-tableBorder"
                  key={index}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {currenciesData.map((item, index) => (
              <tr className="relative" key={index}>
                {/* As Of Date */}
                <td className="py-4 px-4 border-y border-tableBorder">
                  {item.asOfDate}
                </td>

                {/* Exchange Date */}
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.exchangeDate}
                </td>

                {/* Actions */}
                <td className="py-2.5 px-4 pb-5 border-b border-tableBorder flex items-center justify-center w-full">
                  <Trash color={"#EA1E4F"} size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={newCurrencyModal}
        onClose={closeModal}
        className="w-[45%] text-start h-auto"
      >
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-gradient-to-br from-[#F7ECD9] to-[#B5F0D3] relative overflow-hidden">
            <div
              className="absolute top-0 -right-8 w-[178px] h-[89px]"
            
            ></div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-[#004D4D]">
               Add Exchange Rate
              </h3>
              <p className="text-text_tertiary text-xs mt-1">
                Open a new bank account swiftly and securely.
              </p>
            </div>
            <img src={bgImg} alt="" className="-mt-5 h-10 w-20" />
            <img src={bgimg2} alt="" className=" -mb-5 mt-auto h-10 w-20" />

            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>

          <form>
            <div className="bg-[#faf7f2] p-4 rounded-2xl space-y-2">

               
                <Input
                  placeholder="Date"
                  type="date"
                  label="Date"
                />
          
              <Input
                placeholder="Enter rate"
                label="Exhange rate (in INR)"
              />
            
            </div>
            <div className="my-3 flex justify-end gap-3">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="w-28 h-[42px] text-sm flex justify-center"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-28 h-[42px] text-sm flex justify-center"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ExchangeRate;
