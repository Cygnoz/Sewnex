import { useNavigate } from "react-router-dom"
import CirclePlus from "../assets/icons/CirclePlus"
import DeliveredIcon from "../assets/icons/DeliveredIcon"
import DispatchIcon from "../assets/icons/DispatchIcon"
import ManufacturingIcon from "../assets/icons/ManufacturingIcon"
import OrderPlacedIcon from "../assets/icons/OrderPlacedIcon"
import ProcessingIcon from "../assets/icons/ProcessingIcon"
import Button from "../Components/Button"
import Table from "../Components/Table/Table"

type Props = {}

function Order({ }: Props) {
  const OrderDetails = [
    {
      icon: <OrderPlacedIcon />,
      title: "All clients",
      number: "75",
    },
    {
      icon: <ProcessingIcon />,
      title: "Processing",
      number: "75",
    },
    {
      icon: <ManufacturingIcon />,
      title: "Manufacturing",
      number: "75",
    },
    {
      icon: <DispatchIcon />,
      title: "Dispatch",
      number: "75",
    },
    {
      icon: <DeliveredIcon />,
      title: "Delivered",
      number: "75",
    },
  ];
  const tableData = [
    {
      OrderDate: "18/01/25",
      Customer: "Savannah Nguyen",
      Status: "Order Placed",
      DeliveryDate: "18/01/25",
      TrailDate: "18/01/25",
      Phone: "(808) 555-0111",
      Amount: "5000",
      DueAmount: "500",
    },
    {
      OrderDate: "24/06/24",
      Customer: "Ralph Edwards",
      Status: "Order Placed",
      DeliveryDate: "24/06/24",
      TrailDate: "24/06/24",
      Phone: "(201) 555-0124",
      Amount: "3000",
      DueAmount: "300",
    },
    {
      OrderDate: "26/02/25",
      Customer: "Kathryn Murphy",
      Status: "Processing",
      DeliveryDate: "26/02/25",
      TrailDate: "26/02/25",
      Phone: "(505) 555-0125",
      Amount: "2000",
      DueAmount: "200",
    },
    {
      OrderDate: "18/01/25",
      Customer: "Jane Cooper",
      Status: "Manufacturing",
      DeliveryDate: "18/01/25",
      TrailDate: "18/01/25",
      Phone: "(208) 555-0112",
      Amount: "1000",
      DueAmount: "100",
    },
    {
      OrderDate: "24/06/24",
      Customer: "Devon Lane",
      Status: "Order Placed",
      DeliveryDate: "24/06/24",
      TrailDate: "24/06/24",
      Phone: "(217) 555-0113",
      Amount: "2000",
      DueAmount: "200",
    },
    {
      OrderDate: "18/01/25",
      Customer: "Darlene Robertson",
      Status: "Manufacturing",
      DeliveryDate: "18/01/25",
      TrailDate: "18/01/25",
      Phone: "(302) 555-0107",
      Amount: "3000",
      DueAmount: "300",
    },
  ];


  const Columns = [
    { id: "OrderDate", label: "Order Date", visible: true },
    { id: "Customer", label: "Customer", visible: true },
    { id: "Status", label: "Status", visible: true },
    { id: "DeliveryDate", label: "Delivery Date", visible: true },
    { id: "TrailDate", label: "Trial Date", visible: true },
    { id: "Phone", label: "Phone", visible: true },
    { id: "Amount", label: "Amount", visible: true },
    { id: "DueAmount", label: "Due Amount", visible: true },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Order Placed":
        return { text: "text-[#3498DB]", bg: "bg-[#E1F3FF]", dot: "bg-[#3498DB]" };
      case "Processing":
        return { text: "text-[#F39C12]", bg: "bg-[#FEF5E5]", dot: "bg-[#F39C12]" };
      case "Manufacturing":
        return { text: "text-[#9B59B6]", bg: "bg-[#F5E6FF]", dot: "bg-[#9B59B6]" };
      case "Delivered":
        return { text: "text-[#27AE60]", bg: "bg-[#E9F7EF]", dot: "bg-[#27AE60]" };
      case "Dispatch":
        return { text: "text-[#E67E22]", bg: "bg-[#FDEDEC]", dot: "bg-[#E67E22]" };
      default:
        return { text: "text-gray-600", bg: "bg-gray-200", dot: "bg-gray-600" };
    }
  };

  const confirmDelete = () => {
  }
  const handleViewClick = () => {
  }
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-base font-bold text-heading">Order Master</h1>
          <p className="text-subHeading mt-2 text-xs">
            Stores and manages all order details in one place.
          </p>
        </div>
        <Button onClick={()=>navigate("/order/newOrder")}><CirclePlus /> New Order</Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 justify-evenly">
        {OrderDetails.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl px-5 py-3 flex justify-between items-center w-[221px]"
          >
            {order.icon}
            <p className="text-heading font-bold text-xs">{order.title}</p>
            <p className="text-heading font-bold text-base">{order.number}</p>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="mt-5">
          <Table
            columns={Columns}
            data={tableData}
            renderColumnContent={(colId, item) => {
              if (colId === "Status") {
                const statusStyle = getStatusStyle(item.Status);
                return (
                  <div
                    className={`flex justify-center items-center gap-2 px-2 py-1 rounded-full text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}
                  >
                    <span className={`h-[6px] w-[6px] rounded-full ${statusStyle.dot}`}></span>
                    {item.Status}
                  </div>
                );
              }
              return item[colId] || "-";
            }}
            searchableFields={["Customer"]}
            searchPlaceholder="Search Order by Order no, Customer"
            onDelete={confirmDelete}
            onRowClick={handleViewClick}
            isPrint
            filterBy="Status"
            dropdownContents={["Order Placed", "Processing", "Manufacturing", "Delivered", "Dispatch"]}
            onFilterChange={(selectedFilter) => console.log("Selected Filter:", selectedFilter)}
          />


        </div>
      </div>
    </div>
  );
}

export default Order;