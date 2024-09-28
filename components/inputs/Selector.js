import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Arrow } from "@/public/icons/inputIcons/icons";
import diacritics from "diacritics";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Selector = React.memo(
  ({
    items,
    value,
    onChange,
    className,
    label,
    icon,
    colliderClassName = "",
    disabled,
    errorMessage,
    validate,
    customRounded,
    theme,
    size,
    isLoading,
    dropdownPosition,
    placeholder,
  }) => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(items);
    const [backspacePressed, setBackspacePressed] = useState(false); // New state
    const handleListboxToggle = useCallback(
      (e) => {
        if (e.clientX !== 0) {
          setOpen(!open);
        }
      },
      [open]
    );

    const selectedLabel = useMemo(() => {
      return items?.find((d) => d?.value == value)?.label;
    }, [items, value]);

    const sizeStyles = {
      xs: "40px",
      sm: "44px",
    };
    const inputSize = sizeStyles[size] || "40px";

    const dropdownStyle = {
      top: dropdownPosition === "upwards" ? "auto" : "100%",
      bottom: dropdownPosition === "upwards" ? "100%" : "auto",
    };

    const handleSearchInputChange = (e) => {
      if (e.target && e.target.value) {
        const input = e.target.value.toLowerCase();
        setSearchInput(input);
        const filteredResults = items.filter((item) =>
          diacritics
            .remove(item.label)
            .toLowerCase()
            .includes(
              diacritics.remove(input) ||
                diacritics
                  .remove(item.shortLabel)
                  .toLowerCase()
                  .includes(diacritics.remove(input))
            )
        );

        setSearchResults(filteredResults);
      } else {
        setSearchInput("");
        setSearchResults([]);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        setBackspacePressed(true);

        setTimeout(() => {
          setBackspacePressed(false);
        }, 100);
      }
    };

    useEffect(() => {
      if (!searchInput) {
        setSearchResults(items);
      }

      if (backspacePressed && selectedLabel !== null) {
        onChange(null);
      }
    }, [searchInput, items, backspacePressed, selectedLabel, onChange]);

    const inputRef = useRef(null);

    useEffect(() => {
      if (open) {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }, [open, handleKeyDown]);

    return (
      <>
        <div className="flex flex-col w-full relative">
          {label && (
            <span className="text-sm mb-1.5 pl-0  w-full text-secondary-700 dark:text-darkTrue-200 font-medium">
              {label}
            </span>
          )}
          <div className={`relative group ${colliderClassName}`}>
            <button
              style={{
                height: inputSize,
              }}
              type="button"
              disabled={disabled}
              onClick={handleListboxToggle}
              onKeyDown={handleKeyDown}
              className={`group 
              ${
                open
                  ? ` ${
                      className ? " " + className : ""
                    }  '!rounded-t-default !rounded-b-none'`
                  : `${className ? className : " border"} text-secondary-900`
              }   
              
              dark:bg-[#0F0F0F] dark:border-[#424242] w-full ${
                size === "sm" ? "px-[14px] py-[10px]" : "px-3 py-2"
              } ${
                validate == "error"
                  ? "border-validate-errorBorder "
                  : "border-secondary-300 "
              }  ${
                theme === "person"
                  ? ` ${
                      open &&
                      "outline outline-4 outline-[#C4EDE6] border-teal-300"
                    } `
                  : theme === "product"
                  ? ` ${
                      open &&
                      "outline outline-4 outline-[#FDE3C1] border-warning-300"
                    } `
                  : theme === "embedded"
                  ? ` ${
                      open &&
                      "outline outline-4 outline-[#D2D6E8] border-grayBlue-300"
                    }`
                  : ` ${
                      open &&
                      "outline outline-4 outline-[#E8DFFB] border-primary-300"
                    }`
              } ${
                customRounded !== undefined ? customRounded : "rounded-lg"
              }  flex w-full border  cursor-pointer overflow-hidden items-center  focus-within:ring-opacity-50 transition duration-300 
  ${disabled ? "bg-secondary-50 mx-0" : "bg-white"}
  `}
            >
              {icon && <span className="mr-1">{icon}</span>}
              <span className="block truncate text-secondary-900  dark:text-[#737373] w-[90%] text-start">
                {selectedLabel}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchInput}
                  placeholder={placeholder}
                  onChange={handleSearchInputChange}
                  className={`border-none outline-none focus:ring-0 w-full ${
                    selectedLabel ? "hidden" : "flex pointer-events-none"
                  } ${disabled ? "bg-secondary-50" : "bg-white"} `}
                />
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill={"#475467"}
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill={"#fff"}
                    />
                  </svg>
                ) : (
                  <Arrow
                    className={`h-2 w-2 dark:text-[#FAFAFA]  ${
                      open
                        ? "rotate-180 text-secondary-600"
                        : " text-secondary-600"
                    } `}
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>

            {open && (
              <div
                style={dropdownStyle}
                className="absolute z-[99999] w-full max-h-[160px] py-1 ring-opacity-5 overflow-auto scrollbar-hide mt-1 focus:outline-none rounded-lg shadow-lg bg-white border-secondary-200 border-t border dark:border-[#525252] dark:bg-[#0F0F0F]"
              >
                {searchResults &&
                  searchResults
                    ?.slice()
                    ?.sort((a, b) => a?.label?.localeCompare(b.label))
                    ?.map((item) => (
                      <button
                        title={item.label}
                        type="button"
                        key={item.value}
                        onClick={() => {
                          onChange(item.value);
                          setOpen(false);
                          setSearchInput("");
                        }}
                        className={classNames(
                          item.value === value
                            ? "bg-white text-secondary-900 dark:bg-[#292929] dark:text-[#FAFAFA] "
                            : "text-secondary-900 dark:text-white",
                          "cursor-pointer select-none relative flex items-start z-50 hover:bg-secondary-50 w-full dark:hover:bg-[#292929] dark:hover:text-darkTrue-50 rounded-md mx-1 p-[10px]  text-md"
                        )}
                      >
                        <span
                          className={classNames(
                            item.value === value
                              ? "font-medium"
                              : "font-medium",
                            "block truncate"
                          )}
                        >
                          {item.label}
                        </span>{" "}
                        {item.shortLabel ? (
                          <span
                            className={classNames(
                              item.value === value
                                ? "font-normal"
                                : "font-normal",
                              "block truncate text-[#667085] text-md ml-1 "
                            )}
                          >
                            {item.shortLabel}
                          </span>
                        ) : null}
                      </button>
                    ))}
              </div>
            )}
          </div>

          {validate ? (
            <p
              className={` ${
                validate === "success"
                  ? "text-validate-success"
                  : validate === "warning"
                  ? "text-validate-warning"
                  : validate === "error"
                  ? "text-validate-error"
                  : validate === "tooltip"
                  ? "text-secondary-500 text-[14px] leading-5"
                  : ""
              }  sm:mt-0.5 lg:mt-1 md:mt-1 sm:text-[10px]  text-[12px]  mt-0.5 font-normal `}
            >
              {errorMessage || validate.toLocaleUpperCase()}
            </p>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
);

export default Selector;
