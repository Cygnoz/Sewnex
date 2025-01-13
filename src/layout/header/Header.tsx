import { useNavigate } from "react-router-dom";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import NotificationIcon from "./headerIcons/NotificationIcon";
import defaultOrganizationImage from "../../assets/images/personImage.png";
import SignOut from "./headerIcons/SignOut";

type Props = {};

function Header({}: Props) {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    localStorage.setItem("index", "12"); 
    navigate("/settings");
  };

  return (
    <div className="w-full p-4 bg-white flex items-start">
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
          <img src={defaultOrganizationImage} className="w-9" alt="Organization" />
          <div className="ms-3">
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs">john@gmail.com</p>
          </div>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Header;
