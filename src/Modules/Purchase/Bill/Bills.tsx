import { useContext, useEffect, useState } from "react";
import CirclePlus from "../../../assets/icons/CirclePlus";
import Button from "../../../Components/Button";
import Table from "../../../Components/Table/Table";
import { Link, useNavigate } from "react-router-dom";
import DotIcon from "../../../assets/icons/DotIcon";
import { endpoints } from "../../../Services/apiEdpoints";
import useApi from "../../../Hooks/useApi";
import {
  PurchaseContext,
  TableResponseContext,
} from "../../../Context/ContextShare";
import toast from "react-hot-toast";
import ConfirmModal from "../../../Components/ConfirmModal";

function Bills() {
  const [columns, setColumns] = useState([
    { id: "billNumber", label: "Bill#", visible: true },
    { id: "billDate", label: "Bill Date", visible: true },
    { id: "supplierDisplayName", label: "Supplier Name", visible: true },
    { id: "grandTotal", label: "Amount", visible: true },
    { id: "dueDate", label: "Due Date", visible: true },
    { id: "paidStatus", label: "Status", visible: true },
  ]);

  const [allBills, setAllBills] = useState<any[]>([]);
  const { request: getBills } = useApi("get", 5005);
  const { loading, setLoading } = useContext(TableResponseContext)!;
  const { purchaseResponse } = useContext(PurchaseContext)!;
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string >("");

  const { request: deleteAccount } = useApi("delete", 5005);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmModalOpen(true);
  };
  const getAllBills = async () => {
    try {
      setLoading({ ...loading, skeleton: true, noDataFound: false });

      const url = `${endpoints.GET_ALL_BILLS}`;
      const { response, error } = await getBills(url);

      if (!error && response) {
        setAllBills(response.data.allBills);
        setLoading({ ...loading, skeleton: false });
      } else {
        console.log(error);
        setLoading({ ...loading, skeleton: false, noDataFound: true });
      }
    } catch (error) {
      console.error(error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
    finally {
      setConfirmModalOpen(false);
      setDeleteId("");
    }
  };

  useEffect(() => {
    getAllBills();
  }, [purchaseResponse]);

  const handleRowClick = (id: string) => {
    navigate(`/purchase/bills/view/${id}`);
  };

  const handleEditClick = (id: string) => {
    navigate(`/purchase/bills/edit/${id}`);
  };

  const navigate = useNavigate();

  const renderColumnContent = (colId: string, item: any) => {
    if (colId === "paidStatus") {
      return (
        <div className="flex justify-center items-center">
          <div
            className={`${
              item.paidStatus === "Pending"
                ? "bg-[#FFF6EC] text-[#B47800]"
                : item.paidStatus === "Completed"
                ? "bg-[#DBF8EB] text-[#178B53]"
                : "bg-[#FF3B301A] text-[#FF3B30]"
            } text-[13px] rounded-lg text-center items-center h-[18px] px-2 max-w-fit gap-2 py-2 flex justify-center`}
          >
            <DotIcon
              color={
                item.paidStatus === "Pending"
                  ? "#B47800"
                  : item.paidStatus === "Completed"
                  ? "#178B53"
                  : "#FF3B30"
              }
            />{" "}
            {item.paidStatus}
          </div>
        </div>
      );
    }

    return item[colId as keyof typeof item];
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endpoints.DELETE_BILL}/${id}`;
      const { response, error } = await deleteAccount(url);
      if (!error && response) {
        toast.success(response.data.message);
        getAllBills();
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in fetching one item data.");
      console.error("Error in fetching one item data", error);
    }
  };

  return (
    <div>
      <div className="flex">
        <div>
          <p className="text-[#0B1320] font-bold">Bills</p>
          <p className="text-[#818894] text-sm">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla{" "}
          </p>
        </div>
        <div className="ml-auto">
          <Link to="/purchase/bills/new">
            <Button variant="primary" size="sm">
              <CirclePlus color={"white"} size={18} />
              New Bill
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white mt-2 ">
        <Table
          columns={columns}
          data={allBills}
          onRowClick={handleRowClick}
          renderColumnContent={renderColumnContent}
          searchPlaceholder="Search Bills"
          loading={loading.skeleton}
          searchableFields={["billNumber", "supplierDisplayName"]}
          setColumns={setColumns}
          onEditClick={handleEditClick}
          onDelete={confirmDelete}
        />
      </div>
      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(deleteId)}
        message="Are you sure you want to delete?"
      />
    </div>
  );
}

export default Bills;
