import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../Components/Button";
import Modal from "../../Components/modal/Modal";
import Plus from "../../assets/icons/Plus";
import GalleryIcon from "../../assets/icons/GalleryIcon";
import CheveronDown from "../../assets/icons/CheveronDown";
// import PhoneInput from "react-phone-input-2";
import Trash from "../../assets/icons/Trash";
import Upload from "../../assets/icons/Upload";
import Pen from "../../assets/icons/Pen";
import CirclePlus from "../../assets/icons/circleplus";
import Select from "../../Components/Form/Select";
import Input from "../../Components/Form/Input";
import PhoneNumberInput from "../../Components/Form/PhoneInput";
import Checkbox from "../../Components/Form/Checkbox";
import TextArea from "../../Components/Form/TextArea";
// import PhoneInput from "../../Components/Form/PhoneInput";

type Props = { page?: string; id?: string };
type SupplierData = {
  supplierProfile: string;
  salutation: string;
  firstName: string;
  lastName: string;
  companyName: string;
  supplierDisplayName: string;
  supplierEmail: string;
  workPhone: string;
  mobile: string;
  creditDays: string;
  creditLimit: string;
  interestPercentage: string;
  pan: string;
  currency: string;
  paymentTerms: string;
  tds: string;
  debitOpeningBalance: string;
  creditOpeningBalance: string;
  documents: string;
  websiteURL: string;
  department: string;
  designation: string;
  taxType: string;
  gstTreatment: string;
  gstinUin: string;
  vatNumber: string;
  sourceOfSupply: string;
  msmeType: string;
  msmeNumber: string;
  msmeRegistered: boolean;
  billingAttention: string;
  billingCountry: string;
  billingAddressStreet1: string;
  billingAddressStreet2: string;
  billingCity: string;
  billingState: string;
  billingPinCode: string;
  billingPhone: string;
  billingFaxNum: string;
  shippingAttention: string;
  shippingCountry: string;
  shippingAddressStreet1: string;
  shippingAddressStreet2: string;
  shippingCity: string;
  shippingState: string;
  shippingPinCode: string;
  shippingPhone: string;
  shippingFaxNum: string;

  contactPerson: {
    salutation: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    workPhone: string;
    mobile: string;
  }[];

  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNum: string;
    ifscCode: string;
  }[];
  remarks: string;
};
function AddSupplierModal({ page, id }: Props) {
  const initializeSupplierData = (): SupplierData => ({
    supplierProfile: "",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    supplierDisplayName: "",
    supplierEmail: "",
    workPhone: "",
    mobile: "",
    creditDays: "",
    creditLimit: "",
    interestPercentage: "",
    pan: "",
    currency: "",
    debitOpeningBalance: "",
    creditOpeningBalance: "",
    paymentTerms: "",
    tds: "",
    taxType: "",
    documents: "",
    websiteURL: "",
    department: "",
    designation: "",
    gstTreatment: "",
    gstinUin: "",
    sourceOfSupply: "",
    vatNumber: "",
    msmeType: "",
    msmeNumber: "",
    msmeRegistered: false,
    billingAttention: "",
    billingCountry: "",
    billingAddressStreet1: "",
    billingAddressStreet2: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingPhone: "",
    billingFaxNum: "",
    shippingAttention: "",
    shippingCountry: "",
    shippingAddressStreet1: "",
    shippingAddressStreet2: "",
    shippingCity: "",
    shippingState: "",
    shippingPinCode: "",
    shippingPhone: "",
    shippingFaxNum: "",
    contactPerson: [
      {
        salutation: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        workPhone: "",
        mobile: "",
      },
    ],
    bankDetails: [
      {
        accountHolderName: "",
        bankName: "",
        accountNum: "",
        ifscCode: "",
      },
    ],
    remarks: "",
  });

  // ...existing code...

  const salutationOptions = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Ms.", label: "Ms." },
    { value: "Dr.", label: "Dr." },
  ];

  // ...existing code...

  // ...existing code...
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // const [loading, setLoading] = useState(false);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [gstOrVat, setgstOrVat] = useState<any | []>([]);
  // const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [shippingstateList, setshippingStateList] = useState<any | []>([]);
  const [paymentTerms, setPaymentTerms] = useState<any | []>([]);
  const [activeTab, setActiveTab] = useState<string>("otherDetails");
  const [placeOfSupplyList, setPlaceOfSupplyList] = useState<any | []>([]);
  const [supplierdata, setSupplierData] = useState<SupplierData>(
    initializeSupplierData()
  );
  const [errors, setErrors] = useState({
    supplierDisplayName: false,
    gstinUin: false,
    sourceOfSupply: false,
  });
  const [openingType, setOpeningType] = useState<string>("credit");
  const [rows, setRows] = useState([
    {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
    },
  ]);
  const addRow = () => {
    setRows([
      ...rows,
      {
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: "",
      },
    ]);
  };
  const [showAccountNumbers, setShowAccountNumbers] = useState(
    supplierdata.bankDetails.map(() => false)
  );
  const [showReEnterAccountNumbers, setShowReEnterAccountNumbers] = useState(
    supplierdata.bankDetails.map(() => false)
  );

  // check account number
  const [reEnterAccountNumbers, setReEnterAccountNumbers] = useState(
    supplierdata.bankDetails.map(() => "")
  );
  const [isAccountNumberSame, setIsaccountNumbersame] = useState(
    supplierdata.bankDetails.map(() => true)
  );
  const handleReEnterAccountNumberChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newReEnterAccountNumbers = [...reEnterAccountNumbers];
    newReEnterAccountNumbers[index] = e.target.value;
    setReEnterAccountNumbers(newReEnterAccountNumbers);

    const isMatch =
      supplierdata.bankDetails[index].accountNum === e.target.value;
    const newIsAccountNumberSame = [...isAccountNumberSame];
    newIsAccountNumberSame[index] = isMatch;
    setIsaccountNumbersame(newIsAccountNumberSame);
  };
  useEffect(() => {
    setShowAccountNumbers(supplierdata.bankDetails.map(() => false));
    setShowReEnterAccountNumbers(supplierdata.bankDetails.map(() => false));
  }, [supplierdata.bankDetails]);

  const toggleShowAccountNumber = (index: number) => {
    setShowAccountNumbers((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  const toggleShowReEnterAccountNumber = (index: number) => {
    setShowReEnterAccountNumbers((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };
  const addNewBankAccount = () => {
    if (supplierdata.bankDetails.length < 6) {
      setSupplierData((prevState) => ({
        ...prevState,
        bankDetails: [
          ...prevState.bankDetails,
          {
            accountHolderName: "",
            bankName: "",
            accountNum: "",
            ifscCode: "",
          },
        ],
      }));
    } else {
      //   toast.error("You can only add up to 6 bank accounts.");
      alert("You can only add up to 6 bank accounts.");
    }
  };
  // delete bank account
  const deleteBankAccount = (index: number) => {
    const updatedBankDetails = supplierdata.bankDetails.filter(
      (_, i) => i !== index
    );
    setSupplierData((prevState) => ({
      ...prevState,
      bankDetails: updatedBankDetails,
    }));
  };

  // handle modal
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSupplierData(initializeSupplierData);
    setErrors({
      supplierDisplayName: false,
      gstinUin: false,
      sourceOfSupply: false,
    });
  };

  // add contact person
  const handleRowChange = (
    index: number,
    field: keyof (typeof rows)[number],
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedContactPerson = updatedRows.map((row) => ({
      salutation: row.salutation,
      firstName: row.firstName,
      lastName: row.lastName,
      emailAddress: row.email,
      workPhone: row.workPhone,
      mobile: row.mobile,
    }));

    setSupplierData((prevFormData) => ({
      ...prevFormData,
      contactPerson: updatedContactPerson,
    }));
  };
  // handle sidebar
  const getTabClassName = (tabName: string) => {
    return activeTab === tabName
      ? " cursor-pointer font-bold text-darkRed"
      : " cursor-pointer font-bold";
  };
  const getBorderClassName = (tabName: string) => {
    return activeTab === tabName ? "border-[#7a4146]" : "border-neutral-300";
  };

  // handle phonenumber change
  const handleBillingPhoneChange = (value: string) => {
    setSupplierData((prevData) => ({
      ...prevData,
      billingPhone: value,
    }));
  };

  const handleShippingPhoneChange = (value: string) => {
    setSupplierData((prevData) => ({
      ...prevData,
      shippingPhone: value,
    }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (name === "openingType") {
      // Update openingType state first
      setOpeningType(value);

      // Update supplierData state based on the new openingType value
      if (value === "debit") {
        setSupplierData((prevData) => ({
          ...prevData,
          debitOpeningBalance: prevData.creditOpeningBalance,
          creditOpeningBalance: "", // Clear creditOpeningBalance
        }));
      } else if (value === "credit") {
        setSupplierData((prevData) => ({
          ...prevData,
          creditOpeningBalance: prevData.debitOpeningBalance,
          debitOpeningBalance: "", // Clear debitOpeningBalance
        }));
      }
    }

    // Update openingBalance field
    if (name === "openingBalance") {
      if (openingType === "credit") {
        setSupplierData((prevData) => ({
          ...prevData,
          creditOpeningBalance: value,
        }));
      } else if (openingType === "debit") {
        setSupplierData((prevData) => ({
          ...prevData,
          debitOpeningBalance: value,
        }));
      }
    }

    // if (name === "companyName") {
    //   setSupplierData((prevData) => ({
    //     ...prevData,
    //     supplierDisplayName: value, // Always update with companyName
    //   }));
    //   if (supplierdata.supplierDisplayName) {
    //     setErrors({ ...errors, supplierDisplayName: false });
    //   }
    // } else if (name === "firstName") {
    //   setSupplierData((prevData) => ({
    //     ...prevData,
    //     supplierDisplayName: prevData.companyName ? prevData.supplierDisplayName : value, // Update only if companyName is absent
    //   }));
    //   if (supplierdata.supplierDisplayName || !supplierdata.companyName) {
    //     setErrors({ ...errors, supplierDisplayName: false });
    //   }
    // }

    // Update supplierDisplayName based on companyName
    if (name === "companyName") {
      setSupplierData((prevData) => ({
        ...prevData,
        supplierDisplayName: value, // Always update with companyName
      }));
      if (supplierdata.supplierDisplayName) {
        setErrors({ ...errors, supplierDisplayName: false });
      }
    } else if (name === "firstName" || name === "lastName") {
      setSupplierData((prevData) => {
        const firstName = name === "firstName" ? value : prevData.firstName;
        const lastName = name === "lastName" ? value : prevData.lastName;
        const fullName = `${firstName || ""} ${lastName || ""}`.trim();
        return {
          ...prevData,
          [name]: value, // Update the specific field (firstName or lastName)
          supplierDisplayName: prevData.companyName
            ? prevData.supplierDisplayName
            : fullName, // Update only if companyName is absent
        };
      });
      if (supplierdata.supplierDisplayName || !supplierdata.companyName) {
        setErrors({ ...errors, supplierDisplayName: false });
      }
    }

    // Handle checkbox updates
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setSupplierData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // Default case for other inputs
      if (name !== "openingBalance") {
        setSupplierData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        // toast.error("Only JPG and PNG images are supported.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result as string;
          setSupplierData((prevDetails: any) => ({
            ...prevDetails,
            supplierProfile: base64String, // Ensure you're updating the correct key
          }));
        }
      };

      reader.readAsDataURL(file); // Convert the file to a Base64 string
    }
  };
  // add bank account
  const handleBankDetailsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    type BankDetailKeys =
      | "accountHolderName"
      | "bankName"
      | "accountNum"
      | "ifscCode";

    const updatedBankDetails = [...supplierdata.bankDetails];
    updatedBankDetails[index][name as BankDetailKeys] = value;

    setSupplierData((prevState) => ({
      ...prevState,
      bankDetails: updatedBankDetails,
    }));
  };
  return (
    <div>
      {page && page == "add" ? (
        <Button onClick={openModal}>
          <CirclePlus size={18} />
          <p className="text-[14px] font-medium">
            <b>Add Supplier</b>
          </p>
        </Button>
      ) : (
        <div onClick={openModal}>
          <Pen color={"#3C7FBC"} size={18} />
        </div>
      )}

      <div>
        <Modal className="w-[1200px]" open={isModalOpen} onClose={closeModal}>
          <div className="p-5 mt-3">
            <div className="mb-5 flex p-2 rounded-xl bg-[#FAF7F2] relative overflow-hidden px-3 items-center">
              <div className="relative ">
                <h3 className="text-lg font-bold text-textColor">
                  Add New Supplier
                </h3>
              </div>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={closeModal}
              >
                &times;
              </div>
            </div>
            <form
              className="text-slate-600 text-sm overflow-scroll hide-scrollbar space-y-5 p-2"
              style={{ height: "480px" }}
            >
              <div className="">
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="col-span-2">
                    <div className=" border border-[#cc6c74] border-dashed rounded-lg items-center justify-center flex text-center py-3 w-[180px]  h-[240px] ">
                      <label className="cursor-pointer" htmlFor="image">
                        <div className="bg-lightPink flex items-center justify-center h-16 w-36 rounded-lg ">
                          {supplierdata.supplierProfile ? (
                            <img
                              src={supplierdata.supplierProfile}
                              alt="Item"
                              className="max-h-16 max-w-36"
                            />
                          ) : (
                            <div className="gap-4 flex items-center ">
                              <div className="bg-darkRed rounded-full flex items-center w-6 h-6 justify-center">
                                <GalleryIcon />
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm  text-textColor mt-1">
                            Upload Image{" "}
                            <span className="text-[#cc6c74]">browse</span>
                          </p>
                          <p className="text-xs text-[#818894] mt-1">
                            Support: JPG, PNG
                          </p>
                        </div>
                        <input
                          type="file"
                          id="image"
                          onChange={handleFileChange}
                          className="hidden"
                          name="itemImage"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col-span-10 ms-3 me-8">
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-2">
                        <label htmlFor="salutation">Salutation</label>
                        <div className="relative w-full">
                          <Select options={salutationOptions} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 col-span-10 gap-4 ">
                        <Input
                          label="First Name"
                          placeholder="Enter First Nname"
                        />

                        <Input
                          label="Last Name"
                          placeholder="Enter Last Nname"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <Input
                        label="Company Name"
                        placeholder="Enter Company Nname"
                      />
                      <Input
                        label="Supplier Display Name"
                        placeholder="Enter Supplier Display Name"
                      />
                      <Input
                        label="Supplier Email"
                        placeholder="Enter Supplier email"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="w-full border-0 mt-1">
                        <PhoneNumberInput
                          label="Work Phone"
                          name="companyPhone"
                          placeholder="Enter Work Phone"
                          onChange={(value: string) =>
                            handleChange({
                              target: { name: "", value },
                            } as ChangeEvent<HTMLInputElement>)
                          }
                        //   countryData={countryData}
                        />
                      </div>

                      <div className="w-full border-0 mt-1">
                        <PhoneNumberInput
                          label="Mobile"
                          name="companyPhone"
                          placeholder="Enter phone number"
                          onChange={(value: string) =>
                            handleChange({
                              target: { name: "mobile", value },
                            } as ChangeEvent<HTMLInputElement>)
                          }
                        //   countryData={countryData}
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-xs">
                          Opening Balance
                        </label>
                        <div className="flex">
                          <div className="relative w-20 text-xs mt-1">
                            <select
                              className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder  pl-2 pr-2 rounded-l-3xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="openingType"
                              value={openingType}
                              onChange={handleChange}
                            >
                              <option value="credit">Cr</option>
                              <option value="debit">Dr</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <CheveronDown color="gray" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="text-xs w-[100%] mt-1 rounded-r-3xl text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                            placeholder="Enter Opening Balance"
                            name="openingBalance"
                            value={
                              openingType === "debit"
                                ? supplierdata.debitOpeningBalance
                                : supplierdata.creditOpeningBalance
                            }
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex mt-5 px-5">
                  <div className="w-[20%] p-4">
                    <ul className="h-full   space-y-0">
                      <li
                        className={`${getTabClassName(
                          "otherDetails"
                        )} border-r-4 ${
                          activeTab === "otherDetails"
                            ? "text-[#cc6c74]"
                            : "text-[#495160]"
                        } ${getBorderClassName("otherDetails")} p-2 `}
                        onClick={() => setActiveTab("otherDetails")}
                      >
                        Other Details
                      </li>
                      <li
                        className={`${getTabClassName("taxes")} border-r-4 ${
                          activeTab === "taxes"
                            ? "text-[#cc6c74]"
                            : "text-[#495160]"
                        } ${getBorderClassName("taxes")} p-2 `}
                        onClick={() => setActiveTab("taxes")}
                      >
                        Taxes
                      </li>
                      <li
                        className={`${getTabClassName("address")} border-r-4 ${
                          activeTab === "address"
                            ? "text-[#cc6c74]"
                            : "text-[#495160]"
                        } ${getBorderClassName("address")} p-2`}
                        onClick={() => setActiveTab("address")}
                      >
                        Address
                      </li>
                      <li
                        className={`${getTabClassName(
                          "contactPersons"
                        )} border-r-4 ${
                          activeTab === "contactPersons"
                            ? "text-[#cc6c74]"
                            : "text-[#495160]"
                        } ${getBorderClassName("contactPersons")} p-2`}
                        onClick={() => setActiveTab("contactPersons")}
                      >
                        Contact Persons
                      </li>

                      <li
                        className={`${getTabClassName(
                          "bankDetails"
                        )} border-r-4 ${
                          activeTab === "bankDetails"
                            ? "text-[#cc6c74]"
                            : "text-[#495160]"
                        } ${getBorderClassName("bankDetails")} p-2`}
                        onClick={() => setActiveTab("bankDetails")}
                      >
                        Bank Details
                      </li>

                      <li
                        className={`${getTabClassName(
                          "remarks"
                        )} border-r-4 ${getBorderClassName("remarks")} p-2`}
                        onClick={() => setActiveTab("remarks")}
                      >
                        Remarks
                      </li>
                    </ul>
                  </div>
                  <div className="w-full px-16 p-2">
                    {activeTab === "otherDetails" && (
                      <div className="space-y-4 ">
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="Enetr Pan Number" label="PAN" />

                          <Select
                            options={[]}
                            label="Currency"
                            placeholder="Select Currency"
                          />

                          <Select
                            options={[]}
                            label="Payment Terms"
                            placeholder="Select Payment Terms"
                          />

                          <Select
                            options={[]}
                            label="TDS"
                            placeholder="Select TDS"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            placeholder="Credit Days"
                            label="Enetr Credit Days"
                          />

                          <Input
                            label="Credit Limit"
                            placeholder="Enter Credit Limit"
                            name="creditLimit"
                            value={supplierdata.creditLimit}
                            onChange={handleChange}
                          />
                          <Input
                            label="Interest Percentage"
                            placeholder="%"
                            name="interestPercentage"
                            value={supplierdata.interestPercentage}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mt-4 text-xs">
                          <label className="block mb-1">Documents</label>
                          <div className="border-dashed border border-neutral-300  px-3 py-2 rounded-3xl flex gap-2">
                            <Upload />
                          </div>
                          <p className="text-[10px] mt-1 text-gray-600">
                            You Can Upload a Maximum of 10 Files, 10 MB each
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            // value={supplierdata.documents}
                            name="documents"
                            // onChange={(e)=>handleFileChange(e)}
                          />
                        </div>
                        <Input
                          label="Website URL"
                          placeholder="Enter Website URL"
                          name="websiteURL"
                          value={supplierdata.websiteURL}
                          onChange={handleChange}
                          //   icon={<Globe />}
                        />
                        <Input
                          label="Department"
                          placeholder="Enter Department"
                          name="department"
                          value={supplierdata.department}
                          onChange={handleChange}
                        />
                        <Input
                          label="Designation"
                          placeholder="Enter Designation"
                          name="designation"
                          value={supplierdata.designation}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {activeTab === "taxes" && (
                      <>
                        <div className="grid grid-cols-2 gap-4"></div>

                        <div className="space-y-3   text-sm">
                          {gstOrVat.taxType == "GST" && (
                            <div className="grid grid-cols-2 gap-4">
                              <Select
                                options={currencyData.map((item: any) => ({
                                  value: item.currencyCode,
                                  label: `${item.currencyName} (${item.currencySymbol})`,
                                }))}
                                label="GST Treatment"
                                placeholder="Select a GST Treatment"
                                value={supplierdata.gstTreatment}
                              />

                              {supplierdata.gstTreatment !== "Overseas" && (
                                <Select
                                  options={currencyData.map((item: any) => ({
                                    value: item.currencyCode,
                                    label: `${item.currencyName} (${item.currencySymbol})`,
                                  }))}
                                  label="Source of Supply"
                                  placeholder="Select Source of Supply"
                                  value={supplierdata.sourceOfSupply}
                                  onChange={(value: string) =>
                                    handleChange({
                                      target: { name: "currency", value },
                                    } as ChangeEvent<HTMLInputElement>)
                                  }
                                />
                              )}

                              {supplierdata.gstTreatment !==
                                "Unregistered Business" && (
                                <Input
                                  label="GSTIN/UIN"
                                  placeholder="Enter GSTIN/UIN"
                                  name="gstinUin"
                                  value={supplierdata.billingAttention}
                                  onChange={handleChange}
                                />
                              )}
                            </div>
                          )}

                          {gstOrVat.taxType == "VAT" && (
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                label="VAT Number"
                                placeholder="Enter VAT Number"
                                name="vatNumber"
                                value={supplierdata.vatNumber}
                                onChange={handleChange}
                              />
                            </div>
                          )}
                          <label htmlFor="" className="mt-0 text-xs  block ">
                            MSME Registered?
                          </label>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={supplierdata.msmeRegistered}
                              label="The Vendor is MSME Registered"
                            />
                          </div>

                          {supplierdata.msmeRegistered == true && (
                            <div className="grid grid-cols-2 mt-1 gap-4">
                              <div className="relative w-full">
                                <label htmlFor="" className="mb-1 block">
                                  MSME/Udyam Registration Type
                                </label>
                                <Select
                                  options={gstOrVat.msmeType?.map(
                                    (item: any) => ({
                                      value: item,
                                      label: item,
                                    })
                                  )}
                                  value={supplierdata.msmeType}
                                  onChange={(value: string) =>
                                    handleChange({
                                      target: { name: "msmeType", value },
                                    } as ChangeEvent<HTMLInputElement>)
                                  }
                                  placeholder="Select the Registration Type"
                                />
                              </div>
                              <Input
                                label="MSME/Udyam Registration Number"
                                placeholder="Enter MSME/Udyam Registration Number"
                                name="msmeNumber"
                                value={supplierdata.msmeNumber}
                                onChange={handleChange}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {activeTab === "address" && (
                      <>
                        {/* Billing Address */}
                        <div className="space-y-3 text-sm">
                          <p>
                            <b>Billing Address</b>
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {/* Attention */}
                            <Input
                              label="Attention"
                              placeholder="Enter Attention"
                              name="billingAttention"
                              value={supplierdata.billingAttention}
                              onChange={handleChange}
                            />

                            {/* Country */}
                            <Select
                              label="Country"
                              value={supplierdata.billingCountry}
                              options={countryData.map((item: any) => ({
                                value: item.name,
                                label: item.name,
                              }))}
                              placeholder="Select a country"
                            />
                          </div>

                          {/* Address */}

                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="Address"
                              placeholder="Street 1"
                              name="billingAddressStreet1"
                              value={supplierdata.billingAddressStreet1}
                              onChange={handleChange}
                            />
                            <div className="mt-5">
                              <Input
                                placeholder="Street 2"
                                name="billingAddressStreet2"
                                value={supplierdata.billingAddressStreet2}
                                onChange={handleChange}
                              />
                            </div>
                            <Input
                              label="City"
                              placeholder="Enter City"
                              name="billingCity"
                              value={supplierdata.billingCity}
                              onChange={handleChange}
                            />

                            <div className="relative w-full mt-2">
                              <Select
                                label="State / Region / County"
                                options={stateList.map((item: any) => ({
                                  value: item,
                                  label: item,
                                }))}
                                value={supplierdata.billingState}
                                onChange={(value: string) =>
                                  handleChange({
                                    target: { name: "billingState", value },
                                  } as ChangeEvent<HTMLInputElement>)
                                }
                                placeholder="Select State / Region / County"
                                // isDisabled={!supplierdata.billingCountry}
                              />
                            </div>
                          </div>

                          {/* Other fields */}
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <Input
                              label="Pin / Zip / Post code"
                              placeholder="Enter Pin / Zip / Post code"
                              name="billingPinCode"
                              value={supplierdata.billingPinCode}
                              onChange={handleChange}
                            />

                            <PhoneNumberInput
                              label="Phone"
                              name="billingPhone"
                              placeholder="Enter Phone"
                              onChange={handleBillingPhoneChange}
                            //   countryData={countryData}
                              value={supplierdata.billingPhone}
                            />

                            <Input
                              label="Fax Number"
                              placeholder="Enter Fax Number"
                              type="number"
                              name="billingFaxNum"
                              value={supplierdata.billingFaxNum}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="space-y-3 mt-5 text-sm">
                          <div className="flex">
                            <p>
                              <b>Shipping Address</b>
                            </p>
                            <button
                              className="ml-auto text-gray"
                              // onClick={handleCopyAddress}
                            >
                              <b>Copy Billing Address</b>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* Attention */}
                            <Input
                              label="Attention"
                              placeholder="Enter Attention"
                              name="shippingAttention"
                              value={supplierdata.shippingAttention}
                              onChange={handleChange}
                            />

                            {/* Country */}
                            <Select
                              label="Country"
                              value={supplierdata.shippingCountry}
                              options={countryData.map((item: any) => ({
                                value: item.name,
                                label: item.name,
                              }))}
                              placeholder="Select a Country"
                              onChange={(value: string) =>
                                handleChange({
                                  target: { name: "shippingCountry", value },
                                } as ChangeEvent<HTMLInputElement>)
                              }
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="Address"
                              placeholder="Street 1"
                              name="shippingAddressStreet1"
                              value={supplierdata.shippingAddressStreet1}
                              onChange={handleChange}
                            />
                            <div className="mt-5">
                              <Input
                                placeholder="Street 2"
                                name="shippingAddressStreet2"
                                value={supplierdata.shippingAddressStreet2}
                                onChange={handleChange}
                              />
                            </div>
                            <Input
                              label="City"
                              placeholder="Enter City"
                              name="shippingCity"
                              value={supplierdata.shippingCity}
                              onChange={handleChange}
                            />

                            <Select
                              label="State / Region / County"
                              value={supplierdata.shippingState}
                              options={shippingstateList.map((item: any) => ({
                                value: item,
                                label: item,
                              }))}
                              placeholder="Select State / Region / County"
                              onChange={(value: string) =>
                                handleChange({
                                  target: { name: "shippingState", value },
                                } as ChangeEvent<HTMLInputElement>)
                              }
                            //   isDisabled={!supplierdata.shippingCountry}
                            />
                          </div>

                          {/* Other fields */}
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <Input
                              label="Pin / Zip / Post code"
                              placeholder="Enter Pin / Zip / Post code"
                              type="number"
                              name="shippingPinCode"
                              value={supplierdata.shippingPinCode}
                              onChange={handleChange}
                            />
                       
                             
                              <PhoneNumberInput
                              label="Phone"
                                value={supplierdata.shippingPhone}
                                onChange={handleShippingPhoneChange}
                                // countryData={countryData}
                              />
                          
                         
                              <Input
                                label="Fax Number"
                                placeholder="Enter Fax Number"
                                type="number"
                                name="shippingFaxNum"
                                value={supplierdata.shippingFaxNum}
                                onChange={handleChange}
                              />
                           
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === "contactPersons" && (
                      <>
                        <div className="rounded-lg border-2 border-tableBorder mt-5">
                          <table className="min-w-full bg-white rounded-lg relative mb-4 border-dropdownText ">
                            <thead className="text-[12px] text-center text-dropdownText">
                              <tr className="bg-lightPink ">
                                <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                  Salutation
                                </th>
                                <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                  FirstName
                                </th>
                                <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                  LastName
                                </th>
                                <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                  Email Address
                                </th>
                                <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                  Work Phone
                                </th>
                                <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                  Mobile
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-dropdownText text-center text-[13px] ">
                              {rows.map((row, index) => (
                                <tr
                                  className="relative text-center"
                                  key={index}
                                >
                                  <td className="py-2.5 px- border-y border-tableBorder justify-center mt-4 gap-2 items-center flex-1">
                                    <div className="relative w-full">
                                      <select
                                        className="block relative w-full h-9 focus:border-none text-zinc-400 bg-white text-sm text-center border-none rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        value={row.salutation}
                                        onChange={(e) =>
                                          handleRowChange(
                                            index,
                                            "salutation",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="" className="text-gray">
                                          Select
                                        </option>
                                        <option
                                          value="Mr"
                                          className="text-gray"
                                        >
                                          Mr
                                        </option>
                                        <option
                                          value="Mrs"
                                          className="text-gray"
                                        >
                                          Mrs
                                        </option>
                                        <option
                                          value="Miss"
                                          className="text-gray"
                                        >
                                          Miss
                                        </option>
                                        <option
                                          value="Dr"
                                          className="text-gray"
                                        >
                                          Dr
                                        </option>
                                      </select>
                                    </div>
                                  </td>
                                  <td className="py-2.5 px-8 border-y border-tableBorder">
                                    <input
                                      type="text"
                                      value={row.firstName}
                                      className="text-sm w-[100%] text-center rounded-md bg-white h-9 p-2"
                                      placeholder="Fist Name"
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="py-2.5 border-y border-tableBorder flex-1">
                                    <input
                                      type="text"
                                      className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                      placeholder="Last Name"
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="py-2.5 border-y border-tableBorder relative">
                                    <input
                                      type="text"
                                      className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                      placeholder="Email"
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "email",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="py-2.5 border-y border-tableBorder relative">
                                    <input
                                      type="text"
                                      className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                      placeholder="Work Phone"
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "workPhone",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="py-2.5 border-y border-tableBorder relative">
                                    <input
                                      type="text"
                                      className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                      placeholder="Mobile"
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "mobile",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div
                          className="flex gap-2 text-darkRed font-bold items-center my-4 cursor-pointer"
                          onClick={addRow}
                        >
                          <Plus color={"darkRed"} />
                          Add Contact Person
                        </div>
                      </>
                    )}

                    {activeTab === "bankDetails" && (
                      <div className="">
                        <div>
                          {supplierdata.bankDetails.map((bankDetail, index) => (
                            <>
                              {supplierdata.bankDetails.length > 1 && (
                                <div className="pt-10 pb-6 flex">
                                  <p className="text-base font-bold">
                                    Bank {index + 1}
                                  </p>{" "}
                                  <div className="ml-auto mx-3">
                                    <button
                                      className="flex items-center gap-1"
                                      onClick={() => deleteBankAccount(index)}
                                    >
                                      <Trash size={18} color="currentColor" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                              <div
                                key={index}
                                className="grid grid-cols-2 gap-4 border-neutral-300 border-b pb-10"
                              >
                                <Input
                                  label="Account Holder Name"
                                  placeholder="Enter Account Holder Name"
                                  name="accountHolderName"
                                  value={bankDetail.accountHolderName}
                                  onChange={(e) => handleBankDetailsChange(index, e)}
                                />
                                <Input
                                  label="Bank Name"
                                  placeholder="Enter Bank Name"
                                  name="bankName"
                                  value={bankDetail.bankName}
                                  onChange={(e) => handleBankDetailsChange(index, e)}
                                />
                                <Input
                                  label="Account Number"
                                  placeholder="Enter Account Number"
                                  name="accountNum"
                                  value={bankDetail.accountNum}
                                  onChange={(e) => handleBankDetailsChange(index, e)}
                                  type={showAccountNumbers[index] ? "text" : "password"}
                                //   icon={
                                //     <button
                                //       type="button"
                                //       className="absolute right-2 top-2 text-sm text-gray-600"
                                //       onClick={() => toggleShowAccountNumber(index)}
                                //     >
                                //       {showAccountNumbers[index] ? (
                                //         <Eye color={"currentColor"} />
                                //       ) : (
                                //         <Eye color={"currentColor"} />
                                //       )}
                                //     </button>
                                //   }
                                />
                                <Input
                                  label="IFSC Code"
                                  placeholder="Enter IFSC Code"
                                  name="ifscCode"
                                  value={bankDetail.ifscCode}
                                  onChange={(e) => handleBankDetailsChange(index, e)}
                                />
                                <Input
                                  label="Re-Enter Account Number"
                                  placeholder="Re-Enter Account Number"
                                  name="reAccountNum"
                                  value={reEnterAccountNumbers[index]}
                                  onChange={(e) => handleReEnterAccountNumberChange(index, e)}
                                  type={showReEnterAccountNumbers[index] ? "text" : "password"}
                                //   icon={
                                //     <button
                                //       type="button"
                                //       className="absolute right-2 top-2 text-sm text-gray-600"
                                //       onClick={() => toggleShowReEnterAccountNumber(index)}
                                //     >
                                //       {showReEnterAccountNumbers[index] ? (
                                //         <Eye color={"currentColor"} />
                                //       ) : (
                                //         <Eye color={"currentColor"} />
                                //       )}
                                //     </button>
                                //   }
                                />
                                {supplierdata.bankDetails[index].accountNum &&
                                  reEnterAccountNumbers[index] &&
                                  !isAccountNumberSame[index] && (
                                    <p className="text-sm text-red-600">
                                      Account number does not match
                                    </p>
                                  )}
                              </div>
                            </>
                          ))}
                        </div>

                        <div
                          className="flex my-5 gap-2 text-darkRed items-center font-bold cursor-pointer"
                          onClick={addNewBankAccount}
                        >
                          <Plus color="darkRed" /> Add New Bank Account
                        </div>
                      </div>
                    )}
                    {activeTab === "remarks" && (
                      <div>
                        <div>
                         
                          <TextArea
                          label="Remarks"
                            rows={3}
                            className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300   p-2"
                            placeholder=""
                            name="remarks"
                            value={supplierdata.remarks}
                            onChange={(e: any) => handleChange(e)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-end gap-2 mb-3 m-5">
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button variant="primary">Save</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AddSupplierModal;
