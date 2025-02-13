import { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
import toast from "react-hot-toast";
import { settingsdataResponseContext } from "../../../Context/ContextShare";
import { endpoints } from "../../../Services/apiEdpoints";
import Banner from "../Organization/Banner";
import CheveronDown from "../../../assets/icons/CheveronDown";

type Props = {};

interface item {
  itemDecimal: string;
  itemDimensions: string;
  itemWeights: string;
  barcodeScan: string;

  itemDuplicateName: boolean;
  hsnSac: boolean;
  hsnDigits: string;

  priceList: boolean;
  priceListAtLineLevel: boolean;

  compositeItem: boolean;
  stockBelowZero: boolean;
  outOfStockBelowZero: boolean;
  notifyReorderPoint: boolean;
  trackCostOnItems: boolean;
}

function Items({ }: Props) {
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const { settingsResponse, getSettingsData } = useContext(settingsdataResponseContext)!;
  const { request: addItem } = useApi("put", 5003);
  const [inputData, setInputData] = useState<item>({
    itemDecimal: "",
    itemDimensions: "",
    itemWeights: "",
    barcodeScan: "",

    itemDuplicateName: false,
    hsnSac: false,
    hsnDigits: selectedRadio,

    priceList: false,
    priceListAtLineLevel: false,

    compositeItem: false,

    stockBelowZero: false,
    outOfStockBelowZero: false,
    notifyReorderPoint: false,
    trackCostOnItems: false,
  });


  // console.log(inputData);

  useEffect(() => {
    getSettingsData();
  }, []);

  useEffect(() => {
    if (settingsResponse) {
      setInputData((prevData) => ({
        ...prevData,
        ...settingsResponse?.data?.itemSettings,
      }));
    }
  }, [settingsResponse]);

  useEffect(() => {
    if (inputData.hsnSac) {
      setSelectedRadio(inputData.hsnDigits || "4");
    } else {
      setSelectedRadio("");
    }
  }, [inputData.hsnSac, inputData.hsnDigits]);


  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setInputData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
    setInputData((prevData) => ({
      ...prevData,
      hsnDigits: value,
    }));
  };

  const handleSave = async () => {
    try {
      const url = `${endpoints.ADD_ITEMS}`;
      const { response, error } = await addItem(url, inputData);
      console.log(response);
      console.log(error);

      if (!error && response) {
        toast.success(response?.data);
      }
      else {
        toast.error(error?.response?.data?.message)
      }
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };


  return (
    <div className="m-4 text-[#303F58]">
      <Banner />

      <p className="text-[20px] font-bold mt-3">Item</p>
      <div className="space-y-4 mt-2">
        {/* Quantity */}
        <div className="bg-white w-full p-6 rounded-lg">
          <div className="space-y-4">
            <div className="grid grid-cols-12 items-center space-x-20">
              <p className="col-span-4 text-[14px] font-semibold">
                Set decimal rate of your item quantity:
              </p>
              <div className="relative col-span-2 w-[60px]">
                <select
                  name="itemDecimal"
                  value={inputData.itemDecimal}
                  onChange={handleInputChange}
                  className="block appearance-none text-zinc-400 bg-white border border-inputBorder text-sm h-[24px] w-[58px] pl-2 rounded-md focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                >
                  <option className="hidden">1</option>

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <div className="pointer-events-none  absolute inset-y-0 right-1 flex items-center px-1 text-gray-700">
                  <CheveronDown size="19" strokeWidth="1.2" color="#495160" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center space-x-20">
              <p className="col-span-4 text-[14px] font-semibold">
                Measure item dimensions:
              </p>
              <div className="relative col-span-2 w-[60px]">
                <select
                  name="itemDimensions"
                  value={inputData.itemDimensions}
                  onChange={handleInputChange}
                  className="block appearance-none text-zinc-400 bg-white border border-inputBorder text-sm h-[24px] w-[58px] pl-2 rounded-md focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                >
                  <option className="hidden" value="">
                    CM
                  </option>

                  <option value="cm">CM</option>
                  <option value="m">M</option>
                  <option value="inch">Inch</option>
                </select>
                <div className="pointer-events-none  absolute inset-y-0 right-1 flex items-center px-1 text-gray-700">
                  <CheveronDown strokeWidth="1.2" size="19" color="#495160" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center space-x-20">
              <p className="col-span-4 text-[14px] font-semibold">
                Measure item weights In:
              </p>
              <div className="relative col-span-2 w-[60px]">
                <select
                  name="itemWeights"
                  value={inputData.itemWeights}
                  onChange={handleInputChange}
                  className="block appearance-none text-zinc-400 bg-white border border-inputBorder text-sm h-[24px] w-[58px] pl-2 rounded-md focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                >
                  <option className="hidden" value="">
                    KG
                  </option>

                  <option value="kg">KG</option>
                  <option value={"g"}>g</option>
                  <option value="lb">lb</option>
                </select>
                <div className="pointer-events-none  absolute inset-y-0 right-1 flex items-center px-1 text-gray-700">
                  <CheveronDown size="19" strokeWidth="1.2" color="#495160" />
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* Duplicate Item name */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold ">Duplicate Item Name</p>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox1"
              name="itemDuplicateName"
              checked={inputData.itemDuplicateName}
              onChange={handleInputChange}
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />{" "}
            <label htmlFor="customCheckbox1" className=" font-medium  ">Allow duplicate item names</label>
          </div>
          <p className="text-[#818894]">
            If you allow duplicate item names, all imports involving items will
            use SKU as the primary field for mapping
          </p>
        </div>
        {/* HSN Code or SAC */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-4">
          <p className="font-bold ">HSN Code or SAC </p>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox2"
              checked={inputData.hsnSac}
              onChange={handleInputChange}
              name="hsnSac"
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />
            <label htmlFor="customCheckbox2">Enable the HSN Code or SAC field</label>
          </div>
          {inputData.hsnSac && (
            <>
              <div className="flex gap-1 items-center mt-3">
                <div className="grid place-items-center cursor-pointer">
                  <input
                    id="4"
                    type="radio"
                    name="hsnDigits"
                    value="4"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${selectedRadio === "4"
                      ? "border-8 border-fourthiary_main"
                      : "border-1 border-neutral-400"
                      }`}
                    checked={selectedRadio === "4"}
                    onChange={() => handleRadioChange("4")}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${selectedRadio === "4"
                      ? "bg-neutral-100"
                      : "bg-transparent"
                      }`}
                  />
                </div>
                <label htmlFor="4" className="text-slate-600">
                  <span className="font-semibold">4-Digit HSN Code or SAC</span>
                </label>
              </div>
              <p className="w-[82%] text-[13px] text-[#818894]">
                Select this option if your business’s annual turnover was less
                than 5crores in the previous year. The 4-digit HSN Code or SAC
                is mandatory for B2B,SEZ Export or Deemed Export tax invoices
                and optional for B2C tax invoices.
              </p>
              <div className="flex gap-1 items-center mt-3">
                <div className="grid place-items-center cursor-pointer">
                  <input
                    id="6"
                    type="radio"
                    name="hsnDigits"
                    value="6"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${selectedRadio === "6"
                      ? "border-8 border-fourthiary_main"
                      : "border-1 border-neutral-400"
                      }`}
                    checked={selectedRadio === "6"}
                    onChange={() => handleRadioChange("6")}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${selectedRadio === "6"
                      ? "bg-neutral-100"
                      : "bg-transparent"
                      }`}
                  />
                </div>
                <label htmlFor="6" className="text-slate-600">
                  <span className="font-semibold">6-Digit HSN Code or SAC</span>
                </label>
              </div>
              <p className="text-[13px] text-[#818894]">
                Select this option if your business’s annual turnover was more
                than 5crores in the previous year. The 6-digit HSN Code or SAC
                is mandatory invoices.
              </p>
            </>
          )}
        </div>
        {/* Price List */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold ">Price List</p>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox3"
              checked={inputData.priceList}
              name="priceList"
              onChange={handleInputChange}
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />
            <label htmlFor="customCheckbox3">Enable Price List</label>
          </div>
          <p className="text-[#818894]">
            Price Lists enables you to customise the rates of the items in your
            sales and purchase transactions
          </p>
          {inputData.priceList && (
            <>
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="checkbox"
                  id="customCheckbox4"
                  checked={inputData.priceListAtLineLevel}
                  name="priceListAtLineLevel"
                  onChange={handleInputChange}
                  className="accent-[#c78000] cursor-pointer w-5 h-5"
                />
                <label htmlFor="customCheckbox4">Apply price list at line time level</label>
              </div>
              <p className="text-[#818894]">
                Select this option if you want to apply different price lists
                for each line item.
              </p>
            </>
          )}
        </div>
        {/* Composite Items */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold ">Composite Items</p>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox5"
              checked={inputData.compositeItem}
              name="compositeItem"
              onChange={handleInputChange}
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />
            <label htmlFor="customCheckbox5">Enable Composite Items</label>
          </div>
        </div>
        {/* Advanced Inventory Tracking */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
          <p className="font-bold ">Advanced Inventory Tracking </p>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox6"
              checked={inputData.stockBelowZero}
              name="stockBelowZero"
              onChange={handleInputChange}
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />
            <label htmlFor="customCheckbox6">Prevent stock from going below zero</label>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox7"
              checked={inputData.outOfStockBelowZero}
              name="outOfStockBelowZero"
              onChange={handleInputChange}
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />
            <label htmlFor="customCheckbox7">
              Show an Out of Stock warning when an item's stock drops below
              zero
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="customCheckbox8"
              name="trackCostOnItems"
              checked={inputData.trackCostOnItems}
              onChange={handleInputChange}
              className="accent-[#c78000] cursor-pointer w-5 h-5"
            />
            <label htmlFor="customCheckbox8">Track landed cost on items</label>
          </div>
        </div>
        <Button
          onClick={handleSave}
          variant="primary"
          className="h-[38px] w-[120px] flex justify-center float-end"
        >
          <p className="text-sm">Save</p>
        </Button>
      </div>
    </div>
  );
}

export default Items;
