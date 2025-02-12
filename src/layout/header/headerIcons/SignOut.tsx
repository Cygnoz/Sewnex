import { useState, useEffect, useRef } from "react";
import CheveronDown from "../../../assets/icons/CheveronDown";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import ConfirmModal from "../../../Components/ConfirmModal";

type Props = {};

function SignOut({ }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogoutModalOpen(false);
    window.location.href = "/login";
  };



  return (
    <div className="relative" ref={dropdownRef}>
      <div className="ms-1 cursor-pointer" onClick={handleToggle}>
        <CheveronDown />
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div
          onClick={confirmLogout}
          className="absolute right-0 mt-2 w-32 cursor-pointer  px-4 py-3 bg-white rounded-lg flex justify-center items-center gap-3 shadow-lg"
        >
          <LogoutIcon />
          <p className="text-[#495160] font-semibold text-sm">Sign Out</p>
        </div>
      )}
      <ConfirmModal
        open={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </div>
  );
}

export default SignOut;
