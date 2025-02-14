import Table from "../../../../Components/Table/Table";
import Button from "../../../../Components/Button";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import Modal from "../../../../Components/modal/Modal";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import accountsBgImage from "../../../../assets/images/bankBgImage.png";
import Input from "../../../../Components/Form/Input";
import ViewTaxDetails from "./ViewTaxDetails";
import { endpoints } from "../../../../Services/apiEdpoints";
import useApi from "../../../../Hooks/useApi";
import { GstResponseContext } from "../../../../Context/ContextShare";
import toast from "react-hot-toast";

type Props = {};

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedGstRate, setSelectedGstRate] = useState<any>(null);


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
    setErrors({
      taxName: false,
      taxRate: false,
    });
  };

  const Columns = [
    { id: "taxName", label: "Tax Name ", visible: true },
    { id: "taxRate", label: "Rate", visible: true },
    { id: "cgst", label: "CGST", visible: true },
    { id: "sgst", label: "SGST", visible: true },
    { id: "igst", label: "IGST", visible: true },
  ];

  const [taxData, setTaxData] = useState<TaxGst[]>([]);
  const { request: AllTaxGst } = useApi("get", 5004);
  const { setGstResponse, gstResponse } = useContext(GstResponseContext)!;
  const { request: createTaxGst } = useApi("post", 5004);
  const { request: updateTaxGst } = useApi("put", 5004);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ensuring the taxRate stays between 0 and 100
    if (name === "taxRate") {
      const rate = Math.max(0, Math.min(100, parseFloat(value) || 0)); // Clamp the value between 0 and 100
      setTaxGst((prev) => ({
        ...prev,
        [name]: rate.toString(),
        cgst: (rate / 2).toString(),
        sgst: (rate / 2).toString(),
        igst: rate.toString(),
      }));
    } else {
      setTaxGst((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const [errors, setErrors] = useState({
    taxName: false,
    taxRate: false,
  });


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = {
      taxName: !taxGst.taxName,
      taxRate: !taxGst.taxRate,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (taxGst._id) {  // Check if we're in edit mode based on the presence of `id`
      const url = `${endpoints.UPDATE_TAX_VAT}`;  // Corrected endpoint for updating GST
      const body = {
        taxType: "GST",
        taxRateId: taxGst._id,  // Use `taxGst.id` for the GST rate ID
        updatedRate: {
          taxName: taxGst.taxName,
          taxRate: taxGst.taxRate,
          cgst: taxGst.cgst,
          sgst: taxGst.sgst,
          igst: taxGst.igst,
        },
      };

      const { response, error } = await updateTaxGst(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        setGstResponse((prevGstResponse: any) => ({
          ...prevGstResponse,
          ...response.data,
        }));
        fetchAllTaxGst();
        closeModal();
      } else {
        toast.error(error.response.data.message);
      }
    } else {  // Adding new GST rate
      const url = `${endpoints.ADD_NEW_TAX}`;
      const body = {
        taxType: "GST",
        gstTaxRate: {
          taxName: taxGst.taxName,
          taxRate: taxGst.taxRate,
          cgst: taxGst.cgst,
          sgst: taxGst.sgst,
          igst: taxGst.igst,
        },
      };

      const { response, error } = await createTaxGst(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        setGstResponse((prevGstResponse: any) => ({
          ...prevGstResponse,
          ...response.data,
        }));
        fetchAllTaxGst();
        closeModal();
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const fetchAllTaxGst = async () => {
    try {
      const url = `${endpoints.GET_ALL_TAX}`;
      const { response, error } = await AllTaxGst(url);
      if (!error && response) {
        const gstTaxRates = response.data.gstTaxRate;
        setTaxData(gstTaxRates);
      }
    } catch (error) {
      console.error("Error fetching tax data:", error);
    }
  };

  useEffect(() => {
    fetchAllTaxGst();
  }, [gstResponse]);

  const handleEyeClick = (id: string) => {
    const selectedData = taxData.find((item) => item._id === id);
    if (selectedData) {
      setSelectedGstRate(selectedData);
      setIsViewModalOpen(true);
    }
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };


  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[#303F58] font-bold">Tax Rate</p>
        <div className="flex gap-4">
          <Button
            onClick={() => openModal(null)}
            className="text-sm font-medium"
            size="sm"
          >
            <CirclePlus color="white" /> New Tax
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <Table
          columns={Columns}
          data={taxData}
          searchPlaceholder={"Search Taxes"}
          searchableFields={["taxName"]}
          loading={false}
          onRowClick={handleEyeClick}
        />
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
          <form ref={formRef} onSubmit={onSubmit}>
            <p className="mb-2">Tax Name</p>
            <Input
              name="taxName"
              value={taxGst.taxName}
              onChange={handleChange}
              placeholder="Enter tax name" />
            {errors.taxName && (
              <div className="text-red-800 text-xs mt-1.5 ms-1">Item name is required</div>
            )}
            <div className="mt-4 flex items-center justify-between w-full">
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">Rate</label>
                <Input
                  step="0.01"
                  type="number"
                  max={100}
                  min={0}
                  name="taxRate"
                  value={taxGst.taxRate}
                  onChange={handleChange}
                  placeholder="Enter tax rate" />
                {errors.taxRate && (
                  <div className="text-red-800 text-xs mt-1.5 ms-1">Item name is required</div>
                )}
              </div>
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">CGST</label>
                <Input
                  type="text"
                  name="cgst"
                  value={taxGst.cgst}
                  onChange={handleChange}
                  readOnly
                  placeholder="CGST" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between w-full">
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">SGST</label>
                <Input
                  type="text"
                  name="sgst"
                  value={taxGst.sgst}
                  onChange={handleChange}
                  readOnly
                  placeholder="Enter tax rate" />
              </div>
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">CGST</label>
                <Input
                  type="text"
                  name="igst"
                  value={taxGst.igst}
                  onChange={handleChange}
                  readOnly
                  placeholder="CGST" />
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={closeModal} variant="secondary" className="text-sm">
            Cancel
          </Button>
          <Button onClick={handleExternalSubmit}>save</Button>
        </div>
      </Modal>

      <ViewTaxDetails
        gstRate={selectedGstRate}
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
}

export default TaxRate;