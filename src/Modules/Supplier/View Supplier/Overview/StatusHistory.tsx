import ShoppingCart from "../../../../assets/icons/ShoppingCart";

type Props = {}

function StatusHistory({ }: Props) {
    const statusHistory = [
        {
            icon: <ShoppingCart/>, // Icon representing the first item
            title: "Sales Order Updated",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur."
        },
        {
            icon: <ShoppingCart/>, // Icon representing the second item
            title: "Sales Order Updated",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur."
        },
        {
            icon:<ShoppingCart/>, // Icon representing the third item
            title: "Sales Order Updated",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur."
        },
        {
            icon:<ShoppingCart/>, // Icon representing the fourth item
            title: "Sales Order Updated",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur."
        }
    ];

    return (
        <div>
            <div
                className="col-span-4 py-4 px-5 bg-[#F6F6F6] rounded-[8px]  max-h-[400px] overflow-y-auto"
                style={{
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* IE and Edge */,
                }}
            >
                <h1 className="text-[#303F58] text-[14px] font-bold">
                    Recent Status History
                </h1>
                <div className="flex flex-col relative py-5">
                    <div
                        className="w-[2px] absolute left-4 top-0 bg-WhiteIce"
                        style={{ height: "calc(100% - 70px)" }}
                    ></div>
                    {
                        statusHistory.map((history) => (

                            <div className="space-x-4 flex">

                                <div className="flex flex-col items-center">
                                    {history.icon} 
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-[14px] text-[#303F58]">{history.title}</p>
                                    <p className="text-[#495160] text-[11px] font-medium">{history.date} | {history.time}</p>
                                    <p className="text-[#818894] text-[11px] font-normal">{history.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default StatusHistory