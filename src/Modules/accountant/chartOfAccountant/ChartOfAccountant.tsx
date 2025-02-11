import { useNavigate } from "react-router-dom";
import Table from "../../../Components/Table/Table";
import NewAccountModal from "./NewAccountModal";
import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";

type Props = {};

interface Account {
  _id: string;
  accountName: string;
  accountCode: string;
  accountSubhead: string;
  accountHead: string;
  description: string;
}

function ChartOfAccountant({ }: Props) {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [loading, setLoading] = useState({
    skeleton: false,
    noDataFound: false
  });

  const { request: AllAccounts } = useApi("get", 5001);

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const fetchAllAccounts = async () => {
    try {
      const url = `${endpoints.Get_ALL_Acounts}`;
      setLoading({ ...loading, skeleton: true });

      const { response, error } = await AllAccounts(url);

      if (error || !response) {
        setLoading({ ...loading, skeleton: false, noDataFound: true });
        return;
      }
      setAccountData(response.data);  
      setLoading({ ...loading, skeleton: false });

    } catch (error) {
      console.error("Error fetching accounts:", error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };

  const Columns = [
    { id: "accountName", label: "Account Name", visible: true },
    { id: "accountCode", label: "Account Code", visible: true },
    { id: "accountSubhead", label: "Account Type", visible: true },
    { id: "accountHead", label: "Parent Account Type", visible: true }
  ];

  const navigate = useNavigate();
  
  const handleNavigate = (id:string) => {
    navigate(`/accountant/viewOne/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-base font-bold text-heading">Chart of Accounts</h1>
          <p className="text-subHeading mt-2 text-xs">
            Lorem ipsum dolor sit amet consectetur, egestas consectetur amet.
          </p>
        </div>
        <div>
          <NewAccountModal />
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
  );
}

export default ChartOfAccountant;
