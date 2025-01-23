import { Link } from "react-router-dom"
import Button from "../../../Components/Button"
import CirclePlus from "../../../assets/icons/circleplus"
import Table from "../../../Components/Table/Table"

type Props = {}

function ManualJournalHome({}: Props) {
  const dummyColumns = [
    { id: "Date", label: "Date", visible: true },
    { id: "Journal", label: "Journal", visible: true },
    { id: "ReferenceNumber", label: "Reference Number", visible: true },
    { id: "Status", label: "Status", visible: true },
    { id: "Note", label: "Note", visible: true },
    { id: "Amount", label: "Amount", visible: true },
  ]
  
  const dummyData = [
    { Date: "John Doe", Journal: "AC-001", ReferenceNumber: "Bank" ,Status:"Telephone Expense" ,Note:"Lorem ipsum anga" ,Amount:"23"},
    { Date: "Jane Smith", Journal: "AC-001", ReferenceNumber: "Bank" ,Status:"Telephone Expense" ,Note:"Lorem ipsum anga",Amount:"23"},
    { Date: "Bob Brown", Journal: "AC-001", ReferenceNumber: "Bank",Status:"Telephone Expense" ,Note:"Lorem ipsum anga",Amount:"23"},
  ]
  
  return (
    <div>
         <div className="flex justify-between items-center mb-6">
        <div>
    <h1 className="text-base font-bold text-heading">Manual journal</h1>
    <p className="text-subHeading mt-2 text-xs">Lorem ipsum dolor sit amet consectetua egestas consectetur amet.</p>
        </div>
        <div>
        <Link to={"/accountant/newJournal"}>
        <Button>
        <CirclePlus />
        <p>New Journal</p>
      </Button>
        </Link>
        </div>
    </div>

    <Table columns={dummyColumns} data={dummyData} searchPlaceholder={"Search account"}  searchableFields={["Date", "Status"]}
          loading={false}  isPrint  isDelete />  
    </div>
  )
}

export default ManualJournalHome