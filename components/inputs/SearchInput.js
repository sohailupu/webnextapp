import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../../public/icons/inputIcons/icons";

const SearchInput = ({
  focus,
  placeholder,
  theme,
  setSearchVal,
  expandable = false,
  ...rest
}) => {
  const { pathname } = useRouter();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const debounceTimeoutRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(true);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setSearchVal(searchText);
    }, 250);
  };

  const handleClick = () => {
    if (expandable) {
      setOpenSearch(!openSearch);
      setSearchVal("");
    }
  };

  return (
    <div
      className={` ${
        pathname.includes("list-view")
          ? "min-h-[40px] max-h-[40px]"
          : "min-h-[42px] max-h-[42px]"
      } ${
        theme === "person"
          ? `focus-within:border-teal-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#C4EDE6] `
          : theme === "product"
          ? "focus-within:border-warning-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#FDE3C1] "
          : theme === "embedded"
          ? "focus-within:border-grayBlue-300 focus-within:outline focus-within:outline-4 focus-within:outline-[#D2D6E8] "
          : "focus-within:border-primary-300 focus-within:outline  focus-within:outline-4 focus-within:outline-[#E8DFFB] "
      } relative rounded-lg border border-secondary-300 flex items-center dark:border-[#424242] shadow-xs duration-500 ${
        expandable && openSearch ? "w-[53px]" : "w-full"
      }`}
    >
      <div
        onClick={handleClick}
        className="absolute h-full text-[#667085] cursor-pointer dark:text-[#A3A3A3] left-0 px-4 flex items-center"
      >
        <SearchIcon width={20} height={20} aria-hidden="true" />
      </div>
      <>
        {expandable ? (
          <>
            {!openSearch && (
              <input
                // type="search"
                ref={inputRef}
                className="block h-full w-full ml-12 placeholder:text-[#667085] placeholder:dark:text-[#737373] text-[#667085] dark:text-[#737373] text-md font-normal dark:bg-[#141414] rounded-lg focus:outline-none focus:border-none"
                placeholder={placeholder ? placeholder : t("chat:search")}
                onChange={handleInputChange}
                {...rest}
              />
            )}
          </>
        ) : (
          <input
            // type="search"
            ref={inputRef}
            className="block h-full w-full ml-12 placeholder:text-[#667085] placeholder:dark:text-[#737373] text-[#667085] dark:text-[#737373] text-md font-normal dark:bg-[#141414] rounded-lg focus:outline-none focus:border-none"
            placeholder={placeholder ? placeholder : t("chat:search")}
            onChange={handleInputChange}
            {...rest}
          />
        )}
      </>
    </div>
  );
};

export default SearchInput;
