import toast from "react-hot-toast";
import Button from "../../../../Components/Button";
import Input from "../../../../Components/Form/Input";
import Select from "../../../../Components/Form/Select";
import Modal from "../../../../Components/modal/Modal";
import { ChangeEvent, useState } from "react";
import useApi from "../../../../Hooks/useApi";
import topImg from "../../../../assets/Images/image 43.png";
import bgImg from "../../../../assets/images/Group (1).png";
import bgimg2 from "../../../../assets/images/Mask group (2).png";
import Pen from "../../../../assets/icons/Pen";
import CirclePlus from "../../../../assets/icons/circleplus";

type Props = {page?:string};

interface InputCurrencyData {
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  decimalPlaces: string;
  format: string;
}

const AddCurrency = ({page}: Props) => {
  const { request: CreateNewCurrency } = useApi("post", 5004);
  const [newCurrencyModal, setNewCurrencyModal] = useState(false);

  const [newCurrency, setNewCurrency] = useState<InputCurrencyData>({
    currencyCode: "",
    currencySymbol: "",
    currencyName: "",
    decimalPlaces: "",
    format: "",
  });

  const openModal = () => {
    setNewCurrencyModal(true);
  };

  const closeModal = () => {
    setNewCurrencyModal(false);
    setNewCurrency({
      currencyCode: "",
      currencySymbol: "",
      currencyName: "",
      decimalPlaces: "",
      format: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCurrency((prevCurrencyAccount) => ({
      ...prevCurrencyAccount,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const url = `/api/currency`; // Update with your actual endpoint
      const { response, error } = await CreateNewCurrency(url, newCurrency);

      if (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An error occurred while adding currency.";
        toast.error(errorMessage);
        return;
      }

      if (response) {
        closeModal();
        console.log("Currency added successfully:", response.data);
        toast.success("Currency added successfully!");
      }
    } catch (error) {
      console.error("Error occurred while adding currency:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div>
 {
  page === "add" ? (
    <Button onClick={openModal} variant="primary" size="sm">
      <CirclePlus size={16} color={"white"} />
      <p className="text-sm">New Currency</p>
    </Button>
  ) : (
   <button onClick={openModal} > <Pen color={"#3d7fbc"} /></button>
  )
}





      <Modal
        open={newCurrencyModal}
        onClose={closeModal}
        className="w-[48%] text-start h-auto"
      >
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-gradient-to-br from-[#F7ECD9] to-[#B5F0D3] relative overflow-hidden">
            <div
              className="absolute top-0 -right-8 w-[178px] h-[89px]"
              style={{
                backgroundImage: `url(${topImg})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-[#004D4D]">
              {page=="add"?"  Create New Currency":"Edit Currency"}
              </h3>
              <p className="text-text_tertiary text-xs mt-1">
                Open a new bank account swiftly and securely.
              </p>
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

          <form>
            <div className="bg-[#faf7f2] p-4 rounded-2xl">
              <div className="grid grid-cols-2 my-2 gap-4">
                <Select
                  value={newCurrency.currencyCode}
                 
                  options={[
                    { label: "USD", value: "USD" },
                    { label: "EUR", value: "EUR" },
                    { label: "INR", value: "INR" },
                  ]}
                  label="Currency Code"
                  placeholder="Select Currency Code"
                />
                <Input
                  name="currencySymbol"
                  value={newCurrency.currencySymbol}
                  placeholder="Enter Currency Symbol"
                  label="Currency Symbol"
                />
              </div>
              <Input
                name="currencyName"
                value={newCurrency.currencyName}
                onChange={handleChange}
                placeholder="Enter Currency Name"
                label="Currency Name"
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Select
                  value={newCurrency.decimalPlaces}
                  options={[
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                  ]}
                  label="Decimal Place"
                  placeholder="Select Decimal place"
                />
                <Select
                  value={newCurrency.format}
                  options={[
                    { label: "Comma", value: "Comma" },
                    { label: "Dot", value: "Dot" },
                  ]}
                  label="Format Value"
                  placeholder="Select Format value"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-3">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="w-28 h-[42px] text-sm flex justify-center"
              >
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                variant="primary"
                size="sm"
                className="w-28 h-[42px] text-sm flex justify-center"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCurrency;
