import { useEffect, useState } from "react";
import { endpoints } from "../../../Services/apiEdpoints";
import NewCustomer from "../../Customer/NewCustomer"
import useApi from "../../../Hooks/useApi";
import defaultCustomerImage from "../../../assets/Images/Rectangle 5558.png";
import Search from "../../../Components/Search";
import Input from "../../../Components/Form/Input";

type Props = {}

function CustomerTab({ }: Props) {
  const [customerData, setCustomerData] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { request: AllCustomers } = useApi("get", 5002);
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchAllCustomers = async () => {
    try {
      const url = `${endpoints.GET_ALL_CUSTOMER}`;
      const { response, error } = await AllCustomers(url);

      if (!error && response) {
        const customers = response.data.filter(
          (customer: { status?: string }) => customer.status !== "Inactive"
        );

        setCustomerData(customers);
        if (customers.length > 0) {
          setSelectedCustomer(customers[0]);
        }
      } else {
        console.log(error, "all customers error");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const filteredCustomers = customerData.filter(
    (customer: any) =>
      customer.customerDisplayName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      customer.mobile?.toString().includes(searchValue)
  );

  useEffect(() => {
    fetchAllCustomers();
  }, []);
  return (
    <div className="bg-white  p-6 rounded-2xl">
      <div className="flex justify-between items-center">
        <p className="text-heading font-bold text-sm">Select Customer</p>
        <NewCustomer page="add" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="w-[50%] mt-3">
          <Search
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            placeholder="Search Customer by Name, Phone"
          />
        </div>
        <div className="">
          <label className="block text-xs text-[#4b4f63]">
            Order Date
            <input
              name="orderDate"
              id="orderDate"
              type="date"
              className="border-inputBorder w-full text-xs border rounded-[36px]  outline-none  p-2 h-9 mt-1 "
            />
          </label>
        </div>
        <div className="">
          <p className="mb-2 text-xs  text-[#4b4f63]">Order ID</p>
          <Input
            name="accountName"
            placeholder="Enter Order ID"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="w-[60%]  pr-4 overflow-y-scroll max-h-[500px] hide-scrollbar grid grid-cols-4 gap-4">
          {filteredCustomers.map((customer: any) => (
            <div
              key={customer.id}
              className={` rounded-lg p-4 flex flex-col h-32 items-center justify-center cursor-pointer ${selectedCustomer?._id === customer._id
                ? "border-2 border-[#B47300] bg-[#F7ECD9]"
                : "bg-[#F5F2EE]"
                }`}
              onClick={() => setSelectedCustomer(customer)}
            >
              <img
                src={customer.customerProfile || defaultCustomerImage}
                className="w-14 h-14 rounded-full mb-2"
                alt="Customer"
              />
              <p className="text-heading font-bold text-xs">
                {customer.customerDisplayName}
              </p>
              <p className="text-[#495160] text-[10px]">{customer.mobile}</p>
            </div>
          ))}
        </div>

        {/* Right section - Selected customer details */}
        <div className="w-[40%] bg-[#F5F8FC] rounded-lg">
          {selectedCustomer && (
            <>
              <div className=" rounded-[10px] p-5">
                <p className="text-heading text-xs font-bold">Customer Info</p>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[#495160] text-xs ">Customer Name</p>
                      <p className="text-heading text-sm font-semibold">{selectedCustomer?.customerDisplayName}</p>
                    </div>
                    <div>
                      <img src={selectedCustomer?.customerProfile || defaultCustomerImage} className="w-10 h-10 rounded-full" alt="" />
                    </div>
                  </div>
                  <p className="text-[#495160] text-xs  mt-3">Address</p>
                  <p className="text-heading text-sm font-semibold">
                    {selectedCustomer?.billingAddressLine1 || ""}{""}
                    {selectedCustomer?.billingAddressLine2 || ""}{" "}
                    {selectedCustomer?.billingCity || ""}{" "}
                    {selectedCustomer?.billingCountry || ""}{" "}
                    {selectedCustomer?.billingState || ""}{" "}
                    {selectedCustomer?.billingPinCode || ""}
                  </p>
                  <div className="flex items-center justify-between me-20">
                    <p className="text-[#495160] text-xs  mt-3">Contact
                      <p className="text-heading text-sm font-semibold"> + {selectedCustomer?.mobile || ""}</p></p>
                    <p className="text-[#495160] text-xs  mt-3">Email
                      <p className="text-heading text-sm font-semibold">{selectedCustomer?.customerEmail || ""}</p></p>
                  </div>
                  <div className="flex items-center justify-between me-28">
                    <p className="text-[#495160] text-xs  mt-3">Total Invoices
                      <p className="text-heading text-sm font-semibold"> 0</p></p>
                    <p className="text-[#495160] text-xs mt-3">Total Revenue
                      <p className="text-heading text-sm font-semibold">₹ 0.00</p></p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerTab