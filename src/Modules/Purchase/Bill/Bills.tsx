import { useState } from "react";
import CirclePlus from "../../../assets/icons/CirclePlus";
import Button from "../../../Components/Button";
import Table from "../../../Components/Table/Table";
import { Link, useNavigate } from "react-router-dom";
import DotIcon from "../../../assets/icons/DotIcon";

function Bills() {
  const navigate = useNavigate();
  const [columns] = useState([
    { id: "billNumber", label: "Bill#", visible: true },
    { id: "billDate", label: "Bill Date", visible: true },
    { id: "supplierDisplayName", label: "Supplier Name", visible: true },
    { id: "grandTotal", label: "Amount", visible: true },
    { id: "dueDate", label: "Due Date", visible: true },
    { id: "paidStatus", label: "Status", visible: true },
  ]);

  const dummyData = [
    {
      billNumber: "B001",
      billDate: "2025-01-01",
      supplierDisplayName: "Supplier A",
      grandTotal: "$1500",
      dueDate: "2025-01-15",
      paidStatus: "Completed",
    },
    {
      billNumber: "B002",
      billDate: "2025-01-05",
      supplierDisplayName: "Supplier B",
      grandTotal: "$2000",
      dueDate: "2025-01-20",
      paidStatus: "Pending",
    },
    {
      billNumber: "B003",
      billDate: "2025-01-10",
      supplierDisplayName: "Supplier C",
      grandTotal: "$1800",
      dueDate: "2025-01-25",
      paidStatus: "Overdue",
    },
    {
      billNumber: "B004",
      billDate: "2025-01-12",
      supplierDisplayName: "Supplier D",
      grandTotal: "$1200",
      dueDate: "2025-01-22",
      paidStatus: "Pending",
    },
  ];

  const renderColumnContent = (colId: string, item: any) => {
    if (colId === "paidStatus") {
      return (
        <div className="flex justify-center items-center">
          <div
            className={`${
              item.paidStatus === "Pending"
                ? "bg-[#FFF6EC] text-[#B47800]"
                : item.paidStatus === "Completed"
                ? "bg-[#DBF8EB] text-[#178B53]"
                : "bg-[#FF3B301A] text-[#FF3B30]"
            } text-[13px] rounded-lg text-center items-center h-[18px] px-2 max-w-fit gap-2 py-2 flex justify-center`}
          >
            <DotIcon
              color={
                item.paidStatus === "Pending"
                  ? "#B47800"
                  : item.paidStatus === "Completed"
                  ? "#178B53"
                  : "#FF3B30"
              }
            />{" "}
            {item.paidStatus}
          </div>
        </div>
      );
    }

    return item[colId as keyof typeof item];
  };

  const handleRowClick = () => {
    navigate(`/purchase/bills/view/id`);
  };

  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[#0B1320] font-bold">Bills</p>
          <p className="text-[#818894] text-sm">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla{" "}
          </p>
        </div>
        <div className="ml-auto">
          <Link to="/purchase/bills/new">
            <Button variant="primary" size="sm">
              <CirclePlus color={"white"} size={18} />
              New Bill
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white mt-2 ">
        <Table
          columns={columns}
          data={dummyData}
          onRowClick={handleRowClick}
          renderColumnContent={renderColumnContent}
          searchPlaceholder={"Search bill"}
          searchableFields={["billNumber", "supplierDisplayName"]}
        />
      </div>
    </div>
  );
}

export default Bills;
