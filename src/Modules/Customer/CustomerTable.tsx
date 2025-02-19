import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table"
import { useEffect, useState } from "react";
import { endpoints } from "../../Services/apiEdpoints";
import useApi from "../../Hooks/useApi";
import toast from "react-hot-toast";
import ConfirmModal from "../../Components/ConfirmModal";
import Customer from "../../pages/Customer";
import NewCustomer from "./NewCustomer";

type Props = {}

function CustomerTable({ }: Props) {
    const [allCustomerData, setAllCustomerData] = useState<any[]>([]);
    const [allCustomersData, setAllCustomersData] = useState<any[]>([]);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string >("");

    const { request: deleteCustomersRequest } = useApi("delete", 5002);
    const { request: fetchAllCustomers } = useApi("get", 5002);

     const [loading, setLoading] = useState({
       skeleton: false,
       noDataFound: false,
     });
    const columns = [
        { id: "customerDisplayName", label: "Name", visible: true },
        { id: "companyName", label: "Company Name", visible: true },
        { id: "mobile", label: "Contact", visible: true },
        { id: "customerEmail", label: "Email", visible: true },
        { id: "status", label: "Status", visible: true },
    ];
    const confirmDelete = (id: string) => {
        setDeleteId(id);
        setConfirmModalOpen(true);
      };

    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate(`customerview`);
    };
    
      const handleDelete = async () => {
        try {
          const url = `${endpoints.DELETE_CUSTOMER}/${deleteId}`;
          const { response, error } = await deleteCustomersRequest(url);
          if (!error && response) {
            toast.success("Customers deleted successfully!");
            loadCustomer();
            setConfirmModalOpen(false)
            if (allCustomersData.length == 1) {
              setAllCustomersData((prevData) =>
                prevData.filter((m: any) => m._id !== deleteId)
              );
            }
          } else {
            toast.error(error.response.data.message);
          }
        } catch (error) {
          toast.error("Error occurred while deleting Customers.");
        }
      };
    
  

    const handleEditClick = (id: string) => {
        alert(`Edit clicked for ID: ${id}`);
    };

    const loadCustomer = async () => {
        try {
          setLoading({ ...loading, skeleton: true, noDataFound: false });
    
          const url = `${endpoints.GET_ALL_CUSTOMER}`;
          const { response, error } = await fetchAllCustomers(url);
          if (!error && response) {
            setAllCustomerData(response.data);
            setLoading({ ...loading, skeleton: false });
          } else {
            console.error("Failed to fetch Customer data.");
            setLoading({ ...loading, skeleton: false, noDataFound: true });
          }
        } catch (error) {
          toast.error("Error in fetching Customer data.");
          console.error("Error in fetching Customer data", error);
          setLoading({ ...loading, skeleton: false, noDataFound: true });
        }
      };

      useEffect(()=>{
loadCustomer()
      },[])

    const renderColumnContent = (colId: string, Customer: any) => {
        if (colId === "Status") {
            return (
                <div className="flex justify-center Customers-center">
                    <div
                        className={`${Customer.Status === "Active" ? "bg-[#DBF8EB] text-[#178B53]" :  "bg-[#FFF6EC] text-[#B47800]"
                            } text-[13px] rounded-lg text-center Customers-center text-textColor h-[18px] px-2 max-w-fit gap-2 py-2 flex justify-center`}
                    >
                        {/* <DotIcon color="#495160" /> */}
                        <div className={`w-2 h-2 rounded-full  ${Customer.Status === "Active" ? "bg-[#178B53]" : "bg-[#B47800]" }`}></div>
                        {Customer.Status}
                    </div>
                </div>
            );
        }
        return Customer[colId as keyof typeof Customer];
    };
    return (
        <div>
            <div>
                <Table
                    columns={columns}
                    data={allCustomerData}
                    onRowClick={handleRowClick}
                    onDelete={(item)=>confirmDelete(item)}
                    renderActions={(item) => (
                      <div>
                        <NewCustomer page="edit" id={item} />
                      </div>
                    )}
                    renderColumnContent={renderColumnContent}
                    searchPlaceholder="Search Customer"
                    loading={false}
                    searchableFields={["customerDisplayName"]}
                />
            </div>
            <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete()}
        message="Are you sure you want to delete?"
      />
        </div>
    )
}

export default CustomerTable