import React from "react";
import { CloseIcon } from "../../public/icons/component/modalIcons";
import { settingsStore } from "../../stores/settings.store";

const CloseButton = ({ size, type = "button", onClick, ...rest }) => {
  const getClassName = () => {
    let className = "";
    switch (size) {
      case "sm":
        className += "p-2 w-9 h-9";
        break;
      case "md":
        className += "px-[10px] w-10 h-10";
        break;
      case "lg":
        className += "px-[10px] w-11 h-11";
        break;
      default:
        className += "";
        break;
    }
    return className;
  };
  const isDarkTheme = settingsStore?.theme === "dark";
  const sizeClassName = getClassName(size);
  const darkModeClass = isDarkTheme
    ? "hover:bg-[#292929] active:bg-black text-[#A3A3A3] hover:text-[#FFFFFF] active:text-[#A3A3A3]"
    : "hover:bg-[#F9FAFB] active:bg-white text-[#667085] hover:text-[#475467] active:text-[#667085]";

  return (
    <div className="h-full w-full flex items-center justify-center">
      <button
        className={`flex items-center justify-center rounded-lg cursor-pointer active:shadow-ring-gray ${sizeClassName} ${darkModeClass} `}
        type={type ? type : "button"}
        onClick={onClick}
        {...rest}
      >
        <CloseIcon
          width={size === "lg" ? "24px" : "20px"}
          height={size === "lg" ? "24px" : "20px"}
        />
      </button>
    </div>
  );
};

export default CloseButton;
