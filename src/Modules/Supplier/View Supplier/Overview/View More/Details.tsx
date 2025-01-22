import CalendarCheck from "../../../../../assets/icons/CalendarCheck";
import CalendarDays from "../../../../../assets/icons/CalendarDays";
import Calender from "../../../../../assets/icons/Calender";
import Dock from "../../../../../assets/icons/Dock";
import Factory from "../../../../../assets/icons/Factory";
import FileCheck_2 from "../../../../../assets/icons/FileCheck_2";
import HandCoins from "../../../../../assets/icons/HandCoins";
import IndianRupee from "../../../../../assets/icons/IndianRupee";
import Languages from "../../../../../assets/icons/Languages";
import Locate from "../../../../../assets/icons/Locate";
import Mail from "../../../../../assets/icons/Mail";
import Percent from "../../../../../assets/icons/Percent";
import PhoneIcon from "../../../../../assets/icons/PhoneIcon";
import RecieptIndianRupee from "../../../../../assets/icons/RecieptIndianRupee";
import TeenyIcon from "../../../../../assets/icons/TeenyIcon";
import User from "../../../../../assets/icons/User";
import UserRoundCog from "../../../../../assets/icons/UserRoundCog";
import Wallet from "../../../../../assets/icons/Wallet";

type Props = { page: string }

function Details({ page }: Props) {

    const OtherDetails = [
        {
            icon: <Wallet color={"#303F58"} width={17} />,
            title: "Opening Balance",
            item: "cc"
        }, {
            icon: <TeenyIcon color={"#303F58"} width={17} />,
            title: "PAN",
            item: " ",
        },
        {
            icon: <CalendarDays color={"#303F58"} width={16} />,
            title: "Credit Days",
            item: "",
        },
        {
            icon: <IndianRupee color={"#303F58"} weight={2} />,
            title: "Currency",
            item: "",
        },
        {
            icon: <CalendarCheck color={"#303F58"} width={16} />,
            title: "Payment Terms",
            item: "cc",
        },
        {
            icon: <Languages color={"#303F58"} width={16} />,
            title: "Portal Language",
            item: "",
        },
        {
            icon: <RecieptIndianRupee color={"#303F58"} size={16} height={24} />,
            title: "Credit Limit",
            item: "",
        },
        {
            icon: <Calender color={"#303F58"} width={16} height={20} />,
            title: "Website URL",
            item: "",
        },
        {
            icon: <Percent color={"#303F58"} width={16} />,
            title: "Interest Percentage",
            item: "cc",
        },
        {
            icon: <FileCheck_2 color={"#303F58"} width={16} />,
            title: "Documents",
            item: "",
        },
        {
            icon: <UserRoundCog color={"#303F58"} size={16} />,
            title: "Department",
            item: "",
        },
        {
            icon: <User color={"#303F58"} />,
            title: "Designation",
            item: "",
        },

    ];
    const Taxes = [
        {
            icon: <HandCoins color={"#303F58"} width={16} />,
            title: "GST Treatment ",
            item: "cc",

        }, {
            icon: <Dock color={"#303F58"} width={16} />,
            title: "GSTIN / UIN",
            item: "",
        },
        {
            icon: <Locate color={"#303F58"} width={16} />,
            title: "Place of Supply",
            item: "",
        },
        {
            icon: <Factory color={"#303F58"} width={16} />,
            title: "Business Legal Name",
            item: "cc",
        },
        {
            icon: <Factory color={"#303F58"} width={16} />,
            title: "Business Trade Name",
            item: "",
        },
    ];
    const ContactPerson = [
        {
            icon: {
                user: <User color={"#303F58"} />,
                mail: <Mail color={"#303F58"} />,
                mobile: <PhoneIcon size={14} color={"#303F58"} />,
                mobileNo2: <Factory color={"#303F58"} width={14} />,
            },
            Name: "John Doe",
            Email: "john.doe@example.com",
            PhoneNo: "123-456-7890",
            PhoneNo2: "098-765-4321",
        },
        {
            icon: {
                user: <User color={"#303F58"} />,
                mail: <Mail color={"#303F58"} />,
                mobile: <PhoneIcon size={14} color={"#303F58"} />,
                mobileNo2: <Factory color={"#303F58"} width={14} />,
            },
            Name: "Jane Smith",
            Email: "jane.smith@example.com",
            PhoneNo: "234-567-8901",
            PhoneNo2: "987-654-3210",
        },
    ];
    return (
        <div>
            {
                page === "otherDetails" && (
                    <div className="text-start grid grid-cols-4 bg-[#F6F6F6]">
                        {
                            OtherDetails.map((Details) => (
                                <div className="py-5 px-5 rounded border-b-2 border-[#E0E0E0]">
                                    <p>{Details.icon}</p>
                                    <p className="text-[#4B5C79] font-400 text-[12px] py-1">{Details.title}</p>

                                    <p className="text-[#303F58] font-bold text-[14px] break-words max-w-[200px]">
                                        {Details.item}
                                    </p>
                                </div>
                            ))
                        }
                       
                    </div>
                )
            }
            {
                page === "taxes" && (
                    <div className="text-start grid grid-cols-3 bg-[#F6F6F6] ">
                        {
                            Taxes.map((Details) => (
                                <div className="py-5 px-5 rounded border-b-2  border-[#E0E0E0]">
                                    <p>{Details.icon}</p>
                                    <p className="text-[#4B5C79] font-400 text-[12px] py-1">{Details.title}</p>
                                    <p className="text-[#303F58]  font-bold text-[14px]">{Details.item}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                page === "contactPerson" && (
                    <div className="text-start grid grid-cols-3 ">
                        {
                            ContactPerson.map((Details: any) => (
                                <div className="py-5 px-5 rounded m-3 bg-[#F6F6F6]  space-y-2">
                                    <div className="flex gap-2 mb-2">
                                        <span>{Details.icon.user}</span>
                                        <p className="mt-1 font-bold">{Details.Name}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>{Details.icon.mail}</span>
                                        <p className="">{Details.Email}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>{Details.icon.mobile}</span>
                                        <p className="">{Details.PhoneNo}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>{Details.icon.mobileNo2}</span>
                                        <p className="mt-1">{Details.PhoneNo2}</p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Details