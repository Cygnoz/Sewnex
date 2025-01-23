import { useState } from "react";

type Props = {};

const Journal = ({}: Props) => {
  const [billJournal] = useState<any>([
    {
      _id: "1",
      accountName: "Cash",
      debitAmount: 1500.00,
      creditAmount: 0.00,
    },
    {
      _id: "2",
      accountName: "Sales",
      debitAmount: 0.00,
      creditAmount: 1500.00,
    },
    {
      _id: "3",
      accountName: "Accounts Receivable",
      debitAmount: 800.00,
      creditAmount: 0.00,
    },
    {
      _id: "4",
      accountName: "Service Revenue",
      debitAmount: 0.00,
      creditAmount: 800.00,
    },
  ]);

  return (
    <div className="border-[#E7E7ED] border rounded-lg text-sm p-5 mt-4">
      <p className="text-sm font-bold text-text_tertiary">Journal </p>
      <table className="w-full table-auto mt-3 text-sm text-dropdownText mb-2">
        <thead>
          <tr className="font-bold bg-[#f7ecda] text-text_tertiary text-xs">
            <th className="px-4 py-3 text-start">Account</th>
            <th className="px-4 py-3 text-right">Debit</th>
            <th className="px-4 py-3 text-right">Credit</th>
          </tr>
        </thead>
        <tbody>
          {billJournal.map((item: any) => (
            <tr key={item._id} className="text-text_tertiary text-xs border-b ">
              <td className="px-4 py-2 text-start ">{item.accountName}</td>
              <td className="px-4 py-2 text-right">{item.debitAmount.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">{item.creditAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-lg font-semibold text-text_tertiary mt-5">
            <td className="px-4 py-2 text-base"></td>
            <td className="px-4 py-2 text-right">
              {billJournal
                .reduce((total: any, item: any) => total + item.debitAmount, 0)
                .toFixed(2)}
            </td>
            <td className="px-4 py-2 text-right">
              {billJournal
                .reduce((total: any, item: any) => total + item.creditAmount, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Journal;
