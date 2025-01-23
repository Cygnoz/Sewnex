import { useState } from 'react'
import Modal from '../../../../../Components/modal/Modal'
import Details from './Details';
import Button from '../../../../../Components/Button';

type Props = {}

function ViewMoreModal({ }: Props) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState("Other Details");

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const Header = [
        { title: "Other Details", onclick: () => setSelectedTab("Other Details") },
        { title: "Taxes", onclick: () => setSelectedTab("Taxes") },
        { title: "Contact Person", onclick: () => setSelectedTab("Contact Person") },
    ];
    return (
        <div>
            <p onClick={openModal} className="text-[#004D4D] cursor-pointer font-semibold underline">View More</p>

            <Modal open={isModalOpen} onClose={closeModal}>
                <div className='h-[450px] py-2'>
                    <div className="flex max-w-full">

                        {Header.map((item, index) => (
                            <div
                                key={index}
                                className={`rounded-lg w-full text-center my-2 px-3 mx-5 text-sm py-1.5 cursor-pointer font-semibold ${selectedTab === item.title ? "bg-[#E6EDED] text-[#495160]" : "bg-white text-[#A3A9B3]"
                                    }`}
                                onClick={item.onclick}
                            >
                                <div className="flex items-center justify-center space-x-2 py-.05"> {/* Flexbox to align horizontally */}
                                    {/* Render the icon */}
                                    <p className="text-sm">{item.title}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='px-5'>
                        {selectedTab === "Other Details" && (
                            <div className='h-[340px]'>

                                <Details page='otherDetails' />
                            </div>
                        )}
                        {selectedTab === "Taxes" && (
                            <div className='h-[340px]'>
                                <Details page='taxes' />
                            </div>
                        )}
                        {selectedTab === "Contact Person" && (
                            <div className='h-[340px]'>
                                <Details page='contactPerson' />
                            </div>
                        )}
                    </div>
                    <div className='flex justify-end mt-1 mx-5'>
                        <Button variant='secondary' onClick={closeModal}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewMoreModal