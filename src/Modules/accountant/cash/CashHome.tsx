import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table/Table"
import NewCashModal from "./NewCashModal"
import { useEffect, useState } from "react";
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

function CashHome({ }: Props) {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [oneAccountData, setOneAccountData] = useState<any>({});
  const [loading, setLoading] = useState({
    skeleton: false,
    noDataFound: false,
  });

  const { request: AllAccounts } = useApi("get", 5001);
  const { request: fetchOneItem } = useApi("get", 5001);
  const { request: deleteAccount } = useApi("delete", 5001);


  const fetchAllAccounts = async () => {
    try {
      setLoading({ ...loading, skeleton: true, noDataFound: false });
      const url = `${endpoints.Get_ALL_Acounts}`;
      const { response, error } = await AllAccounts(url);

      if (!error && response) {
        setAccountData(response.data.filter((account: Account) => account.accountSubhead === "Cash"));
        setLoading({ ...loading, skeleton: false });
      } else {
        setLoading({ ...loading, skeleton: false, noDataFound: true });
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };

  const getOneItem = async (item: Account) => {
    try {
      const url = `${endpoints.GET_ONE_ACCOUNT}/${item._id}`;
      const { response, error } = await fetchOneItem(url);
      if (!error && response) {
        setOneAccountData(response.data);
      } else {
        console.error("Failed to fetch one item data.");
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const Columns = [
    { id: "accountName", label: "Account Name", visible: true },
    { id: "accountCode", label: "Account Code", visible: true },
    { id: "accountSubhead", label: "Account Type", visible: true },
    { id: "description", label: "Document", visible: false },
    { id: "accountHead", label: "Parent Account Type", visible: true },
  ];


  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/accountant/viewOne/${id}`);
  };

  const HandleOnSave = () => {
    fetchAllAccounts();
  }

  const handleDelete=async(id:string)=>{
    try {
      const url = `${endpoints.DELETE_ACCONUT}/${id}`;
      const { response, error } = await deleteAccount(url);
      if (!error && response) {
        toast.success(response.data.message);
        fetchAllAccounts()
        console.log(response.data);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-base font-bold text-heading">Cash</h1>
          <p className="text-subHeading mt-2 text-xs">Lorem ipsum dolor sit amet consectetua egestas consectetur amet.</p>
        </div>
        <div>
          <NewCashModal accountData={accountData} fetchAllAccounts={HandleOnSave} />
        </div>
      </div>
      <div className="mt-6">
        <Table
          columns={Columns}
          data={accountData}
          searchPlaceholder={"Search account"}
          searchableFields={["accountName", "accountCode", "accountSubhead", "accountHead"]}
          loading={loading.skeleton}
          isPrint
          onRowClick={handleNavigate}
          onDelete={handleDelete}
          renderActions={(item) => (
            <div
            onClick={() => {
              getOneItem(item);
            }}
          >
            <NewCashModal
              page="Edit"
              fetchAllAccounts={() => {}}
              accountData={oneAccountData}
            />
          </div>
          )}
        />
      </div>
    </div>
  )
}

export default CashHome