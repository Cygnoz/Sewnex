import BackIcon from "../../../assets/icons/BackIcon";
import { useNavigate } from "react-router-dom";
import AddPlans from "./AddPlans";
import PriceCheck from "../../../assets/icons/PriceCheck";

type Props = {};

const MembershipPlans = ({}: Props) => {
  const navigate = useNavigate();
  const services = [
    { name: "Full Sleeve Shirt Stitching", count: 4, price: 1000 },
    { name: "Formal Pant Stitching", count: 2, price: 1000 },
  ];

  const totalServicePrice = services.reduce(
    (sum, service) => sum + service.count * service.price,
    0
  );

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
      <div className="max-w-md mx-auto bg-white text-xs shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-sm font-semibold text-green-700">
          Perfect Fit Plan
        </h2>
        <div className="mt-3 text-gray-600 flex gap-4">
          <div>
            <p className="">Plan Type </p>
            <p className="font-bold mt-1 text-text_fourthiry">Count</p>
          </div>{" "}
          <div className="">
            <p className="">Duration</p>
            <p className="font-bold mt-1 text-text_fourthiry">3 Months</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500  pb-3 border-b border-dashed">
          This membership includes a limited number of uses for selected
          services over the plan duration.
        </p>
        <div className="mt-4 border-b border-dashed text-text pb-3">
          <div className="flex text-text_tertiary">
            <p className="">Services</p>
            <div className="flex ml-auto">
              <p className=" ">Count</p>
            </div>
          </div>{" "}
          {services.map((service, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-text_primary font-bold  py-2"
            >
              <div className="flex items-center justify-center gap-2">
                <PriceCheck />
                <span className=" ">{service.name}</span>
              </div>
              <span className=" ">{service.count}</span>
            </div>
          ))}
        </div>

        <table className="w-full border-collapse border-b border-dashed my-4 pb-2">
          <thead>
            <tr className="text-xs text-text_tertiary  pb-2">
              <th className="text-left font-normal">Service</th>
              <th className="text-right font-normal">Unit Price</th>
              <th className="text-right font-normal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="text-gray-700 font-bold">
                <td className="py-2">{service.name}</td>
                <td className="py-2 text-right">₹{service.price.toFixed(2)}</td>
                <td className="py-2 text-right">
                  ₹{(service.count * service.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-text_primary text-end py-4">
          <p>Discount</p>
          <p className="font-bold">20%</p>
        </div>

        <div className="mt-4 p-4 flex justify-between -m-6 text-text_primary bg-[#e5eeed]">
          <div className="h-12 w-32 p-2">
            <p>Total Service Price</p>
            <p className="font-semibold">₹{totalServicePrice.toFixed(2)}</p>
          </div>
          <div className="h-12 rounded-lg w-32 text-white text-end bg-gradient-to-b from-[#004D4D] to-[#0CA65B] p-2 ">
            <p className="">Top Selling Price</p>
            <p className="font-semibold">50000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
