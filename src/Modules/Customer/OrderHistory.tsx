import Table from "../../Components/Table/Table";

type Props = {};

const OrderHistory: React.FC<Props> = () => {
  const columns = [
    { id: "orderId", label: "Order ID", visible: true },
    { id: "date", label: "Date", visible: true },
    { id: "amount", label: "Amount", visible: true },
  ];

  const data = [
    { id: "1", orderId: "423430", date: "July 14, 2015", amount: "2000.00" },
    { id: "2", orderId: "423430", date: "October 24, 2018", amount: "5400.00" },
    { id: "3", orderId: "423430", date: "May 29, 2017", amount: "5300.00" },
    { id: "4", orderId: "423430", date: "May 31, 2015", amount: "500.00" },
  ];

  const handleRowClick = (id: string) => {
    console.log("Row clicked:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
  };

  const handleEditClick = (id: string) => {
    console.log("Edit clicked for ID:", id);
  };

  return (
    <div className="p-3">
    <div className="p-5 m-4 rounded-lg bg-[#F5F8FC]">
    <Table
        page="OrderHistory"
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        onDelete={handleDelete}
        onEditClick={handleEditClick}
        searchPlaceholder="Search by Order ID, Date, or Amount"
        loading={false}
        searchableFields={["orderId", "date", "amount"]}
      />
    </div>
    </div>
  );
};

export default OrderHistory;
