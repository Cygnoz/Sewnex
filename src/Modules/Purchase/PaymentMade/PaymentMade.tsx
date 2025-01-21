import { Link, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import CirclePlus from "../../../assets/icons/circleplus";
import Table from "../../../Components/Table/Table";
import { useState } from "react";

type Props = {};

function PaymentMade({}: Props) {
  const navigate = useNavigate();

  const [columns] = useState([
    { id: "billNumber", label: "Payment#", visible: true },
    { id: "supplierDisplayName", label: "Supplier Name", visible: true },
    { id: "bill", label: "Bill#", visible: true },
    { id: "paymentMode", label: "Mode", visible: true },
    { id: "grandTotal", label: "Amount", visible: true },
    { id: "amount", label: "Unused Amount", visible: true },
  ]);

  const [data] = useState([
    {
      id: 1,
      billNumber: "PMT001",
      supplierDisplayName: "ABC Supplies",
      bill: "B001",
      paymentMode: "Bank Transfer",
      grandTotal: "$500.00",
      amount: "$50.00",
    },
    {
      id: 2,
      billNumber: "PMT002",
      supplierDisplayName: "XYZ Traders",
      bill: "B002",
      paymentMode: "Credit Card",
      grandTotal: "$300.00",
      amount: "$0.00",
    },
    {
      id: 3,
      billNumber: "PMT003",
      supplierDisplayName: "PQR Wholesalers",
      bill: "B003",
      paymentMode: "Cash",
      grandTotal: "$1,200.00",
      amount: "$100.00",
    },
  ]);

  const handleRowClick = () => {
    navigate(`/purchase/payment-made/view`);
  };

  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[#0B1320] font-bold">Payment Made</p>
          <p className="text-[#818894] text-sm">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla{" "}
          </p>
        </div>
        <div className="ml-auto">
          <Link to="/purchase/payment-made/new">
            <Button variant="primary" size="sm">
              <CirclePlus color={"white"} size={"18"} />
              New Payment
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white mt-2 ">
        <Table
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
          searchPlaceholder={"Search payment"}
          searchableFields={["billNumber", "supplierDisplayName"]}
        />
      </div>
    </div>
  );
}

export default PaymentMade;
