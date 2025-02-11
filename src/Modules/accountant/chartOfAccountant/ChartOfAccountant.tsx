import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table/Table"
import NewAccountModal from "./NewAccountModal"
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";

type Props = {}
interface Account {
  _id: string;
  accountName: string;
  accountCode: string;
  accountSubhead: string;
  accountHead: string;
  description: string;
}

function ChartOfAccountant({}: Props) {
  const { request: fetchOneItem } = useApi("get", 5001);
  const { request: deleteAccount } = useApi("delete", 5001);
  const getOneItem = async (item: Account) => {
    try {
      const url = `${endpoints.GET_ONE_ACCOUNT}/${item._id}`;
      const { response, error } = await fetchOneItem(url);
      if (!error && response) {
        // setOneAccountData(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch one item data.");
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  };

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