import Building from "../../../../assets/icons/Building"
import Mail from "../../../../assets/icons/Mail"
import Phone from "../../../../assets/icons/Phone"
import StatusHistory from "./StatusHistory"
import ViewMoreModal from "./View More/ViewMoreModal"

type Props = {}

function Overview({ }: Props) {
  // const statuses = ["active", "inactive"];
  // const StatusChange = statuses.map((status) => ({ value: status, label: status }));
  return (
    <div>
      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-5 flex gap-10 rounded-lg bg-gradient-to-r from-[#F7ECD9] via-[#F7ECD9] to-[#B5F0D3]">
            <div className="bg-white rounded-lg w-[150px] h-[140px] flex justify-center items-center">
              <p>Company Logo</p>
            </div>
            <div className="">
              <h1 className="text-[#495160] text-[16px] font-bold mb-1">
                Supplier Name
              </h1>
              <p className="flex gap-2 text-[#495160] text-[12px] font-normal py-1">
                <p className="">
                  <Mail />
                </p>
                electrotech@gmail.com
              </p>
              <div className="flex gap-3 w-full">
                <p className="flex gap-1 text-[#495160] w-full text-[12px] font-normal py-1">
                  <span>
                    <Phone />
                  </span>
                  +91 95632652
                </p>
                <p className="flex gap-1 w-full text-[#495160] text-[12px] font-normal py-1">
                  <span>
                    <Building size={16} />
                  </span>
                  CompanyName
                </p>
              </div>
            </div>
            <div className="ms-5">
              <div className="bg-white p-5 rounded-lg ">
                <p className="text-[#495160] text-[12px] font-semibold">
                  Opening Balance
                </p>
                <p className="text-[#004D4D] text-[16px] font-bold pt-1">
                  ₹ 25462
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
            <p className="text-[12px] text-[#495160] font-normal w-[40%] py-2">
              47 Ashoka Nagar Sector 5, Andheri EastMumbai, Maharashtra 400069India
            </p>
            <p className="text-[12px] text-[#495160] font-normal">
              Phone : 9651216516
            </p>
          </div>
          <div className="bg-[#FAF2E6] rounded-lg p-5 my-3">
            <h1 className="text-[14px] text-[#495160] font-bold">Shipping Address</h1>
            <p className="text-[12px] text-[#495160] font-normal w-[40%] py-2">
              47 Ashoka Nagar Sector 5, Andheri EastMumbai, Maharashtra 400069India
            </p>
            <p className="text-[12px] text-[#495160] font-normal">
              Phone : 9651216516
            </p>
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
                  <p className="">Business</p>
                  <p className="">INR</p>
                  <p className="">Due on Reciept</p>
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