import { useEffect, useRef, useState } from "react";
import ItemTable from "../CommonComponents/ItemTable";
import ViewMore from "../CommonComponents/ViewMore";
import Upload from "../../../assets/icons/Upload";
import Button from "../../../Components/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ChevronLeft from "../../../assets/icons/ChevronLeft";
import AddSupplierModal from "../../Supplier/AddSupplierModal";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import { Bill } from "./Bill";
import toast from "react-hot-toast";
import CheveronDown from "../../../assets/icons/CheveronDown";
import SearchBar from "../../../Components/SearchBar";

type Props = { page?: string };

const NewBill = ({ page }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [supplierData, setSupplierData] = useState<[]>([]);
  const [selecteSupplier, setSelecetdSupplier] = useState<[] | any>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [placeOfSupplyList, setPlaceOfSupplyList] = useState<any | []>([]);
  const [destinationList, setDestinationList] = useState<any | []>([]);
  const [countryData, setcountryData] = useState<any | any>([]);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [allAccounts, setAllAccounts] = useState<any>([]);
  const [lastBillPrefix, setLastBillPrefix] = useState<any>(null);
  const [errors, setErrors] = useState({
    // billNumber: false,
    dueDate: false,
    billDate: false,
    supplierId: false,
    sourceOfSupply: false,
    destinationOfSupply: false,
  });

  const { request: AllSuppliers } = useApi("get", 5009);
  const { request: getOneOrganization } = useApi("get", 5004);
  const { request: getCountries } = useApi("get", 5004);
  const { request: newBillApi } = useApi("post", 5005);
  const { request: getOneBill } = useApi("get", 5005);
  const { request: getAccounts } = useApi("get", 5001);
  const { request: getPrefix } = useApi("get", 5005);
  const { request: getEditBill } = useApi("get", 5005);
  const { request: updateBill } = useApi("put", 5005);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const billid = queryParams.get("id");

  const [bill, setBill] = useState<Bill>({
    supplierId: "",
    supplierDisplayName: "",
    billNumber: "",
    supplierInvoiceNum: "",
    sourceOfSupply: "",
    destinationOfSupply: "",
    taxMode: "",
    orderNumber: "",
    purchaseOrderDate: new Date().toISOString().slice(0, 10),
    expectedShipmentDate: new Date().toISOString().slice(0, 10),
    paymentTerms: "Pay Now",
    paymentMode: "Cash",
    PaidThrough: "",
    billDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
    items: [
      {
        itemId: "",
        itemName: "",
        itemQuantity: "",
        itemCostPrice: "",
        itemDiscount: "",
        itemDiscountType: "percentage",
        itemTax: "",
        itemSgst: "",
        itemCgst: "",
        itemIgst: "",
        itemVat: "",
        itemSgstAmount: "",
        itemCgstAmount: "",
        taxPreference: "",
        purchaseAccountId: "",
      },
    ],
    otherExpenseAccountId: "",
    otherExpenseAmount: "",
    otherExpenseReason: "",
    vehicleNo: "",
    freightAccountId: "",
    freightAmount: "",
    addNotes: "",
    termsAndConditions: "",
    attachFiles: "",
    subTotal: "",
    totalItem: "",
    sgst: "",
    cgst: "",
    igst: "",
    transactionDiscountType: "percentage",
    transactionDiscount: "",
    transactionDiscountAmount: "",
    totalTaxAmount: "",
    itemTotalDiscount: "",
    roundOffAmount: "",
    paidStatus: "",
    shipmentPreference: "",
    grandTotal: "",
    balanceAmount: "",
    paidAmount: "",
    paidAccountId: "",
    purchaseOrderId: "",
  });

  const toggleDropdown = (key: string | null) => {
    setOpenDropdownIndex(key === openDropdownIndex ? null : key);
    const supplierUrl = `${endpoints.GET_ALL_SUPPLIER}`;
    fetchData(supplierUrl, setSupplierData, AllSuppliers);
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
        if (url.includes(endpoints.GET_ONE_SALES_ORDER)) {
          // Correct the typo and ensure proper parsing
          const grandTotal = parseFloat(response.data.grandTotal) || 0;
          const transactionDiscountAmount =
            parseFloat(response.data.transactionDiscountAmount) || 0; // Fixed the typo here

          setBill((prevData: any) => ({
            ...prevData,
            ...response.data,
            grandTotal: grandTotal,
            transactionDiscountAmount: transactionDiscountAmount,
          }));
        } else {
          setData(response.data);
        }
      } else {
        console.error("Error in response or no data received:", error);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleplaceofSupply = () => {
    if (oneOrganization.organizationCountry) {
      const country = countryData.find(
        (c: any) =>
          c.name.toLowerCase() ===
          oneOrganization.organizationCountry.toLowerCase()
      );
      // console.log(country, "country");
      if (oneOrganization) {
        setBill((preData: any) => ({
          ...preData,
          destinationOfSupply: oneOrganization.state,
        }));
      }
      if (country) {
        const states = country.states;
        // console.log(states);

        setPlaceOfSupplyList(states);
      } else {
        console.log("Country not found");
      }
    } else {
      console.log("No country selected");
    }
  };
  const handleDestination = () => {
    if (selecteSupplier.billingCountry) {
      const country = countryData.find(
        (c: any) =>
          c.name.toLowerCase() === selecteSupplier.billingCountry.toLowerCase()
      );
      if (selecteSupplier) {
        setBill((preData: any) => ({
          ...preData,
          sourceOfSupply: selecteSupplier.billingState,
          supplierDisplayName: selecteSupplier.supplierDisplayName,
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

  const toastShown = useRef(false);

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

  const filteredSupplier = filterByDisplayName(
    supplierData,
    "supplierDisplayName",
    searchValue
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "dueDate") {
      const selectedDueDate = new Date(value);
      const billDate = new Date(bill.billDate);

      if (selectedDueDate < billDate) {
        toast.error("Due Date cannot be before the Bill Date.");
        return;
      }
    }

    if (name === "paidAmount") {
      let paidAmount = parseFloat(value) || "";
      const grandTotal = Number(bill.grandTotal) || "";

      if (paidAmount > grandTotal) {
        if (!toastShown.current) {
          toast.error("Paid Amount cannot exceed Grand Total.");
          toastShown.current = true;
        }
        paidAmount = grandTotal;
      } else {
        // Reset the flag when the value is within the valid range
        toastShown.current = false;
      }

      setBill((prevState: any) => ({
        ...prevState,
        paidAmount,
      }));
      return;
    }

    if (name === "transactionDiscount") {
      let discountValue = parseFloat(value) || 0;
      const totalAmount = Number(bill.subTotal) || 0;

      if (bill.transactionDiscountType === "percentage") {
        if (discountValue > 100) {
          discountValue = 100;
          toast.error("Discount cannot exceed 100%");
        }
      } else {
        if (discountValue > totalAmount) {
          discountValue = totalAmount;
          toast.error("Discount cannot exceed the subtotal amount");
        }
      }

      setBill((prevState: any) => ({
        ...prevState,
        [name]: discountValue,
      }));
      return;
    }

    if (name === "purchaseOrderDate" || name === "expectedShipmentDate") {
      setBill((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));

      if (
        name === "expectedShipmentDate" &&
        bill.purchaseOrderDate &&
        new Date(value) < new Date(bill.purchaseOrderDate)
      ) {
        toast.error(
          "Expected Shipment Date cannot be earlier than Purchase Order Date."
        );
        setBill((prevState: any) => ({
          ...prevState,
          expectedShipmentDate: "",
        }));
      }
      return;
    }

    setBill((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getLastDayOfMonth = (date: any, monthsToAdd = 0) => {
    const year = date.getFullYear();
    const month = date.getMonth() + monthsToAdd + 1;
    return new Date(year, month, 1);
  };

  useEffect(() => {
    if (bill.billDate) {
      const billDate = new Date(bill.billDate);
      let dueDate = new Date(billDate);

      switch (bill.paymentTerms) {
        case "Net 15":
        case "Net 30":
        case "Net 45":
        case "Net 60":
          const daysToAdd = parseInt(bill.paymentTerms.split(" ")[1], 10);
          dueDate.setDate(billDate.getDate() + daysToAdd);
          break;
        case "End of Next Month":
          dueDate = getLastDayOfMonth(billDate, 1);
          break;
        case "End of This Month":
          dueDate = getLastDayOfMonth(billDate);
          break;
        case "Pay Now":
        case "due on receipt":
          dueDate = billDate;
          break;
      }

      setBill((prevState) => ({
        ...prevState,
        dueDate: dueDate.toISOString().split("T")[0],
      }));
    }
  }, [bill.paymentTerms, bill.billDate]);

  useEffect(() => {
    if (
      bill.paymentTerms === "due on receipt" &&
      bill.dueDate !== bill.billDate
    ) {
      setBill((prevState) => ({
        ...prevState,
        paymentTerms: "Custom",
      }));
    }
  }, [bill.dueDate, bill.paymentTerms, bill.billDate]);

  const calculateTotalAmount = () => {
    const {
      roundOffAmount = 0,
      otherExpenseAmount = 0,
      freightAmount = 0,
      itemTotalDiscount = 0,
      totalTaxAmount = 0,
      subTotal = 0,
    } = bill;

    const totalAmount =
      Number(subTotal) +
      Number(otherExpenseAmount) +
      Number(totalTaxAmount) +
      Number(freightAmount) -
      (Number(itemTotalDiscount) + Number(roundOffAmount));

    return totalAmount.toFixed(2);
  };

  useEffect(() => {
    const { grandTotal, paidAmount } = bill;

    const numericGrandTotal = Number(grandTotal) || 0;
    const numericPaidAmount = Number(paidAmount) || 0;

    let balanceAmount;

    balanceAmount =
      Math.round((numericGrandTotal - numericPaidAmount) * 100) / 100;
    console.log(balanceAmount, "balanceAmount");

    setBill((prevState: any) => ({
      ...prevState,
      balanceAmount: balanceAmount,
    }));
  }, [bill.grandTotal, bill.paidAmount, bill.paymentTerms]);


  const handleSave = async () => {
    const newErrors = { ...errors };
    const errorFields = [];

    // if (bill.billNumber.trim() === "") {
    //   newErrors.billNumber = true;
    //   errorFields.push("Bill Number");
    // } else {
    //   newErrors.billNumber = false;
    // }

    if (bill.supplierId.trim() === "") {
      newErrors.supplierId = true;
      errorFields.push("Supplier ID");
    } else {
      newErrors.supplierId = false;
    }

    if (bill.destinationOfSupply.trim() === "") {
      newErrors.destinationOfSupply = true;
      errorFields.push("Destination of Supply");
    } else {
      newErrors.destinationOfSupply = false;
    }

    if (bill.sourceOfSupply.trim() === "") {
      newErrors.sourceOfSupply = true;
      errorFields.push("Source of Supply");
    } else {
      newErrors.sourceOfSupply = false;
    }

    if (bill.billDate.trim() === "") {
      newErrors.billDate = true;
      errorFields.push("Bill Date");
    } else {
      newErrors.billDate = false;
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      toast.error(`Please fill the required fields: ${errorFields.join(", ")}`);
      return;
    }

    try {
      let url;
      let api;
      if (page === "edit") {
        url = `${endpoints.EDIT_BILL}/${id}`;
        api = updateBill;
      } else {
        url = `${endpoints.ADD_BILL}`;
        api = newBillApi;
      }
      const { response, error } = await api(url, bill);
      if (!error && response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/purchase/bills");
        }, 1000);
      } else {
        toast.error(error?.response.data.message);
      }
    } catch (error) {
      console.error("Save error", error);
    }
  };

  useEffect(() => {
    const newGrandTotal = calculateTotalAmount();

    const {
      transactionDiscountType,
      transactionDiscount = "",
      transactionDiscountAmount = 0,
    } = bill;

    const transactionDiscountValueAMT =
      transactionDiscountType === "percentage"
        ? (Number(transactionDiscount) / 100) * Number(newGrandTotal)
        : Number(transactionDiscount);

    const roundedDiscountValue =
      Math.round(transactionDiscountValueAMT * 100) / 100;

    const updatedGrandTotal =
      Math.round((Number(newGrandTotal) - roundedDiscountValue) * 100) / 100;

    if (
      transactionDiscountAmount !== roundedDiscountValue ||
      bill.grandTotal !== updatedGrandTotal
    ) {
      setBill((prevState: any) => ({
        ...prevState,
        transactionDiscountAmount: roundedDiscountValue,
        grandTotal: updatedGrandTotal,
      }));
    }
  }, [
    bill.transactionDiscount,
    bill.transactionDiscountType,
    bill.subTotal,
    bill.otherExpenseAmount,
    bill.totalTaxAmount,
    bill.freightAmount,
    bill.itemTotalDiscount,
    bill.roundOffAmount,
  ]);

  useEffect(() => {
    if (bill?.destinationOfSupply == "") {
      setIsInterState(false);
    } else {
      if (bill?.sourceOfSupply !== bill?.destinationOfSupply) {
        setIsInterState(true);
      } else {
        setIsInterState(false);
      }
    }
  }, [bill?.sourceOfSupply, bill?.destinationOfSupply]);

  const getBills = async () => {
    try {
      const url = `${endpoints.GET_ONE_PURCHASE_ORDER}/${billid}`;
      const { response, error } = await getOneBill(url);

      if (!error && response) {

        setBill((prevData) => ({
          ...prevData,
          ...response.data,
          orderNumber: response.data.purchaseOrder,
          purchaseOrderId: response.data._id,
        }));

        const matchingSupplier = supplierData.find(
          (sup: any) => sup._id === response.data.supplierId
        );
        if (matchingSupplier) {
          setSelecetdSupplier(matchingSupplier);
        }
      }
    } catch (error) {
      console.log("Error in fetching bill", error);
    }
  };

  useEffect(() => {
    const supplierUrl = `${endpoints.GET_ALL_SUPPLIER}`;
    const organizationUrl = `${endpoints.GET_ONE_ORGANIZATION}`;
    const allAccountsUrl = `${endpoints.Get_ALL_Acounts}`;
    const getPrefixUrl = `${endpoints.GET_LAST_BILL_PREFIX}`;

    fetchData(supplierUrl, setSupplierData, AllSuppliers);
    fetchData(organizationUrl, setOneOrganization, getOneOrganization);
    fetchData(allAccountsUrl, setAllAccounts, getAccounts);
    fetchData(getPrefixUrl, setLastBillPrefix, getPrefix);
  }, []);

  useEffect(() => {
    getBills();
    handleDestination();
    handleplaceofSupply();
    fetchCountries();
  }, [oneOrganization, selecteSupplier]);

  useEffect(() => {
    if (lastBillPrefix && page !== "edit") {
      setBill((preData) => ({
        ...preData,
        billNumber: lastBillPrefix,
      }));
    }
  }, [lastBillPrefix]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const supplierUrl = `${endpoints.GET_ALL_SUPPLIER}`;
      const oneBillUrl = `${endpoints.GET_A_BILL}/${id}`;

      await fetchData(supplierUrl, setSupplierData, AllSuppliers);

      if (page === "edit") {
        await fetchData(oneBillUrl, setBill, getEditBill);
      }
    };

    fetchInitialData();
  }, [page, id]);

  useEffect(() => {
    setBill((prevState: any) => ({
      ...prevState,
      totalDiscount:
        (parseFloat(prevState.totalItemDiscount) || 0) +
        (parseFloat(prevState.transactionDiscountAmount) || 0),
    }));
  }, [bill.transactionDiscountAmount]);

  useEffect(() => {
    if (bill && supplierData) {
      const { supplierId } = bill;
      if (supplierId) {
        const supplier = supplierData.find(
          (supplier: any) => supplier._id === supplierId
        );
        if (supplier) {
          setSelecetdSupplier(supplier);
        }
      }
    }
  }, [bill, supplierData]);

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

  useEffect(() => {
    if (bill.paymentTerms !== "Cash") {
      setBill((prevData) => ({
        ...prevData,
        paidAmount: "",
        paidAccountId: "",
      }));
    }
  }, [bill.paymentTerms]);

  return (
   <div>
      <div className=" text-xs ">
        <div className="flex gap-5">
          <Link to={"/purchase/bills"}>
            <div className="flex justify-center items-center h-11 w-11 bg-[white] rounded-full">
              <ChevronLeft />
            </div>
          </Link>
          <div className="flex justify-center items-center">
            <h4 className="font-bold text-lg text-textColor ">
              {page === "edit" ? "Edit Bill " : "Create New Bill"}
            </h4>
          </div>
        </div>
  
        <div className="grid grid-cols-12 gap-4 mt-3 h-[85vh] overflow-y-scroll hide-scrollbar">
          <div className="bg-[white] p-5 min-h-max rounded-xl relative col-span-9">
            <div className="grid grid-cols-3 gap-4 mt-5 space-y-1">
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
                      placeholder="Serach Supplier"
                    />
                    {filteredSupplier.length > 0 ? (
                      filteredSupplier.map((supplier: any) => (
                        <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-lightPink cursor-pointer hover:bg-lightRose">
                          <div className="col-span-2 flex items-center justify-center">
                            <img
                              className="rounded-full "
                              src={
                                supplier.supplierProfile
                                  ? supplier.supplierProfile
                                  : "https://i.postimg.cc/sDnbrRWP/avatar-3814049-1280.webp"
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className="col-span-10 flex cursor-pointer "
                            onClick={() => {
                              setBill((prevState: any) => ({
                                ...prevState,
                                supplierId: supplier._id,
                              }));
                              setOpenDropdownIndex(null);
                              setSelecetdSupplier(supplier);
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
                        <p className="text-[red] text-xs py-4">
                          Supplier Not Found!
                        </p>
                      </div>
                    )}
                    <div className="hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg py-4">
                      <AddSupplierModal
                        page="purchase"
                        supplierData={undefined}
                        fetchAllSuppliers={function (): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
  
              <div className="relative w-full">
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Invoice Number <span className="text-[#bd2e2e] -ms-0.5">*</span>
                  <input
                    id="supplierInvoiceNum"
                    onChange={handleChange}
                    name="supplierInvoiceNum"
                    value={bill.supplierInvoiceNum}
                    placeholder="Enter Invoice Number"
                    className=" block  appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                  />
                </label>
              </div>
              <div className="relative w-full">
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Bill Number <span className="text-[#bd2e2e] -ms-0.5">*</span>
                  <input
                    disabled
                    id="billNumber"
                    onChange={handleChange}
                    name="billNumber"
                    value={bill.billNumber}
                    placeholder="Enter Bill Number"
                    className=" block  appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                  />
                </label>
              </div>
  
              {bill.supplierId && (
                <>
                  <div>
                    <label className="block text-xs mb-1 text-[#4b4f63]">
                      Destination Of Supply
                      <span className="text-[#bd2e2e] ">*</span>
                    </label>
                    <div className="relative w-full">
                      <select
                        onChange={handleChange}
                        name="destinationOfSupply"
                        value={bill.destinationOfSupply}
                        className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option value="">Select Source Of Supply</option>
                        {placeOfSupplyList &&
                          placeOfSupplyList.map((item: any, index: number) => (
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
                      Source of Supply<span className="text-[#bd2e2e] ">*</span>
                    </label>
                    <div className="relative w-full">
                      <select
                        onChange={handleChange}
                        name="sourceOfSupply"
                        value={bill.sourceOfSupply}
                        className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option value="">Select Source Of Supply</option>
                        {destinationList &&
                          destinationList.map((item: any, index: number) => (
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
                <label className="block text-xs  text-[#4b4f63]">
                  Order Number
                  <input
                    name="orderNumber"
                    id="orderNumber"
                    value={bill.orderNumber}
                    onChange={handleChange}
                    placeholder="Enter Order Number"
                    className="border-inputBorder w-full text-xs border rounded-[36px]  text-dropdownText  mt-1 p-2 h-9 "
                  />
                </label>
              </div>
  
              <div>
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Purchase Order Date
                </label>
  
                <input
                  type="date"
                  value={bill.purchaseOrderDate}
                  name="purchaseOrderDate"
                  onChange={handleChange}
                  className="border-inputBorder w-full text-xs border rounded-[36px]  p-2 h-9  text-zinc-400"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Expected Shipment Date
                </label>
                <input
                  type="date"
                  value={bill.expectedShipmentDate}
                  name="expectedShipmentDate"
                  onChange={handleChange}
                  className="border-inputBorder w-full text-xs border rounded-[36px]  p-2 h-9  text-zinc-400"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Shipment Preference
                </label>
                <div className="relative w-full">
                  <select
                    value={bill.shipmentPreference}
                    name="shipmentPreference"
                    onChange={handleChange}
                    className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      Select Shipment Preference
                    </option>
                    <option value="Road" className="text-gray">
                      Road
                    </option>
                    <option value="Rail" className="text-gray">
                      Rail
                    </option>
                    <option value="Air" className="text-gray">
                      Air
                    </option>{" "}
                    <option value="Sea" className="text-gray">
                      Sea
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>
              </div>
  
              <div className=" w-full">
                <label className="block text-xs text-[#4b4f63]">
                  Bill Date <span className="text-[#bd2e2e] -ms-0.5">*</span>
                  <input
                    name="billDate"
                    id="billDate"
                    type="date"
                    value={bill.billDate}
                    onChange={handleChange}
                    className="border-inputBorder w-full text-xs border rounded-[36px]  text-dropdownText p-2 h-9 mt-1"
                  />
                </label>
              </div>
              <div>
                <div>
                  <label className="block text-xs text-[#4b4f63]">
                    Due Date <span className="text-[#bd2e2e] -ms-0.5">*</span>
                    <input
                      name="dueDate"
                      id="dueDate"
                      value={bill.dueDate}
                      onChange={handleChange}
                      type="date"
                      disabled={
                        bill.paymentTerms !== "due on receipt" &&
                        bill.paymentTerms !== "Custom"
                      }
                      className="border-inputBorder w-full text-xs border rounded-[36px]  text-dropdownText  p-2 h-9 mt-1 "
                    />
                  </label>
                </div>
              </div>
  
              <div>
                <label className="block text-xs text-[#4b4f63]">
                  Payment Terms
                </label>
                <div className="relative w-full mt-1">
                  <select
                    value={bill.paymentTerms}
                    onChange={handleChange}
                    name="paymentTerms"
                    className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      Select Payment Terms
                    </option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Pay Now">Pay Now</option>
                    <option value="due on receipt">Due on Receipt</option>
                    <option value="End of This Month">End of This Month</option>
                    <option value="End of Next Month">End of Next Month</option>
                    <option value="Custom">Custom</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>
              </div>
  
              <div className=" w-full">
                <label className="block text-xs  text-[#4b4f63]">
                  Payment Mode{" "}
                </label>
                <div className="relative w-full">
                  <select
                    value={bill.paymentMode}
                    name="paymentMode"
                    onChange={handleChange}
                    className="block appearance-none mt-1 w-full h-9  text-zinc-400 bg-white border border-inputBorder text-xs  pl-2 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      Select Payment Mode
                    </option>
                    <option value="Cash" className="text-gray">
                      Cash
                    </option>
                    <option value="Credit" className="text-gray">
                      Credit
                    </option>{" "}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>
  
            <div className="mt-9">
              <p className="font-bold text-base">Add Item</p>
              <ItemTable
                state={bill}
                setState={setBill}
                isInterState={isInterState}
                oneOrganization={oneOrganization}
              />
            </div>
  
            <ViewMore
              page="bill"
              state={bill}
              setState={setBill}
              allAccounts={allAccounts}
            />
  
            <br />
          </div>
          <div className="col-span-3">
            <div className="bg-[white] p-5 min-h-max rounded-xl relative  mt-0">
              <div className="mt-5">
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Add Note
                  <input
                    name="addNotes"
                    id="addNotes"
                    value={bill.addNotes}
                    onChange={handleChange}
                    placeholder="Note"
                    className="border-inputBorder w-full text-xs border rounded-[36px]   p-2 h-[57px] mt-2 "
                  />
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Terms & Conditions
                  <input
                    name="termsAndConditions"
                    id="termsAndConditions"
                    value={bill.termsAndConditions}
                    onChange={handleChange}
                    placeholder="Add Terms & Conditions of your business"
                    className="border-inputBorder w-full text-xs border rounded-[36px]  p-2 h-[57px] mt-2"
                  />
                </label>
              </div>
              <div className="text-xs mt-3">
                <label className="block text-xs mb-1 text-[#4b4f63]">
                  Attach files to the Debit Notes
                  <div className="border-inputBorder text-textColor border-[#c78000] w-full border-dashed border p-2 rounded-lg  flex flex-col gap-2 justify-center items-center bg-white mb-4 mt-2">
                    <span className="text-center inline-flex items-center gap-2">
                      <Upload color="#c78000" />
                      Upload File <span className="text-[#c78000]">browse</span>
                    </span>
                    <div className="text-center">Support JPG, PNG</div>
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
                      {bill.subTotal ? bill.subTotal : "0.00"}{" "}
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
                      {bill.totalItem ? bill.totalItem : "0"}
                    </p>
                  </div>
                </div>
  
                <div className="flex ">
                  <div className="w-[75%]">
                    <p> Total Item Discount</p>
                  </div>
                  <div className="w-full text-end">
                    <p className="text-end">
                      {oneOrganization.baseCurrency}{" "}
                      {bill.itemTotalDiscount ? bill.itemTotalDiscount : "0.00"}
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
                          {bill.igst ? bill.igst : "0.00"}
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
                            {bill.sgst ? bill.sgst : "0.00"}
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
                            {bill.cgst ? bill.cgst : "0.00"}
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
                        {oneOrganization.baseCurrency} {bill.totalTaxAmount}
                      </p>
                    </div>
                  </div>
                )}
  
                <div className="flex ">
                  <div className="w-[75%]">
                    {" "}
                    <p>Other Expense</p>
                  </div>
                  <div className="w-full text-end">
                    {" "}
                    <p className="text-end">
                      {oneOrganization?.baseCurrency}{" "}
                      {bill.otherExpenseAmount ? bill.otherExpenseAmount : "0.00"}
                    </p>
                  </div>
                </div>
                <div className="flex ">
                  <div className="w-[75%]">
                    {" "}
                    <p>Fright</p>
                  </div>
                  <div className="w-full text-end">
                    {" "}
                    <p className="text-end">
                      {oneOrganization?.baseCurrency}{" "}
                      {bill.freightAmount ? bill.freightAmount : "0.00"}
                    </p>
                  </div>
                </div>
  
                <div className="flex ">
                  <div className="w-[75%]">
                    {" "}
                    <p>Rount Off Amount</p>
                  </div>
                  <div className="w-full text-end">
                    {" "}
                    <p className="text-end">
                      {oneOrganization.baseCurrency}{" "}
                      {bill.roundOffAmount ? bill.roundOffAmount : "0.00"}
                    </p>
                  </div>
                </div>
                <div className="flex ">
                  <div className="w-[150%]">
                    {" "}
                    <p>Bill Discount</p>
                    <div className=""></div>
                  </div>
  
                  <div className=" ">
                    <div className="border border-inputBorder rounded-lg flex items-center justify-center p-1 gap-1">
                      <input
                        value={bill.transactionDiscount}
                        onChange={handleChange}
                        step="0.01"
                        name="transactionDiscount"
                        type="text"
                        placeholder="0"
                        className="w-[30px]  focus:outline-none text-center"
                      />
                      <select
                        className="text-xs   text-zinc-400 bg-white relative"
                        value={bill.transactionDiscountType}
                        onChange={handleChange}
                        name="transactionDiscountType"
                      >
                        <option value="percentage">%</option>
                        <option value="currency">
                          {oneOrganization.baseCurrency}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full text-end ">
                    {" "}
                    <p className="text-end">
                      <p className="text-end">
                        {oneOrganization.baseCurrency}{" "}
                        {bill.transactionDiscountAmount
                          ? bill.transactionDiscountAmount
                          : "0.00"}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex text-black my-4">
                <div className="w-[75%] font-bold">
                  {" "}
                  <p>Total Gross</p>
                </div>
                <div className="w-full text-end font-bold text-base">
                  {" "}
                  <p className="text-end">
                    {" "}
                    {oneOrganization.baseCurrency}{" "}
                    {bill.grandTotal ? bill.grandTotal : "0.00"}
                  </p>
                </div>
              </div>
  
              {bill.paymentMode === "Cash" && (
                <>
                  <div className=" items-center justify-center mb-2">
                    <label className=" text-xs mb-1 text-[#4b4f63] min-w-fit ">
                      Paid Through Account
                    </label>
                    <div className="relative w-full  ml-auto mt-1">
                      <select
                        onChange={handleChange}
                        value={bill.paidAccountId}
                        name="paidAccountId"
                        className="block appearance-none w-full  text-[#495160] bg-white border border-inputBorder text-xs h-[39px] pl-3 pr-8 rounded-[36px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                      >
                        <option value="" selected hidden disabled>
                          Select Account
                        </option>
                        {allAccounts
                          ?.filter(
                            (item: { accountSubhead: string }) =>
                              item.accountSubhead === "Bank" ||
                              item.accountSubhead === "Cash"
                          )
                          ?.map((item: { _id: string; accountName: string }) => (
                            <option key={item._id} value={item._id}>
                              {item.accountName}
                            </option>
                          ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <CheveronDown color="gray" />
                      </div>
                    </div>
                  </div>
                  <div className=" items-center justify-center">
                    <label
                      className=" text-xs mb-1 text-[#4b4f63] max-w-fit"
                      htmlFor="paidAmount"
                    >
                      Paid Amount
                    </label>
  
                    <div className="ml-auto">
                      <input
                        className="border-inputBorder w-full text-xs border rounded-[36px] mt-1 p-1.5 pl-2 h-9"
                        type="text"
                        placeholder="Enter paid amount"
                        name="paidAmount"
                        value={bill.paidAmount === 0 ? "" : bill.paidAmount}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (/^\d*\.?\d*$/.test(value)) {
                            handleChange(e);
                          }
                        }}
                      />
                    </div>
                  </div>
  
                  <div className=" flex mt-4 gap-4 items-center justify-end">
                    <p className="text-gray-500 text-sm">Balance</p>
                    <p className="text-lg font-bold">{oneOrganization.baseCurrency} {bill.balanceAmount?bill.balanceAmount:"0.00"}</p>
                  </div>
                </>
              )}
          
            </div>
          </div>
        </div>
     
      </div>   <div  className=" flex bg-white p-4 rounded-b-2xl justify-end gap-4  sticky"  style={{
            boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.23)",
          }}>
                {" "}
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button variant="secondary" size="sm">
                  <PrinterIcon color="currentColor" />
                  Print
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  Save & send
                </Button>{" "}
              </div>
   </div>
  );
};

export default NewBill;
