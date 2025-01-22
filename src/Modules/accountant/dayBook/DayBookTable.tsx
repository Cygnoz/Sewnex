import  { useState } from "react";
import SearchBar from "../../../Components/SearchBar";

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

interface JournalEntry {
  date: string;
  particulars: string;
  voucherType: string;
  voucherNumber: string;
  debitBalance: string;
  creditBalance: string;
}

const initialColumns: Column[] = [
  { id: "date", label: "Date", visible: true },
  { id: "particulars", label: "Particulars", visible: true },
  { id: "voucherType", label: "Voucher Type", visible: true },
  { id: "voucherNumber", label: "Voucher Number", visible: true },
  { id: "debitBalance", label: "Debit", visible: true },
  { id: "creditBalance", label: "Credit", visible: true },
];

const journalData: JournalEntry[] = [
  { date: "12-12-2012", particulars: "By Bank A/C", voucherType: "Contra", voucherNumber: "1", debitBalance: "50000.00", creditBalance: "0.00" },
  { date: "", particulars: "To Cash A/C", voucherType: "", voucherNumber: "", debitBalance: "0.00", creditBalance: "50000.00" },
  { date: "12-12-2012", particulars: "To Sundry Creditors", voucherType: "Contra", voucherNumber: "2", debitBalance: "50000.00", creditBalance: "0.00" },
  { date: "", particulars: "To Bank", voucherType: "", voucherNumber: "", debitBalance: "0.00", creditBalance: "50000.00" },
];

function DayBookTable() {
  const [searchValue, setSearchValue] = useState("");
  const columns = initialColumns;
  const filteredJournalData =journalData



  const renderColumnContent = (colId: string, item: JournalEntry) => {
    const columnValue = item[colId as keyof JournalEntry];
    return columnValue ? (
      <span>{columnValue}</span>
    ) : (
      <span className="text-gray-500 italic"></span>
    );
  };

  return (
    <div>
      <h1 className="text-base font-bold text-heading">Day Book</h1>
      <p className="text-subHeading mt-2 text-xs">
        Lorem ipsum dolor sit amet consectetua egestas consectetur amet.
      </p>

      <div className="bg-white p-6 border border-[#EAECF0] rounded-2xl mt-6">
        <SearchBar
          placeholder="Search account"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        <div className="overflow-x-auto my-4">
          <table
            className="min-w-full bg-white border border-gray-200"
            style={{ borderColor: "#EAECF0" }}
          >
            <thead className="bg-[#F7ECD9]">
              <tr>
                {columns.map(
                  (col) =>
                    col.visible && (
                      <th
                        key={col.id}
                        className="py-3.5 font-medium px-5 border text-[#495160] text-center border-[#EAECF0] text-xs"
                      >
                        {col.label}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredJournalData.length > 0 ? (
                filteredJournalData.map((entry, index) => (
                  <tr
                    key={index}
                  >
                    {columns.map(
                      (col) =>
                        col.visible && (
                          <td
                            key={col.id}
                            className="py-3.5 px-5 border text-[#667085] text-center border-[#EAECF0] text-sm"
                          >
                            {renderColumnContent(col.id, entry)}
                          </td>
                        )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-3 px-5 text-center text-gray-500"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DayBookTable;
