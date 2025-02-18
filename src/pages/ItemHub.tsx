import ArrowUpRighIcon from "../assets/icons/ArrowUpRighIcon";
import servicesBgImage from "../assets/images/services-2 1.png";
import shirtImage from "../assets/images/shirt.png";
import membershipImage from "../assets/images/Membership.png";
import { useNavigate } from "react-router-dom";
import servicesBg from "../assets/images/servicesBg.png"


type Props = {};

function ItemHub({ }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1 className="text-base font-bold text-heading">ItemHub</h1>
        <p className="text-subHeading mt-2 text-xs">
          Add and manage your services and products
        </p>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-6">
        <div
          className="col-span-4 cursor-pointer"
          onClick={() => navigate("/itemHub/services")}
        >

          <div
            className="bg-[#004D4D] p-6 rounded-3xl h-[76.5vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${servicesBg})` }}
          >
            <div className="flex items-center gap-2">
              <div className="bg-[#63F3F3] h-3 w-3 rounded-full" />
              <span className="text-sm font-medium text-[#63F3F3]">
                Services
              </span>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-[#63F3F3] font-bold text-2xl">Services</p>
                <p className="text-[#63F3F3] text-sm mt-2 font-light w-[80%]">
                  Add All Available Services You Provide
                </p>
              </div>
              <div>
                <ArrowUpRighIcon bgColor="#007171" />
              </div>
            </div>
          </div>

        </div>
        <div className="col-span-8">
          <div className="bg-gradient-to-b from-[#004141] to-[#006D6D] w-full h-[147px] p-6 rounded-3xl flex items-center justify-between">
            <p className="text-white font-semibold text-base w-[45%]">
              Manage Your Services, Products & Membership Plans in One Place
            </p>
            <img src={servicesBgImage} className="w-64 -mt-16" alt="" />
          </div>
          <div className="mt-6 flex justify-between items-center gap-6">
            <div className="bg-[#FFE1AD] rounded-3xl p-6 w-[50%]">
              <div className="flex items-center gap-2">
                <div className="bg-[#966000] h-3 w-3 rounded-full" />
                <span className="text-sm font-medium text-[#966000]">
                  Products
                </span>
              </div>
              <div className="flex items-center justify-center">
                <img src={shirtImage} className="w-52 flex" alt="" />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-[#784D00] font-bold text-2xl">Products</p>
                  <p className="text-[#784D00] text-sm mt-2 font-light">
                    Add Your Products
                  </p>
                </div>
                <div  onClick={() => navigate("/itemHub/products")}>
                  <ArrowUpRighIcon bgColor="#A06600" />
                </div>
              </div>
            </div>
            <div className="bg-[#59EDA5] rounded-3xl p-6 w-[50%]">
              <div className="flex items-center gap-2">
                <div className="bg-[#004D4D] h-3 w-3 rounded-full" />
                <span className="text-sm font-medium text-[#004D4D]">
                  Membership
                </span>
              </div>
              <div className="flex items-center justify-center">
                <img src={membershipImage} className="w-56 flex" alt="" />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-[#002E2E] font-bold text-2xl">
                    Membership Plans
                  </p>
                  <p className="text-[#004D4D] text-sm mt-2 font-light w-[75%]">
                    Plans Based on Discounts and Counts
                  </p>
                </div>
                <div>
                  <ArrowUpRighIcon bgColor="#004D4D" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemHub;
