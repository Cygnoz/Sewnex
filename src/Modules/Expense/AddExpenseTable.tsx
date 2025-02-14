import React, { useEffect, useState } from "react";
import CirclePlus from "../../assets/icons/CirclePlus";
import CheveronDown from "../../assets/icons/CheveronDown";
CheveronDown
type Props = {
  expenseData: any;
  setExpenseData: React.Dispatch<React.SetStateAction<any>>;
  accountData: any[];
  taxRate?: {
    gstTaxRate: { taxName: string; sgst: number; cgst: number; igst: number }[];
  };
};

type Row = {
  expenseAccountId: string;
  expenseAccount: string;
  note: string;
  taxGroup: string;
  sgst: number;
  cgst: number;
  igst: number;
  sgstAmount: number;
  cgstAmount: number;
  igstAmount: number;
  amount: number;
};

const AddExpenseTable: React.FC<Props> = ({
  expenseData,
  setExpenseData,
  accountData,
  taxRate,
}) => {
  const [rows, setRows] = useState<Row[]>([
    {
      expenseAccountId: "",
      expenseAccount: "",
      note: "",
      taxGroup: "",
      sgst: 0,
      cgst: 0,
      igst: 0,
      sgstAmount: 0,
      cgstAmount: 0,
      igstAmount: 0,
      amount: 0,
    },
  ]);



  const calculateTax = (row: Row) => {
    const amount = row.amount || 0;
    const isSameSupply =
      expenseData.sourceOfSupply === expenseData.destinationOfSupply;

    const sgstAmount = isSameSupply ? (row.sgst / 100) * amount : 0;
    const cgstAmount = isSameSupply ? (row.cgst / 100) * amount : 0;
    const igstAmount = !isSameSupply ? (row.igst / 100) * amount : 0;

    return { sgstAmount, cgstAmount, igstAmount };
  };

  const handleRowChange = (index: number, updatedFields: Partial<Row>) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index
        ? {
            ...row,
            ...updatedFields,
            ...calculateTax({ ...row, ...updatedFields }), // assuming calculateTax updates the tax-related fields
          }
        : row
    );
  
    setRows(updatedRows);  // Update rows state
    setExpenseData((prev: any) => ({
      ...prev,
      expense: updatedRows,  // Update expense data
    }));
  };
  
  const handleTaxGroupChange = (index: number, taxName: string) => {
    const selectedTax = taxName ? taxRate?.gstTaxRate?.find(tax => tax.taxName === taxName) : null;
  
    if (selectedTax) {
      handleRowChange(index, {
        taxGroup: selectedTax.taxName,  // Set the correct taxGroup
        sgst: selectedTax.sgst || 0,    // Set SGST if exists
        cgst: selectedTax.cgst || 0,    // Set CGST if exists
        igst: selectedTax.igst || 0,    // Set IGST if exists
      });
    } else {
      handleRowChange(index, {
        taxGroup: "",   
        sgst: 0,        
        cgst: 0,       
        igst: 0,       
      });
    }
  };
  

  // console.log(rows.)

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        expenseAccountId: "",
        expenseAccount: "",
        note: "",
        taxGroup: "",
        sgst: 0,
        cgst: 0,
        igst: 0,
        sgstAmount: 0,
        cgstAmount: 0,
        igstAmount: 0,
        amount: 0,
      },
    ]);
  };



  const handleRemoveRow = (index: number) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((_, rowIndex) => rowIndex !== index);
      setExpenseData((prev: any) => ({
        ...prev,
        expense: updatedRows,
      }));
      return updatedRows;
    });
  };

  useEffect(() => {
    if (expenseData.expense) {
      setRows(expenseData.expense);
    }
  }, []);

  console.log(rows,"rows")

  const calculateTotalTaxes = () => {
    const sgstPctg = rows.reduce((acc, row) => acc + row.sgst, 0);
    const cgstPctg = rows.reduce((acc, row) => acc + row.cgst, 0);
    const igstPctg = rows.reduce((acc, row) => acc + row.igst, 0);
    return { sgstPctg, cgstPctg, igstPctg };
  };

  const { sgstPctg, cgstPctg, igstPctg } = calculateTotalTaxes();

  return (
    <div className="p-4">
      <div className="overflow-auto">
        <table className="w-full bg-gray-50 rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-2 text-sm text-labelColor bg-[#FDF8F0]">
                Expense Account
              </th>
              <th className="p-2 text-sm text-labelColor bg-[#FDF8F0]">
                Notes
              </th>
              <th className="p-2 text-sm text-labelColor bg-[#FDF8F0]">Tax</th>
              <th className="p-2 text-sm text-labelColor bg-[#FDF8F0]">
                Amount
              </th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, index: number) => (
              <tr key={index} className="border-b border-inputBorder">
                <td className="p-2">
                  <div className="relative w-full">
                    <div className="relative w-full ml-auto">
                      <select
                        onChange={(e) =>
                          handleRowChange(index, {
                            expenseAccountId: e.target.value,
                          })
                        }
                        value={row.expenseAccountId || ""}
                        name="expenseAccountId"
                        className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                      >
                        <option value="" hidden disabled>
                          {row.expenseAccountId
                            ? accountData.find(
                                (item: any) => item._id === row.expenseAccountId
                              )?.accountName || "Select Account"
                            : "Select Account"}
                        </option>

                        {accountData
                         ?.filter(
                            (item: { accountGroup: string }) =>
                              item.accountGroup === "Liability"
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
                </td>

                <td className="p-2">
                  <input
                    type="text"
                    value={row.note}
                    onChange={(e) =>
                      handleRowChange(index, { note: e.target.value })
                    }
                    placeholder="Max 500 char"
                    className="appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </td>
                <td className="p-2">
                  <div className="relative w-full">
                  <select
  disabled={expenseData.gstTreatment === "Registered Business - Composition" || expenseData.gstTreatment === "Unregistered Business" || expenseData.gstTreatment === "Overseas"}
  name="taxGroup"
  value={row.taxGroup || ""}  // Ensure value is an empty string if no taxGroup is selected
  onChange={(e) => handleTaxGroupChange(index, e.target.value)} // Correct handler to update state
  className="appearance-none w-full h-9 text-zinc-700 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
>
  <option value="">Select Tax Rate</option>
  <option value="Non-Taxable">Non-Taxable</option>
  <optgroup label="Tax">
    {taxRate?.gstTaxRate?.map((account: any, index: number) => (
      <option key={index} value={account.taxName}> {/* Using taxName as value */}
        {account.taxName}
      </option>
    ))}
  </optgroup>
</select>



                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CheveronDown color="gray" />
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(index, {
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => {
                      handleRemoveRow(index);
                    }}
                    className="text-gray-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div
          onClick={handleAddRow}
          className="hover:bg-gray-100 cursor-pointer rounded-lg py-2 flex items-center"
        >
          <div className="flex items-center space-x-2">
            <CirclePlus color="darkRed" size={18} />
            <span className="text-sm font-semibold text-darkRed">Add Row</span>
          </div>
        </div>
        <div className="text-sm text-gray-70 min-w-[20%] text-textColor space-y-2">
          {/* Sub Total */}
          <div className="flex">
            <div className="w-[75%]">
              <p>Sub Total</p>
            </div>
            <div className="w-full text-end">
              <p>{expenseData.subTotal}</p>
            </div>
          </div>

          {expenseData.sourceOfSupply !== expenseData.destinationOfSupply ? (
            <div>
              {/* IGST */}
              <div className="flex">
                <div className="w-[75%]">
                  <p>IGST[{igstPctg}%]</p>
                </div>
                <div className="w-full text-end">
                  <p>{expenseData.igst}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* SGST */}
              <div className="flex">
                <div className="w-[75%]">
                  <p>SGST[{sgstPctg}%]</p>
                </div>
                <div className="w-full text-end">
                  <p>{expenseData.sgst}</p>
                </div>
              </div>

              {/* CGST */}
              <div className="flex">
                <div className="w-[75%]">
                  <p>CGST[{cgstPctg}%]</p>
                </div>
                <div className="w-full text-end">
                  <p>{expenseData.cgst}</p>
                </div>
              </div>
            </>
          )}

          <div className="flex mt-2 font-bold">
            <div className="w-[75%]">
              <p>Expense Total</p>
            </div>
            <div className="w-full text-end">
              <p>{expenseData.grandTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseTable;
