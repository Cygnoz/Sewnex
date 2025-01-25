import Button from "../../../../Components/Button";
import Banner from "../Banner";
import Modal from "../../../../Components/modal/Modal";
import CurrencyTable from "./CurrencyTable";
import { useState } from "react";
import AddCurrency from "./AddCurrency";

type Props = {};

const Currencies: React.FC<Props> = () => {
  const [isExchangeRateFields, setIsExchangeRateFields] = useState(false);
  const [enableExchangeRateModal, setEnableExchangeRateModal] = useState(false);
 
  // const openModal = (
  //   enableExchangeRateModal = false,
  //   newCurrencyModal = false
  // ) => {
  //   setEnableExchangeRateModal(enableExchangeRateModal);
  // };

  const closeModal = () => {
    setEnableExchangeRateModal(false);
   
  }


  return (
    <>
      <div className="m-4 overflow-y-scroll hide-scrollbar text-[#303F58]">
        <Banner seeOrgDetails />
        <div className="p-2 flex items-center">
          <p className="font-bold text-[15px]">Currencies</p>

          <div className="ml-auto flex gap-4 items-center">
            {/* <label className="flex items-center cursor-pointer">
              <div onClick={() => openModal(true, false)} className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isExchangeRateFields}
                />
                <div
                  className={`w-9 h-5 rounded-full shadow-inner transition-colors ${
                    isExchangeRateFields ? "bg-checkBox" : "bg-dropdownBorder"
                  }`}
                ></div>
                <div
                  className={`dot absolute w-3 h-3 bg-white rounded-full top-1 transition-transform ${
                    isExchangeRateFields
                      ? "transform translate-x-full left-2"
                      : "left-1"
                  }`}
                ></div>
              </div>
              <div className="ml-2 text-textColor text-sm">
                Enable Exchange Rate Fields
              </div>
            </label> */}

            <Modal
              onClose={closeModal}
              open={enableExchangeRateModal}
              className="rounded-lg p-8 w-[546px] h-[160px] text-[#303F58] space-y-8"
            >
              <p className="text-sm">
                The exchange rates for the currencies will automatically be
                fetched in real time
              </p>
              <div className="flex justify-end gap-2 mb-3">
                <Button
                  onClick={closeModal}
                  variant="secondary"
                  className="h-[38px] w-[120px] flex justify-center"
                >
                  <p className="text-sm">Cancel</p>
                </Button>
                <Button
                  onClick={() => {
                    closeModal(),
                      setIsExchangeRateFields(!isExchangeRateFields);
                  }}
                  variant="primary"
                  className="h-[38px] w-[120px] flex justify-center"
                >
                  <p className="text-sm">Ok</p>
                </Button>
              </div>
            </Modal>

        <AddCurrency page="add" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-3"><CurrencyTable /></div>

      
      </div>
    </>
  );
};

export default Currencies;
