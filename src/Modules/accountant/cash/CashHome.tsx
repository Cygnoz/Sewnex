import Table from "../../../Components/Table/Table"
import NewCashModal from "./NewCashModal"

type Props = {}

function CashHome({}: Props) {
    const dummyColumns = [
        { id: "AccountName", label: "Account Name", visible: true },
        { id: "AccountCode", label: "Account Code", visible: true },
        { id: "AccountType", label: "Account Type", visible: true },
        { id: "Document", label: "Document", visible: true },
        { id: "ParentAccountType", label: "Parent Account Type", visible: true },
      ]
      
      const dummyData = [
        { AccountName: "John Doe", AccountCode: "AC-001", AccountType: "Bank" ,Document:"Telephone Expense" ,ParentAccountType:"Lorem ipsum anga" },
        { AccountName: "Jane Smith", AccountCode: "AC-001", AccountType: "Bank" ,Document:"Telephone Expense" ,ParentAccountType:"Lorem ipsum anga"},
        { AccountName: "Bob Brown", AccountCode: "AC-001", AccountType: "Bank",Document:"Telephone Expense" ,ParentAccountType:"Lorem ipsum anga"},
      ]
  return (
    <div>
    <div className="flex justify-between items-center">
   <div>
<h1 className="text-base font-bold text-heading">Cash</h1>
<p className="text-subHeading mt-2 text-xs">Lorem ipsum dolor sit amet consectetua egestas consectetur amet.</p>
   </div>
   <div>
   <NewCashModal/>
   </div>
</div>
<div className="mt-6">
 <Table columns={dummyColumns} data={dummyData} searchPlaceholder={"Search account"}  searchableFields={["AccountName", "AccountCode"]}
     loading={false}  isPrint/>  
</div>
</div>
  )
}

export default CashHome