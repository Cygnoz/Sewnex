import { Link, useParams } from "react-router-dom";

import Button from "../../Components/Button";
import Pen from "../../assets/icons/Pen";

import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import { endpoints } from "../../Services/apiEdpoints";
import CheveronLeftIcon from "../../assets/icons/ChevronLeft";
import { ExpenseDollar } from "../../assets/icons/ExpenseDollar";
import { PrintIcon } from "../../assets/icons/PrintIcon";

type Props = {};

const ExpenseView = ({}: Props) => {
  const [expense, setExpense] = useState<any | []>([]);
  const [expensedata, setExpenseData] = useState<any | []>([]);
  const { request: getExpense } = useApi("get", 5008);

  const { id } = useParams();

  const historyData = [
    {
      date: "30/05/2024",
      time: "02:30 PM",
      title: "Expense Created",
      amount: "2000",
    },
    {
      date: "30/05/2024",
      time: "02:30 PM",
      title: "Expense Created",
      amount: "2000",
    },
    {
      date: "30/05/2024",
      time: "02:30 PM",
      title: "Expense Created",
      amount: "2000",
    },
    {
      date: "30/05/2024",
      time: "02:30 PM",
      title: "Expense Created",
      amount: "2000",
    },
  ];



    const getExpenses = async () => {
      try {
        const url = `${endpoints}/${id}`;
        const { response, error } = await getExpense(url);

        if (!error && response) {
          setExpense(response.data);
          setExpenseData(response.data.expense);
          console.log(response.data, "response");
        } else {
        }
      } catch (error) {
        console.log("Error in fetching expense", error);
      }
    };


  console.log(expensedata, "ksjhdguyftgyhjjhgfdxxcfgvbh");

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className=" rounded-lg bg-white p-4 space-y-3">
      <div className="flex items-center gap-5">
        <Link to={"/expense"}>
          <div className="flex justify-center items-center h-11 w-11 bg-[#FFFFFF] rounded-full">
            <CheveronLeftIcon color="#0B1320" />
          </div>
        </Link>
        <p className="text-[#303F58] text-xl font-bold">View Expense</p>
      </div>

      <div className="flex border-b py-3 border-slate-400">
        <div className="text-[#303F58] text-lg font-semibold ">
          <p>
            {expensedata[0]?.expenseAccount}
            <span className="font-light px-3 text-[#303F58]"> |</span> Materials
          </p>
        </div>
        <div className="flex ml-auto gap-4">
          <div className="">
            <Button variant="secondary" size="sm">
              <Pen color="#0B9C56" />
              Edit
            </Button>
          </div>
          <Button variant="secondary" size="sm">
            <PrintIcon />
            Print
          </Button>
        </div>
      </div>
      <p className="text-base font-semibold text-[#495160]">
        <span className="me-4">Expense Date:</span> {expense?.expenseDate}
      </p>

      <div className="grid grid-cols-12 text-textColor gap-4">
        <div className="col-span-7">
          <div
            className="h-[77px] px-5"
            style={{
              background:
                "linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)",
            }}
          >
            <p className=" pt-5">
              <span className="font-bold ">Rs. {expense.grandTotal}</span>

              <span className=" ml-3">
                | <span className="ms-3">Expense Amount </span>
              </span>
            </p>
            <p className="text-start font-[300] text-sm mt-1">NON BILLABLE</p>
          </div>
          <div className="grid grid-cols-2 mt-5 space-y-7 justify-beteween border-b border-gray-400 py-4 ">
            <div>
              <p className=" text-[#818894]">Paid Through</p>
              <p className="font-bold text-[#495160] ">{expense.paidThrough}</p>
            </div>

            <div>
              <p className=" text-[#818894] -mt-4">Tax</p>
              <span className="font-bold text-[#495160]">
                {" "}
                {expensedata[0]?.igstAmount > 0
                  ? `IGST[${expensedata[0]?.igst}%]`
                  : `SGST[${expensedata[0]?.sgst}%] CGST[${expensedata[0]?.cgst}%]`}
              </span>
            </div>

            <div>
              <p className=" text-[#818894]">Tax Amount</p>
              <p className="font-bold text-[#495160]">
                {" "}
                {expense.grandTotal}{" "}
                {expense.amountIs == "Tax Inclusive"
                  ? "(Inclusive)"
                  : "(Exclusive)"}
              </p>
            </div>

            <div>
              <p className="text-[#818894]">Paid To</p>
              <p className="font-bold text-[#495160]">
                {expense.supplierDisplayName}
              </p>
            </div>

            <div>
              <p className=" text-[#818894]">GST Treatment</p>
              <p className="font-bold text-[#495160]">{expense.gstTreatment}</p>
            </div>

            <div>
              <p className="text-[#818894]">GST / UIN</p>
              <p className="font-bold text-[#495160]">{expense.gstin}</p>
            </div>

            <div>
              <p className=" text-[#818894]">Source of Supply</p>
              <p className="font-bold text-[#495160]">
                {expense.sourceOfSupply}
              </p>
            </div>

            <div>
              <p className=" text-[#818894]">Destination of Supply</p>
              <p className="font-bold text-[#495160]">
                {expense.destinationOfSupply}
              </p>
            </div>
          </div>

          <div className="my-5">
            <p className="font-bold text-xl text-[#495160] mb-2">Journal</p>
            <table className="w-full ">
              <thead>
                <tr className="border-b border-[#D6D6D6]">
                  <th className="w-[70%] text-start font-[300] text-sm pb-1 ">
                    Account
                  </th>
                  <th className="text-start font-[300] text-sm pb-1">Debit</th>
                  <th className="text-start font-[300] text-sm pb-1">Credit</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="text-start font-[300] text-sm pt-2">Pretty cash</td>
                  <td className="text-start font-[300] text-sm pt-2">0.00</td>
                  <td className="text-start font-[300] text-sm pt-2">0.00</td>
                </tr>
                <tr>
                  <td className="text-start font-[300] text-sm">input IGST</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                </tr>
                <tr className="border-b border-[#D6D6D6]">
                  <td className="text-start font-[300] text-sm pb-3">
                    Cost of goods sold
                  </td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                </tr>
                <tr>
                  <td className="text-start font-[300] text-sm pt-2"></td>
                  <td className="text-start  text-sm font-semibold pt-2">0.00</td>
                  <td className="text-start text-sm font-semibold pt-2">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 bg-[#F9F7F5] py-6 px-4">
          <p className="text-lg font-bold text-[#495160]">Expense History</p>
          <div className="relative ms-5 my-6">
            {historyData.map((item, index) => (
              <div key={index} className="flex  gap-5 mt-10">
                <div className="relative">
                  {index !== historyData.length && (
                    <div>
                      <div className="ml-1">
                        <ExpenseDollar />
                      </div>
                      <div className="absolute  left-1/2 transform -translate-x-1/2 h-[130%] w-px bg-slate-300"></div>
                    </div>
                  )}

                  <div className="bg-darkRed h-10 w-10 rounded-full relative items-center justify-center flex mt-1"></div>
                </div>
                <div className=" space-y-2 w-full ">
                  <div className="flex gap-8">
                    <p className="text-sm text-[#4B5C79]">{item.date}</p>
                    <p className="text-sm text-[#4B5C79]"> {item.time}</p>
                  </div>

                  <p className="font-bold text-lg text-[#495160]">
                    {item.title}
                  </p>
                  <div className="">
                    <p className="text-sm text-[#4B5C79]">
                      Expense Created for &#8377; {item.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-6">
            <ExpenseDollar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseView;
