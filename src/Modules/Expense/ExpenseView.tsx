import { Link, useParams } from "react-router-dom";

import Button from "../../Components/Button";
import Pen from "../../assets/icons/Pen";

import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import { endpoints } from "../../Services/apiEdpoints";
import CheveronLeftIcon from "../../assets/icons/ChevronLeft";

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
  ];

  const sampleExpenses = {
    data: {
      expenseDate: "2024-05-30",
      grandTotal: "5000",
      paidThrough: "Bank Transfer",
      supplierDisplayName: "ABC Supplies",
      gstTreatment: "Registered Business",
      gstin: "27AABCU9603R1ZN",
      sourceOfSupply: "Maharashtra",
      destinationOfSupply: "Karnataka",
      expense: [
        {
          expenseAccount: "Office Supplies",
          igst: 18,
          igstAmount: 900,
          sgst: 9,
          cgst: 9,
        },
      ],
    },
  };
  

//   const getExpenses = async () => {
//     try {
//       const url = `${endpoints}`;
//       const { response, error } = await getExpense(url);

//       if (!error && response) {
//         setExpense(response.data);
//         setExpenseData(response.data.expense);
//         console.log(response.data, "response");
//       } else {
//       }
//     } catch (error) {
//       console.log("Error in fetching expense", error);
//     }
//   };
const getExpenses = async () => {
    try {
      const response = sampleExpenses; // Use sample data here
      setExpense(response.data);
      setExpenseData(response.data.expense);
      console.log(response.data, "response");
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
          <div className="flex justify-center items-center h-11 w-11 bg-tertiary_main rounded-full">
            <CheveronLeftIcon color="#0B1320" />
          </div>
        </Link>
        <p className="text-textColor text-xl font-bold">View Expense</p>
      </div>

      <div className="flex border-b py-3 border-slate-400">
        <div className="text-textColor text-lg font-semibold ">
          <p>
            {expensedata[0]?.expenseAccount}
            <span className="font-light px-3"> |</span> Materials
          </p>
        </div>
        <div className="flex ml-auto gap-4">
          <div className="hidden">
            <Button variant="secondary" size="sm">
              <Pen color="currentColor" />
              Edit
            </Button>
          </div>
          <Button variant="secondary" size="sm">
            {/* <PrinterIcon color="currentColor" height={20} width={20} /> */}
            Print
          </Button>
        </div>
      </div>
      <p className="text-base font-semibold text-dropdownText">
        <span className="me-4">Expense Date:</span> {expense?.expenseDate}
      </p>

      <div className="grid grid-cols-12 text-textColor gap-4">
        <div className="col-span-7">
          <div
            className="h-[77px] flex items-center px-5"
            style={{
              background:
                "linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)",
            }}
          >
            <p className="font-bold">
              {expense.grandTotal}
              <span className="font-semibold ">| Expense Amount </span>{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 mt-5 space-y-5 justify-beteween border-b border-gray-400 py-4 ">
            <div>
              <p className=" text-currentColor">Paid Through</p>
              <p className="font-bold text-textColor">{expense.paidThrough}</p>
            </div>

            <div>
              <p className=" font-bold text-textColor -mt-4">Tax</p>
              {expensedata[0]?.igstAmount > 0
                ? `IGST[${expensedata[0]?.igst}%]`
                : `SGST[${expensedata[0]?.sgst}%] CGST[${expensedata[0]?.cgst}%]`}
            </div>

            <div>
              <p className=" text-currentColor">Tax Amount</p>
              {/* <p className="font-bold text-textColor">{organization?.baseCurrency} {expense.grandTotal} {expense.amountIs=="Tax Inclusive"? "(Inclusive)":"(Exclusive)"}</p> */}
            </div>

            <div>
              <p className=" text-currentColor">Paid To</p>
              <p className="font-bold text-textColor">
                {expense.supplierDisplayName}
              </p>
            </div>

            <div>
              <p className=" text-currentColor">GST Treatment</p>
              <p className="font-bold text-textColor">{expense.gstTreatment}</p>
            </div>

            <div>
              <p className=" text-currentColor">GST / UIN</p>
              <p className="font-bold text-textColor">{expense.gstin}</p>
            </div>

            <div>
              <p className=" text-currentColor">Source of Supply</p>
              <p className="font-bold text-textColor">
                {expense.sourceOfSupply}
              </p>
            </div>

            <div>
              <p className=" text-currentColor">Destination of Supply</p>
              <p className="font-bold text-textColor">
                {expense.destinationOfSupply}
              </p>
            </div>
          </div>

          <div className="my-5">
            <p className="font-bold text-xl">Journal</p>
            <table className="w-full">
              <thead>
                <tr className="border-b py-2 border-gray ">
                  <th className="w-[70%] text-start font-[300] text-sm">
                    Account
                  </th>
                  <th className="text-start font-[300] text-sm">Debit</th>
                  <th className="text-start font-[300] text-sm">Credit</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="text-start font-[300] text-sm">Pretty cash</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                </tr>
                <tr>
                  <td className="text-start font-[300] text-sm">input IGST</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                </tr>
                <tr>
                  <td className="text-start font-[300] text-sm">
                    Cost of goods sold
                  </td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                  <td className="text-start font-[300] text-sm">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 bg-[#F9F7F5] py-6 px-4">
          <p className="text-lg font-bold text-textColor">Expense History</p>
          <div className="relative ms-5 my-6">
            {historyData.map((item, index) => (
              <div key={index} className="flex my-10 gap-5">
                <div className="relative">
                  {index !== historyData.length - 1 && (
                    <div className="absolute  left-1/2 transform -translate-x-1/2 h-[130%] w-px bg-slate-300"></div>
                  )}
                  <div className="bg-darkRed h-10 w-10 rounded-full relative items-center justify-center flex"></div>
                </div>
                <div className=" space-y-2 w-full ">
                  <div className="flex gap-8">
                    <p>{item.date}</p>
                    <p> {item.time}</p>
                  </div>

                  <p className="font-bold text-lg">{item.title}</p>
                  <div className="">
                    <p>Expense Created for &#8377; {item.amount}</p>
                    <div className="flex gap-5">
                      <p className="font-bold">By Info</p>
                      <p className="font-bold border-b-2">View Details</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseView;
