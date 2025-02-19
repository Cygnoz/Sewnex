import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import Button from "../../Components/Button";
import Modal from "../../Components/modal/Modal";
import Plus from "../../assets/icons/Plus";
import GalleryIcon from "../../assets/icons/GalleryIcon";
import CheveronDown from "../../assets/icons/CheveronDown";
// import PhoneInput from "react-phone-input-2";
import Trash from "../../assets/icons/Trash";
import Upload from "../../assets/icons/Upload";
// import CirclePlus from "../../assets/icons/circleplus";
import Select from "../../Components/Form/Select";
import Input from "../../Components/Form/Input";
import PhoneNumberInput from "../../Components/Form/PhoneInput";
// import Checkbox from "../../Components/Form/Checkbox";
import TextArea from "../../Components/Form/TextArea";
import { endpoints } from "../../Services/apiEdpoints";
import useApi from "../../Hooks/useApi";
import { SupplierResponseContext } from "../../Context/ContextShare";
import toast from "react-hot-toast";
import Eye from "../../assets/icons/Eye";
import EyeOffIcon from "../../assets/icons/EyeOffIcon";
// import EditIcon from "../../assets/icons/EditIcon";
import { SupplierData } from "../../Types/Supplier";
import CirclePlus from "../../assets/icons/CirclePlus";

