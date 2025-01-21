import { useState } from "react";
import TableSkelton from "./TableSkelton";
import Eye from "../../assets/icons/Eye";
import Trash2 from "../../assets/icons/Trash";
import Pen from "../../assets/icons/Pen";
import SearchBar from "../SearchBar";
import ChevronRight from "../../assets/icons/ChevronRight";
import ChevronLeft from "../../assets/icons/ChevronLeft";

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  renderColumnContent?: (colId: string, item: any) => JSX.Element;
  searchPlaceholder: string;
  loading?: boolean;
  searchableFields: string[];
  setColumns?: any;
  page?: any;
  onEditClick?: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  page,
  columns,
  data,
  onRowClick,
  onDelete,
  renderColumnContent,
  searchPlaceholder,
  loading,
  searchableFields,
  onEditClick,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const filteredData = Array.isArray(data)
    ? data
      .slice()
      .reverse()
      .filter((item) =>
        searchableFields
          .map((field) => item[field]?.toString().trim().toLowerCase())
          .some((fieldValue) =>
            fieldValue?.includes(searchValue.toLowerCase().trim())
          )
      )
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  const visibleColumns = columns.filter((col) => col.visible);
  const skeletonColumns = [...visibleColumns, {}, {}, {}];

  return (
    <div className="border border-b rounded-lg">
      <div className="flex items-center gap-4 justify-between p-3">
        <SearchBar
          placeholder={searchPlaceholder}
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
          }}
        />
        {/* Add buttons like PrintButton if needed */}
      </div>

      <div className="overflow-x-auto mt-3 hide-scrollbar overflow-y-scroll max-h-[25rem]">
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr style={{ backgroundColor: "#f7ecda" }}>
              <th className="py-3 px-4 border-b border-tableBorder text-[#495160]">
                No
              </th>
              {columns.map(
                (col) =>
                  col.visible && (
                    <th
                      key={col.id}
                      className="py-2 px-4 text-[#495160] border-b border-tableBorder"
                    >
                      {col.label}
                    </th>
                  )
              )}
              <th className="py-3 px-2 font-medium border-b border-tableBorder">
                Action
              </th>
              <th className="py-3 px-2 font-medium border-b border-tableBorder"></th>
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {loading ? (
              [...Array(rowsPerPage)].map((_, idx) => (
                <TableSkelton key={idx} columns={skeletonColumns} />
              ))
            ) : filteredData && filteredData.length > 0 ? (
              filteredData.map((item, rowIndex) => (
                <tr key={item.id} className="relative cursor-pointer">
                  <td className="py-2.5 px-4 border-y border-tableBorder text-[#818894]">
                    {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                  </td>
                  {columns.map(
                    (col) =>
                      col.visible && (
                        <td
                          key={col.id}
                          className="py-2.5 px-4 border-y border-tableBorder text-center text-[#818894]"
                        >
                          {renderColumnContent
                            ? renderColumnContent(col.id, item) || "-"
                            : item[col.id] !== undefined &&
                              item[col.id] !== null
                              ? item[col.id]
                              : "-"}
                        </td>
                      )
                  )}
                  <td className="py-3 px-4 border-b border-tableBorder text-[#495160] flex items-center justify-center gap-2">
                    <button onClick={() => onEditClick && onEditClick(item._id)}>
                      <Pen color={"#3C7FBC"} size={18} />
                    </button>
                    <button onClick={() => onRowClick && onRowClick(item._id)}>
                      <Eye color={"#9A9436"} />
                    </button>
                    {page === "OCR" && (
                      <button onClick={() => onDelete && onDelete(item._id)}>
                        <Trash2 color="#EA1E4F" size={18} />
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-tableBorder"></td>
                </tr>
              ))
            ) : (
              <p>No Data found</p>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
        {/* Rows per page selector on the left */}
        <div className="flex gap-2 items-center text-[#71736B] font-medium text-xs p-5">
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="  text-sm ml-2"
          >
            {[5, 10, 15, 20,25,30].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center p-5">
          <div className="flex justify-center items-center space-x-2 mt-4">
            {/* Left Chevron Button */}
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition duration-200 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <ChevronLeft color="" />
              </button>
            )}

            {/* Render Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 2),
                  Math.min(totalPages, currentPage + 1)
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${currentPage === page
                        ? "bg-[#97998E] text-white"
                        : "text-[#71736B] hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}

              {currentPage + 1 < totalPages && (
                <>
                  <span className="px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 rounded text-[#71736B] hover:bg-gray-100"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Right Chevron Button */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition duration-200 disabled:opacity-50"
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight />
              </button>
            )}
          </div>

          {/* Page Information */}
          {/* <span className="text-xs text-[#71736B] font-medium mt-2">
            Page {currentPage} of {totalPages || 1}
          </span> */}
        </div>

      </div>
      </div>

    
    </div>
  );
};

export default Table;
