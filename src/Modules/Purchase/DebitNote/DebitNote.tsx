import { Link, useNavigate } from "react-router-dom";
import Table from "../../../Components/Table/Table";
import Button from "../../../Components/Button";
import CirclePlus from "../../../assets/icons/CirclePlus";
import { useState } from "react";

type Props = {};

const DebitNote = ({}: Props) => {
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
      billNumber: "PMT12345",
      supplierDisplayName: "Supplier A",
      bill: "BILL67890",
      paymentMode: "Bank Transfer",
      grandTotal: "5000",
      amount: "1000",
    },
    {
      billNumber: "PMT23456",
      supplierDisplayName: "Supplier B",
      bill: "BILL78901",
      paymentMode: "Credit Card",
      grandTotal: "8000",
      amount: "1500",
    },
    {
      billNumber: "PMT34567",
      supplierDisplayName: "Supplier C",
      bill: "BILL89012",
      paymentMode: "Cash",
      grandTotal: "3000",
      amount: "500",
    },
  ]);

  const handleRowClick = () => {
    navigate(`/purchase/debitnote/view`);
  };

  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[#0B1320] font-bold">Debit Note</p>
          <p className="text-[#818894] text-sm">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla{" "}
          </p>
        </div>
        <div className="ml-auto">
          <Link to="/purchase/debitnote/new">
            <Button variant="primary" size="sm">
              <CirclePlus color={"white"} size={18} />
              New Debit Note
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
};

export default DebitNote;