// import PhoneInput from "../../Components/Form/PhoneInput";
  
  type Props = {
    supplier?: any | null;
    isModalOpen: boolean;
    openModal?: () => void;
    closeModal: () => void;
    addressEdit?: string;
  };
  
  const EditSupplier: React.FC<Props> = ({
    supplier,
    isModalOpen,
    closeModal,
    addressEdit,
  }) => {
    const [activeTab, setActiveTab] = useState<string>(
      addressEdit ? "address" : "otherDetails"
    );
    const { request: editSupplier } = useApi("put", 5009);
    const [countryData, setcountryData] = useState<any | []>([]);
    const [stateList, setStateList] = useState<any | []>([]);
    const [currencyData, setcurrencyData] = useState<any | []>([]);
    const [gstOrVat, setgstOrVat] = useState<any | []>([]);
    const [oneOrganization, setOneOrganization] = useState<any | []>([]);
    const [shippingstateList, setshippingStateList] = useState<any | []>([]);
    const [paymentTerms, setPaymentTerms] = useState<any | []>([]);
    const [placeOfSupplyList, setPlaceOfSupplyList] = useState<any | []>([]);
    const [errors, setErrors] = useState({
      supplierDisplayName: false,
    });
    const { request: getCountryData } = useApi("get", 5004);
    const { request: getCurrencyData } = useApi("get", 5004);
    const { request: getPaymentTerms } = useApi("get", 5004);
    const { request: getOrganization } = useApi("get", 5004);
    const { request: getTax } = useApi("get", 5009);
    const { setsupplierResponse } = useContext(SupplierResponseContext)!;
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
    const [openingType, setOpeningType] = useState<string>("credit");
    const [supplierdata, setSupplierData] = useState<SupplierData>({
      _id: "",
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
      // debitOpeningBalance:"",
      // creditOpeningBalance:"",
      paymentTerms: "",
      tds: "",
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
      status: "",
    });

    const salutationOptions = [
        { value: "Mr.", label: "Mr." },
        { value: "Mrs.", label: "Mrs." },
        { value: "Ms.", label: "Ms." },
        { value: "Dr.", label: "Dr." },
      ];
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
          toast.error("Only JPG and PNG images are supported.");
          return;
        }
  
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setSupplierData((prevDetails: any) => ({
            ...prevDetails,
            supplierProfile: base64String,
          }));
        };
  
        reader.readAsDataURL(file);
      }
    };
  
    useEffect(() => {
      if (supplier) {
        // Update supplier data
        setSupplierData((prev) => ({ ...prev, ...supplier }));
  
        // Populate "Re-enter Account Numbers" with account numbers from bankDetails
        setReEnterAccountNumbers(
          supplier.bankDetails.map((detail:any) => detail.accountNum || "")
        );
  
        // Set initial state for account number visibility
        setShowAccountNumbers(supplier.bankDetails.map(() => false));
        setShowReEnterAccountNumbers(supplier.bankDetails.map(() => false));
  
        // Set initial state for account number match
        setIsaccountNumbersame(supplier.bankDetails.map(() => true));
      }
    }, [supplier]);
  
    // States
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
  
      // If account number is changed, reset re-entered value
      if (name === "accountNum") {
        const newReEnterAccountNumbers = [...reEnterAccountNumbers];
        newReEnterAccountNumbers[index] = ""; // Clear the re-entered account number
        setReEnterAccountNumbers(newReEnterAccountNumbers);
  
        const newIsAccountNumberSame = [...isAccountNumberSame];
        newIsAccountNumberSame[index] = false; // Mark as not matching
        setIsaccountNumbersame(newIsAccountNumberSame);
      }
  
      setSupplierData((prevState) => ({
        ...prevState,
        bankDetails: updatedBankDetails,
      }));
    };
  
    console.log(supplierdata, "supplierData");
  
    const handleEditSupplier = async () => {
      const newErrors = { ...errors };
  
      // Validate basic supplier fields
      if (supplierdata.supplierDisplayName === "")
        newErrors.supplierDisplayName = true;
  
      const unmatchedAccounts = supplierdata.bankDetails.some(
        (bankDetail, index) => {
          const accountNum = bankDetail.accountNum?.trim();
          const reEnteredAccount = reEnterAccountNumbers[index]?.trim();
  
          if (!accountNum && !reEnteredAccount) {
            return false;
          }
  
          return accountNum !== reEnteredAccount;
        }
      );
  
      if (unmatchedAccounts) {
        toast.error(
          "Account numbers do not match their re-entered values. Please correct them."
        );
        return;
      }
  
      if (Object.values(newErrors).some((error) => error)) {
        setErrors(newErrors);
        return;
      }
  
      try {
        const url = `${endpoints.EDIT_SUPPLIER}/${supplier?._id}`;
        const { response, error } = await editSupplier(url, supplierdata);
  
        if (!error && response) {
          setsupplierResponse(response.data);
          toast.success(response.data.message);
          closeModal();
        } else {
          console.error("Error saving supplier:", error);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
  
    //  bank details change
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
  
    // add new bank account
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
        toast.error("You can only add up to 6 bank accounts.");
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
  
    // // // handle modal
    // const openModal = () => {
    //   setModalOpen(true);
    // };
  
    // const closeModal = () => {
    //   setModalOpen(false);
    // };
  
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
      return activeTab === tabName ? "border-darkRed" : "border-neutral-300";
    };
    // console.log(supplierdata);
  
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
  
    // handle input chnage
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, type, value } = e.target;
  
      if (name === "openingType") {
        setOpeningType(value);
  
        if (value === "Debit") {
          setSupplierData((prevData) => ({
            ...prevData,
            debitOpeningBalance: prevData.creditOpeningBalance,
            creditOpeningBalance: "",
          }));
        } else if (value === "Credit") {
          setSupplierData((prevData) => ({
            ...prevData,
            creditOpeningBalance: prevData.debitOpeningBalance,
            debitOpeningBalance: "",
          }));
        }
      }
  
      if (name === "openingBalance") {
        if (openingType === "Credit") {
          setSupplierData((prevData) => ({
            ...prevData,
            creditOpeningBalance: value,
          }));
        } else if (openingType === "Debit") {
          setSupplierData((prevData) => ({
            ...prevData,
            debitOpeningBalance: value,
          }));
        }
      }
  
      // Update supplierDisplayName based on companyName
      if (name === "companyName") {
        setSupplierData((prevData) => ({
          ...prevData,
          supplierDisplayName: value,
        }));
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
  
    // get additional data
    const getAdditionalData = async () => {
      try {
        // Fetching currency data
        const Currencyurl = `${endpoints.GET_CURRENCY_LIST}`;
        const { response, error } = await getCurrencyData(Currencyurl);
  
        if (!error && response) {
          setcurrencyData(response?.data);
          // console.log(response.data, "currencyData");
        }
  
        const paymentTermsUrl = `${endpoints.GET_PAYMENT_TERMS}`;
        const { response: paymentTermResponse, error: paymentTermError } =
          await getPaymentTerms(paymentTermsUrl);
  
        if (!paymentTermError && paymentTermResponse) {
          setPaymentTerms(paymentTermResponse.data);
          // console.log(paymentTermResponse.data, "paymet terms");
        }
  
        const CountryUrl = `${endpoints.GET_COUNTRY_DATA}`;
        const { response: countryResponse, error: countryError } =
          await getCountryData(CountryUrl);
        if (!countryError && countryResponse) {
          // console.log(countryResponse.data[0].countries, "country");
  
          setcountryData(countryResponse?.data[0].countries);
        } else {
          console.log(countryError, "country");
        }
      } catch (error) {
        console.log("Error in fetching currency data or payment terms", error);
      }
    };
  
    const getAdditionalInfo = async () => {
      try {
        const taxUrl = `${endpoints.GET_TAX_SUPPLIER}`;
        const { response: taxResponse, error: taxError } = await getTax(taxUrl);
  
        if (!taxError && taxResponse) {
          if (taxResponse) {
            // console.log(taxResponse.data.taxType,"tax");
  
            setgstOrVat(taxResponse.data);
          }
        } else {
          console.log(taxError, "tax");
        }
      } catch (error) {}
    };
    const getOneOrganization = async () => {
      try {
        const url = `${endpoints.GET_ONE_ORGANIZATION}`;
        const { response, error } = await getOrganization(url);
  
        if (!error && response?.data) {
          setOneOrganization(response.data);
          // console.log(response.data,"org");
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };
  
    // compy billing address
    const handleCopyAddress = (e: any) => {
      e.preventDefault();
      setSupplierData((prevData) => ({
        ...prevData,
        shippingAttention: supplierdata.billingAttention,
        shippingCountry: supplierdata.billingCountry,
        shippingAddressStreet1: supplierdata.billingAddressStreet1,
        shippingAddressStreet2: supplierdata.billingAddressStreet2,
        shippingCity: supplierdata.billingCity,
        shippingState: supplierdata.billingState,
        shippingPinCode: supplierdata.billingPinCode,
        shippingPhone: supplierdata.billingPhone,
        shippingFaxNum: supplierdata.billingFaxNum,
      }));
    };
  
    // handle place od supply
    const handleplaceofSupply = () => {
      if (oneOrganization.organizationCountry) {
        const country = countryData.find(
          (c: any) =>
            c.name.toLowerCase() ===
            oneOrganization.organizationCountry.toLowerCase()
        );
  
        if (country) {
          const states = country.states;
          // console.log("States:", states);
  
          setPlaceOfSupplyList(states);
        } else {
          console.log("Country not found");
        }
      } else {
        console.log("No country selected");
      }
    };
  
    // console.log(placeOfSupplyList,"place");
  
    // handle country and state
    useEffect(() => {
      handleplaceofSupply();
      if (supplierdata.billingCountry) {
        const country = countryData.find(
          (c: any) => c.name === supplierdata.billingCountry
        );
        if (country) {
          setStateList(country.states || []);
        }
      }
  
      if (supplierdata.shippingCountry) {
        const country = countryData.find(
          (c: any) => c.name === supplierdata.shippingCountry
        );
        if (country) {
          setshippingStateList(country.states || []);
        }
      }
    }, [supplierdata.shippingCountry, supplierdata.billingCountry, countryData]);
  
    useEffect(() => {
      getAdditionalData();
      getAdditionalInfo();
      getOneOrganization();
    }, []);
  
    const ShippingAddressRef = useRef<HTMLDivElement | null>(null);
    const BillingAddressRef = useRef<HTMLDivElement | null>(null);
  
    const addressscroll = () => {
      if (addressEdit) {
        if (addressEdit === "billingAddressEdit" && BillingAddressRef.current) {
          BillingAddressRef.current.scrollIntoView({ behavior: "smooth" });
          console.log(addressEdit, "add");
        }
        if (addressEdit === "shippingAddressEdit" && ShippingAddressRef.current) {
          ShippingAddressRef.current.scrollIntoView({ behavior: "smooth" });
          console.log(addressEdit, "add");
        }
      }
    };
  
    console.log(addressEdit, "addressEdit");
  
    useEffect(() => {
      setActiveTab(addressEdit ? "address" : "otherDetails");
    }, [addressEdit]);
  
    useEffect(() => {
      if (addressEdit) {
        addressscroll();
      }
    }, [addressEdit]);
  
    return (
      <div>


        
        {/* <Button onClick={openModal} variant="secondary" className="pl-6 pr-6"  size="sm"><Pen size={18} color="#565148" /> <p className="text-sm font-medium">Edit</p></Button> */}
        <Modal className="w-[1200px] text-start" open={isModalOpen} onClose={closeModal}>
          <div className="p-5 mt-3">
            <div className="mb-5 flex p-2 rounded-xl bg-[#FAF7F2] relative overflow-hidden px-3 items-center">
              <div className="relative ">
                <h3 className="text-lg font-bold text-textColor">
                  Edit Supplier 
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
                        name="supplierDisplayName"
                        placeholder="Enter Supplier Display Name"
                        value={supplierdata.supplierDisplayName}
                        onChange={handleChange}
                        onFocus={() => setErrors({ ...errors, supplierDisplayName: false })}
                        onBlur={() => {
                          if (supplierdata.supplierDisplayName === "") {
                            setErrors({ ...errors, supplierDisplayName: true });
                          }
                        }}
                        error={errors.supplierDisplayName ? "Supplier Name is Required" : ""}
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
                          name="workPhone"
                          placeholder="Enter Work Phone"
                          value={supplierdata.workPhone}
                          country={"in"}
                          onChange={(value) =>
                            setSupplierData({ ...supplierdata, workPhone: value })
                          }
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
                        )} border-r-4 ${activeTab === "otherDetails"
                          ? "text-[#cc6c74]"
                          : "text-[#495160]"
                          } ${getBorderClassName("otherDetails")} p-2 `}
                        onClick={() => setActiveTab("otherDetails")}
                      >
                        Other Details
                      </li>
                      <li
                        className={`${getTabClassName("taxes")} border-r-4 ${activeTab === "taxes"
                          ? "text-[#cc6c74]"
                          : "text-[#495160]"
                          } ${getBorderClassName("taxes")} p-2 `}
                        onClick={() => setActiveTab("taxes")}
                      >
                        Taxes
                      </li>
                      <li
                        className={`${getTabClassName("address")} border-r-4 ${activeTab === "address"
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
                        )} border-r-4 ${activeTab === "contactPersons"
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
                        )} border-r-4 ${activeTab === "bankDetails"
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
                            label="Currency"
                            options={currencyData.map((item: any) => ({
                              value: item.currencyCode,
                              label: `${item.currencyName} (${item.currencySymbol})`,
                            }))}
                            placeholder="Select Currency"
                            // name="currency"
                            value={supplierdata.currency}
                            onChange={(value: string) =>
                              handleChange({ target: { name: "currency", value } } as ChangeEvent<HTMLInputElement>)
                            }
                          />

                          <Select
                            label="Payment Terms"
                            options={paymentTerms?.map((item: any) => ({
                              value: item.name,
                              label: item.name,
                            })) || []}
                            placeholder="Select Payment Terms"
                            // name="paymentTerms"
                            value={supplierdata.paymentTerms}
                            onChange={(value: string) =>
                              handleChange({ target: { name: "paymentTerms", value } } as ChangeEvent<HTMLInputElement>)
                            }
                          />

                          <Select
                            label="TDS"
                            options={gstOrVat.tds?.map((item: any) => ({
                              value: `${item.name}-${item.value}%`,
                              label: `${item.name} (${item.value}%)`,
                            })) || []}
                            placeholder="Select TDS"
                            value={supplierdata.tds}
                            onChange={(value: string) =>
                              handleChange({ target: { name: "tds", value } } as ChangeEvent<HTMLInputElement>)
                            }
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
                        <div className="space-y-3 p-5  text-sm">
                          {gstOrVat.taxType == "GST" && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="">
                                <label htmlFor="" className="block mb-1">
                                  GST Treatment
                                </label>

                                <div className="relative w-full">
                                  <select
                                    className="block appearance-none w-full h-9  text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-[16px] leading-tight focus:outline-none focus:bg-white "
                                    name="gstTreatment"
                                    value={supplierdata.gstTreatment}
                                    onChange={handleChange}
                                  >
                                    <option className="text-gray">
                                      {" "}
                                      {supplierdata.gstTreatment
                                        ? supplierdata.gstTreatment
                                        : "Select a GST treatment"}
                                    </option>
                                    {gstOrVat?.gstTreatment?.map(
                                      (item: any, index: number) => (
                                        <option value={item} key={index}>
                                          {item}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <CheveronDown color="gray" />
                                  </div>
                                </div>
                              </div>
                              {supplierdata.gstTreatment !== "Overseas" && (
                                <div>
                                  <label className="block mb-1">
                                    Source of Supply
                                  </label>
                                  <div className="relative w-full">
                                    <select
                                      name="sourceOfSupply"
                                      className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-3 pr-8 rounded-[16px] leading-tight focus:outline-none focus:bg-white"
                                      value={supplierdata.sourceOfSupply}
                                      onChange={handleChange}
                                    >
                                      <option value="" className="text-gray">
                                        Select Source of Supply
                                      </option>
                                      {placeOfSupplyList.length > 0 &&
                                        placeOfSupplyList.map(
                                          (item: any, index: number) => (
                                            <option
                                              key={index}
                                              value={item}
                                              className="text-gray"
                                            >
                                              {item}
                                            </option>
                                          )
                                        )}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                      <CheveronDown color="gray" />
                                    </div>
                                  </div>
                                  {supplierdata.gstTreatment !== "Overseas" &&
                                    !supplierdata.sourceOfSupply && (
                                      <p className="text-red-800 text-xs ms-2 mt-1">
                                        Please select a Source of Supply.
                                      </p>
                                    )}
                                </div>
                              )}

                              {supplierdata.gstTreatment !==
                                "Unregistered Business" && (
                                  <div>
                                    <div>
                                      <label className="block mb-1">
                                        GSTIN/UIN
                                      </label>
                                      <input
                                        type="text"
                                        name="gstinUin"
                                        className="text-sm w-full rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                        placeholder="Enter GSTIN/UIN"
                                        value={supplierdata.gstinUin}
                                        onChange={handleChange}
                                        onBlur={() => {
                                          if (
                                            supplierdata.gstTreatment !==
                                            "Overseas" &&
                                            supplierdata.gstTreatment !==
                                            "Unregistered Business" &&
                                            supplierdata.gstTreatment !== "" &&
                                            supplierdata.gstinUin === ""
                                          ) {
                                            setErrors((prevErrors) => ({
                                              ...prevErrors,
                                              gstinUin: true,
                                            }));
                                          } else {
                                            setErrors((prevErrors) => ({
                                              ...prevErrors,
                                              gstinUin: false,
                                            }));
                                          }
                                        }}
                                      />
                                    </div>
                                    {/* {errors.gstinUin && (
                                      <p className="text-red-800 text-xs ms-2 mt-1">
                                        Please enter a valid GSTIN/UIN.
                                      </p>
                                    )} */}
                                  </div>
                                )}
                            </div>
                          )}

                          {gstOrVat.taxType == "VAT" && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="vatNumber" className="block mb-1">
                                  VAT Number
                                </label>
                                <input
                                  type="text"
                                  name="vatNumber"
                                  className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enter VAT Number"
                                  value={supplierdata.vatNumber}
                                  onChange={handleChange}
                                />
                              </div>
                              {/* <div>
                             <label htmlFor="businessTradeName" className="block mb-1">
                               Business Trade Name
                             </label>
                             <input
                               type="text"
                               name="businessTradeName"
                               className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                               placeholder="Enter Business Trade Name"
                               value={supplierdata.businessTradeName}
                               onChange={handleChange}
                             />
                           </div> */}
                            </div>
                          )}
                          <label htmlFor="" className="mt-0 block text-base">
                            MSME Registered?
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="msmeCheckbox"
                              className="customCheckbox h-4 w-4"
                              name="msmeRegistered"
                              checked={supplierdata.msmeRegistered}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="msmeCheckbox"
                              className="text-base cursor-pointer"
                            >
                              The Vendor is MSME Registered
                            </label>
                          </div>

                          {supplierdata.msmeRegistered == true && (
                            <div className="grid grid-cols-2 mt-1 gap-4">
                              <div className="relative w-full">
                                <label htmlFor="" className="mb-1 block">
                                  MSME/Udyam Registration Type
                                </label>
                                <select
                                  value={supplierdata.msmeType}
                                  name="msmeType"
                                  onChange={handleChange}
                                  className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-[16px] leading-tight focus:outline-none focus:bg-white "
                                >
                                  <option value="" className="text-gray">
                                    {" "}
                                    Select the Registration Type
                                  </option>
                                  {gstOrVat.msmeType &&
                                    gstOrVat.msmeType.map(
                                      (item: any, index: number) => (
                                        <option
                                          key={index}
                                          value={item}
                                          className="text-gray"
                                        >
                                          {item}
                                        </option>
                                      )
                                    )}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                                  <CheveronDown color="gray" />
                                </div>
                              </div>
                              <div className="relative w-full">
                                <label htmlFor="" className="mb-1 block">
                                  MSME/Udyam Registration Number
                                </label>
                                <input
                                  type="text"
                                  className="pl-2 text-sm w-full rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enetr MSME/Udyam Registration Number"
                                  name="msmeNumber"
                                  value={supplierdata.msmeNumber}
                                  onChange={handleChange}
                                />
                              </div>
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
                              onChange={(value) =>
                                handleChange({ target: { name: 'billingCountry', value } } as React.ChangeEvent<HTMLInputElement>)
                              }
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
                              onClick={handleCopyAddress}
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
                                <div>
                                  <label className="block mb-1">
                                    Account Holder Name
                                  </label>
                                  <input
                                    type="text"
                                    name="accountHolderName"
                                    className="text-sm w-[100%] rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                    placeholder="Enter Account Holder Name"
                                    value={bankDetail.accountHolderName}
                                    onChange={(e) =>
                                      handleBankDetailsChange(index, e)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1">Bank Name</label>
                                  <input
                                    type="text"
                                    name="bankName"
                                    className="text-sm w-[100%] rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                    placeholder="Enter Bank Name"
                                    value={bankDetail.bankName}
                                    onChange={(e) =>
                                      handleBankDetailsChange(index, e)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1">
                                    Account Number
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="accountNum"
                                      className="text-sm w-[100%] rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                      placeholder="Enter Account Number"
                                      value={bankDetail.accountNum}
                                      onChange={(e) =>
                                        handleBankDetailsChange(index, e)
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="absolute right-2 top-2 text-sm text-gray-600"
                                      onClick={() =>
                                        toggleShowAccountNumber(index)
                                      }
                                    >
                                      <div className="hidden">
                                        {showAccountNumbers[index] ? (
                                          <Eye color={"currentColor"} />
                                        ) : (
                                          <EyeOffIcon />
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <label className="block mb-1">IFSC Code</label>
                                  <input
                                    type="text"
                                    name="ifscCode"
                                    className="text-sm w-[100%] rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                    placeholder="Enter IFSC Code"
                                    value={bankDetail.ifscCode}
                                    onChange={(e) =>
                                      handleBankDetailsChange(index, e)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1">
                                    Re-Enter Account Number
                                  </label>

                                  <div className="relative">
                                    <input
                                      type="text"
                                      name="reAccountNum"
                                      className="text-sm w-[100%] rounded-[16px] text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                      placeholder="Re-Enter Account Number"
                                      value={reEnterAccountNumbers[index]}
                                      onChange={(e) =>
                                        handleReEnterAccountNumberChange(index, e)
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="absolute right-2 top-2 text-sm text-gray-600"
                                      onClick={() =>
                                        toggleShowReEnterAccountNumber(index)
                                      }
                                    >
                                      <div className="hidden">
                                        {showReEnterAccountNumbers[index] ? (
                                          <Eye color={"currentColor"} />
                                        ) : (
                                          <EyeOffIcon />
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                  {supplierdata.bankDetails[index].accountNum &&
                                    reEnterAccountNumbers[index] &&
                                    !isAccountNumberSame[index] && (
                                      <p className="text-sm text-red-600">
                                        Account number does not match
                                      </p>
                                    )}
                                </div>
                              </div>
                            </>
                          ))}
                        </div>

                        <div
                          className="flex my-5 gap-2 text-darkRed items-center font-bold cursor-pointer"
                          onClick={addNewBankAccount}
                        >
                          <CirclePlus color="darkRed" size={22} /> Add New Bank
                          Account
                        </div>
                      </div>
                    )}
                    {activeTab === "remarks" && (
                      <div>
                        <div>

                          <TextArea
                            label="Remarks"
                            rows={3}
                            className="pl-2 text-sm w-[100%]  rounded-[16px] text-start bg-white border border-slate-300   p-2"
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
            <Button onClick={handleEditSupplier} variant="primary">Save</Button>
          </div>
        </Modal>
      </div>
    );
  };
  
  export default EditSupplier;
  