import { useState } from "react";
import SearchBar from "../../Components/SearchBar";
import Button from "../../Components/Button";
import ListFilter from "../../assets/icons/ListFilter";
import Calender from "../../assets/icons/Calender";
import Eye from "../../assets/icons/Eye";


type Props = {};

type BillStatus = "Unpaid" | "Paid" | "Draft";

interface Bill {
    InvoiceNo: string;
    date: string;
    amount: number;
    balanceDue: number;
    status: BillStatus;
}

function SalesHistory({ }: Props) {
    const Invoices: Bill[] = [
        {
            InvoiceNo: "IN-0123",
            date: "21-05-2024",
            amount: 2000,
            balanceDue: 1000,
            status: "Unpaid",
        },
        {
            InvoiceNo: "IN-0122",
            date: "20-04-2024",
            amount: 2000,
            balanceDue: 1050,
            status: "Unpaid",
        },
        {
            InvoiceNo: "IN-0121",
            date: "03-04-2024",
            amount: 2000,
            balanceDue: 800,
            status: "Unpaid",
        },
        {
            InvoiceNo: "IN-0124",
            date: "19-05-2024",
            amount: 2000,
            balanceDue: 0,
            status: "Paid",
        },
        {
            InvoiceNo: "IN-0128",
            date: "02-05-2024",
            amount: 2000,
            balanceDue: 0,
            status: "Paid",
        },
        {
            InvoiceNo: "IN-0130",
            date: "21-05-2024",
            amount: 2000,
            balanceDue: 0,
            status: "Paid",
        },
        {
            InvoiceNo: "IN-0125",
            date: "19-05-2024",
            amount: 2000,
            balanceDue: 0,
            status: "Draft",
        },
        {
            InvoiceNo: "IN-0123",
            date: "16-05-2024",
            amount: 2000,
            balanceDue: 0,
            status: "Draft",
        },
    ];

    const statusStyles: Record<
        BillStatus,
        { bg: string; dot: string; text: string }
    > = {
        Unpaid: {
            bg: "bg-[#FFDDDD]",
            dot: "bg-[#A70505]",
            text: "text-[#A70505]",
        },
        Paid: {
            bg: "bg-[#78AA86]",
            dot: "bg-[#5BE74E]",
            text: "text-[#F4F6F7]",
        },
        Draft: {
            bg: "bg-[#FFD89D]",
            dot: "bg-[#B07202]",
            text: "text-[#B07202]",
        },
    };
    const [searchValue, setSearchValue] = useState<string>("");
    return (
        <div>
            <div className="flex justify-between">
                <div className="w-[50%]">

                    <SearchBar placeholder="Search by Bill No and Status" searchValue={searchValue} onSearchChange={setSearchValue} />
                </div>
                <div className="flex gap-3">
                    <span className="text-[#4B5C79] mt-3 text-[14px] font-normal">Filter By :</span>
                    <Button variant='secondary' size="sm">
                        <ListFilter color={"#0B9C56"} />
                        Status
                    </Button>
                </div>

            </div>
            <div className="grid grid-cols-3 gap-5 py-5 px-10 my-2 bg-[#F5F8FC]">
                {Invoices.map((Invoice, index) => {
                    const { bg, dot, text } =
                        statusStyles[Invoice.status] || statusStyles.Draft;

                    return (
                        <div key={index} className="bg-[#FFFFFF] p-5 rounded-md">
                            {/* Top section with Bill No and Date */}
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <div className="bg-[#004D4D] w-3 h-3 mt-1 rounded-full"></div>
                                    <div className="text-[14px] text-[#303F58] font-semibold">
                                        Invoice:{" "}
                                        <span className="text-[14px] font-semibold">
                                            {Invoice.InvoiceNo}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-[#F4F6F7] rounded-md px-1 py-1">
                                    <p className="flex gap-1 text-[11px] text-[#495160] font-medium">
                                        <span className="mt-0.5">
                                            <Calender color="black" height={11} width={11} />
                                        </span>
                                        {Invoice.date}
                                    </p>
                                </div>
                            </div>

                            {/* Middle section with Amount and Balance Due */}
                            <div className="grid grid-cols-2 py-3">
                                <div className="text-[12px] text-[#4B5C79] font-normal">
                                    <p>Amount</p>
                                    <p className="pt-1">Balance Due</p>
                                </div>
                                <div className="text-[14px] text-[#4B5C79] font-normal">
                                    <p>₹ {Invoice.amount}</p>
                                    <p>₹ {Invoice.balanceDue}</p>
                                </div>
                            </div>

                            {/* Bottom section with View and Status */}
                            <div className="flex justify-between">
                                <div className="text-[12px] text-[#4B5C79] font-normal flex gap-1">
                                    View
                                    <span className="mt-1">
                                        <Eye size={12} color="#3C7FBC" />
                                    </span>
                                </div>
                                <div className={`flex px-2 gap-1 rounded-3xl py-1 ${bg}`}>
                                    <div
                                        className={`w-[8px] h-[8px] mt-1 rounded-full ${dot}`}
                                    ></div>
                                    <p className={`text-[11px] font-medium ${text}`}>
                                        {Invoice.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end">

                {/* <div className=" text-end w-[30%] p-5 rounded-lg bg-gradient-to-r from-[#F7ECD9] via-[#F7ECD9] to-[#B5F0D3] ">
          <p className="text-[12px] text-[#495160] font-normal ">Total Purchase Amount</p>
          <p className="text-[16px] text-[#004D4D] font-bold">₹ 22,5462</p>
        </div> */}
            </div>
        </div>
    );
};

export default SalesHistory;
