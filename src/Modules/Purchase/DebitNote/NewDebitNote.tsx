import { Link, useNavigate, useParams } from "react-router-dom";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import DebitNoteTable from "./DebitNoteTable";
import Button from "../../../Components/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import { DebitNoteBody } from "./DebitNot";
import useApi from "../../../Hooks/useApi";
import { SupplierResponseContext } from "../../../Context/ContextShare";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import CheveronDown from "../../../assets/icons/CheveronDown";
import SearchBar from "../../../Components/SearchBar";
import avatar from "../../../assets/images/avatar-3814049_1280.webp"
import Upload from "../../../assets/icons/Upload";


const initialSupplierBillState: DebitNoteBody = {
  organizationId: "",
  supplierId: "",
  supplierDisplayName: "",
  sourceOfSupply: "",
  destinationOfSupply: "",
  taxMode: "",

  billId: "",
  supplierInvoiceNum: "",
  billDate: "",
  billType: "",
  debitNote: "",
  orderNumber: "",
  supplierDebitDate: new Date().toISOString().slice(0, 10),
  paymentMode: "",
  depositAccountId: "",
  subject: "",

  items: [
    {
      itemId: "",
      itemName: "",
      itemQuantity: "",
      itemCostPrice: "",
      itemTax: "",
      itemAmount: "",
      itemSgst: "",
      itemCgst: "",
      itemIgst: "",
      itemSgstAmount: "",
      itemCgstAmount: "",
      stock: "",
    },
  ],

  addNotes: "",
  attachFiles: "",

  subTotal: "",
  totalItem: "",
  sgst: "",
  cgst: "",
  igst: "",
  totalTaxAmount: "",
  itemTotalDiscount: "",
  grandTotal: "",
};

type Props = { page?: any };

