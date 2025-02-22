import BackIcon from "../../../assets/icons/BackIcon";
import { useNavigate } from "react-router-dom";
import AddPlans from "./AddPlans";
import PriceCheck from "../../../assets/icons/PriceCheck";
import { useEffect, useState } from "react";
import { endpoints } from "../../../Services/apiEdpoints";
import useApi from "../../../Hooks/useApi";
type Props = {};

const MembershipPlans = ({}: Props) => {
  const navigate = useNavigate();

 
  const [allMemberships, setAllMembership] = useState([]);
  const { request: getAll } = useApi("get", 5003);
 
  const fetchData = async () => {
    try {
      const { response, error } = await getAll(
        endpoints.GET_ALL_MEMBERSHIP_PLANS
      );
      if (!error && response) setAllMembership(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(allMemberships);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between gap-4">
        <button onClick={() => navigate("/itemhub")}>
          <BackIcon />
        </button>
        <div>
          <h1 className="text-base font-bold text-heading">Membership Plan </h1>
          <p className="text-[#495160] mt-2 text-xs">
            Add and manage your styles and parameters of services
          </p>
        </div>
        <div className=" ml-auto">
          <AddPlans />
        </div>
      </div>
    <div className="grid grid-cols-3 gap-5 mt-4">
        {allMemberships?.map((plans:any) => (
        <div className="min-w-[410px] mx-auto bg-white text-xs shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col">
        <div className="flex-grow">
          <h2 className={`text-sm font-semibold ${plans.planType === "Currency" ? "text-green-700" : "text-[#935800]"}`}>
            {plans.planName}
          </h2>
      
          <div className="mt-3 text-gray-600 flex gap-4">
            <div>
              <p>Plan Type</p>
              <p className="font-bold mt-1 text-text_fourthiry">{plans.planType === "Currency" ? "Count" : "Discount"}</p>
            </div>
            <div>
              <p>Duration</p>
              <p className="font-bold mt-1 text-text_fourthiry">{plans.duration} Days</p>
            </div>
          </div>
      
          <p className="mt-4 text-xs text-gray-500 pb-3 border-b border-dashed">
            {plans.description}
          </p>
      
          <div className="mt-4 border-b border-dashed text-text pb-3">
            <div className="flex text-text_tertiary">
              <p>Services</p>
              <div className="flex ml-auto">
                {plans.planType === "Currency" && <p>Count</p>}
              </div>
            </div>
      
            {plans.services.map((service: any, index: number) => (
              <div key={index} className="flex justify-between items-center text-text_primary font-bold py-2">
                <div className="flex items-center justify-center gap-2">
                  <PriceCheck />
                  <span>{service.serviceName}</span>
                </div>
                {plans.planType === "Currency" && <span>{service.count}</span>}
              </div>
            ))}
          </div>
      
          <table className="w-full border-collapse border-b border-dashed my-4 pb-2">
            <thead>
              <tr className="text-xs text-text_tertiary pb-2">
                <th className="text-left font-normal">Service</th>
                <th className="text-right font-normal">Unit Price</th>
                {plans.planType === "Currency" && <th className="text-right font-normal">Subtotal</th>}
              </tr>
            </thead>
            <tbody>
              {plans.services.map((service: any, index: number) => (
                <tr key={index} className="text-gray-700 font-bold">
                  <td className="py-2">{service.serviceName}</td>
                  <td className="py-2 text-right">₹{service.price.toFixed(2)}</td>
                  {plans.planType === "Currency" && (
                    <td className="py-2 text-right">₹{(Number(service.count) * Number(service.price)).toFixed(2)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
      
          <div className="text-text_primary text-end py-4">
            {plans.planType === "Percentage" && (
              <>
                <p>Discount</p>
                <p className="font-bold">{plans.discount}%</p>
              </>
            )}
          </div>
        </div>
      
        <div
          className={ ` bottom-0 left-0 min-w-[410px] p-4 -m-6 mt-4 flex justify-between text-text_primary 
          ${plans.planType === "Currency" ? "bg-[#e5eeed]" : "bg-[#f7ecda]"}`}
        >
          <div className="h-12 w-32 p-2">
            <p>Total Service Price</p>
            <p className="font-semibold">₹{plans?.actualRate}</p>
          </div>
          <div
            className={`h-12 rounded-lg w-32 text-white text-end bg-gradient-to-b p-2 
            ${plans.planType === "Currency" ? "from-[#004D4D] to-[#0CA65B]" : "from-[#94671a] to-[#ca8300]"}`}
          >
            <p>Top Selling Price</p>
            <p className="font-semibold">{plans?.sellingPrice}</p>
          </div>
        </div>
      </div>
      
        ))}
    </div>
    </div>
  );
};

export default MembershipPlans;
