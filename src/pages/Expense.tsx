// import  { useState } from "react";
import HomeCard from "../Components/HomeCards";
import Table from "../Components/Table/Table";
import AddExpenseCategory from "../Modules/Expense/AddExpenseCategory";
import { useNavigate } from "react-router-dom";
import { TodaysExpense } from "../assets/icons/TodaysExpense";
import { MonthExpense } from "../assets/icons/MonthExpense";
import { WeekExpense } from "../assets/icons/WeekExpense";
import AddExpenseModal from "../Modules/Expense/AddExpenseModal";

type Props = {};

function Expense({}: Props) {
  // const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
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
      name: "Abhinu",
      category: "Electronics",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-15",
    },
    {
      id: "2",
      slNo: 2,
      name: "Abhinu",
      category: "Electronics",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-15",
    },
    {
      id: "3",
      slNo: 3,
      name: "Abhinu",
      category: "Electronics",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-15",
    },
    {
      id: "4",
      slNo: 4,
      name: "Abhinu",
      category: "Electronics",
      paymentMethod: "Credit Card",
      addedDate: "2025-01-15",
    },
  ];

  // const handlePrintClick = (id: string) => {
  //   console.log(`Printing record with ID: ${id}`);
  //   // Add your print logic here
  // };

  const handleRowClick = () => {
    navigate("view");
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
  };

  const handleEditClick = (id: string) => {
    console.log("Edit clicked for ID:", id);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  // const handleAddExpenseClick = () => {
  //   navigate("/expense/add-expense");
  // };

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
            icon={<TodaysExpense />}
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
            icon={<WeekExpense />}
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
            isPrint={true} // Enable the print button
            // onPrintClick={handlePrintClick} // Pass the print click handler
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
