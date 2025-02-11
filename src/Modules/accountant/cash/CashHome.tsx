import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table/Table"
import NewCashModal from "./NewCashModal"
import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";

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
  const [loading, setLoading] = useState({
    skeleton: false,
    noDataFound: false,
  });

  const { request: AllAccounts } = useApi("get", 5001);

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
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-base font-bold text-heading">Cash</h1>
          <p className="text-subHeading mt-2 text-xs">Lorem ipsum dolor sit amet consectetua egestas consectetur amet.</p>
        </div>
        <div>
          <NewCashModal />
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
        />
      </div>
    </div>
  )
}

export default CashHome