import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import CirclePlus from "../../../../assets/icons/CirclePlus";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/modal/Modal";
import Table from "../../../../Components/Table/Table";
import accountsBgImage from "../../../../assets/images/bankBgImage.png";
import Input from "../../../../Components/Form/Input";
import ViewTaxDetailsVat from "./ViewTaxDetailsVat";
import { endpoints } from "../../../../Services/apiEdpoints";
import useApi from "../../../../Hooks/useApi";
import { VatResponseContext } from "../../../../Context/ContextShare";
import toast from "react-hot-toast";

type Props = {};

type TaxRate = {
  _id: string;
  taxName: string;
  taxRate: string;
  taxType: string;
};

function TaxRateVat({ }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVatRate, setSelectedVatRate] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { vatResponse, setVatResponse } = useContext(VatResponseContext)!;

  const initialTaxVat = {
    _id: "",
    taxName: "",
    taxRate: "",
    taxType: "VAT",
  };

  const [taxVat, setTaxVat] = useState<TaxRate>(initialTaxVat);

  const { request: createVatRate } = useApi("post", 5004);
  const { request: updateVatRate } = useApi("put", 5004);
  const { request: AllTaxVat } = useApi("get", 5004);

  const Columns = [
    { id: "taxName", label: "Tax Name", visible: true },
    { id: "taxRate", label: "Rate(%)", visible: true },
  ];


  const openModal = (vatRate: TaxRate | null = null) => {
    if (vatRate) {
      setIsEditMode(true);
      setTaxVat(vatRate);
    } else {
      setIsEditMode(false);
      setTaxVat(initialTaxVat);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaxVat(initialTaxVat);
  };
  const [vatData, setVatData] = useState<TaxRate[]>([]);

  const fetchAllVatRates = async () => {
    try {
      const url = `${endpoints.GET_ALL_TAX}`;
      const { response, error } = await AllTaxVat(url);
      if (!error && response) {
        const vatTaxRates = response.data.vatTaxRate;
        setVatData(vatTaxRates);
      }
    } catch (error) {
      console.error("Error fetching VAT tax data:", error);
    }
  };

  useEffect(() => {
    fetchAllVatRates();
  }, [vatResponse]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      const url = `${endpoints.UPDATE_TAX_VAT}`;
      const body = {
        taxType: "VAT",
        taxRateId: taxVat._id,
        updatedRate: {
          taxName: taxVat.taxName,
          taxRate: taxVat.taxRate,
        },
      };
      const { response, error } = await updateVatRate(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        setVatResponse((prevVatResponse: any) => ({
          ...prevVatResponse,
          ...response.data,
        }));
        fetchAllVatRates();
        closeModal();
      } else {
        toast.error(error.response.data.message);
      }
    } else {
      const url = `${endpoints.ADD_NEW_TAX}`;
      const body = {
        taxType: "VAT",
        vatTaxRate: {
          taxName: taxVat.taxName,
          taxRate: taxVat.taxRate,
        },
      };

      const { response, error } = await createVatRate(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        setVatResponse((prevVatResponse: any) => ({
          ...prevVatResponse,
          ...response.data,
        }));
        fetchAllVatRates();
        closeModal();
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxVat((prev) => ({ ...prev, [name]: value }));
  };


  const handleEyeClick = (id: string) => {
    const selectedData = vatData.find((item) => item._id === id);
    if (selectedData) {
      setSelectedVatRate(selectedData);
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
          <Button onClick={() => openModal(null)} className="text-sm font-medium" size="sm">
            <CirclePlus color="white" /> New Tax
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Table
          columns={Columns}
          data={vatData}
          searchPlaceholder={"Search Taxes"}
          searchableFields={["taxName"]}
          loading={false}
          onRowClick={handleEyeClick}
        />
      </div>

      {/* "New Tax" Modal */}
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
            <p className="text-[#004D4D] font-bold text-base"> {isEditMode ? "Edit VAT" : "Create New VAT"}</p>
            <p className="text-text_tertiary text-xs mt-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
        <div className="mt-4 bg-[#FAF7F2] p-4 rounded-2xl text-text_tertiary text-sm">
          <form ref={formRef} onSubmit={onSubmit}>
            <div>
              <p className="mb-2">Tax Name</p>
              <Input
                type="text"
                name="taxName"
                value={taxVat.taxName}
                onChange={handleChange}
                placeholder="Enter tax name" />
            </div>
            <div className="mt-4">
              <p className="mb-2">Rate</p>
              <Input
                type="text"
                name="taxRate"
                value={taxVat.taxRate}
                onChange={handleChange}
                placeholder="Enter Rate" />
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={closeModal} variant="secondary" className="text-sm">
            Cancel
          </Button>
          <Button onClick={handleExternalSubmit}>Save</Button>
        </div>
      </Modal>

      {/* "View Details" Modal */}
      <ViewTaxDetailsVat
        vatRate={selectedVatRate}
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
}

export default TaxRateVat;