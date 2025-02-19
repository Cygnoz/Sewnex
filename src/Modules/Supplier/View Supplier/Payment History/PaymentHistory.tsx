import CirclePlus from "../../../../assets/icons/CirclePlus";
import Button from "../../../../Components/Button";
import Input from "../../../../Components/Form/Input";
import Table from "../../../../Components/Table/Table";


type Props = {}

function PaymentHistory({ }: Props) {
  const columns = [
    { id: "invoiceNumber", label: "Invoice Number", visible: true },
    { id: "date", label: "Date", visible: true },
    { id: "amount", label: "Amount", visible: true },
    { id: "remark", label: "Remark", visible: true },
  ];
  const data = [
    { invoiceNumber: "INV00234", date: "28 May 2024", amount: 2000.00, remark: "Balance" },
    { invoiceNumber: "INV00134", date: "28 May 2024", amount: 500.00, remark: "Balance" },
    { invoiceNumber: "INV00124", date: "28 May 2024", amount: 500.00, remark: "Balance" },
    { invoiceNumber: "INV00114", date: "28 May 2024", amount: 500.00, remark: "Balance" },
    { invoiceNumber: "INV00034", date: "27 May 2024", amount: 500.00, remark: "Balance" },
  ];
  const handleDelete = (id: string) => {
    alert(`handleDelete clicked for ID: ${id}`);
  };
  const handlePrintClick = (id: string) => {
    alert(`Printk clicked for ID: ${id}`);
  }
  return (
    <div>
      <div className="bg-[#F5F8FC] p-5 rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-[14px] text-[#0B1320] font-semibold mt-2"> Payment Made</h1>
          <div className="flex gap-2">
            <Input
              className="py-2 px-3 focus:outline-none rounded-3xl"
              type="date"
            />
            <Button variant="secondary">
              <CirclePlus color="#0B9C56" />
              New payment
            </Button>
          </div>
        </div>
        <div className="py-2">

          <Table
            columns={columns}
            data={data}
            onDelete={handleDelete}
            onPrintClick={handlePrintClick}
            searchPlaceholder="Search History"
            loading={false}
            searchableFields={["invoiceNumber", "date"]}
          />
        </div>
        <div className="flex justify-end gap-3">
        <div className=" text-end w-[25%] p-5 rounded-lg bg-gradient-to-r from-[#F7ECD9] via-[#F7ECD9] to-[#B5F0D3] ">
            <p className="text-[12px] text-[#495160] font-normal ">Outstanding Balance</p>
            <p className="text-[16px] text-[#004D4D] font-bold">₹ 2,546</p>
          </div>
          <div className=" text-end w-[25%] p-5 rounded-lg bg-gradient-to-r from-[#F7ECD9] via-[#F7ECD9] to-[#B5F0D3] ">
            <p className="text-[12px] text-[#495160] font-normal ">Total Payment</p>
            <p className="text-[16px] text-[#004D4D] font-bold">₹ 22,5462</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory