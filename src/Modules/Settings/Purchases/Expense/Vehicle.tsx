import { useState } from "react";
import SearchBar from "../../../../Components/SearchBar"
import Button from "../../../../Components/Button";
import Pen from "../../../../assets/icons/Pen";
// import bgImage from "../../../../assets/Images/14.png"
import Trash from "../../../../assets/icons/Trash";
import Modal from "../../../../Components/modal/Modal";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import bgImg from "../../../../assets/images/Group (1).png";
import bgimg2 from "../../../../assets/images/Mask group (2).png";
import Input from "../../../../Components/Form/Input";

type Props = {}

const tableHeaders=[
    "Vehicle Name",
    "Hint",
    "Actions"
]

const tableData=[
    {
        vehicleName:"Maglev",
        hint:"Lorem ipsum sid faact is",

    },
    {
        vehicleName:"Maglev",
        hint:"Lorem ipsum sid faact is",
    },
    {
        vehicleName:"Maglev",
        hint:"Lorem ipsum sid faact is",
    }
]

const Vehicle = ({}: Props) => {

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
const [searchValue, setSearchValue] = useState<string >("");

const openModal = () => {
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};


  return (
    <div className="my-3 ">
          <div className="flex mb-3 gap-3">
      <SearchBar
        placeholder="Search"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
          <Button size="sm" className="text-sm min-w-fit" onClick={openModal}><CirclePlus/>New Vehicle</Button></div>

<div className=" bg-white p-4 rounded-xl">
    
          <table className="min-w-full text-text_tertiary border  rounded-xl bg-white mt-3">
                  <thead className="text-[12px] text-center text-dropdownText rounded-xl">
                    <tr style={{ backgroundColor: "#F9F7F0" }}>
                      {tableHeaders.map((heading, index) => (
                        <th
                          className="py-3  px-8 font-medium border-b border-tableBorder"
                          key={index}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-center text-dropdownText text-sm">
                     {tableData.map((item:any,index:number)=>( <tr key={index} className="border-b border-tableBorder" >
                      
                        <td className="py-3 whitespace-nowrap text-xs">
                        {item.vehicleName}
                        </td>
                        <td className="py-3 whitespace-nowrap text-xs">
                        {item.hint}
                        </td>
                     
                        <td className="py-3 whitespace-nowrap text-sm flex gap-3 items-center justify-center">
                         <Pen color={"#3C7FBC"}/> 
                         <Trash color={"red"}/>
                        </td>
                       
                      </tr>))}
                    
                  </tbody>
                </table>
</div>




            <Modal open={isModalOpen} onClose={closeModal} style={{ width: "45%" }}>
          <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-gradient-to-br from-[#F7ECD9] to-[#B5F0D3] relative overflow-hidden">
            <div
              className="absolute top-0 -right-8 w-[178px] h-[89px]"
            //   style={{
            //     backgroundImage: `url(${bgImage})`,
            //     backgroundRepeat: "no-repeat",
            //   }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-base font-bold text-text_tertiary">
               New Vehicle
              </h3>
              <p className="text-xs text-text_tertiary">Lorem ipsum sid faact is</p>
              
            </div>
            <img src={bgImg} alt="" className="-mt-5 h-10 w-20" />
            <img src={bgimg2} alt="" className=" -mb-5 mt-auto h-10 w-20" />
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>
            <form className="">
              <div className=" gap-4  space-y-2 rounded-md">
                <div className="">
                  <Input placeholder="Enter Vehicle Name" label="Vehicle Name"/>
                </div>

                <div className="">
                <Input placeholder="Value" label=" Hint (Max 50 Chars)"/>

                </div>

             

               

                <br />
              </div>
              <div className="flex justify-end gap-2 mb-3 ">
              <Button variant="secondary" size="sm">
                    Cancel
                </Button>
                <Button variant="primary" size="sm">
                    Save
                </Button>
              </div>
            </form>
          </div>
        </Modal>
    </div>
  )
}

export default Vehicle