import  { useState } from "react";

import HomeCard from "../Components/HomeCards";
import Table from "../Components/Table/Table";
import AddExpenseCategory from "../Modules/Expense/AddExpenseCategory";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "../Modules/Expense/AddExpenseModal";
import { TodaysExpense } from "../assets/icons/TodaysExpense";
import { MonthExpense } from "../assets/icons/MonthExpense";
import { WeekExpense } from "../assets/icons/WeekExpense";

type Props = {};

function Expense({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const columns = [
    { id: "slNo", label: "Sl No", visible: true },
    { id: "name", label: "Name", visible: true },
    { id: "category", label: "Category", visible: true },
    { id: "paymentMethod", label: "Payment Method", visible: true },
    { id: "addedDate", label: "Added Date", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ];

  const data = [
    {
      id: "1",
      slNo: 1,
      name: "John Doe",
      category: "Electronics",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-15",
    },
    {
      id: "2",
      slNo: 2,
      name: "Jane Smith",
      category: "Groceries",
      paymentMethod: "Cash",
      addedDate: "2025-01-16",
    },
    {
      id: "3",
      slNo: 3,
      name: "Michael Brown",
      category: "Clothing",
      paymentMethod: "Debit Card",
      addedDate: "2025-01-17",
    },
    {
      id: "4",
      slNo: 4,
      name: "Emily Johnson",
      category: "Books",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-18",
    },
    {
      id: "5",
      slNo: 5,
      name: "Chris Evans",
      category: "Electronics",
      paymentMethod: "Cash",
      addedDate: "2025-01-19",
    },
    {
      id: "6",
      slNo: 6,
      name: "Sarah Taylor",
      category: "Groceries",
      paymentMethod: "Mobile Payment",
      addedDate: "2025-01-20",
    },
    {
      id: "7",
      slNo: 7,
      name: "David Wilson",
      category: "Furniture",
      paymentMethod: "Debit Card",
      addedDate: "2025-01-21",
    },
    {
      id: "8",
      slNo: 8,
      name: "Sophia Martinez",
      category: "Beauty",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-22",
    },
    {
      id: "9",
      slNo: 9,
      name: "Liam Anderson",
      category: "Clothing",
      paymentMethod: "Cash",
      addedDate: "2025-01-23",
    },
    {
      id: "10",
      slNo: 10,
      name: "Olivia Thomas",
      category: "Books",
      paymentMethod: "Mobile Payment",
      addedDate: "2025-01-24",
    },
  ];
  

  const handleRowClick = (id: string) => {
    navigate("view");
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
  };

  const handleEditClick = (id: string) => {
    console.log("Edit clicked for ID:", id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddExpenseClick = () => {
    navigate("/expense/add-expense");
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-start">
          {/* Header Section */}
          <div>
            <p className="head1">Expense</p>
            <p className="text-[#818894] text-[16px]">
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

        <div className="flex justify-evenly items-center mt-3">
          <HomeCard
            icon={<TodaysExpense/>}
            title="Today's"
            description=""
            number={5000}
            iconFrameColor="linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)"
            bgColor="#FFFFFF"
            titleColor="#495160"
            descriptionColor="#555555"
            numberColor="#0B1320"
            border="#FFFFFF"
          />
          <HomeCard
            icon={<WeekExpense/>}
            title="This week's expense"
            description=""
            number={5000}
            iconFrameColor="linear-gradient(127.73deg, #F7ECD9 10.69%, #B5F0D3 139.31%)"
            bgColor="#FFFFFF"
            titleColor="#495160"
            descriptionColor="#555555"
            numberColor="#0B1320"
            border="#FFFFFF"
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
            border="#FFFFFF"
          />
        </div>

        <div className="mt-2">
          <Table
            columns={columns}
            data={data}
            searchPlaceholder="Search by Name or Category"
            searchableFields={["name", "category"]}
            loading={false}
            onRowClick={handleRowClick}
            onDelete={handleDelete}
            onEditClick={handleEditClick}
            renderColumnContent={(colId, item) => {
              if (colId === "actions") {
                return (
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(item.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                );
              }
              return item[colId];
            }}
          />
        </div>

        {/* Modal for Add Category */}
      </div>
    </>
  );
}

export default Expense;
