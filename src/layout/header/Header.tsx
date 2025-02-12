import { useNavigate } from "react-router-dom";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import NotificationIcon from "./headerIcons/NotificationIcon";
import defaultOrganizationImage from "../../assets/images/personImage.png";
import SignOut from "./headerIcons/SignOut";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import { endpoints } from "../../Services/apiEdpoints";

type Props = {};

function Header({ }: Props) {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    localStorage.setItem("index", "12");
    navigate("/settings");
  };
  const [organizationData, setOrganizationData] = useState<any>(null);
  console.log(organizationData, "organizationData");

  const { request: getOneOrganization } = useApi("get", 5004);

  const handleLogout = () => {
    ['authToken', 'savedIndex', 'savedSelectedIndex'].forEach(item => localStorage.removeItem(item));
    navigate("/login");
    toast.error("Session expired. Please log in again.");
  };

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const url = `${endpoints.GET_ONE_ORGANIZATION}`;
        const apiResponse = await getOneOrganization(url);
        if (!apiResponse.response?.data) {
          handleLogout();
        } else {
          setOrganizationData(apiResponse.response.data);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Error fetching organization data";
        toast.error(errorMessage);
      }
    };

    fetchOrganization();
  }, []);

  return (
    <div className="w-full p-4 bg-white flex items-start">
      <Toaster reverseOrder={false} />

      <div>
        <input
          type="text"
          className="w-[498px] px-3 py-2 rounded-[10px] text-sm bg-[#F9F7F5]"
          placeholder="search"
        />
      </div>
      <div className="flex items-center gap-6 ml-auto">
        <NotificationIcon />
        <div className="cursor-pointer" onClick={handleSettingsClick}>
          <SettingsIcon color="#818894" width="22" />
        </div>
        <div className="flex items-center justify-center">
          <img
            src={organizationData?.organizationLogo ? organizationData?.organizationLogo : defaultOrganizationImage}
            className="w-9 h-9 rounded-full object-cover"
            alt="Organization"
          />
          <div className="ms-3">
            <p className="text-sm font-semibold">{organizationData?.organizationName ? organizationData?.organizationName : "Name"}</p>
            <p className="text-xs">{organizationData?.primaryContactEmail ? organizationData?.primaryContactEmail : ""}</p>
          </div>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Header;
