import { useState } from "react";

interface Props {
  isOn?: boolean; // Initial state of the toggle button
  onToggle?: (state: boolean) => void; // Callback to handle toggle state changes
  onColor?: string; // Background color when toggle is ON
  offColor?: string; // Background color when toggle is OFF
  size?: "small" | "medium" | "large"; // Size of the toggle button
}

function ToggleButton({
  isOn = false,
  onToggle,
  onColor = "bg-green-500",
  offColor = "bg-gray-300",
  size = "medium",
}: Props) {
  const [isToggled, setIsToggled] = useState(isOn);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    if (onToggle) {
      onToggle(newState); // Trigger the callback
    }
  };

  // Size configurations
  const sizeClasses = {
    small: "w-10 h-5 p-0.5",
    medium: "w-16 h-8 p-1",
    large: "w-20 h-10 p-1.5",
  };

  const circleSizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-7 h-7",
  };

  const translateClasses = {
    small: "translate-x-5",
    medium: "translate-x-8",
    large: "translate-x-10",
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`flex items-center rounded-full border border-[#A3A9B3] transition duration-300 ${
          isToggled ? onColor : offColor
        } ${sizeClasses[size]}`}
      >
        <div
          className={`bg-white rounded-full border border-[#A3A9B3] shadow-md transform transition-transform ${
            isToggled ? translateClasses[size] : "translate-x-0"
          } ${circleSizeClasses[size]}`}
        ></div>
      </button>
    </div>
  );
}

export default ToggleButton;
