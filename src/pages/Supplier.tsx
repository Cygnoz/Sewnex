import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AddSupplierModal from "../Modules/Supplier/AddSupplierModal";
import Table from "../Components/Table/Table";
import useApi from "../Hooks/useApi";
import { SupplierResponseContext, TableResponseContext } from "../Context/ContextShare";
import { endpoints } from "../Services/apiEdpoints";
import HomeCard from "../Components/HomeCards";
import MaleIcon from "../assets/icons/MaleIcon";
import CheckActive from "../assets/icons/CheckActive";
import TabClose from "../assets/icons/TabClose";
import CopyBold from "../assets/icons/CopyBold";
import toast from "react-hot-toast";
import EditSupplier from "../Modules/Supplier/EditSupplier";
import EditIcon from "../assets/icons/EditIcon";

type Props = {};

interface Supplier {
  _id: string;
  billingAttention: string;
  companyName: string;
  mobile: string;
  supplierEmail: string;
  billingPhone: string;
  billingCity: string;
  status: string;
  supplierDisplayName: string;
  [key: string]: any;
}

function Supplier({ }: Props) {
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const { request: AllSuppliers } = useApi("get", 5009);
  const { supplierResponse } = useContext(SupplierResponseContext)!;
  const { loading, setLoading } = useContext(TableResponseContext)!;
  // const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const fetchAllSuppliers = async () => {
    try {
      const url = `${endpoints.GET_ALL_SUPPLIER}`;
      setLoading({ ...loading, skelton: true });

      const { response, error } = await AllSuppliers(url);
      if (error || !response) {
        setLoading({ ...loading, skelton: false, noDataFound: true });
        return;
      }

      setSupplierData(response.data);
      setLoading({ ...loading, skelton: false });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setLoading({ ...loading, noDataFound: true, skelton: false });
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
  }, [supplierResponse]);

  const HandleOnSave = () => {
    fetchAllSuppliers();
  };

  const { request: fetchOneItem } = useApi("get", 5009);
  const [oneSupplierData, setOneSupplierData] = useState<Supplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getOneItem = async (item: Supplier) => {
    try {
      const url = `${endpoints.GET_ONE_SUPPLIER}/${item._id}`;
      const { response, error } = await fetchOneItem(url);
      if (!error && response) {
        setOneSupplierData(response.data);
        setIsModalOpen(true); // Open modal only after fetching data
      } else {
        console.error("Failed to fetch supplier data.");
      }
    } catch (error) {
      toast.error("Error fetching supplier data.");
      console.error("Error fetching supplier data", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOneSupplierData(null);
  };

  const handleEdit = (supplier: Supplier) => {
    setOneSupplierData(supplier);
    setIsModalOpen(true);
  };

  const activeSuppliers = supplierData.filter((supplier) => supplier.status === "Active").length;
  const inactiveSuppliers = supplierData.filter((supplier) => supplier.status === "Inactive").length;

  const findDuplicateSuppliers = (suppliers: Supplier[]) => {
    const duplicates: Supplier[] = [];
    const seen = new Set<string>();
    const seenDuplicates = new Set<string>();

    suppliers.forEach((supplier) => {
      if (seen.has(supplier.supplierDisplayName)) {
        if (!seenDuplicates.has(supplier.supplierDisplayName)) {
          duplicates.push(supplier);
          seenDuplicates.add(supplier.supplierDisplayName);
        }
      } else {
        seen.add(supplier.supplierDisplayName);
      }
    });

    return duplicates;
  };

  const duplicateSuppliers = findDuplicateSuppliers(supplierData).length;

  // const filteredSuppliers = supplierData.filter((supplier) => {
  //   if (activeFilter === "Active") return supplier.status === "Active";
  //   if (activeFilter === "Inactive") return supplier.status === "Inactive";
  //   if (activeFilter === "Duplicate") {
  //     return findDuplicateSuppliers(supplierData).some(
  //       (dup) => dup.supplierDisplayName === supplier.supplierDisplayName
  //     );
  //   }
  //   return true;
  // });

  const navigate = useNavigate();
  const columns = [
    { id: "supplierDisplayName", label: "Name", visible: true },
    { id: "companyName", label: "Company Name", visible: true },
    { id: "mobile", label: "Contact", visible: true },
    { id: "supplierEmail", label: "Email", visible: true },
    { id: "status", label: "Status", visible: true },
  ];

  const handleRowClick = (id: string) => {
    navigate(`/supplier/view/${id}`);
  };

  const { request: deleteAccount } = useApi("delete", 5009);

  const handleDelete = async (id: string) => {
    try {
      const url = `${endpoints.DELETE_SUPPLIER}/${id}`;
      const { response, error } = await deleteAccount(url);
      if (!error && response) {
        toast.success(response.data.message);
        fetchAllSuppliers();
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting supplier.");
      console.error("Error deleting supplier", error);
    }
  };

  const CustomerDetails = [
    { icon: <MaleIcon />, title: "All Suppliers", number: supplierData.length },
    { icon: <CheckActive />, title: "Active Suppliers", number: activeSuppliers },
    { icon: <TabClose />, title: "Inactive Suppliers", number: inactiveSuppliers },
    { icon: <CopyBold />, title: "Duplicate Suppliers", number: duplicateSuppliers }
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-[#0B1320] text-[16px] font-bold">Supplier</h1>
          <p className="text-[#818894] text-[12px] font-normal">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla
          </p>
        </div>
        <AddSupplierModal supplierData={supplierData} fetchAllSuppliers={HandleOnSave} />
      </div>

      <div className="grid grid-cols-4 gap-4 py-3">
        {CustomerDetails.map((detail, index) => (
          <HomeCard key={index} icon={detail.icon} title={detail.title} number={detail.number} description="" />
        ))}
      </div>

      <Table
        columns={columns}
        data={supplierData}
        onRowClick={handleRowClick}
        onDelete={handleDelete}
        // onEditClick={handleEdit}
        searchPlaceholder="Search Supplier"
        loading={loading.skelton}
        searchableFields={["companyName", "supplierDisplayName", "supplierEmail"]}
        renderActions={(item) => (
          <div onClick={() => getOneItem(item)}>
            <div onClick={() => handleEdit(item)} className="cursor-pointer">
              <EditIcon color={"#0B9C56"} />
            </div>
          </div>
        )}
      />

      {isModalOpen && (
        <EditSupplier isModalOpen={isModalOpen} closeModal={closeModal} supplier={oneSupplierData} />
      )}
    </div>
  );
}

export default Supplier;
