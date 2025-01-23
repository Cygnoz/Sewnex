import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = { data?: any };

function SideBar({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const colorShow = (index: number) => {
    setActiveIndex(index);
  };

  const handleRowClick = (id: string) => {
    navigate(`/purchase/bills/view/${id}`);
  };
console.log(data)
  // Dummy data
  const dummyData = {
    unpaidBills: [
      {
        billId: "1",
        supplierDisplayName: "Supplier A",
        billAmount: "₹5000",
        billDate: "2025-01-15",
        billNumber: "INV-001",
        paymentMode: "Online",
      },
      {
        billId: "2",
        supplierDisplayName: "Supplier B",
        billAmount: "₹3000",
        billDate: "2025-01-10",
        billNumber: "INV-002",
        paymentMode: "Cash",
      },
      {
        billId: "3",
        supplierDisplayName: "Supplier C",
        billAmount: "₹7000",
        billDate: "2025-01-05",
        billNumber: "INV-003",
        paymentMode: "Bank Transfer",
      },
    ],
  };

  return (
    <div className="bg-[#f5f8fd] rounded-lg px-3 py-6 space-y-4 text-xs">
      <div></div>
      {dummyData.unpaidBills.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            colorShow(index);
            handleRowClick(item.billId);
          }}
          className={`text-[#303F58] p-4 rounded-md mb-4 space-y-2 hover:bg-white ${
            activeIndex === index ? "" : ""
          } cursor-pointer`}
        >
          <div className="flex justify-between font-bold">
            <p>{item.supplierDisplayName}</p>
            <div className="flex justify-end">
              <p className="ms-auto">{item.billAmount}</p>
            </div>
          </div>
          <p>
           <span className="me-2"> {item.billDate}</span> | <span className="ms-2">{item.billNumber}</span>
          </p>
          <p className="font-bold">Mode: {item.paymentMode}</p>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
