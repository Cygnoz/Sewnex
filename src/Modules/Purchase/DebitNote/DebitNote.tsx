import { Link, useNavigate } from "react-router-dom"
import Table from "../../../Components/Table/Table"
import Button from "../../../Components/Button"
import CirclePlus from "../../../assets/icons/CirclePlus"
import { useState } from "react"

type Props = {}

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

    const handleRowClick = () => {
      navigate(`/purchase/payment-made/view`);
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
          data={[]}
          onRowClick={handleRowClick}
          searchPlaceholder={"Search payment"}
          searchableFields={["billNumber", "supplierDisplayName"]}
        />
      </div>
    </div>
  )
}

export default DebitNote