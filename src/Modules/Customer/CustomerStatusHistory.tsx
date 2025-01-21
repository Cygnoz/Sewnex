function CustomerStatusHistory() {
    const historyData = [
        {
            initials: "🛒",
            title: "Sales Order Updated",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur.",
        },
        {
            initials: "🛒",
            title: "Sales Order Added",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur.",
        },
        {
            initials: "🔑",
            title: "Contact Added",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur.",
        },
        {
            initials: "🔑",
            title: "Contact Added",
            date: "03/05/24",
            time: "12:24 PM",
            description: "Lorem dolo hun ipsum dolo",
        },
    ];

    return (
        <div className="bg-[#FCFCFD] rounded-2xl p-6 shadow-md">
            <h3 className="text-[#303F58] mb-4 text-xl font-bold">Recent Customer Status History</h3>
            <div className="flex max-w-full px-2 overflow-x-auto hide-scrollbar">
                {historyData.map((item, index) => (
                    <div key={index} className="min-w-[250px] max-w-[250px] mx-2 flex-shrink-0">
                        <div>
                            <div className="flex items-center w-full">
                                <div
                                    className={`w-8 h-8 z-10 bg-[#0E9F6E] flex items-center justify-center rounded-full text-white text-lg`}
                                >
                                    {item.initials}
                                </div>
                                {index < historyData.length - 1 && (
                                    <div className="flex-1 h-px bg-[#DADBDD] ml-1"></div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2 text-start mt-3">
                            <div className="flex space-x-3 text-[14px] text-[#526484]">
                                <p>{item.date}</p>
                                <p>{item.time}</p>
                            </div>
                            <p className="font-bold text-[14px] text-[#303F58]">{item.title}</p>
                            <p className="text-[12px] text-[#526484]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomerStatusHistory;
