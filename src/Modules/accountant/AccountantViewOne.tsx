import { Link } from "react-router-dom";
import BackIcon from "../../assets/icons/BackIcon";

type Props = {};

type TableColumn = {
  id: keyof TableRow | "SLNO"; 
  label: string;
  visible: boolean;
};

type TableRow = {
  date: string;
  details: string;
  type: string;
  debit: string;
  credit: string;
};

function AccountantViewOne({}: Props) {
  const dummyColumns: TableColumn[] = [
    { id: "SLNO", label: "SL NO", visible: true },
    { id: "date", label: "Date", visible: true },
    { id: "details", label: "Transactional Details", visible: true },
    { id: "type", label: "Type", visible: true },
    { id: "debit", label: "Debit", visible: true },
    { id: "credit", label: "Credit", visible: true },
  ];

  const tableData: TableRow[] = [
    {
      date: "12-12-2012",
      details: "Lorem ipsum dolor sit amet",
      type: "Journal",
      debit: "Rs. 50000.00",
      credit: "0.00",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link to={"/accountant/bank"}>
          <BackIcon />
        </Link>
        <p className="text-base font-bold text-[#37393A]">
          Bank of America (BOA)
        </p>
      </div>

      <div className="bg-white mt-3 rounded-2xl px-6 py-[21px]">
        <p className="text-[#303F58] font-bold text-base">Recent Transaction</p>
        <div className="mt-6">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9F9F9] text-sm  text-[#4F5152] text-center">
              <tr>
                {dummyColumns.map(
                  (column) =>
                    column.visible && (
                      <th
                        key={column.id}
                        className="py-3 px-4 font-medium"
                      >
                        {column.label}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody className="text-sm text-center text-[#667085]">
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#FAFAFA]">
                  {dummyColumns.map((column) => {
                    if (column.id === "SLNO") {
                      return (
                        <td
                          key={column.id}
                          className="py-3 px-4 border-b border-[#EAECF0]"
                        >
                          {rowIndex + 1}
                        </td>
                      );
                    }
                    return (
                      column.visible && (
                        <td
                          key={column.id}
                          className="py-3 px-4 border-b border-[#EAECF0]"
                        >
                          {row[column.id as keyof TableRow]} {/* Safely index using type assertion */}
                        </td>
                      )
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountantViewOne;
