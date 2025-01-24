import React from "react";
import Table from "../../Components/Table/Table";

const ViewPayment: React.FC = () => {
  // Column definitions
  const columns = [
    { id: "slNo", label: "Sl No", visible: true },
    { id: "invoiceNumber", label: "Invoice Number", visible: true },
    { id: "date", label: "Date", visible: true },
    { id: "amount", label: "Amount", visible: true },
    { id: "remark", label: "Remark", visible: true },
  ];

  // Sample data
  const data = [
    {
      id: "1",
      slNo: "1",
      invoiceNumber: "INV00234",
      date: "28 May 2024",
      amount: "₹2000.00",
      remark: "Balance",
    },
    {
      id: "2",
      slNo: "2",
      invoiceNumber: "INV00134",
      date: "28 May 2024",
      amount: "₹500.00",
      remark: "Balance",
    },
    {
      id: "3",
      slNo: "3",
      invoiceNumber: "INV00124",
      date: "28 May 2024",
      amount: "₹500.00",
      remark: "Balance",
    },
    {
      id: "4",
      slNo: "4",
      invoiceNumber: "INV00114",
      date: "28 May 2024",
      amount: "₹500.00",
      remark: "Balance",
    },
    {
      id: "5",
      slNo: "5",
      invoiceNumber: "INV00034",
      date: "28 May 2024",
      amount: "₹500.00",
      remark: "Balance",
    },
  ];

  // Action Handlers
  const handleEditClick = (id: string) => {
    console.log("Edit clicked for ID:", id);
  };

  const handleRowClick = (id: string) => {
    console.log("Row clicked:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
  };

  return (
    <div className="p-5 m-4 rounded-lg bg-[#F5F8FC]">
      {/* Header Section */}
      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Payment Receipt</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold">
            Outstanding Balance: <span className="text-green-600">₹1000.00</span>
          </span>
          <button className="bg-gray-100 border px-4 py-1 rounded-md">
            Select Date
          </button>
          <button className="bg-green-500 text-white px-4 py-1 rounded-md">
            + New Payment
          </button>
        </div>
      </div> */}

      {/* Table Component */}
      <Table
        // page="ViewPayment"
        columns={columns}
        data={data}
        searchPlaceholder="Search by Invoice Number, Date, or Amount"
        onRowClick={handleRowClick}
        onDelete={handleDelete}
        onEditClick={handleEditClick}
        searchableFields={["invoiceNumber", "date", "amount", "remark"]}
        loading={false}
      />
    </div>
  );
};

export default ViewPayment;
