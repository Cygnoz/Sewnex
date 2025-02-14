import { Link, useNavigate } from "react-router-dom";
import Table from "../../../Components/Table/Table";
import Button from "../../../Components/Button";
import CirclePlus from "../../../assets/icons/CirclePlus";
import { useContext, useEffect, useState } from "react";
import DotIcon from "../../../assets/icons/DotIcon";
import useApi from "../../../Hooks/useApi";
import { PurchaseContext, TableResponseContext } from "../../../Context/ContextShare";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";

type Props = {};

const DebitNote = ({}: Props) => {
  const navigate = useNavigate();

  const [columns] = useState([
    { id: "debitNote", label: "Debit Note", visible: true },
    { id: "supplierDisplayName", label: "Supplier Name", visible: true },
    { id: "supplierDebitDate", label: "Date", visible: true },
    { id: "orderNumber", label: "orderNumber", visible: true },
    // { id: "customerDetails", label: "Status", visible: true },
    { id: "grandTotal", label: "Balance", visible: false },
  ]);

  const [allDNdata, setAllDNdata] = useState<any[]>([]);
  const { request: getDN } = useApi("get", 5005);
  const { loading, setLoading } = useContext(TableResponseContext)!;
    const {purchaseResponse}=useContext(PurchaseContext)!;
    const { request: deleteAccount } = useApi("delete", 5005);

  const getDebitNotes = async () => {
    try {
      setLoading({ ...loading, skeleton: true, noDataFound: false });
      const url = `${endpoints.GET_ALL_DEBIT_NOTE}`;
      const { response, error } = await getDN(url);

      if (!error && response ) {
        setAllDNdata(response.data);
        setLoading({ ...loading, skeleton: false, noDataFound: false });
      } else {
        setLoading({ ...loading, skeleton: false, noDataFound: true });
      }
    } catch (error) {
      console.error(error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endpoints.DELETE_DEBIT_NOTE}/${id}`;
      const { response, error } = await deleteAccount(url);
      if (!error && response) {
        toast.success(response.data.message);
      getDebitNotes();
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  };

  useEffect(() => {
    getDebitNotes();
  }, [purchaseResponse]);

  const handleRowClick = (id: string) => {
    navigate(`/purchase/debit-note/view/${id}`);
  };

  const handleEditClick = (id: string) => {
    navigate(`/purchase/debit-note/edit/${id}`);
  };

  const renderColumnContent = (colId: string, item: any) => {
    if (colId === "customerDetails") {
      return (
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-1.5 bg-BgSubhead rounded-2xl px-2 pt-0.5 pb-0.5">
            <DotIcon color="#495160" />
            <p className="text-outlineButton text-xs font-medium">{item.customerDetails}</p>
          </div>
        </div>
      );
    }
    return item[colId as keyof typeof item] || "-";
  };


  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[#0B1320] font-bold">Debit Note</p>
          <p className="text-[#818894] text-sm">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla{" "}
          </p>
        </div>
        <div className="ml-auto">
          <Link to="/purchase/debitnote/new">
            <Button variant="primary" size="sm">
              <CirclePlus color={"white"} size={18} />
              New Debit Note
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white mt-2 ">
        <Table
          columns={columns}
          data={allDNdata}
          renderColumnContent={renderColumnContent}
          loading={loading.skeleton} 
          onEditClick={handleEditClick}
          onRowClick={handleRowClick}
          searchPlaceholder={"Search payment"}
          searchableFields={["billNumber", "supplierDisplayName"]}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DebitNote;
