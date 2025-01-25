import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import useApi from "../../../../Hooks/useApi";
import { endpoints } from "../../../../Services/apiEdpoints";
import Trash from "../../../../assets/icons/Trash";
import AddCurrency from "./AddCurrency";
import { Link } from "react-router-dom";

const CurrencyTable = () => {
  const { request: get_currencies } = useApi("get", 5004);
  const { request: deleteCurrencyRequest } = useApi("delete", 5004);

  const [currenciesData, setCurrenciesData] = useState<any[]>([
    {
      _id: "1",
      currencyCode: "USD",
      currencyName: "United States Dollar",
      currencySymbol: "$",
      baseCurrency: true,
    },
    {
      _id: "2",
      currencyCode: "EUR",
      currencyName: "Euro",
      currencySymbol: "€",
      baseCurrency: false,
    },
    {
      _id: "3",
      currencyCode: "INR",
      currencyName: "Indian Rupee",
      currencySymbol: "₹",
      baseCurrency: false,
    },
    {
      _id: "4",
      currencyCode: "GBP",
      currencyName: "British Pound",
      currencySymbol: "£",
      baseCurrency: false,
    },
  ]);
  const [ setSelectedCurrency] = useState<any | null>(null);

  const tableHeaders = ["Name", "Symbol", "Actions"];

  const getHandleCurrencies = async () => {
    try {
      const url = `${endpoints.GET_CURRENCIES}`;
      const { response, error } = await get_currencies(url);
      if (!error && response) {
        setCurrenciesData(response.data);
        console.log(response, "currencyData");
      }
    } catch (error) {
      console.error("Error in fetching currency data", error);
    }
  };

  const handleDelete = async (currencyId: string) => {
    try {
      const url = `/${currencyId}`;
      const { response, error } = await deleteCurrencyRequest(url);
      if (!error && response) {
        toast.success(response.data.message);
        getHandleCurrencies();
      } else {
        console.error(`Error deleting currency: ${error.message}`);
      }
    } catch (error) {
      console.error("Error in delete operation", error);
    }
  };

  useEffect(() => {
    getHandleCurrencies();
  }, []);
  console.log(currenciesData);
  return (
    <div className="space-y-4 pt-2">
      <table className="min-w-full bg-white mb-5">
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
        <tbody className="text-dropdownText text-center text-xs">
          {currenciesData.map((item: any, index: number) => (
            <tr className="relative" key={index}>
              {/* Currency Name & Code */}
              <td className="py-4 px-4  border-y border-tableBorder">
                <p>
                  {item.currencyCode}-{item.currencyName}{" "}
                  {item.baseCurrency && (
                    <span className="px-2 py-1 bg-[#6FC7A2] text-white">
                      Base Currency
                    </span>
                  )}
                </p>
              </td>

              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.currencySymbol}
              </td>

              <td className=" py-2.5 px-4 pb-5 border-b border-tableBorder flex items-center justify-center w-full ">
                <div className="flex items-center w-full -mb-1 mt-1 gap-2 justify-center">
                  <div className="h-[26px]">
                  <Link to="/settings/organization/currencies/exchange-rate">
                        <div  className="text-text_tertiary text-xs border px-[10px] py-1 rounded-lg">
                          <p>View Exchange Rate</p>
                        </div>
                  </Link>
                  </div>

                  <div onClick={() => setSelectedCurrency(item)}>
                    <AddCurrency page="edit" />
                  </div>

                  {item.baseCurrency === false ? (
                    <div onClick={() => handleDelete(item._id)}>
                      <Trash color={"#EA1E4F"} size={18} />
                    </div>
                  ) : (
                    <>
                      {" "}
                      <Trash color={"transparant"} />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
