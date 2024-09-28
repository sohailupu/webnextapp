import React, { memo } from "react";

const MemorizedIcon = memo(({ children }) => {
  return children;
});

const Button = ({ label, size, width, colorType, onClick, disabled, iconLeft, iconRight, type, outSideClassName, ...rest }) => {
  const labelClass = `${
    colorType === "primary-machine"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "secondary-machine"
      ? disabled
        ? "text-[#98A2B3] dark:text-[#737373]"
        : "dark:text-[#D6D6D6]  text-[#6941C6] dark:group-hover:text-[#F5F5F5] group-hover:text-[#53389E]"
      : colorType === "tertiary-machine"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#D6D6D6] dark:group-hover:text-[#F5F5F5] text-[#6941C6] group-hover:text-[#53389E]"
      : colorType === "secondary-gray"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#D6D6D6] dark:group-hover:text-[#F5F5F5] text-[#344054] group-hover:text-[#182230]"
      : colorType === "tertiary-gray"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#A3A3A3] dark:group-hover:text-[#A3A3A3] text-[#475467] group-hover:text-[#344054]"
      : colorType === "secondary-person"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#D6D6D6] dark:group-hover:text-[#F5F5F5] text-[#107569] group-hover:text-[#125D56]"
      : colorType === "secondary-product"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#D6D6D6] group-hover:text-[#B54708] text-[#B54708] group-hover:text-[#93370D]"
      : colorType === "secondary-embedded"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#D6D6D6] dark:group-hover:text-[#F5F5F5] text-[#363F72] group-hover:text-[#293056]"
      : colorType === "primary-person"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "primary-product"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "tertiary-product"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "success-primary"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "primary-embedded"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "primary-error"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FFF] text-[#FFF]"
      : colorType === "secondary-error"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FECDCA] darkgroup-hover:text-[#FEE4E2] text-[#B42318] group-hover:text-[#912018]"
      : colorType === "tertiary-error"
      ? disabled
        ? "dark:text-[#737373] text-[#98A2B3]"
        : "dark:text-[#FDA29B] dark:group-hover:text-[#FECDCA] text-[#B42318] group-hover:text-[#912018]"
      : `${disabled ? "text-[#98A2B3]" : "text-[#FFF]"}`
  }`;

  const iconClass = `${size === "xl" ? "w-6 h-6" : "w-5 h-5"} max-h-6 max-w-6 flex items-center justify-center ${labelClass}`;

  const getButtonColorClass = (colorType, disabled) => {
    switch (colorType) {
      case "primary-machine":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : "dark:bg-[#7F56D9] dark:border-[#7F56D9] dark:hover:bg-[#6941C6] dark:hover:border-[#6941C6] dark:active:shadow-ring-machine bg-[#7F56D9] border-[#7F56D9] hover:bg-[#6941C6] hover:border-[#6941C6] active:shadow-ring-machine"
        }`;
      case "secondary-machine":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#0F0F0F] dark:border-[#292929] bg-[#FFF] border-[#EAECF0]"
            : "dark:bg-[#141414] dark:border-[#424242] dark:hover:bg-[#292929] dark:active:shadow-ring-machine bg-[#FFF] border-[#D6BBFB]  hover:bg-[#F9F5FF] active:shadow-ring-machine"
        }`;
      case "tertiary-machine":
        return `${disabled ? "" : "dark:hover:bg-[#292929] hover:bg-[#F9F5FF]"}`;
      case "primary-person":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : "dark:bg-[#0E9384] dark:border-[#0E9384] dark:hover:bg-[#107569] dark:hover:border-[#107569] dark:active:shadow-ring-person bg-[#0E9384] border-[#0E9384] hover:border-[#107569] hover:bg-[#107569] active:shadow-ring-person"
        }`;
      case "secondary-person":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#0F0F0F] dark:border-[#292929] bg-[#FFF] border-[#EAECF0]"
            : "dark:bg-[#141414] dark:border-[#424242] dark:hover:bg-[#292929] dark:active:shadow-ring-person bg-[#FFF] border-[#5FE9D0] hover:bg-[#F0FDF9] active:shadow-ring-person"
        }`;
      case "primary-embedded":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : "dark:bg-[#3E4784] dark:border-[#3E4784] dark:hover:bg-[#363F72] dark:hover:border-[#363F72] dark:active:shadow-ring-embedded bg-[#3E4784] border-[#3E4784] hover:bg-[#363F72] hover:border-[#363F72] active:shadow-ring-embedded"
        }`;
      case "secondary-embedded":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#0F0F0F] dark:border-[#292929] bg-[#FFF] border-[#EAECF0]"
            : "dark:bg-[#141414] dark:border-[#424242] dark:hover:bg-[#292929] dark:active:shadow-ring-embedded bg-[#FFF] border-[#B3B8DB] hover:bg-[#F8F9FC] active:shadow-ring-embedded"
        }`;
      case "secondary-gray":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#0F0F0F] dark:border-[#292929] bg-[#FFF] border-[#EAECF0]"
            : "dark:bg-[#141414] dark:border-[#424242] dark:hover:bg-[#292929] dark:active:shadow-ring-gray bg-[#FFF] border-[#D0D5DD] hover:bg-[#F9FAFB] active:shadow-ring-gray"
        }`;
      case "tertiary-gray":
        return ` ${disabled ? "" : "dark:hover:bg-[#292929] hover:bg-[#F9FAFB]"}`;
      case "primary-product":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : "dark:bg-[#DC6803] dark:border-[#DC6803] dark:hover:bg-[#B54708] dark:hover:border-[#B54708] dark:active:shadow-ring-product bg-[#DC6803] border-[#DC6803] hover:bg-[#B54708] hover:border-[#B54708] active:shadow-ring-product"
        }`;
      case "tertiary-product":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : "dark:bg-[#DC6803] dark:border-[#DC6803] dark:hover:bg-[#B54708] dark:hover:border-[#B54708] dark:active:shadow-ring-product bg-[#EAAA08] border-[#EAAA08] hover:bg-[#CA8504] hover:border-[#CA8504] active:shadow-ring-product"
        }`;

      case "success-primary":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : " bg-[#079455] border-[#079455] hover:bg-[#079460] hover:border-[#079460] active:shadow-ring-product"
        }`;
      case "secondary-product":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#0F0F0F] dark:border-[#292929] bg-[#FFF] border-[#EAECF0]"
            : "dark:bg-[#141414] dark:border-[#424242] dark:hover:bg-[#292929] dark:active:shadow-ring-product bg-[#FFF] border-[#FEC84B] hover:bg-[#FFFAEB] active:shadow-ring-product"
        }`;
      case "primary-error":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#292929] dark:border-[#292929] bg-[#F2F4F7] border-[#EAECF0]"
            : "dark:bg-[#D92D20] dark:border-[#D92D20] dark:hover:bg-[#B42318] dark:hover:border-[#B42318] dark:active:shadow-ring-error bg-[#D92D20] border-[#D92D20] hover:bg-[#B42318] hover:border-[#B42318] active:shadow-ring-error"
        }`;
      case "secondary-error":
        return `border border-solid ${
          disabled
            ? "dark:bg-[#0F0F0F] dark:border-[#292929] bg-[#FFF] border-[#EAECF0]"
            : "dark:bg-[#55160C] dark:border-[#912018] dark:hover:border-[#B42318] dark:hover:bg-[#292929] dark:active:shadow-ring-error dark:active:bg-[#55160C] bg-[#FFF] border-[#FDA29B] hover:bg-[#FEF3F2] active:shadow-ring-error"
        }`;
      case "tertiary-error":
        return ` ${disabled ? "" : "dark:hover:bg-[#7A271A] hover:bg-[#FEF3F2]"}`;
      default:
        return "bg-black border border-primary-600";
    }
  };

  const getClassName = () => {
    let className = "";
    if (label) {
      switch (size) {
        case "sm":
          className += "px-3 py-2 text-[14px] leading-5";
          break;
        case "md":
          className += "px-[14px] py-[10px] text-[14px] leading-5";
          break;
        case "lg":
          className += "px-4 py-[10px] text-[16px] leading-6";
          break;
        case "xl":
          className += "px-[18px] py-3 text-[16px] leading-6";
          break;
        case "2xl":
          className += "px-[22px] py-4 text-lg leading-7";
          break;
        default:
          className += "px-4 py-[10px] text-[16px] leading-6";
          break;
      }
    } else if (!label) {
      switch (size) {
        case "sm":
          className += "p-2 max-w-[36px] max-h-[36px]";
          break;
        case "md":
          className += "p-[10px] max-w-[40px] max-h-[40px]";
          break;
        case "lg":
          className += "p-3 max-w-[44px] max-h-[44px]";
          break;
        case "xl":
          className += "p-[14px] max-w-[48px] max-h-[48px]";
          break;
        case "2xl":
          className += "p-4 max-w-[56px] max-h-[56px]";
          break;
        default:
          className += "p-[10px] max-w-[36px] max-h-[36px]";
          break;
      }
    }
    return className;
  };

  const hasOnlyIcon = (iconLeft || iconRight) && !label;
  const iconOnlyPadding = hasOnlyIcon ? "" : "";

  const sizeClassName = getClassName(size);
  const colorClassName = getButtonColorClass(colorType, disabled);

  return (
    <button
      style={{ width: width || "100%" }}
      type={type ? type : "button"}
      className={`group font-semibold outline-none rounded-lg flex items-center justify-center box-border whitespace-nowrap ${colorClassName} ${sizeClassName} ${iconOnlyPadding} ${outSideClassName} ${rest.className}`}
      onClick={onClick}
      {...(disabled ? { disabled: true } : null)}
    >
      {(iconLeft || iconRight) && (
        <div
          className={`flex items-center justify-center ${
            size === "xs" || size === "sm" ? "gap-1" : size === "md" || size === "lg" ? "gap-[6px]" : "gap-[10px]"
          }`}
        >
          {iconLeft && (
            <MemorizedIcon>
              <span className={iconClass}>{iconLeft}</span>
            </MemorizedIcon>
          )}

          {label ? (
            <MemorizedIcon>
              <span className={labelClass}>{label}</span>
            </MemorizedIcon>
          ) : null}

          {iconRight && (
            <MemorizedIcon>
              <span className={iconClass}>{iconRight}</span>
            </MemorizedIcon>
          )}
        </div>
      )}

      {!iconLeft && !iconRight && (
        <MemorizedIcon>
          <span className={labelClass}>{label}</span>
        </MemorizedIcon>
      )}
    </button>
  );
};

export default memo(Button);
