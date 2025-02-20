import Address from "../../assets/icons/Address";
import AddressBook from "../../assets/icons/AddressBook";
import BuildingIcon from "../../assets/icons/BuildingIcon";
import Cake from "../../assets/icons/Cake";
import CreditCard from "../../assets/icons/CreditCard";
import FaceBook from "../../assets/icons/FaceBook";
import Insta from "../../assets/icons/Insta";
import Mail from "../../assets/icons/Mail";
import Phone from "../../assets/icons/Phone";
import Snap from "../../assets/icons/Snap";
import Twitter from "../../assets/icons/Twitter";
import UserRound from "../../assets/icons/UserRound";
import CustomerProfile from "../../assets/images/CustomerProfile.png";
import CustomerStatusHistory from "./CustomerStatusHistory";

type Props={customerData?:any}

const Overview = ({customerData}:Props) => {

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4 text-sm text-[#303F58]">
        {/* Profile Section */}
        <div className="bg-[#F9F9F9] rounded-[13px]  p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={
                  customerData.customerProfile
                    ? customerData.customerProfile
                    : CustomerProfile
                }
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full mr-3"
              />
              <div>
                <p className="font-bold text-[#075E33] text-[14px] mt-4 ">
                  {customerData.customerDisplayName}
                </p>
              </div>
            </div>
            <select className="text-xs h-8 bg-white  border rounded-md">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div
            className={`w-fit px-2 py-0.5 rounded-md text-[10px] text-white ${
              customerData.status === "Active" ? "bg-[#78AA86]" : "bg-[#D9534F]"
            }`}
          >
            {customerData.status}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="icon-placeholder">
                <Mail />
              </span>
              <p>{customerData.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-placeholder">
                <Phone />
              </span>
              <p>{customerData.mobile}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-placeholder">
                <Address />
              </span>
              <p>{customerData.customerAddress}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-placeholder">
                <CreditCard />
              </span>
              <p>CRD</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-placeholder">
                <Cake />
              </span>
              <p>{customerData.dob}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#FAF2E6] rounded-[12px] p-4">
          <p className="font-bold text-[#303F58] mb-4">Additional Info</p>
          <div className="space-y-4 text-sm text-[#303F58]">
            <div className="flex items-start gap-3">
              {/* Replace this span with your icon component */}
              <span className="w-5 h-5 mt-[2px]">
                <BuildingIcon />
              </span>
              <p>
                <span className="font-normal block mb-1">GST No.</span>
                <span className="font-semibold">{customerData.gstin_uin}</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              {/* Replace this span with your icon component */}
              <span className="w-5 h-5 mt-[2px]">
                <BuildingIcon />
              </span>
              <p>
                <span className="font-normal block mb-1">Company Name</span>
                <span className="font-semibold">{customerData.companyName}</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              {/* Replace this span with your icon component */}
              <span className="w-5 h-5 mt-[2px]">
                <AddressBook />
              </span>
              <p>
                <span className="font-normal block mb-1">Company Address</span>
                <span className="font-semibold">
                {customerData.companyAddress}
                </span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              {/* Replace this span with your icon component */}
              <span className="w-5 h-5 mt-[2px]">
                <UserRound />
              </span>
              <p>
                <span className="font-normal block mb-1">Profession</span>
                <span className="font-semibold">{customerData.profession}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="bg-[#F0FBF6] rounded-[12px] p-4">
          <p className="font-bold mb-2 text-[#303F58]">Referrals</p>
          <p className="text-sm text-[#818894] mb-4">
            Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet
            consectetur.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={CustomerProfile}
                  alt="Jancy Philip"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <p className="font-semibold text-[#303F58]">Jancy Philip</p>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[#075E33] underline"
              >
                View
              </a>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={CustomerProfile}
                  alt="Esther Howard"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <p className="font-semibold text-[#303F58]">Esther Howard</p>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[#075E33] underline"
              >
                View
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-[#F4F7FB]  rounded-[12px]  p-4">
          <p className="font-bold text-[#303F58] mb-2">Social Media</p>
          <div className="space-y-2 text-[#495160]">
            <div className="flex items-center gap-2">
              <span>
                <Twitter />
              </span>
              <p>{customerData.twitter}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <Insta />
              </span>
              <p>{customerData.instagram}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <Snap />
              </span>
              <p>{customerData.snapchat}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <FaceBook />
              </span>
              <p>{customerData.facebook}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CustomerStatusHistory />
      </div>
    </div>
  );
};

export default Overview;
