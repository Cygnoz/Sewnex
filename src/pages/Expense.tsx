// import  { useState } from "react";
import HomeCard from "../Components/HomeCards";
import Table from "../Components/Table/Table";
import AddExpenseCategory from "../Modules/Expense/AddExpenseCategory";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "../Modules/Expense/AddExpenseModal";
import { TodaysExpense } from "../assets/icons/TodaysExpense";
import { MonthExpense } from "../assets/icons/MonthExpense";
import { WeekExpense } from "../assets/icons/WeekExpense";
import { useContext, useEffect, useState } from "react";
import { TableResponseContext } from "../Context/ContextShare";
import { endpoints } from "../Services/apiEdpoints";
import useApi from "../Hooks/useApi";
import toast from "react-hot-toast";
import ConfirmModal from "../Components/ConfirmModal";

type Props = {};

function Expense({}: Props) {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(TableResponseContext)!;
  const [allExpense, setAllExpense] = useState<any[]>([]);
  const { request: getExpense } = useApi("get", 5008);

  const getAllExpenses = async () => {
    try {
      setLoading({ ...loading, skeleton: true, noDataFound: false });

      const url = `${endpoints.GET_ALL_EXPENSE}`;
      const { response, error } = await getExpense(url);

      if (!error && response) {
        console.log("Fetched Expenses:", response.data);
        setAllExpense(response.data);
        setLoading({ ...loading, skeleton: false, noDataFound: false });
      } else {
        console.log("Error fetching data:", error);
        setLoading({ ...loading, skeleton: false, noDataFound: true });
      }
    } catch (error) {
      console.error("API call error:", error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const columns = [
    { id: "expenseDate", label: "Date", visible: true },
    { id: "expense.expenseAccount", label: "Name", visible: true },
    { id: "expenseCategory", label: "Category", visible: true },
    { id: "supplierDisplayName", label: "Vendor Name", visible: true },
    { id: "paidThrough", label: "Paid Through", visible: true },
    { id: "grandTotal", label: "Amount", visible: true },
  ];

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmModalOpen(true);
  };

  const handleRowClick = () => {
    navigate("view");
  };

  const { request: deleteExpense } = useApi("delete", 5001);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const url = `${endpoints.DELETE_EXPENSE}/${deleteId}`;
      const { response, error } = await deleteExpense(url);
      if (!error && response) {
        toast.success(response.data.message);
        getAllExpenses();
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting.");
    } finally {
      setConfirmModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleEditClick = (id: string) => {
    console.log("Edit clicked for ID:", id);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-start">
          {/* Header Section */}
          <div>
            <p className="head1">Expense</p>
            <p className="text-[#818894] text-xs">
              Lorem ipsum dolor sit amet consectetur. Commodo enim odio
              fringilla
            </p>
          </div>

          {/* Actions Section */}
          <div>
            <div className="flex gap-3">
              {/* Add Category Button */}
              <AddExpenseCategory />

              <AddExpenseModal />
            </div>
          </div>
        </div>

        <div className="flex justify-evenly items-center mt-4">
          <HomeCard
            icon={<TodaysExpense />}
            title="Today's"
            description=""
            number={5000}
            iconFrameColor="linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)"
            bgColor="#FFFFFF"
            titleColor="#495160"
            descriptionColor="#555555"
            numberColor="#0B1320"
          />
          <HomeCard
            icon={<WeekExpense />}
            title="This week's expense"
            description=""
            number={5000}
            iconFrameColor="linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)"
            bgColor="#FFFFFF"
            titleColor="#495160"
            descriptionColor="#555555"
            numberColor="#0B1320"
          />
          <HomeCard
            icon={<MonthExpense />}
            title="This month expense"
            description=""
            number={10000}
            iconFrameColor="linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)"
            bgColor="#FFFFFF"
            titleColor="#495160"
            descriptionColor="#555555"
            numberColor="#0B1320"
          />
        </div>

        <div className="mt-3">
          <Table
            columns={columns}
            data={allExpense}
            searchPlaceholder="Search by Name or Category"
            searchableFields={["expense.expenseAccount", "expenseCategory"]}
            loading={false}
            onRowClick={handleRowClick}
            onDelete={confirmDelete}
            onEditClick={handleEditClick}
            isPrint={true}
          />
        </div>

        <ConfirmModal
          open={isConfirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete?"
        />
      </div>
    </>
  );
}

export default Expense;