const NewDebitNote = ({page}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );
  const [supplierData, setSupplierData] = useState<[]>([]);
  const [selecteSupplier, setSelecetdSupplier] = useState<any | []>([]);
  const [placeOfSupplyList, setPlaceOfSupplyList] = useState<any | []>([]);
  const [destinationList, setDestinationList] = useState<any | []>([]);
  const [countryData, setcountryData] = useState<any | any>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [DBPrefix, setDBPrefix] = useState<any | []>([]);
  const [allBills, setAllBills] = useState<any | []>([]);
  const [selectedBill, setSelectedBill] = useState<any | []>([]);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<any>([]);
  const [debitNoteState, setDebitNoteState] = useState<DebitNoteBody>(
    initialSupplierBillState
  );
  const [errors, setErrors] = useState({
    supplierInvoiceNum: false,
    debitDate: false,
    supplierId: false,
    sourceOfSupply: false,
    destinationOfSupply: false,
    paymentMode: false,
    depositTo: false,
    itemTable: false,
  });

  
  const { request: AllSuppliers } = useApi("get", 5009);
  const { request: getCountries } = useApi("get", 5004);
  const { request: getOneOrganization } = useApi("get", 5004);
  const { request: getPrefix } = useApi("get", 5005);
  const { request: getAllBills } = useApi("get", 5005);
  const { request: getAccountData } = useApi("get", 5001);
  const { request: getOneDebit } = useApi("get", 5005);
  const { request: newDebitNoteApi } = useApi("post", 5005);
  const { request: editDebitNoteApi } = useApi("put", 5005);

  const { id } = useParams();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { supplierResponse } = useContext(SupplierResponseContext)!;
  const navigate = useNavigate();

  console.log(debitNoteState, "debitnote state");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setDebitNoteState({
      ...debitNoteState,
      [name]: value,
    });
  };

  const toggleDropdown = (key: string | null) => {
    setOpenDropdownIndex(key === openDropdownIndex ? null : key);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownIndex(null);
    }
  };

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fetchFunction: (url: string) => Promise<any>
  ) => {
    try {
      const { response, error } = await fetchFunction(url);
      if (!error && response) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterByDisplayName = (
    data: any[],
    displayNameKey: string,
    searchValue: string
  ) => {
    return data.filter(
      (item: any) =>
        item.status === "Active" &&
        item[displayNameKey]?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const fetchCountries = async () => {
    try {
      const url = `${endpoints.GET_COUNTRY_DATA}`;
      const { response, error } = await getCountries(url);
      if (!error && response) {
        setcountryData(response.data[0].countries);
      }
    } catch (error) {
      console.log("Error in fetching Country", error);
    }
  };
  const handleDestination = () => {
    if (oneOrganization?.organizationCountry) {
      const country = countryData.find(
        (c: any) =>
          c.name.toLowerCase() ===
          oneOrganization.organizationCountry.toLowerCase()
      );
      // console.log(country, "country");
      if (oneOrganization) {
        setDebitNoteState((preData) => ({
          ...preData,
          destinationOfSupply: oneOrganization.state,
        }));
      }
      if (country) {
        const states = country.states;
        // console.log(states);
        setDebitNoteState((preData) => ({
          ...preData,
        }));
        setPlaceOfSupplyList(states);
      } else {
        console.log("Country not found");
      }
    } else {
      console.log("No country selected");
    }
  };
  const handleplaceofSupply = () => {
    if (selecteSupplier.billingCountry) {
      const country = countryData.find(
        (c: any) =>
          c.name.toLowerCase() === selecteSupplier.billingCountry.toLowerCase()
      );
      if (selecteSupplier) {
        setDebitNoteState((preData) => ({
          ...preData,
          sourceOfSupply: selecteSupplier.billingState,
          supplierDisplayName: selecteSupplier.supplierDisplayName,
          supplierBillingCountry: selecteSupplier.billingCountry,
          supplierBillingState: selecteSupplier.billingState,
        }));
      }

      if (country) {
        const states = country.states;
        setDestinationList(states);
      } else {
        console.log("Country not found");
      }
    } else {
      console.log("No country selected");
    }
  };

  const filteredSupplier = filterByDisplayName(
    supplierData,
    "supplierDisplayName",
    searchValue
  );
console.log(errors)


  const handleSave = async () => {
    const newErrors = { ...errors };
    const missingFields: string[] = [];
    
    if (debitNoteState.supplierId.trim() === "") {
      newErrors.supplierId = true;
      missingFields.push("Supplier");
    } else {
      newErrors.supplierId = false;
    }
    
    if (debitNoteState.destinationOfSupply.trim() === "") {
      newErrors.destinationOfSupply = true;
      missingFields.push("Destination of Supply");
    } else {
      newErrors.destinationOfSupply = false;
    }
    
    if (debitNoteState.sourceOfSupply.trim() === "") {
      newErrors.sourceOfSupply = true;
      missingFields.push("Source of Supply");
    } else {
      newErrors.sourceOfSupply = false;
    }
    
    if (debitNoteState.supplierDebitDate.trim() === "") {
      newErrors.debitDate = true;
      missingFields.push("Debit Date");
    } else {
      newErrors.debitDate = false;
    }
    
    if (debitNoteState.paymentMode.trim() === "") {
      newErrors.paymentMode = true;
      missingFields.push("Payment Mode");
    } else {
      newErrors.paymentMode = false;
    }
    
    if (debitNoteState.depositAccountId.trim() === "" && debitNoteState.paymentMode === "Cash") {
      newErrors.depositTo = true;
      missingFields.push("Deposit To");
    } else {
      newErrors.depositTo = false;
    }
    
    if (missingFields.length > 0) {
      setErrors(newErrors);
      toast.error(`Fill the required fields: ${missingFields.join(", ")}`);
      return;
    }
    
    try {
      let url;
      let api;
      if (page === "edit") {

        url = `${endpoints.EDIT_DEBIT_NOTE}/${id}`;
        api = editDebitNoteApi;
      } else {
        console.log("working");

        url = `${endpoints.ADD_DEBIT_NOTE}`;
        api = newDebitNoteApi;
      }
      const { response, error } = await api(url, debitNoteState);
      if (!error && response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/purchase/debitnote");
        }, 1000);
      } else {
        toast.error(error?.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debitNoteState?.destinationOfSupply == "") {
      setIsInterState(false);
    } else {
      if (
        debitNoteState?.sourceOfSupply !== debitNoteState?.destinationOfSupply
      ) {
        setIsInterState(true);
      } else {
        setIsInterState(false);
      }
    }
  }, [debitNoteState?.sourceOfSupply, debitNoteState?.destinationOfSupply]);

  useEffect(() => {
    if (debitNoteState && supplierData) {
      const { supplierId } = debitNoteState;
      if (supplierId) {
        const supplier = supplierData.find(
          (supplier: any) => supplier._id === supplierId
        );
        if (supplier) {
          setSelecetdSupplier(supplier);
        }
      }
    }

    if (debitNoteState && allBills) {
      const { billId } = debitNoteState;
      if (billId) {
        const bills = allBills?.allBills?.find(
          (bill: any) => bill._id === billId
        );
        if (bills) {
          setSelectedBill(bills);
        }
      }
    }
  }, [debitNoteState, supplierData, allBills]);

  useEffect(() => {
    const supplierUrl = `${endpoints.GET_ALL_SUPPLIER}`;
    const organizationUrl = `${endpoints.GET_ONE_ORGANIZATION}`;
    const getAllBillsUrl = `${endpoints.GET_ALL_BILLS}`;
    const allAccountsUrl = `${endpoints.Get_ALL_Acounts}`;

    fetchData(organizationUrl, setOneOrganization, getOneOrganization);
    fetchData(supplierUrl, setSupplierData, AllSuppliers);
    fetchData(getAllBillsUrl, setAllBills, getAllBills);
    fetchData(allAccountsUrl, setAccounts, getAccountData);

    if (page !== "edit") {
      const getPrefixUrl = `${endpoints.GET_DEBIT_NOTE_PREFIX}`;

      fetchData(getPrefixUrl, setDBPrefix, getPrefix);
    } else {
      const getOneDN = `${endpoints.GET_DEBIT_NOTE}/${id}`;

      fetchData(getOneDN, setDebitNoteState, getOneDebit);
    }
  }, []);

  useEffect(() => {
    if (page !== "edit") {
      setDebitNoteState((preData) => ({
        ...preData,
        debitNote: DBPrefix,
      }));
    }
  }, [DBPrefix]);

  useEffect(() => {
    if (debitNoteState.paymentMode === "Credit") {
      setDebitNoteState((prevData) => ({
        ...prevData,
        depositAccountId: "", 
      }));
    }
  }, [debitNoteState.paymentMode]);
  

  useEffect(() => {
    supplierResponse;
    handleDestination();
    handleplaceofSupply();
    fetchCountries();
  }, [oneOrganization, selecteSupplier]);

  useEffect(() => {
    if (openDropdownIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);
  return (
    <div>
     <div className="mx-5 my-4 text-xs">
      <div className="flex gap-5">
        <Link to={"/purchase/debitNote"}>
          <div className="flex justify-center items-center h-11 w-11 bg-[white] rounded-full">
            <ChevronLeft />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">Debit Note</h4>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-5">
        <div className="bg-[white] p-5 min-h-max rounded-xl relative col-span-8">
          <div className="grid grid-cols-2 gap-4 mt-5 space-y-">
            <div>
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Supplier Name<span className="text-[#bd2e2e] ">*</span>
              </label>
              <div
                className="relative w-full"
                onClick={() => toggleDropdown("supplier")}
              >
                <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-xs pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <p>
                    {selecteSupplier && selecteSupplier.supplierDisplayName
                      ? selecteSupplier.supplierDisplayName
                      : "Select Supplier"}
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CheveronDown color="gray" />
                </div>
              </div>
              {openDropdownIndex === "supplier" && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white  shadow  rounded-[36px] mt-1 p-2 w-[30%] space-y-1 max-h-72 overflow-y-auto  hide-scrollbar"
                >
                  <SearchBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    placeholder="Select Supplier"
                  />
                  {filteredSupplier?.length > 0 ? (
                    filteredSupplier?.map((supplier: any) => (
                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-lightPink cursor-pointer hover:bg-lightRose">
                        <div className="col-span-2 flex items-center justify-center">
                          <img
                            className="rounded-full "
                            src={
                              supplier.supplierProfile
                                ? supplier.supplierProfile
                                : avatar
                            }
                            alt=""
                          />
                        </div>
                        <div
                          className="col-span-10 flex cursor-pointer "
                          onClick={() => {
                            setDebitNoteState((prevState) => ({
                              ...prevState,
                              supplierId: supplier._id,
                              supplierDisplayName: supplier.supplierDisplayName,
                              orderNumber: "",
                              supplierInvoiceNum: "",
                              billId: "",
                              billDate: "",
                            }));
                            setOpenDropdownIndex(null);
                            setSelecetdSupplier(supplier);
                            setSelectedBill([]);
                          }}
                        >
                          <div
                            className={` items-center space-y-1 ${
                              supplier.mobile
                                ? "justify-start"
                                : "flex justify-center"
                            }`}
                          >
                            <p className="font-bold text-xs">
                              {supplier.supplierDisplayName}
                            </p>
                            {supplier.mobile && (
                              <p className="text-xs text-gray-500">
                                Phone: {supplier.mobile}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center border-slate-400 border rounded-lg">
                      <p className="text-[darkRed] text-xs py-4">
                        Supplier Not Found!
                      </p>
                    </div>
                  )}
                  <div className="hover:bg-lightRose cursor-pointer border border-slate-400 rounded-lg py-4">
                    {/* <AddSupplierModal page="purchase" /> */}
                  </div>
                </div>
              )}
            </div>
            <div className="relative w-full">
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Debit Note
                <input
                  value={debitNoteState.debitNote}
                  name="debitNote"
                  id=""
                  onChange={handleInputChange}
                  disabled
                  className=" block  appearance-none w-full h-9  mt-0.5 text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                />
              </label>
            </div>

            {debitNoteState.supplierId && (
              <>
                <div>
                  <label className="block text-xs mb-1 text-[#4b4f63]">
                    Source Of Supply<span className="text-[#bd2e2e] ">*</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      onChange={handleInputChange}
                      name="sourceOfSupply"
                      value={debitNoteState.sourceOfSupply}
                      className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Select Source Of Supply</option>
                      {debitNoteState &&
                        placeOfSupplyList?.map((item: any, index: number) => (
                          <option
                            key={index}
                            value={item}
                            className="text-gray"
                          >
                            {item}
                          </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CheveronDown color="gray" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-[#4b4f63]">
                    Destination of Supply
                    <span className="text-[#bd2e2e] ">*</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      onChange={handleInputChange}
                      name="destinationOfSupply"
                      value={debitNoteState.destinationOfSupply}
                      className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Select Destination Of Supply</option>
                      {destinationList &&
                        destinationList?.map((item: any, index: number) => (
                          <option
                            key={index}
                            value={item}
                            className="text-gray"
                          >
                            {item}
                          </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CheveronDown color="gray" />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className=" w-full">
              <label
                htmlFor=""
                className="block text-xs mb-1 text-[#4b4f63]"
                onClick={() => toggleDropdown("bill")}
              >
                Bill#<span className="text-[#bd2e2e] ">*</span>
              </label>
              <div
                className="relative w-full "
                onClick={() => {
                  toggleDropdown("bill");
                }}
              >
                <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-xs pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <p>
                    {selectedBill && selectedBill.supplierInvoiceNum
                      ? selectedBill.supplierInvoiceNum
                      : "Select Bill"}
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CheveronDown color="gray" />
                </div>
              </div>
              {openDropdownIndex === "bill" && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white  shadow  rounded-[36px] mt-1 p-2 w-[30%] space-y-1 max-h-72 overflow-y-auto  hide-scrollbar"
                >
                  <SearchBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    placeholder="Search Bill"
                  />
                  {selecteSupplier &&
                  Object.keys(selecteSupplier).length > 0 ? (
                    allBills?.allBills?.length > 0 ? (
                      allBills?.allBills?.filter(
                        (bill: any) => bill.supplierId === selecteSupplier?._id
                      ).length > 0 ? (
                        allBills?.allBills
                          ?.filter(
                            (bill: any) =>
                              bill.supplierId === selecteSupplier?._id
                          )
                          ?.map((bill: any) => (
                            <div
                              key={bill._id}
                              className="gap-1 p-2 hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg bg-lightPink"
                            >
                              <div
                                className="flex cursor-pointer"
                                onClick={() => {
                                  setDebitNoteState((prevState) => ({
                                    ...prevState,
                                    billId: bill._id,
                                    supplierInvoiceNum: bill.supplierInvoiceNum,
                                    billDate: bill.billDate,
                                    orderNumber: bill.orderNumber,
                                  }));
                                  setOpenDropdownIndex(null);
                                  setSelectedBill(bill);
                                }}
                              >
                                <div>
                                  <p className="font-bold text-xs">
                                    {bill.supplierInvoiceNum}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Supplier: {bill.supplierDisplayName}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="text-center border-slate-400 border rounded-lg">
                          <p className="text-[red] text-xs py-4">
                            Bills Not Found!
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="text-center border-slate-400 border rounded-lg">
                        <p className="text-[red] text-xs py-4">
                          Bills Not Found!
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center border-slate-400 border rounded-lg">
                      <p className="text-[darkRed] px-4 text-xs py-4">
                        Please select a supplier to view bills !
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Bill Type<span className="text-[#bd2e2e] ">*</span>
              </label>
              <div className="relative w-full">
                <select
                  name="billType"
                  value={debitNoteState.billType}
                  onChange={handleInputChange}
                  className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" className="text-gray">
                    Select Bill Type
                  </option>
                  <option value="Registered">Registered</option>
                  <option value="Deemed Export">Deemed Export</option>
                  <option value="SEZ With Payment">SEZ With Payment</option>
                  <option value="SEZ Without Payment">
                    SEZ Without Payment
                  </option>
                  <option value="Export With Payment">
                    Export With Payment
                  </option>
                  <option value="Export Without Payment">
                    Export Without Payment
                  </option>
                  <option value="B2C (Large)">B2C (Large)</option>
                  <option value="B2C Others">B2C Others</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CheveronDown color="gray" />
                </div>
              </div>
            </div>

            <div className=" w-full hidden">
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Order Number
                <input
                  disabled
                  name="orderNumber"
                  value={debitNoteState.orderNumber}
                  onChange={handleInputChange}
                  id=""
                  placeholder="Value"
                  className=" block  appearance-none w-full h-9  mt-0.5 text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                />
              </label>
            </div>
            <div>
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Supplier Debit Date<span className="text-[#bd2e2e] ">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  name="supplierDebitDate"
                  value={debitNoteState.supplierDebitDate}
                  onChange={handleInputChange}
                  id=""
                  placeholder="Value"
                  className=" block  appearance-none w-full h-9  mt-0.5 text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Payment Mode<span className="text-[#bd2e2e] ">*</span>
              </label>
              <div className="relative w-full">
                <select
                  onChange={handleInputChange}
                  name="paymentMode"
                  value={debitNoteState.paymentMode}
                  className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CheveronDown color="gray" />
                </div>
              </div>
            </div>

         { debitNoteState.paymentMode==="Cash" &&  <div>
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Deposit To<span className="text-[#bd2e2e] ">*</span>
              </label>
              <div className="relative w-full">
                <select
                  onChange={handleInputChange}
                  name="depositAccountId"
                  value={debitNoteState.depositAccountId}
                  className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select Account</option>
                  {accounts
                    ?.filter(
                      (item: any) =>
                        item.accountSubhead === "Bank" ||
                        item.accountSubhead == "Cash"
                    )
                    ?.map((item: any) => (
                      <option key={item._id} value={item._id}>
                        {item.accountName}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CheveronDown color="gray" />
                </div>
              </div>
            </div>}

            <div className=" w-full">
              <label className="block text-xs mb-1 text-[#4b4f63]">
                Subject
                <input
                  name="subject"
                  onChange={handleInputChange}
                  id=""
                  value={debitNoteState.subject}
                  placeholder="Enter a subject within 250 Characters"
                  className="border-inputBorder w-full text-xs border rounded-[36px] text-dropdownText  p-2 h-9 "
                />
              </label>
            </div>
          </div>
          <div className="mt-9">
            <p className="font-bold text-base">Add Item</p>
            <DebitNoteTable
              state={debitNoteState}
              setState={setDebitNoteState}
              isInterState={isInterState}
              oneOrganization={oneOrganization}
              selectedBill={selectedBill}
            />{" "}
          </div>

          <br />
         
        </div>
      <div className="col-span-4">
          <div className=" bg-white rounded-lg text-[#4b4f63] p-5">
          <div className="mt-2">
              <label htmlFor="" className="block text-xs mb-1 text-[#4b4f63]">
                Add Note
                <input
                  name="addNotes"
                  id=""
                  value={debitNoteState.addNotes}
                  onChange={handleInputChange}
                  placeholder="Note"
                  className="border-inputBorder w-full text-xs border rounded-lg  p-2 h-[57px] "
                />
              </label>
            </div>
            <div className="mt-0">
              <label htmlFor="" className="block text-xs mb-1 text-[#4b4f63]">
                Terms & Conditions
                <input
                  name=""
                  id=""
                  placeholder="Add Terms & Conditions of your business"
                  className="border-inputBorder w-full text-xs border rounded-lg p-2 h-[57px] "
                />
              </label>
            </div>
            <div className="text-xs mt-3 hidden">
              <label className="block  text-xs mb-1 text-[#4b4f63]">
                Attach files to the Debit Notes
                <div className="border-inputBorder border-gray-800 w-full border-dashed border p-2 rounded-[36px] flex flex-col gap-2 justify-center items-center bg-white mb-4 ">
                  <span className="text-center inline-flex items-center gap-2">
                    <Upload />
                    Upload File
                  </span>
                  <div className="text-center">Maximum File Size: 1 MB</div>
                </div>
                <p className="text-xs mt-1 text-gray-600"></p>
                <input
                  type="file"
                  className="hidden"
                  value=""
                  name="documents"
                  // onChange={(e)=>handleFileChange(e)}
                />
              </label>
            </div>
  
            <div className=" p-5 min-h-max rounded-xl relative mt-2  ">
              <div className=" pb-4  text-dropdownText border-b-2 border-slate-200 space-y-2">
                <div className="flex ">
                  <div className="w-[75%]">
                    {" "}
                    <p>Sub Total</p>
                  </div>
                  <div className="w-full text-end">
                    {" "}
                    <p className="text-end">
                      {oneOrganization?.baseCurrency}{" "}
                      {debitNoteState.subTotal ? debitNoteState.subTotal : "0.00"}{" "}
                    </p>
                  </div>
                </div>
  
                <div className="flex ">
                  <div className="w-[75%]">
                    {" "}
                    <p> Total Quantity</p>
                  </div>
                  <div className="w-full text-end">
                    {" "}
                    <p className="text-end">
                      {debitNoteState.totalItem ? debitNoteState.totalItem : "0"}
                    </p>
                  </div>
                </div>
  
                <div>
                  {isInterState ? (
                    <div className="flex ">
                      <div className="w-[75%]">
                        {" "}
                        <p> IGST</p>
                      </div>
                      <div className="w-full text-end">
                        {" "}
                        <p className="text-end">
                          {oneOrganization.baseCurrency}{" "}
                          {debitNoteState.igst ? debitNoteState.igst : "0.00"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex ">
                        <div className="w-[75%]">
                          {" "}
                          <p> SGST</p>
                        </div>
                        <div className="w-full text-end">
                          {" "}
                          <p className="text-end">
                            {oneOrganization.baseCurrency}{" "}
                            {debitNoteState.sgst ? debitNoteState.sgst : "0.00"}
                          </p>
                        </div>
                      </div>
  
                      <div className="flex mt-2">
                        <div className="w-[75%]">
                          {" "}
                          <p> CGST</p>
                        </div>
                        <div className="w-full text-end">
                          {" "}
                          <p className="text-end">
                            {oneOrganization.baseCurrency}{" "}
                            {debitNoteState.cgst ? debitNoteState.cgst : "0.00"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
  
                {!isInterState && (
                  <div className="flex ">
                    <div className="w-[75%]">
                      {" "}
                      <p> Total Tax</p>
                    </div>
                    <div className="w-full text-end">
                      {" "}
                      <p className="text-end">
                        {" "}
                        {oneOrganization.baseCurrency}{" "}
                        {debitNoteState.totalTaxAmount}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex text-black mt-4">
                <div className="w-[75%] font-bold">
                  {" "}
                  <p>Total</p>
                </div>
                <div className="w-full text-end font-bold text-base">
                  {" "}
                  <p className="text-end">
                    {" "}
                    {oneOrganization.baseCurrency}{" "}
                    {debitNoteState.grandTotal
                      ? debitNoteState.grandTotal
                      : "0.00"}
                  </p>
                </div>
              </div>
  
            </div>
          </div>
      </div>
      </div>
      <div></div>
    </div>
      <div
        className=" flex bg-white p-4 rounded-b-2xl  sticky"
        style={{
          boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.23)",
        }}
      >
        <div className="flex gap-2 ml-auto">
        <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/purchase/debitNote")}
              >
                Cancel
              </Button>
              <Button variant="secondary" size="sm">
                <PrinterIcon  color="currentColor" />
                Print
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save & send
              </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default NewDebitNote;
