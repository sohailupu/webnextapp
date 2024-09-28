import React, { useState } from "react";
import { useRouter } from 'next/router';
import { ClosedEye } from "@/public/icons/inputIcons/icons";
import Image from "next/image";

const Input = ({
  label,
  theme,
  icon,
  placeholder,
  onChange,
  onBlur,
  value,
  height,
  disabled,
  validate,
  iconPosition,
  field,
  type,
  size,
  errorMessage,
  isPercentage,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sizeStyles = {
    xs: "40px",
    sm: "44px",
  };
  const inputSize = sizeStyles[size] || "40px";
  const { pathname } = useRouter();

  return (
    <div className={`flex flex-col relative w-full`}>
      <span
        className={`text-sm pl-0  w-full text-secondary-700 font-medium truncate dark:text-[#D6D6D6] ${
          pathname.includes("list-view") ? "mb-0" : "mb-1.5"
        } ${label ? "flex" : "hidden"} `}
      >
        {label}
      </span>
      <div
        style={{ height: inputSize }}
        className={`flex ${
          size === "sm" ? "px-[14px] py-[10px]" : "px-2 py-0.5"
        }  ${
          theme === "person"
            ? "focus-within:border-teal-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#C4EDE6] "
            : theme === "product"
            ? "focus-within:border-warning-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#FDE3C1] "
            : theme === "embedded"
            ? "focus-within:border-grayBlue-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#D2D6E8] "
            : "focus-within:border-primary-300 focus-within:outline  focus-within:outline-4 focus-within:outline-[#E8DFFB] "
        } flex w-full items-center border focus-within:ring-opacity-50 transition duration-300 rounded-lg dark:border-[#424242] dark:bg-[#0F0F0F]
            ${
              validate === "success"
                ? "border-validate-success"
                : validate === "warning"
                ? "border-validate-warning"
                : validate === "error"
                ? "border-validate-errorBorder"
                : "border-secondary-300 dark:border-[#424242]"
            } text-secondary-500 text-base
              ${disabled ? "bg-secondary-50  mx-0" : "bg-white"} `}
      >
        {icon ? (
          type == "password" ? ( //removed not "!" symbol so make password visible, but i have doubt that it may create issue someWhere else
            <span
              className={`absolute ${
                iconPosition === "right" ? "right-[14px]" : "left-[8px]"
              }  text-secondary-500 max-w-[20px] max-h-[20px]`}
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <>{icon}</>
              ) : (
                <>
                  <ClosedEye currentColor={"#98A2B3"} />
                </>
              )}
            </span>
          ) : (
            <span className="flex items-center justify-center max-w-[20px] w-5 h-5 min-w-5 min-h-5 max-h-[20px]">
              {icon}
            </span>
          )
        ) : type == "password" ? (
          <span
            className={`absolute right-[14px]  max-w-[20px] max-h-[20px] ${
              validate === "success"
                ? "text-validate-success"
                : validate === "warning"
                ? "text-validate-warning"
                : validate === "error"
                ? "text-validate-error"
                : "text-secondary-500"
            }`}
            onClick={() => setIsVisible(!isVisible)}
          >
            <img src={Visible} />
          </span>
        ) : (
          <></>
        )}
        {validate && type !== "password" ? (
          <div className="flex items-center absolute right-[10px] ">
            {validate === "success" ? (

               <Image src="../../public/icons/inputIcons/ValidateSuccess.svg" />
            ) : validate === "warning" ? (
               <Image src="../../public/icons/inputIcons/ValidateWarning.svg" />
            ) : validate === "error" ? (
               <Image src="../../public/icons/inputIcons/ValidateError.svg" />
            ) : validate === "tooltip" ? (
              <Image src={"../../public/icons/inputIcons/Tooltip.svg"} />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {isPercentage && <p>%</p>}
        <input
          value={value}
          onBlur={onBlur}
          {...rest}
          {...field}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          style={{ height: inputSize }}
          className={`h-full border-transparent text-base font-normal outline-none ${
            placeholder
              ? "text-secondary-900"
              : disabled
              ? "text-secondary-500"
              : "text-secondary-900"
          } dark:bg-[#0F0F0F] dark:text-[#737373] focus:border-transparent focus:ring-0 border-none rounded-lg w-full px-0 ${
            type !== "password" && icon
              ? iconPosition === "right"
                ? "mr-6"
                : "mx-6"
              : "pl-0"
          } ${disabled ? "bg-secondary-50 dark:bg-[#0F0F0F] " : <></>} `}
          type={
            type == "password"
              ? isVisible
                ? "text"
                : "password"
              : type == "number"
              ? "number"
              : "text"
          }
        />
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
              "text-secondary-500 text-sm leading-5"
            ) : (
              <></>
            )
          } text-sm mt-1.5 font-normal `}
        >
          {errorMessage || validate.toLocaleUpperCase()}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
