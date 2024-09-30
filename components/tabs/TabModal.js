import React from "react";

function Tab({ tabId, selectedTab, setSelectedTab, width, theme }) {
  const isSelected = selectedTab === tabId.value;

  const handleClick = () => {
    if (!isSelected) {
      setSelectedTab(tabId.value);
    }
  };

  return (
    <div
      key={tabId.value}
      onClick={handleClick}
      label={tabId.name}
      className={`w-${
        width !== "Empty" ? width : ""
      } h-full flex xs:p-x-1 justify-center items-center cursor-pointer  border-b-[2px] border-solid xs:min-w-[335px] xs:max-w-[335px] ${
        isSelected
          ? ` ${
              theme === "person"
                ? "border-teal-600 text-teal-700"
                : theme === "product"
                ? "border-warning-600 text-warning-600"
                : "border-[#7F56D9] text-[#6941C6]"
            }   dark:border-[#D6D6D6] dark:text-[#D6D6D6]`
          : "border-[#EAECF0] text-[#667085] xs:hidden dark:text-[#D6D6D6] dark:border-[#292929]"
      }`}
    >
      <span className="text-base font-semibold xs:text-sm whitespace-nowrap">
        {tabId.name}
      </span>
    </div>
  );
}

const MemoizedTab = React.memo(Tab, (prevProps, nextProps) => {
  return prevProps.selectedTab === nextProps.selectedTab;
});

export default function TabModal({
  width,
  tabData,
  page,
  theme,
  selectedTab,
  setSelectedTab,
}) {
  const selectedComponent = tabData.find(
    (tab) => tab.value === selectedTab
  )?.component;

  return (
    <div className="w-full h-full flex flex-col items-start sm:px-0 pt-6 xs:overflow-hidden xs:px-0 md:px-0">
      <div className="w-full h-9 min-h-[36px] flex xs:flex-col items-start">
        {tabData.map((tabId, i) => (
          <MemoizedTab
            key={i}
            width={width}
            tabId={tabId}
            selectedTab={selectedTab}
            theme={theme}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </div>
      <div className="flex items-center w-full h-full">{selectedComponent}</div>
    </div>
  );
}
