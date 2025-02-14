import { Link, useNavigate } from "react-router-dom"
import Button from "../../../Components/Button"
import CirclePlus from "../../../assets/icons/CirclePlus"
import Table from "../../../Components/Table/Table"
import { endpoints } from "../../../Services/apiEdpoints"
import { useContext, useEffect, useState } from "react"
import { TableResponseContext } from "../../../Context/ContextShare"
import useApi from "../../../Hooks/useApi"
import ConfirmModal from "../../../Components/ConfirmModal"
import toast from "react-hot-toast"

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
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmModalOpen(true);
  };

  const { request: AllJournals } = useApi("get", 5001);
  const { request: deleteJournal } = useApi("delete", 5001);

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

  const handleEditClick = (id: any) => {
    navigate(`/accountant/editjournal/${id}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const url = `${endpoints.DELET_JOURNAL}/${deleteId}`;
      const { response, error } = await deleteJournal(url);

      if (!error && response) {
        toast.success(response.data.message);
        if (journalData.length === 1) {
          setJournalData([]);
          setLoading({ ...loading, skeleton: false, noDataFound: true }); 
        } else {
          setJournalData((prevData) =>
            prevData.filter((journal) => journal._id !== deleteId)
          );
        }
        await getAllJournals();
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting the journal.");
    } finally {
      setConfirmModalOpen(false);
      setDeleteId(null);
    }
  };
  

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
        onEditClick={handleEditClick}
        onDelete={confirmDelete}
      />
       <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete?"
      />
    </div>
  )
}

export default ManualJournalHome;