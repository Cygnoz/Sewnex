import BackIcon from "../../../assets/icons/BackIcon";
import { useNavigate } from "react-router-dom";
import Table from "../../../Components/Table/Table";
import AddProduct from "./AddProduct";
import Brand from "./BMCRU/Brand/Brand";
import Rack from "./BMCRU/Rack/Rack";
import Category from "./BMCRU/Category/Category";
import { useContext, useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import Unit from "./BMCRU/Unit/Unit";
import Manufacturer from "./BMCRU/Manufacturer/Manufacturer";
import ConfirmModal from "../../../Components/ConfirmModal";
import { ProductResponseContext } from "../../../Context/ContextShare";

const RetailProduct = () => {
  const Columns = [
    { id: "barCode", label: "Bar Code", visible: true },
    { id: "brand", label: "Brand", visible: true },
    { id: "categories", label: " Category", visible: true },
    { id: "itemName", label: "Product Name", visible: true },
    { id: "sellingPrice", label: "Selling Price", visible: true },
    { id: "costPrice", label: "Cost Price", visible: true },

    { id: "currentStock", label: "Stock", visible: true },
    { id: "rack", label: "Rack", visible: true },
  ];
  const [allItemData, setAllItemData] = useState<any[]>([]);
  const { request: fetchAllItems } = useApi("get", 5003);
  const { request: deleteItemRequest } = useApi("delete", 5003);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { productResponse } = useContext(ProductResponseContext)!;

  const [loading, setLoading] = useState({
    skeleton: false,
    noDataFound: false,
  });
  const navigate = useNavigate();
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmModalOpen(true);
  };
  const loadItem = async () => {
    try {
      setLoading({ ...loading, skeleton: true, noDataFound: false });

      const url = `${endpoints.GET_ALL_ITEMS_TABLE}`;
      const { response, error } = await fetchAllItems(url);
      if (!error && response) {
        setAllItemData(response.data);
        setLoading({ ...loading, skeleton: false });
      } else {
        console.error("Failed to fetch Item data.");
        setLoading({ ...loading, skeleton: false, noDataFound: true });
      }
    } catch (error) {
      toast.error("Error in fetching Item data.");
      console.error("Error in fetching Item data", error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };

  const handleDelete = async (Item: any) => {
    try {
      const url = `${endpoints.DELETE_ITEM}/${Item}`;
      const { response, error } = await deleteItemRequest(url);
      if (!error && response) {
        toast.success("Item deleted successfully!");
        loadItem();
        if (allItemData.length == 1) {
          setAllItemData((prevData) =>
            prevData.filter((m: any) => m._id !== Item._id)
          );
        }
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while deleting Item.");
    } finally {
      setConfirmModalOpen(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    loadItem();
  }, [productResponse]);
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <button onClick={() => navigate("/itemhub")}>
          <BackIcon />
        </button>
        <div>
          <h1 className="text-base font-bold text-heading">Retail Product</h1>
          <p className="text-[#495160] mt-2 text-xs">
            Add and manage your styles and parameters of services
          </p>
        </div>
        <div className=" ml-auto">
          <AddProduct />
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center gap-2">
        <Rack />
        <Category />
        <Unit />
        <Brand />
        <Manufacturer />
      </div>
      <div className="mt-5">
        <Table
          columns={Columns}
          data={allItemData}
          searchableFields={["itemName"]}
          onDelete={confirmDelete}
          loading={loading.skeleton}
          renderActions={(item) => (
            <div>
              <AddProduct page="edit" id={item._id} />
            </div>
          )}
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
};

export default RetailProduct;
