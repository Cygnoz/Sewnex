import BackIcon from "../../../assets/icons/BackIcon";
import { useNavigate } from "react-router-dom";
import Table from "../../../Components/Table/Table";
import AddProduct from "./AddProduct";
import Brand from "./BMCRU/Brand/Brand";
import Rack from "./BMCRU/Rack/Rack";
import Category from "./BMCRU/Category/Category";
import Manufacturer from "./BMCRU/Manufacturer/Manufacturer";
import Unit from "./BMCRU/Unit/Unit";

const RetailProduct = () => {
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
      <div>
        
            <div className="flex items-center justify-between gap-4">
              <button onClick={() => navigate("/itemhub")}>
                <BackIcon />
              </button>
              <div>
                <h1 className="text-base font-bold text-heading">
                  Retail Product
                </h1>
                <p className="text-[#495160] mt-2 text-xs">
                  Add and manage your styles and parameters of services
                </p>
              </div>
              <div className=" ml-auto">
                <AddProduct />
              </div>
         
        </div>
        <div className="mt-5 flex justify-between items-center gap-2">
          <Rack/>
          <Category/>
          <Unit/>
          <Brand/>
          <Manufacturer/>
        </div>
        <div className="mt-5">
          <Table columns={Columns} data={[]} searchableFields={[]} />
        </div>
      </div>
    </div>
  );
};

export default RetailProduct;
