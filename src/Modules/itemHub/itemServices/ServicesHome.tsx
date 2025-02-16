import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/icons/BackIcon";
import AddNewService from "./AddNewService";
import AddCategory from "./AddCategory";
import AddParameter from "./AddParameter";
import AddStyle from "./AddStyle";
import Table from "../../../Components/Table/Table";

type Props = {};

function ServicesHome({}: Props) {
  const Columns = [
    { id: "accountName", label: "Category", visible: true },
    { id: "accountCode", label: "Name", visible: true },
    { id: "accountSubhead", label: "Parameter category", visible: true },
    { id: "accountHead", label: "Unit", visible: true },
    { id: "accountHead", label: "Price", visible: true },
  ];

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            <div onClick={() => navigate("/itemhub")}>
              <BackIcon />
            </div>
            <div>
              <h1 className="text-base font-bold text-heading">Services</h1>
              <p className="text-[#495160] mt-2 text-xs">
                Add and manage your styles and parameters of services
              </p>
            </div>
          </div>
        </div>
        <div>
          <AddNewService />
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center gap-4">
        <AddCategory />
        <AddParameter />
        <AddStyle />
      </div>
      <div className="mt-5">
        <Table columns={Columns} data={[]} searchableFields={[]} />
      </div>
    </div>
  );
}

export default ServicesHome;
