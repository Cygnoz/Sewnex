import { useState } from "react";
import TableSkelton from "./TableSkelton";
import Eye from "../../assets/icons/Eye";
import Trash2 from "../../assets/icons/Trash";
import Pen from "../../assets/icons/Pen";
import SearchBar from "../SerachBar";

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
//   setColumns,
  onEditClick
}) => {
  const [searchValue,setSearchValue] = useState<string>("");
  const rowsPerPage = 10;

  const filteredData = Array.isArray(data)
  ? data
      .slice()
      .reverse() 
      .filter((item) => {
        return searchableFields
          .map((field) => item[field]?.toString().trim().toLowerCase())
          .some((fieldValue) =>
            fieldValue?.includes(searchValue.toLowerCase().trim())
          );
      })
  : [];





  const visibleColumns = columns.filter((col) => col.visible);
  const skeletonColumns = [...visibleColumns, {}, {}, {}];

  return (
    <div>
      <div className="flex items-center gap-4 justify-between">
        <SearchBar
          placeholder={searchPlaceholder}
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
          }}
        />
        {/* <PrintButton /> */}
     
      </div>

      <div className="overflow-x-auto mt-3 hide-scrollbar overflow-y-scroll max-h-[25rem]">
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr style={{ backgroundColor: "#f7ecda" }}>
              <th className="py-3 px-4 border-b border-tableBorder text-[#495160]">No</th>
              {columns?.map(
                (col) =>
                  col.visible && (
                    <th
                      key={col.id}
                      className="py-2 px-4  text-[#495160] border-b border-tableBorder"
                    >
                      {col.label}
                    </th>
                  )
              )}
              <th className="py-3 px-2 font-medium border-b border-tableBorder">
                Action
              </th>
              <th className="py-3 px-2 font-medium border-b border-tableBorder">
                {/* <CustomiseColmn
                  columns={columns}
                  setColumns={setColumns}
                  tableId={`${page}`}
                /> */}
              </th>
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
                  {rowIndex+1}
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
                    <Pen color={"green"}/>
                    </button>
                    <button onClick={() => onRowClick && onRowClick(item._id)}>
                      <Eye color={"#569FBC"} />
                    </button>
                  {page==="OCR" &&  <button
                      onClick={() =>
                        onDelete &&
                       
                        onDelete(item._id)
                      }
                    >
                      <Trash2 color="#EA1E4F" size={18} />
                    </button>}
                  </td>

                  <td className="py-3 px-4 border-b border-tableBorder"></td>
                </tr>
              ))
            ) : (
            //   <NoDataFoundTable columns={skeletonColumns} />
            <p>No Data found</p>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default Table;
