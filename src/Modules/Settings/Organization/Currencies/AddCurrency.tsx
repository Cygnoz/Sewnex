import toast from "react-hot-toast";
import * as Yup from "yup";
import Button from "../../../../Components/Button";
import Input from "../../../../Components/Form/Input";
import Select from "../../../../Components/Form/Select";
import Modal from "../../../../Components/modal/Modal";
import { useContext, useEffect, useState } from "react";
import useApi from "../../../../Hooks/useApi";
import topImg from "../../../../assets/Images/image 43.png";
import bgImg from "../../../../assets/images/Group (1).png";
import bgimg2 from "../../../../assets/images/Mask group (2).png";
import Pen from "../../../../assets/icons/Pen";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { endpoints } from "../../../../Services/apiEdpoints";
import { CurrencyResponseContext } from "../../../../Context/ContextShare";
// import { watch } from "fs";

type Props = { page?: string; selectedCurrency?: any };

interface InputCurrencyData {
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  decimalPlaces?: string;
  format?: string;
}

const AddCurrency = ({ page, selectedCurrency }: Props) => {
  const { request: CreateNewCurrency } = useApi("post", 5004);
  const { request: editCurrency } = useApi("put", 5004);
  const [newCurrencyModal, setNewCurrencyModal] = useState(false);
  const { setCurrencyResponse } = useContext(CurrencyResponseContext)!;
  const [newCurrency, setNewCurrency] = useState<InputCurrencyData>({
    currencyCode: "",
    currencySymbol: "",
    currencyName: "",
    decimalPlaces: "",
    format: "",
  });

  const validationSchema = Yup.object().shape({
    currencyCode: Yup.string().required("Currency Code is required"),
    currencySymbol: Yup.string().required("Currency Symbol is required"),
    currencyName: Yup.string().required("Currency Name is required"),
    decimalPlaces: Yup.string().optional(),
    format: Yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const decimalPlacesOptions = [
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const formatOptions = [
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

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
    setValue("currencyCode", "");
    setValue("currencySymbol", "");
    setValue("currencyName", "");
    setValue("decimalPlaces", "");
    setValue("format", "");
  };

  const onSubmit = async () => {
    try {
  const api = page === "edit" ? editCurrency : CreateNewCurrency;
  const url = page === "edit" ?`${endpoints.EDIT_CURRENCIES}` :endpoints.ADD_CURRENCIES  ;
  const { response, error } = await api(url, newCurrency);
  if (response && !error) {
    toast.success(response.data);
    closeModal();
    setNewCurrency({
      currencyCode: "",
      currencySymbol: "",
      currencyName: "",
      decimalPlaces: "",
      format: "",
    });
    setValue("currencyCode", "");
    setValue("currencySymbol", "");
    setValue("currencyName", "");
    setValue("decimalPlaces", "");
    setValue("format", "");

    setCurrencyResponse((prevCurrencyResponse: any) => ({
      ...prevCurrencyResponse,
      ...newCurrency,
    }));
  } else {
    toast.error(error.response?.data || "An error occurred.");
  }
} catch (err) {
      console.error("Unexpected error submitting data:", err);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setNewCurrency((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
    setValue(name as keyof InputCurrencyData, value);
  };

  useEffect(() => {
    if (page === "edit" && selectedCurrency) {
      setNewCurrency((prevData) => ({
        ...prevData,
        currencyCode: selectedCurrency.currencyCode,
        currencySymbol: selectedCurrency.currencySymbol,
        currencyName: selectedCurrency.currencyName,
        decimalPlaces: selectedCurrency.decimalPlaces,
        format: selectedCurrency.format,
        currencyId: selectedCurrency._id,
      }));
      setValue("currencyCode", selectedCurrency.currencyCode);
      setValue("currencySymbol", selectedCurrency.currencySymbol);
      setValue("currencyName", selectedCurrency.currencyName);
      setValue("decimalPlaces", selectedCurrency.decimalPlaces);
      setValue("format", selectedCurrency.format);
    }
  }, [selectedCurrency]);

  console.log("newCurrency", newCurrency);

  return (
    <div>
      {page === "add" ? (
        <Button onClick={openModal} variant="primary" size="sm">
          <CirclePlus size={16} color={"white"} />
          <p className="text-sm">New Currency</p>
        </Button>
      ) : (
        <button onClick={openModal}>
          <Pen color={"#3d7fbc"} />
        </button>
      )}

      <Modal
        open={newCurrencyModal}
        onClose={closeModal}
        className="w-[50%] text-start h-auto"
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
                {page === "add" ? "Create New Currency" : "Edit Currency"}
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-[#faf7f2] p-4 rounded-2xl">
              <div className="grid grid-cols-2 my-2 gap-4">
                <Input
                  required
                  label="Currency Code"
                  placeholder="Select Currency Code"
                  {...register("currencyCode", {
                    onChange: (e) =>
                      handleInputChange("currencyCode", e.target.value),
                  })}
                  error={errors.currencyCode?.message}
                  value={watch("currencyCode")}
                />
                <Input
                  required
                  label="Currency Symbol"
                  placeholder="Enter Currency Symbol"
                  {...register("currencySymbol", {
                    onChange: (e) =>
                      handleInputChange("currencySymbol", e.target.value),
                  })}
                  error={errors.currencySymbol?.message}
                  value={watch("currencySymbol")}
                />
                <Input
                  required
                  label="Currency Name"
                  placeholder="Enter Currency Name"
                  {...register("currencyName", {
                    onChange: (e) =>
                      handleInputChange("currencyName", e.target.value),
                  })}
                  error={errors.currencyName?.message}
                  value={watch("currencyName")}
                />
                <div className="grid grid-cols-2 gap-4 ">
                  <Select
                    value={watch("decimalPlaces")}
                    onChange={(value: string) =>
                      handleInputChange("decimalPlaces", value)
                    }
                    options={decimalPlacesOptions}
                    label="Decimal Place"
                    placeholder="Select Decimal place"
                    error={errors.decimalPlaces?.message}
                  />
                  <Select
                    value={watch("format")}
                    onChange={(value: string) =>
                      handleInputChange("format", value)
                    }
                    label="Format Value"
                    placeholder="Select Format value"
                    error={errors.format?.message}
                    options={formatOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-3">
              <Button
                type="button"
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="w-28 h-[42px] text-sm flex justify-center"
              >
                Cancel
              </Button>
              <Button
                type="submit"
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


