import React, { useState } from "react";
import Eye from "../../../assets/icons/Eye";
import MeasureIcon from "../../../assets/icons/MeasureIcon";
import CasualPant from "../../../assets/images/CasualPant.png";
import Pen from "../../../assets/icons/Pen";
import Modal from "../../../Components/modal/Modal";
import CrossIcon from "../../../assets/icons/CrossIcon";

interface Item {
    imgSrc?: string;
    item?: string;
    measuredBy?: string;
}

interface ItemMeasurementModalProps {
    item: Item | null;
    onClose: () => void;
}

const ItemMeasurementModal: React.FC<ItemMeasurementModalProps> = ({ item, onClose }) => {
    const [isChildModalOpen, setIsChildModalOpen] = useState(false); // State for the child modal

    if (!item) return null;

    const measurements = [
        {
            createdOn: "Dec 13 2024",
            orderNo: "ORD0111",
            status: "Latest",
        },
        {
            createdOn: "Aug 24 2024",
            orderNo: "ORD012",
            status: "New",
        },
        {
            createdOn: "Feb 21 2024",
            orderNo: "ORD013",
            status: "Old",
        },
        {
            createdOn: "Nov 24 2023",
            orderNo: "ORD014",
            status: "Old",
        },
    ];


    const measurementsData = [
        {
            title: "Length Measurements",
            items: [
                { label: "Outseam Length", value: 43 },
                { label: "Inseam Length", value: 36 },
                { label: "Waist to Knee Length", value: 43 },
                { label: "Full Length", value: 43 },
            ],
        },
        {
            title: "Waist & Hip Measurements",
            items: [
                { label: "Waist Size", value: 43 },
                { label: "Hip Size", value: 36 },
                { label: "High Hip", value: 43 },
                { label: "Low Hip", value: 43 },
            ],
        },
        {
            title: "Leg & Thigh Measurements",
            items: [
                { label: "Thigh Size", value: 43 },
                { label: "Knee Size", value: 36 },
                { label: "Calf Size", value: 43 },
                { label: "Ankle Opening", value: 43 },
            ],
        },
    ];




    return (
        <>
            {/* Parent Modal */}
            <Modal open={!!item} onClose={onClose} align="center" className="h-[550px] w-[861px] rounded-[16px]">
                {/* Header */}
                <div className="p-2 m-2 bg-white flex justify-between items-center">
                    <h1 className="font-bold text-md text-[#0B1320]">Item Measurement</h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition" aria-label="Close modal">
                        <CrossIcon />
                    </button>
                </div>

                {/* Item Details */}
                <div className="p-2 w-[813px] h-[60px] m-4 bg-gradient-to-r from-green-100 to-green-50 rounded-md shadow-sm flex items-center gap-4">
                    <img src={CasualPant} alt={item.item || "Item"} className="w-10 h-10 object-cover rounded-full" />
                    <div className="flex-1">
                        <p className="text-xs text-[#495160]">Item</p>
                        <h2 className="font-bold text-sm text-[#0B1320]">{item.item || "Unnamed Item"}</h2>
                    </div>
                    <div className="text-right mr-10">
                        <p className="text-xs text-[#495160]">Measured by:</p>
                        <h3 className="font-bold text-sm text-[#0B1320]">{item.measuredBy || "Unknown"}</h3>
                    </div>
                </div>

                {/* Measurements */}
                <div className="p-1 m-2">
                    <h3 className="font-bold text-[#0B1320] text-sm">Measurements</h3>
                </div>
                <div className="px-4 space-y-3 m-3 w-[813px]">
                    {measurements.map((measurement, index) => (
                        <div
                            key={`${measurement.orderNo}-${index}`}
                            className={`p-3 rounded-md shadow-sm flex items-center border justify-between ${measurement.status === "Latest"
                                ? "bg-[#F9F2E7] border-[#B47300]"
                                : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <div className="w-1/8 flex justify-start">
                                <span className="p-2 text-[#FFFFFF] text-lg" aria-label="Icon">
                                    <MeasureIcon />
                                </span>
                            </div>
                            <div className="w-1/6">
                                <p className="text-[11px] font-normal text-[#495160]">Created Date</p>
                                <p className="text-xs text-[#0B1320] font-semibold">{measurement.createdOn}</p>
                            </div>
                            <div className="w-1/2">
                                <p className="text-xs text-gray-500">Order No</p>
                                <p className="text-sm text-gray-800 font-medium">{measurement.orderNo}</p>
                            </div>
                            <div>
                                {measurement.status && (
                                    <span
                                        className={`text-xs text-[#495160] px-3 py-1 rounded-lg ${measurement.status === "Latest"
                                            ? "bg-[#FFE1AB]"
                                            : measurement.status === "New"
                                                ? "bg-[#C4ECD8]"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {measurement.status}
                                    </span>
                                )}
                            </div>
                            <div className="w-1/4 flex items-center justify-end gap-4">
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="View measurement"
                                    onClick={() => setIsChildModalOpen(true)} // Open child modal
                                >
                                    <Eye color="#966000" size={18} />
                                </button>
                                <button className="text-gray-500 hover:text-gray-700" aria-label="Edit measurement">
                                    <Pen color="#966000" size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            {/* Child Modal */}
            {isChildModalOpen && (
                <Modal
                    open={isChildModalOpen}
                    onClose={() => setIsChildModalOpen(false)}
                    align="center"
                    className="h-[450px] w-[700px] rounded-[16px]"
                >
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <MeasureIcon /> {/* Replace with your icon */}
                                <h1 className="font-bold text-md text-[#0B1320]">Created on Dec 13 2024</h1>
                            </div>
                            <button
                                className="text-green-700 flex items-center gap-1 px-3 py-2 bg-green-50 rounded-md border border-green-300 hover:bg-green-100"
                                aria-label="Edit size"
                            >
                                Edit Size
                            </button>
                        </div>

                        {/* Measurements Section */}
                        <div className="space-y-6">
                            {measurementsData.map((section) => (
                                <div key={section.title}>
                                    <h2 className="font-semibold text-[#0B1320] text-sm mb-3">{section.title}</h2>
                                    <div className="grid grid-cols-4 gap-4">
                                        {section.items.map((item) => (
                                            <div key={item.label}>
                                                <label className="block text-xs text-[#495160] mb-1">{item.label}</label>
                                                <div className="h-[40px] bg-[#FFF7ED] border border-gray-200 rounded-md shadow-sm flex items-center justify-center">
                                                    {item.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </Modal>

            )}
        </>
    );
};

export default ItemMeasurementModal;
