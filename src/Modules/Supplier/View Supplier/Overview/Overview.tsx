import { ChangeEvent, useEffect, useState } from "react"
import Building from "../../../../assets/icons/Building"
import Mail from "../../../../assets/icons/Mail"
import Phone from "../../../../assets/icons/Phone"
import useApi from "../../../../Hooks/useApi"
import StatusHistory from "./StatusHistory"
import ViewMoreModal from "./View More/ViewMoreModal"
import { useOrganization } from "../../../../Context/OrganizationContext"
import { endpoints } from "../../../../Services/apiEdpoints"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

// type Props = {}

interface Status {
  status: any;
}

interface OverviewProps {
  supplier: any;
  statusData: Status;
  setStatusData: React.Dispatch<React.SetStateAction<Status>>;
}




function Overview({ supplier, statusData, setStatusData }: OverviewProps) {


  const { id } = useParams<{ id: string }>();
  const { request: updateSupplierStatus } = useApi("put", 5009);
  const { request: getSupplierHistory } = useApi("get", 5009);
  const [addressEdit, setAddressEdit] = useState<string>();
  const [supplierHis, setSupplierHis] = useState<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const { organization } = useOrganization();


  useEffect(() => {
    supplierHistory();
  }, []);

  const supplierHistory = async () => {
    try {
      const url = `${endpoints.GET_ONE_SUPPLIER_HISTORY}/${id}`;
      const apiResponse = await getSupplierHistory(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setSupplierHis(response.data);
        console.log(response);
      } else {
        console.error(
          "API Error:",
          error?.response?.data?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };

  const getCircleStyle = (title: string) => {
    switch (title) {
      case "Purchase Order":
        return { bgColor: "bg-[#820000]", text: "hi" };
      case "Contact Added":
        return { bgColor: "bg-[#97998E]", text: "tg" };
      case "Invoice Created":
        return { bgColor: "bg-[#B9AD9B]", text: "rss" };
      default:
        return { bgColor: "bg-[#820000]", text: "" }; // Default style
    }
  };

  

  const handleStatusSubmit = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setStatusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const url = `${endpoints.UPDATE_SUPPLIER_STATUS}/${id}`;
    try {
      const { response, error } = await updateSupplierStatus(url, {
        ...statusData,
        status: value, // Pass the updated status value here
      });
      if (!error && response) {
        toast.success(response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setStatusData({ ...statusData, status: supplier?.status });
  }, [supplier]);

  const formatDateTime = (dateString: any) => {
    if (!dateString) {
      return { date: "", time: "" };
    }

    const [datePart, timePart] = dateString.split(" ");
    const [hoursString, minutes] = timePart.split(":");

    let period = "AM";
    let hours = parseInt(hoursString);

    if (hours >= 12) {
      period = "PM";
      hours = hours > 12 ? hours - 12 : hours;
    } else if (hours === 0) {
      hours = 12;
    }

    const formattedTime = `${hours}:${minutes} ${period}`;

    return { date: datePart, time: formattedTime };
  };

  // const defaultImage = avatar;






  // const statuses = ["active", "inactive"];
  // const StatusChange = statuses.map((status) => ({ value: status, label: status }));
  return (
    <div>
      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-5 grid grid-cols-3 gap-5 rounded-lg bg-gradient-to-r from-[#F7ECD9] via-[#F7ECD9] to-[#B5F0D3]">
            <div className="bg-white rounded-lg w-full h-[140px] flex justify-center items-center">
              <p>Company Logo</p>
            </div>
            <div className="">
              <h1 className="text-[#495160] text-[16px] font-bold mb-1">
              {supplier?.supplierDisplayName || "John Doe"}
              </h1>
              <p className="flex gap-2 text-[#495160] text-[12px] font-normal py-1">
                <p className="">
                  <Mail />
                </p>
                {supplier?.supplierEmail || "email@example.com"}
              </p>
              <div className="flex gap-3 w-full">
                <p className="flex gap-1 text-[#495160] w-full text-[12px] font-normal py-1">
                  <span>
                    <Phone />
                  </span>
                  {supplier?.mobile || "+91 9876543210"}
                </p>
                <p className="flex gap-1 w-full text-[#495160] text-[12px] font-normal py-1">
                  <span>
                    <Building size={16} />
                  </span>
                  {supplier?.companyName || "Electro Tech Solution"}
                </p>
              </div>
            </div>
            <div className="ms-5">
              <div className="bg-white p-5 rounded-lg ">
                <p className="text-[#495160] text-[12px] font-semibold">
                  Opening Balance{""}
                </p>
                <p className="text-[#004D4D] text-[16px] font-bold pt-1">
                {organization?.baseCurrency}{" "}
                  {supplier?.creditOpeningBalance ??
                    supplier?.debitOpeningBalance ??
                    "0"}
                </p>
              </div>
              <div className="flex justify-between gap-1 pt-5">
                <div className="bg-[#EDFFF7] rounded-3xl flex gap-2 py-2 px-8 text-center">
                  <div className="w-2 mt-1.5  h-2 bg-[#178B53] rounded-full">
                  </div>
                  <p className="text-[#178B53] mt-0.5 text-[12px] font-medium">
                    Active
                  </p>
                </div>
                <select
                  className="px-5 py-2 text-sm font-medium  bg-white border text-[#0B9C56] border-[#0B9C56] rounded-3xl"

                  // value={statusData.status}
                  name="status"
                // onChange={handleStatusSubmit}
                >
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {/* <Select
                size="lg"
                  required
                  placeholder="Status"
                  // error={errors.organizationCountry?.message}
                  options={StatusChange}
                  // onChange={(value: string) => {
                  //   setValue("organizationCountry", value);
                  //   handleInputChange("organizationCountry");
                  // }}
                  // value={watch("organizationCountry")}
                /> */}
              </div>
            </div>
          </div>
          <div className="pt-3">
            <StatusHistory />
          </div>
        </div>
        <div className="">
          <div className="bg-[#FAF2E6] rounded-lg p-5">
            <h1 className="text-[14px] text-[#495160] font-bold">Billing Address</h1>
            <div className="mt-3 space-y-2 text-[12px]">
                {supplier?.billingCity ||
                supplier?.billingAddressStreet1 ||
                supplier?.billingAddressStreet2 ||
                supplier?.billingPinCode ||
                supplier?.billingPhone ||
                supplier?.billingState ||
                supplier?.billingCountry ? (
                  <>
                    {supplier?.billingCity && <p>{supplier.billingCity}</p>}
                    {supplier?.billingAddressStreet1 && (
                      <p>{supplier.billingAddressStreet1}</p>
                    )}
                    {supplier?.billingAddressStreet2 && (
                      <p>{supplier.billingAddressStreet2}</p>
                    )}
                    {supplier?.billingPinCode && (
                      <p>Pin: {supplier.billingPinCode}</p>
                    )}
                    {supplier?.billingPhone && (
                      <p>Phone: {supplier.billingPhone}</p>
                    )}
                    {supplier?.billingState && supplier?.billingCountry && (
                      <p>
                        {supplier.billingState} {supplier.billingCountry}
                      </p>
                    )}
                  </>
                ) : (
                  <p>No billing information available.</p>
                )}
              </div>
          </div>
          <div className="bg-[#FAF2E6] rounded-lg p-5 my-3">
            <h1 className="text-[14px] text-[#495160] font-bold">Shipping Address</h1>
            <div className="mt-3 space-y-2 text-[12px]">
                {supplier?.shippingCity ||
                supplier?.shippingAddressStreet1 ||
                supplier?.shippingAddressStreet2 ||
                supplier?.shippingPinCode ||
                supplier?.shippingPhone ||
                supplier?.shippingState ||
                supplier?.shippingCountry ? (
                  <>
                    {supplier?.shippingCity && <p>{supplier.shippingCity}</p>}
                    {supplier?.shippingAddressStreet1 && (
                      <p>{supplier.shippingAddressStreet1}</p>
                    )}
                    {supplier?.shippingAddressStreet2 && (
                      <p>{supplier.shippingAddressStreet2}</p>
                    )}
                    {supplier?.shippingPinCode && (
                      <p>Pin: {supplier.shippingPinCode}</p>
                    )}
                    {supplier?.shippingPhone && (
                      <p>Phone: {supplier.shippingPhone}</p>
                    )}
                    {supplier?.shippingState && supplier?.shippingCountry && (
                      <p>
                        {supplier.shippingState} {supplier.shippingCountry}
                      </p>
                    )}
                  </>
                ) : (
                  <p>No shipping information available.</p>
                )}
              </div>
          </div>
          <div className="bg-[#FAF2E6] rounded-lg p-5 ">
            <h1 className="text-[14px] text-[#495160] font-bold">Other Details</h1>
            <div className="grid grid-cols-2 pt-3">
              <div className="text-[#4B5C79] text-[12px] font-normal space-y-2">
                    <p className="">Customer Type </p>
                    <p className="">Default Currency</p>
                    <p className="">Payment Terms</p>
                    <p className="">Portal Language</p>
                    <p className="pt-1">
                    <ViewMoreModal/>
                    </p>
              </div>
              <div className="text-[#4B5C79] text-[12px] font-bold space-y-2">
                  <p className="">  {supplier?.customerType || "Business"}</p>
                  <p className="">{supplier?.currency || "INR"}</p>
                  <p className="">{supplier?.paymentTerms || "Due on Receipt"}</p>
                  <p className="">English</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview