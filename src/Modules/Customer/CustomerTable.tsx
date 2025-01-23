import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table"

type Props = {}

function CustomerTable({ }: Props) {
    // Example columns for the table
    const columns = [
        { id: "Name", label: "Name", visible: true },
        { id: "CompanyName", label: "Company Name", visible: true },
        { id: "Contact", label: "Contact", visible: true },
        { id: "email", label: "Email", visible: true },
        { id: "Status", label: "Status", visible: true },
    ];
    const data = [
        { id: "1", Name: "John Doe", CompanyName: "123456", Contact: "11223344", email: "john@example.com", Status: "Active" },
        { id: "2", Name: " Doe", CompanyName: "34556", Contact: "11223344", email: "john@example.com", Status: "In Active" },
        { id: "3", Name: "John ", CompanyName: "787456", Contact: "11223344", email: "john@example.com", Status: "Active" },
        { id: "4", Name: "Jos", CompanyName: "54456", Contact: "11223344", email: "john@example.com", Status: "In Active" },
    ]

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

    const renderColumnContent = (colId: string, item: any) => {
        if (colId === "Status") {
            return (
                <div className="flex justify-center items-center">
                    <div
                        className={`${item.Status === "Active" ? "bg-[#DBF8EB] text-[#178B53]" :  "bg-[#FFF6EC] text-[#B47800]"
                            } text-[13px] rounded-lg text-center items-center text-textColor h-[18px] px-2 max-w-fit gap-2 py-2 flex justify-center`}
                    >
                        {/* <DotIcon color="#495160" /> */}
                        <div className={`w-2 h-2 rounded-full  ${item.Status === "Active" ? "bg-[#178B53]" : "bg-[#B47800]" }`}></div>
                        {item.Status}
                    </div>
                </div>
            );
        }
        return item[colId as keyof typeof item];
    };
    return (
        <div>
            <div>
                <Table
                    // page="Customer"
                    columns={columns}
                    data={data}
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