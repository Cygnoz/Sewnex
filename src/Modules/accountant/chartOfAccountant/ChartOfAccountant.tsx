import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table/Table"
import NewAccountModal from "./NewAccountModal"

type Props = {}

function ChartOfAccountant({}: Props) {
  const dummyColumns = [
    { id: "name", label: "Name", visible: true },
    { id: "Balance", label: "Balance", visible: true },
    { id: "Date", label: "Date", visible: true },
  ]
  
  const dummyData = [
    { name: "John Doe", Balance: "john@example.com", Date: "Admin" },
    { name: "Jane Smith", Balance: "jane@example.com", Date: "Editor" },
    { name: "Bob Brown", Balance: "bob@example.com", Date: "Viewer" },
    { name: "Alice Green", Balance: "alice@example.com", Date: "Admin" },
    { name: "Tom White", Balance: "tom@example.com", Date: "Editor" },
    { name: "Tom White", Balance: "tom@example.com", Date: "Editor" },
  ]
  const navigate=useNavigate()
  const HanldeNavigate=()=>{
    navigate("/accountant/viewOne")
  }
  return (
    <div>
    <div className="flex justify-between items-center">
        <div>
    <h1 className="text-base font-bold text-heading">Chart of Accounts</h1>
    <p className="text-subHeading mt-2 text-xs">Lorem ipsum dolor sit amet consectetua egestas consectetur amet.</p>
        </div>
        <div>
        <NewAccountModal/>
        </div>
    </div>
    <div className="mt-6">
      <Table columns={dummyColumns} data={dummyData} searchPlaceholder={"Search account"}  searchableFields={["name", "email"]}
          loading={false} isDelete isPrint onRowClick={HanldeNavigate}/>  
    </div>
    </div>
  )
}

export default ChartOfAccountant