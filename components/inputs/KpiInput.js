import React from "react";
import ToolTip from "/public/svg/ToolTip.svg";
import ValidateError from "/public/svg/ValidateError.svg";
import ValidateSuccess from "/public/svg/ValidateSuccess.svg";
import ValidateWarning from "/public/svg/ValidateSuccess.svg";

const KpiInput = ({
  label,
  placeholder,
  onChange,
  onBlur,
  value,
  disabled,
  validate,
  type,
  errorMessage,
  theme,
  size,
  kpiType,
  ...rest
}) => {
  const sizeStyles = {
    xs: "40px",
    sm: "44px",
  };
  const inputSize = sizeStyles[size] || "40px";

  return (
    <div className={"flex flex-col relative w-full "} {...rest}>
      <span className="text-sm mb-1.5 pl-0  w-full text-secondary-700 dark:text-darkTrue-200 font-medium">
        {label}
      </span>
      <div
        style={{ height: inputSize }}
        className={`${size === "sm" ? "pr-[14px] " : "pr-3 "} ${
          theme === "person"
            ? `focus-within:border-teal-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#C4EDE6] `
            : theme === "product"
            ? "focus-within:border-warning-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#FDE3C1] "
            : theme === "embedded"
            ? "focus-within:border-grayBlue-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#D2D6E8] "
            : "focus-within:border-primary-300 focus-within:outline  focus-within:outline-4 focus-within:outline-[#E8DFFB] "
        }flex w-full border-secondary-300 items-center flex-row gap-2 border focus-within:ring-opacity-50 rounded-lg transition duration-300  dark:border-darkTrue-600 dark:bg-[#0F0F0F]
          ${
            validate === "success"
              ? "border-validate-success"
              : validate === "warning"
              ? "border-validate-warning"
              : validate === "error"
              ? "border-validate-errorBorder"
              : null
          }
           ${
             disabled
               ? "bg-secondary-50 dark:bg-[#292929] mx-0"
               : "bg-white dark:bg-[#0F0F0F]"
           } `}
      >
        {validate && type !== "password" ? (
          <div className="flex items-center absolute right-[10px] ">
            {validate === "success" ? (
              <>
                <ValidateSuccess />
              </>
            ) : validate === "warning" ? (
              <>
                <ValidateWarning />
              </>
            ) : validate === "error" ? (
              <>
                <ValidateError />
              </>
            ) : validate === "tooltip" ? (
              <>
                {" "}
                <ToolTip />
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="flex w-full h-full rounded-md">
          <span className="flex items-center px-3 w-[70px] justify-center rounded-l-md border-r border-r-gray-300 dark:border-[#424242] bg-gray-50 dark:bg-[#0F0F0F] dark:text-[#A3A3A3] text-secondary-600 text-md font-normal sm:text-sm">
            {kpiType}KPI
          </span>
          <input
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            {...rest}
            disabled={disabled}
            className={`lg:text-sm md:text-md  sm:text-xs focus:ring-0 text-md text-secondary-900 pl-3 focus:outline-none  w-full px-3 ${
              size == "sm" ? "py-[9px]" : "py-[7px]"
            } border-none ${
              disabled
                ? "bg-secondary-50 dark:text-[#FAFAFA]"
                : "dark:bg-[#0F0F0F] dark:text-[#737373]"
            } `}
            type="number"
            validate={validate}
          />
        </div>
      </div>
      {validate ? (
        <p
          className={` ${
            validate === "success" ? (
              "text-validate-success"
            ) : validate === "warning" ? (
              "text-validate-warning"
            ) : validate === "error" ? (
              "text-validate-error"
            ) : validate === "tooltip" ? (
              "text-secondary-500 text-[14px] leading-5"
            ) : (
              <></>
            )
          }  sm:mt-0.5 lg:mt-1 md:mt-1 sm:text-[10px] text-[12px] mt-0.5 font-normal `}
        >
          {errorMessage || validate.toLocaleUpperCase()}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default KpiInput;
