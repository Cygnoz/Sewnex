import { Link, useNavigate } from "react-router-dom"
import Button from "../../../Components/Button"
import CirclePlus from "../../../assets/icons/circleplus"
import Table from "../../../Components/Table/Table"
import { endpoints } from "../../../Services/apiEdpoints"
import { useContext, useEffect, useState } from "react"
import { TableResponseContext } from "../../../Context/ContextShare"
import useApi from "../../../Hooks/useApi"

type Props = {}

interface Journal {
  _id: string;
  date: string;
  journalId: string;
  reference: string;
  note: string;
  status: string;
  totalDebitAmount: string;
}

function ManualJournalHome({ }: Props) {
  const { loading, setLoading } = useContext(TableResponseContext)!;
  const [journalData, setJournalData] = useState<Journal[]>([]);

  const { request: AllJournals } = useApi("get", 5001);

  const getAllJournals = async () => {
    try {
      const url = `${endpoints.GET_ALL_JOURNALS}`;
      setLoading({ ...loading, skeleton: true });
      const { response, error } = await AllJournals(url);

      if (error || !response) {
        setLoading({ ...loading, skeleton: false, noDataFound: true });
        return;
      }
      setJournalData(response.data);
      setLoading({ ...loading, skeleton: false });
    } catch (error) {
      console.error("Something went wrong:", error);
      setLoading({ ...loading, noDataFound: true, skelton: false });
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  const Columns = [
    { id: "date", label: "Date", visible: true },
    { id: "journalId", label: "Journal", visible: true },
    { id: "reference", label: "Reference #", visible: true },
    { id: "note", label: "Note", visible: true },
    { id: "totalDebitAmount", label: "Amount", visible: true },
  ]

  const navigate = useNavigate()
  const HanldeNavigate = (id:string) => {
    navigate(`/accountant/viewOneJournal/${id}`)
  }

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

      <Table
        columns={Columns}
        data={journalData} 
        searchPlaceholder={"Search journal"}
        searchableFields={["date", "journalId", "reference", "status"]}
        loading={loading.skeleton}
        onRowClick={HanldeNavigate}
      />
    </div>
  )
}

export default ManualJournalHome