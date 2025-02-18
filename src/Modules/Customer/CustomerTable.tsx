import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table"
import { useEffect, useState } from "react";
import { endpoints } from "../../Services/apiEdpoints";
import useApi from "../../Hooks/useApi";
import toast from "react-hot-toast";

type Props = {}

function CustomerTable({ }: Props) {
    const [allCustomerData, setAllCustomerData] = useState<any[]>([]);
    const { request: fetchAllCustomers } = useApi("get", 5002);

     const [loading, setLoading] = useState({
       skeleton: false,
       noDataFound: false,
     });
    const columns = [
        { id: "Name", label: "Name", visible: true },
        { id: "CompanyName", label: "Company Name", visible: true },
        { id: "Contact", label: "Contact", visible: true },
        { id: "email", label: "Email", visible: true },
        { id: "Status", label: "Status", visible: true },
    ];


    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate(`customerview`);
    };

    const handleDelete = (id: string) => {
        alert(`Delete clicked for ID: ${id}`);
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
                    onDelete={handleDelete}
                    onEditClick={handleEditClick}
                    renderColumnContent={renderColumnContent}
                    searchPlaceholder="Search Customer"
                    loading={false}
                    searchableFields={["CompanyName", "Name", "email"]}
                />
            </div>
        </div>
    )
}

export default CustomerTable