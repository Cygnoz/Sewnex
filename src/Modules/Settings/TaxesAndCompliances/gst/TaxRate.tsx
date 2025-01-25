import Table from "../../../../Components/Table/Table"
import Button from "../../../../Components/Button"
import CirclePlus from "../../../../assets/icons/circleplus"
import Modal from "../../../../Components/modal/Modal"
import { useState } from "react"
import accountsBgImage from "../../../../assets/images/bankBgImage.png"
import Select from "../../../../Components/Form/Select"
import Input from "../../../../Components/Form/Input"


type Props = {}

type TaxGst = {
  _id: string;
  taxName: string;
  taxRate: string;
  cgst: string;
  sgst: string;
  igst: string;
};

function TaxRate({ }: Props) {
  const initialTaxGst = {
    _id: "",
    taxName: "",
    taxRate: "",
    cgst: "",
    sgst: "",
    igst: "",
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [taxGst, setTaxGst] = useState<TaxGst>(initialTaxGst);
  console.log(taxGst);

  const openModal = (taxRate: TaxGst | null = null) => {
    if (taxRate) {
      setTaxGst(taxRate);
    } else {
      setTaxGst(initialTaxGst);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTaxGst(initialTaxGst);
  };


  const dummyColumns = [
    { id: "TaxName", label: "Tax Name ", visible: true },
    { id: "Rate", label: "Rate", visible: true },
    { id: "CGST", label: "CGST", visible: true },
    { id: "SGST", label: "SGST", visible: true },
    { id: "IGST", label: "IGST", visible: true },
  ]

  const dummyData = [
    { TaxName: "GST 0", Rate: "0%", CGST: "0%", SGST: "0%", IGST: "0%" },
    { TaxName: "GST 1", Rate: "0%", CGST: "0%", SGST: "0%", IGST: "0%" },
    { TaxName: "GST 2", Rate: "0%", CGST: "0%", SGST: "0%", IGST: "0%" },
  ]

  const HanldeEyeClick = () => {
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[#303F58] font-bold">Tax Rate</p>
        <div className="flex gap-4">
          <Button onClick={() => openModal(null)} className="text-sm font-medium" size="sm">
            <CirclePlus color="white" /> New Tax
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <Table columns={dummyColumns} data={dummyData} searchPlaceholder={"Search Taxes"} searchableFields={["TaxName"]}
          loading={false} onRowClick={HanldeEyeClick} />
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="w-[50%] px-8 py-6"
      >
        <div
          className="mt-4 p-6 rounded-2xl flex justify-between items-center relative bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${accountsBgImage})`,
          }}
        >
          <div className="relative flex-1">
            <p className="text-[#004D4D] font-bold text-base">Create New Tax</p>
            <p className="text-text_tertiary text-xs mt-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-[#FAF7F2] p-4 rounded-2xl text-text_tertiary text-sm">
          <form>
            <p className="mb-2">Tax Name</p>
            <Input placeholder="Enter tax name" />

            <div className="mt-4 flex items-center justify-between w-full">
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">Rate</label>
                <Select
                  options={[]}
                  placeholder="Enter tax rate"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">CGST</label>
                <Input
                  placeholder="CGST"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between w-full">
              <div className="flex flex-col w-[48%]">g
                <label className="mb-1">Rate</label>
                <Select
                  options={[]}
                  placeholder="Enter tax rate"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">CGST</label>
                <Input
                  placeholder="CGST"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={closeModal} variant="secondary" className="text-sm">
            Cancel
          </Button>
          <Button>save</Button>
        </div>
      </Modal>
    </div>
  )
}

export default TaxRate