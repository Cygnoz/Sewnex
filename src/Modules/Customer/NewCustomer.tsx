import { useContext, useEffect, useState } from "react";
import Modal from "../../Components/modal/Modal";
import Button from "../../Components/Button";
import referenceImage from "../../assets/images/RefereneceImage.png";
import Input from "../../Components/Form/Input";
import GalleryIcon from "../../assets/icons/GalleryIcon";
import Twitter from "../../assets/icons/Twitter";
import Insta from "../../assets/icons/Insta";
import Snap from "../../assets/icons/Snap";
import FaceBook from "../../assets/icons/FaceBook";
import Select from "../../Components/Form/Select";
import CrossIcon from "../../assets/icons/CrossIcon";
import CirclePlus from "../../assets/icons/CirclePlus";
import CheveronDown from "../../assets/icons/CheveronDown";
import Pen from "../../assets/icons/Pen";
import { endpoints } from "../../Services/apiEdpoints";
import toast from "react-hot-toast";
import { CustomerResponseContext } from "../../Context/ContextShare";
import useApi from "../../Hooks/useApi";
import { useOrganization } from "../../Context/OrganizationContext";
interface CustomerData {
  customerProfile: string;
  _id?: string;
  customerType: string;
  salutation: string;
  firstName: string;
  lastName: string;
  companyName: string;
  customerDisplayName: string;
  customerEmail: string;
  mobile: string;
  dob: string;
  debitOpeningBalance: string;
  creditOpeningBalance: string;
  gstin_uin: string;
  membershipCardNumber: string;
  referenceCustomerId: string;
  anniversary: string;
  profession: string;
  twitter: string;
  instagram: string;
  snapchat: string;
  facebook: string;
  companyAddress: string;
  remark: string;
  customerAddress: string;
  billingCountry: string;
  taxType: string;
  gstTreatment: string;
  taxPreference: string;
  placeOfSupply: string;
}
type Props = { page?: string; id?: CustomerData };
const initialCustomerData: CustomerData = {
  customerProfile: "",
  customerType: "",
  salutation: "",
  firstName: "",
  lastName: "",
  companyName: "",
  customerDisplayName: "",
  customerEmail: "",
  mobile: "",
  dob: "",
  debitOpeningBalance: "",
  creditOpeningBalance: "",
  gstin_uin: "",
  membershipCardNumber: "",
  referenceCustomerId: "",
  anniversary: "",
  profession: "",
  twitter: "",
  instagram: "",
  snapchat: "",
  facebook: "",
  remark: "",
  companyAddress: "",
  customerAddress: "",
  billingCountry: "",
  taxType: "",
  gstTreatment: "Consumer",
  taxPreference: "Taxable",
  placeOfSupply: "",
};
const NewCustomer = ({ page, id }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [customerData, setCustomerData] =
    useState<CustomerData>(initialCustomerData);
  const [allcustomers, setallcustomers] = useState([]);
  const [taxData, setTaxData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [openingBalanceType, setOpeningBalanceType] = useState(
    customerData.creditOpeningBalance ? "credit" : "debit"
  );
  const { setcustomerResponse } = useContext(CustomerResponseContext)!;
  const { request: updateCustomerRequest } = useApi("put", 5002);
  const { request: addCustomerRequest } = useApi("post", 5002);
  const { request: fetchAllCustomers } = useApi("get", 5002);
  const { request: fetchAllTax } = useApi("get", 5004);

  const { organization } = useOrganization();
  const handleNext = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  const steps = [
    { id: 1, label: "General Info" },
    { id: 2, label: "Reference" },
    { id: 3, label: "Additional Details" },
    { id: 4, label: "Social Media" },
  ];

  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setActiveTab(1);
  };

  const closeModal = () => {
    setCustomerData(initialCustomerData);
    setIsModalOpen(false);
  };

  const handleInputChange = (name: string, value: File | string | boolean) => {
    if (name === "customerProfile" && value instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(value);

      reader.onload = () => {
        setCustomerData((prevData) => ({
          ...prevData,
          [name]: reader.result as string,
        }));
      };

      reader.onerror = (error) => {
        console.error("Error converting file to Base64:", error);
      };
    } else {
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const customerId = id?._id;
      const url =
        page === "edit"
          ? `${endpoints.EDIT_CUSTOMER}/${customerId}`
          : `${endpoints.ADD_CUSTOMER}`;
      const apiCall =
        page === "edit" ? updateCustomerRequest : addCustomerRequest;

      const { response, error } = await apiCall(url, customerData);

      if (!error && response) {
        toast.success(response.data.message);
        closeModal();
        setcustomerResponse((prevData: any) => ({
          ...prevData,
          data: response.data,
        }));
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in save operation.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fetchFunction: (url: string) => Promise<any>
  ) => {
    console.log("qwertyuiop");

    try {
      const { response, error } = await fetchFunction(url);
      if (!error && response) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadcustomers = async () => {
    try {
      const url = `${endpoints.GET_ALL_CUSTOMER}`;
      const body = { type: "manufacturer" };
      const { response, error } = await fetchAllCustomers(url, body);
      if (!error && response) {
        setallcustomers(response.data);
      } else {
        console.error("Failed to fetch manufacturer data.");
      }
    } catch (error) {
      toast.error("Error in fetching manufacturer data.");
      console.error("Error in fetching manufacturer data", error);
    }
  };

  useEffect(() => {
    if (page !== "edit") {
      if (organization?.organizationCountry) {
        setCustomerData((prevData) => ({
          ...prevData,
          billingCountry: organization?.organizationCountry,
          placeOfSupply: organization?.state,
        }));
      }
      if (taxData) {
        setCustomerData((prevData) => ({
          ...prevData,
          taxType: taxData.taxType,
        }));
      }
    }
    if (page === "edit" && id) {
      if (id.creditOpeningBalance !== "") {
        setOpeningBalanceType("credit");
      } else {
        setOpeningBalanceType("debit");
      }
      setCustomerData((prevdata) => ({
        ...prevdata,
        ...id,
      }));
    }
  }, [
    organization,
    taxData,
    id?.creditOpeningBalance,
    id?.debitOpeningBalance,
  ]);

  useEffect(() => {
    loadcustomers();

    const supplierUrl = `${endpoints.GET_ALL_TAX}`;
    fetchData(supplierUrl, setTaxData, fetchAllTax);
  }, []);

  useEffect(() => {});

  return (
    <div>
      {page && page === "add" ? (
        <Button onClick={openModal}>
          <CirclePlus size={18} />
          <p className="text-[14px] font-medium">
            <b>Add Customer</b>
          </p>
        </Button>
      ) : (
        <div onClick={openModal}>
          <Pen color={"#3C7FBC"} size={18} />
        </div>
      )}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="p-6 text-start max-w-[1200px] max-h-[500px] w-full h-full pt-[32px] rounded-tl-[16px] rounded-tr-[16px] border border-t-0 border-l-0 border-r-0"
      >
        <div>
          <div className="p-2 m-2 bg-white flex justify-between items-center mb-5">
            <h1 className="font-bold text-md text-[#0B1320]">
              Add New Customer
            </h1>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>
          </div>
          <div className="p-2 w-[1111px] h-[56px] rounded-lg shadow-sm bg-[#FAF7F2] mb-6">
            <div className="flex p-2 items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                      activeTab === step.id
                        ? "border-[#C88000] bg-[#C88000] text-[#FFFFFF]"
                        : "border-[#4B5C79] text-[#4B5C79]"
                    } ${
                      activeTab < step.id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {step.id}
                  </div>
                  {/* Step Label */}
                  <span
                    className={`ml-2 font-medium ${
                      activeTab === step.id
                        ? "text-[#C88000]"
                        : "text-[#303F58]"
                    }`}
                  >
                    {step.label}
                  </span>

                  {/* Line Between Steps */}
                  {index !== steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div>
            {activeTab === 1 && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Customer Name"
                    placeholder="Enter Customer Name"
                    value={customerData.customerDisplayName}
                    onChange={(e: any) =>
                      handleInputChange("customerDisplayName", e.target.value)
                    }
                    size="md"
                  />
                  <Input
                    label="Customer Address"
                    placeholder="Enter Customer Address"
                    value={customerData.customerAddress}
                    onChange={(e: any) =>
                      handleInputChange("customerAddress", e.target.value)
                    }
                    size="md"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Input
                    label="Mobile"
                    placeholder="Enter Contact"
                    value={customerData.mobile}
                    onChange={(e: any) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    size="md"
                  />
                  <Input
                    label="Email"
                    placeholder="Enter Email"
                    value={customerData.customerEmail}
                    onChange={(e: any) =>
                      handleInputChange("customerEmail", e.target.value)
                    }
                    size="md"
                  />
                  <Input
                    label="Date of Birth"
                    placeholder="Enter Date of Birth"
                    value={customerData.dob}
                    onChange={(e: any) =>
                      handleInputChange("dob", e.target.value)
                    }
                    size="md"
                    type="date"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Membership Card Number"
                    placeholder="Enter Membership Card Number"
                    size="md"
                    value={customerData.membershipCardNumber}
                    onChange={(e: any) =>
                      handleInputChange("membershipCardNumber", e.target.value)
                    }
                  />
                  <div>
                    <label className="block mb-1 font-normal text-[12px] text-[#495160]">
                      Opening Balance
                    </label>
                    <div className="flex">
                      {/* Dropdown */}
                      <div className="relative w-20">
                        <select
                          className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-xs pl-2 pr-2 rounded-l-3xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          value={openingBalanceType}
                          onChange={(e) => {
                            setOpeningBalanceType(e.target.value);
                          }}
                        >
                          <option value="credit">Cr</option>
                          <option value="debit">Dr</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <CheveronDown />
                        </div>
                      </div>

                      {/* Input Field */}
                      <input
                        type="text"
                        className="text-xs w-[100%] rounded-r-3xl text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                        placeholder="Enter Opening Balance"
                        value={
                          openingBalanceType === "credit"
                            ? customerData.creditOpeningBalance
                            : customerData.debitOpeningBalance
                        }
                        onChange={(e) => {
                          const value = e.target.value;

                          setCustomerData((prevData) => ({
                            ...prevData,
                            creditOpeningBalance:
                              openingBalanceType === "credit"
                                ? value
                                : prevData.creditOpeningBalance,
                            debitOpeningBalance:
                              openingBalanceType === "debit"
                                ? value
                                : prevData.debitOpeningBalance,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="relative p-8 m-2 border rounded-lg shadow-md overflow-hidden">
                {/* Background Image */}
                <img
                  src={referenceImage}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />

                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">
                    Do you want to add a new reference?
                  </h3>
                  <p className="text-sm text-gray-200 mt-2">
                    Select a referred friend from the list, and they will get a
                    referral bonus, which will be <br />
                    credited to their account.
                  </p>
                </div>
              </div>
            )}

            {/* Select Customer Section (Only for Tab 3) */}
            {activeTab === 2 && (
              <div className="mt-4 ">
                <Select
                  placeholder="Select Customer"
                  onChange={(value) => {
                    handleInputChange("referenceCustomerId", value);
                  }}
                  value={customerData.referenceCustomerId}
                  label="Customer"
                  options={allcustomers?.map((customer: any) => ({
                    label: customer?.customerDisplayName,
                    value: customer?._id,
                  }))}
                />
              </div>
            )}

            {activeTab === 3 && (
              <div className="flex space-x-8">
                <div className="border border-[#B47300] border-dashed rounded-lg flex items-center justify-center text-center py-3 w-[250px] h-[200px]">
                  {customerData.customerProfile ? (
                    <img
                      src={customerData.customerProfile}
                      alt="customerProfile"
                      className="max-h-16 max-w-36"
                    />
                  ) : (
                    <label className="cursor-pointer" htmlFor="image">
                      <div className="bg-lightPink flex items-center justify-center h-16 w-36 rounded-lg">
                        <div className="gap-4 flex items-center">
                          <div className="bg-darkRed rounded-full flex items-center w-6 h-6 justify-center">
                            <GalleryIcon />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-textColor mt-1">
                          Upload Image{" "}
                          <span className="text-[#B47300]">browse</span>
                        </p>
                        <p className="text-xs text-[#818894] mt-1">
                          Support: JPG, PNG
                        </p>
                      </div>
                      <input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleInputChange(
                              "customerProfile",
                              e.target.files[0]
                            );
                          }
                        }}
                        className="hidden"
                        name="itemImage"
                      />
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <Input
                    label="GSTIN/UIN"
                    placeholder="Enter GSTIN/UIN"
                    size="md"
                    value={customerData.gstin_uin}
                    onChange={(e) => {
                      handleInputChange("gstin_uin", e.target.value);
                    }}
                  />
                  <Input
                    label="Company Name"
                    placeholder="Enter Company Name"
                    size="md"
                    value={customerData.companyName}
                    onChange={(e) => {
                      handleInputChange("companyName", e.target.value);
                    }}
                  />

                  <div className="col-span-2">
                    <Input
                      label="Company Address"
                      placeholder="Enter Company Address"
                      size="lg"
                      value={customerData.companyAddress}
                      onChange={(e) => {
                        handleInputChange("companyAddress", e.target.value);
                      }}
                    />
                  </div>

                  <Input
                    label="Anniversary"
                    placeholder="Enter Anniversary"
                    size="md"
                    type="date"
                    value={customerData.anniversary}
                    onChange={(e) => {
                      handleInputChange("anniversary", e.target.value);
                    }}
                  />

                  <Input
                    label="Profession"
                    placeholder="Enter Profession"
                    size="md"
                    value={customerData.profession}
                    onChange={(e) => {
                      handleInputChange("profession", e.target.value);
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Twitter />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Twitter"
                      placeholder="Add Twitter Link"
                      size="md"
                      value={customerData.twitter}
                      onChange={(e) => {
                        handleInputChange("twitter", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Insta />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Instagram"
                      placeholder="Add Instagram Link"
                      size="md"
                      value={customerData.instagram}
                      onChange={(e) => {
                        handleInputChange("instagram", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Snap />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Snapchat"
                      placeholder="Add Snapchat Link"
                      size="md"
                      value={customerData.snapchat}
                      onChange={(e) => {
                        handleInputChange("snapchat", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 rounded-lg object-cover">
                    <FaceBook />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Facebook"
                      placeholder="Add Facebook Link"
                      size="md"
                      value={customerData.facebook}
                      onChange={(e) => {
                        handleInputChange("facebook", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4 space-x-4">
            {activeTab === 1 && (
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
            )}

            {activeTab > 1 && (
              <Button variant="primary" onClick={handleBack}>
                Back
              </Button>
            )}

            {activeTab < 4 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewCustomer;
