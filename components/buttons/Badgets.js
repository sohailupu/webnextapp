import React, { memo } from "react";

const Badgets = ({
  label,
  size,
  colorType,
  onClick,
  disabled,
  iconLeft,
  iconRight,
  type = "button",
  ...rest
}) => {
  const labelClass = `font-medium ${
    colorType === "fill-gray"
      ? "dark:text-[#D6D6D6] text-[#344054]"
      : colorType === "fill-primary"
      ? "dark:text-[#D6BBFB] text-[#6941C6]"
      : colorType === "fill-error"
      ? "dark:text-[#FDA29B] text-[#B42318]"
      : colorType === "fill-warning"
      ? "dark:text-[#FEC84B] text-[#B54708]"
      : colorType === "fill-success"
      ? "dark:text-[#75E0A7] text-[#067647]"
      : colorType === "fill-embedded"
      ? "dark:text-[#B3B8DB] text-[#363F72]"
      : colorType === "fill-blue"
      ? "dark:text-[#84CAFF] text-[#175CD3]"
      : colorType === "outline-gray"
      ? "dark:text-[#D6D6D6] text-[#344054]"
      : colorType === "outline-machine"
      ? "dark:text-[#D6BBFB] text-[#6941C6]"
      : colorType === "outline-error"
      ? "dark:text-[#FDA29B] text-[#B42318]"
      : colorType === "outline-warning"
      ? "dark:text-[#FEC84B] text-[#B54708]"
      : colorType === "outline-person"
      ? "dark:text-[#75E0A7] text-[#067647]"
      : colorType === "outline-bluegray"
      ? "dark:text-[#B3B8DB] text-[#363F72]"
      : `${disabled ? "text-[#98A2B3]" : "text-[#FFF]"}`
  }`;

  const iconClass = `w-4 h-4 p-[2px] flex items-center justify-center cursor-pointer rounded-[3px] ${labelClass} ${
    colorType === "fill-gray"
      ? "dark:text-[#525252] dark:hover:text-[#737373] dark:hover:bg-[#292929] text-[#98A2B3] hover:text-[#667085] hover:bg-[#F2F4F7]"
      : colorType === "fill-primary"
      ? "dark:text-[#7F56D9] dark:hover:text-[#9E77ED] dark:hover:bg-[#42307D] text-[#B692F6] hover:text-[#9E77ED] hover:bg-[#F4EBFF]"
      : colorType === "fill-error"
      ? "dark:text-[#D92D20] dark:hover:text-[#F04438] dark:hover:bg-[#7A271A] text-[#F97066] hover:text-[#F04438] hover:bg-[#FEE4E2]"
      : colorType === "fill-warning"
      ? "dark:text-[#DC6803] dark:hover:text-[#F79009] dark:hover:bg-[#7A2E0E] text-[#FDB022] hover:text-[#F79009] hover:bg-[#FEF0C7]"
      : colorType === "fill-success"
      ? "dark:text-[#079455] dark:hover:text-[#17B26A] dark:hover:bg-[#074D31] text-[#47CD89] hover:text-[#17B26A] hover:bg-[#DCFAE6]"
      : colorType === "fill-embedded"
      ? "dark:text-[#3E4784] dark:hover:text-[#717BBC] dark:hover:bg-[#101323] text-[#717BBC] hover:text-[#3E4784] hover:bg-[#EAECF5]"
      : colorType === "fill-blue"
      ? "dark:text-[#1570EF] dark:hover:text-[#2E90FA] dark:hover:bg-[#194185] text-[#53B1FD] hover:text-[#2E90FA] hover:bg-[#D1E9FF]"
      : colorType === "outline-gray"
      ? "dark:text-[#525252] dark:hover:text-[#737373] dark:hover:bg-[#292929] text-[#98A2B3] hover:text-[#667085] hover:bg-[#F2F4F7]"
      : colorType === "outline-machine"
      ? "dark:text-[#7F56D9] dark:hover:text-[#9E77ED] dark:hover:bg-[#42307D] text-[#B692F6] hover:text-[#9E77ED] hover:bg-[#F4EBFF]"
      : colorType === "outline-error"
      ? "dark:text-[#D92D20] dark:hover:text-[#F04438] dark:hover:bg-[#7A271A] text-[#F97066] hover:text-[#F04438] hover:bg-[#FEE4E2]"
      : colorType === "outline-warning"
      ? "dark:text-[#DC6803] dark:hover:text-[#F79009] dark:hover:bg-[#7A2E0E] text-[#FDB022] hover:text-[#F79009] hover:bg-[#FEF0C7]"
      : colorType === "outline-person"
      ? "dark:text-[#079455] dark:hover:text-[#17B26A] dark:hover:bg-[#074D31] text-[#47CD89] hover:text-[#17B26A] hover:bg-[#DCFAE6]"
      : colorType === "outline-bluegray"
      ? "dark:text-[#3E4784] dark:hover:text-[#717BBC] dark:hover:bg-[#101323] text-[#717BBC] hover:text-[#3E4784] hover:bg-[#EAECF5]"
      : `${disabled ? "text-[#98A2B3]" : "text-[#FFF]"}`
  }`;

  const getButtonColorClass = (colorType) => {
    switch (colorType) {
      case "fill-gray":
        return `border border-solid dark:bg-[#141414] dark:border-[#424242] bg-[#F9FAFB] border-[#EAECF0]`;
      case "fill-primary":
        return `border border-solid dark:bg-[#2C1C5F] dark:border-[#53389E] bg-[#F9F5FF] border-[#E9D7FE]`;
      case "fill-error":
        return `border border-solid dark:bg-[#55160C] dark:border-[#912018] bg-[#FEF3F2] border-[#FECDCA]`;
      case "fill-warning":
        return `border border-solid bg-[#FFFAEB] border-[#FEDF89] dark:bg-[#4E1D09] dark:border-[#93370D]`;
      case "fill-success":
        return `border border-solid dark:bg-[#053321] dark:border-[#085D3A] bg-[#ECFDF3] border-[#ABEFC6]`;
      case "fill-embedded":
        return `border border-solid dark:bg-[#0D0F1C] dark:border-[#293056] bg-[#F8F9FC] border-[#D5D9EB]`;
      case "fill-blue":
        return `border border-solid dark:bg-[#102A56] dark:border-[#1849A9] bg-[#EFF8FF] border-[#B2DDFF]`;
      case "outline-gray":
        return `border-[1.5px] border-solid dark:border-[#424242] border-[#475467]`;
      case "outline-machine":
        return `border-[1.5px] border-solid dark:border-[#53389E] border-[#7F56D9]`;
      case "outline-error":
        return `border-[1.5px] border-solid dark:border-[#912018] border-[#D92D20]`;
      case "outline-warning":
        return `border-[1.5px] border-solid dark:border-[#93370D] border-[#DC6803]`;
      case "outline-person":
        return `border-[1.5px] border-solid dark:border-[#085D3A border-[#17B26A]`;
      case "outline-bluegray":
        return `border-[1.5px] border-solid dark:border-[#293056] border-[#3E4784]`;
      default:
        return "bg-primary-600 border border-primary-600";
    }
  };

  const getClassName = () => {
    let className = "";
    switch (size) {
      case "sm":
        if (iconLeft) {
          className += "pl-[3px] pr-[8px] py-[2px] text-xs AAAAAAA ";
        }
        if (iconRight) {
          className += "pl-[8px] pr-[3px] py-[2px] text-xs";
        } else {
          className += "px-[8px] py-[2px] text-xs font-medium ";
        }
        break;
      case "md":
        if (iconLeft) {
          className += "pl-[4px] pr-[10px] py-[2px] text-sm";
        }
        if (iconRight) {
          className += "pl-[10px] pr-[4px] py-[2px] text-sm";
        } else {
          className += "px-[10px] py-[2px] text-sm";
        }
        break;
      case "lg":
        if (iconLeft) {
          className += "pl-[4px] pr-[12px] py-[4px] text-sm";
        }
        if (iconRight) {
          className += "pl-[12px] pr-[4px] py-[4px] text-sm";
        } else {
          className += "px-[12px] py-[4px] text-sm";
        }
        break;
      default:
        className += "px-[8px] py-[2px] text-sm";
        if (iconLeft) {
          className += " px-4";
        }
        if (iconRight) {
          className += " px-10";
        }
        break;
    }
    return className;
  };

  const sizeClassName = getClassName(size);
  const colorClassName = getButtonColorClass(colorType, disabled);

  return (
    <div
      type={type ? type : "button"}
      className={`w-auto group font-medium rounded-md flex items-center cursor-default justify-center box-border whitespace-nowrap ${colorClassName} ${sizeClassName}`}
      {...(disabled ? { disabled: true } : null)}
      {...rest}
    >
      {(iconLeft || iconRight) && (
        <div className={`flex items-center justify-center gap-[3px]`}>
          {iconLeft && (
            <span onClick={onClick} className={iconClass}>
              {iconLeft}
            </span>
          )}

          {label ? <span className={labelClass}>{label}</span> : null}

          {iconRight && (
            <span onClick={onClick} className={iconClass}>
              {iconRight}
            </span>
          )}
        </div>
      )}

      {!iconLeft && !iconRight && <span className={labelClass}>{label}</span>}
    </div>
  );
};

export default memo(Badgets);
