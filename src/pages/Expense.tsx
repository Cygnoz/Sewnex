import React, { useState } from "react";
import Building from "../assets/icons/Building";
import Plus from "../assets/icons/Plus";
import Button from "../Components/Button";
import HomeCard from "../Components/HomeCards";
import Table from "../Components/Table/Table";
// import Modal from "../Components/modal/Modal"; // Import the Modal component
import AddExpenseCategory from "../Modules/Expense/AddExpenseCategory"; // Import AddExpenseCategory component
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "../Modules/Expense/AddExpenseModal";

type Props = {};

function Expense({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate()

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

              {/* Add Expense Button */}
              {/* <Button onClick={handleAddExpenseClick}>
                <div className="flex items-center gap-2">
                  <Plus color="#FFFFFF" classname="w-4 h-4" />
                  Add Expense
                </div>

              </Button> */}
              <AddExpenseModal/>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly items-center mt-3">
          <HomeCard
            icon={<Building />}
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
            icon={<Building />}
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
            icon={<Building />}
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

        <div className="mt-10">
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
                    <button onClick={() => handleEditClick(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
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
