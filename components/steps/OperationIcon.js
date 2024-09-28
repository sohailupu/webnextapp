import React, { memo, useCallback } from "react";
import Button from "../buttons/Button";
import generateFileUrl from "../../utils/generateFileUrl";

const OperationIcon = ({
  t,
  tempIcons,
  setSelectedTab,
  setValue,
  selectedIcon,
  setSelectedIcon,
}) => {
  const handleIcon = (fileKey) => {
    setSelectedIcon(fileKey);
    setValue("iconKey", fileKey);
  };

  const MemoizedButton = React.memo(Button, (prevProps, nextProps) => {
    return (
      prevProps.label === nextProps.label &&
      prevProps.colorType === nextProps.colorType &&
      prevProps.onClick === nextProps.onClick
    );
  });

  const handlePrevious = useCallback(() => {
    setSelectedTab("processResponsible");
  }, [setSelectedTab]);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <div className="w-full h-full xs:h-[480px] mt-5 flex gap-y-2 pb-2.5 xs:pb-0 flex-col scrollbar-hide ">
      <div className="w-full h-full overflow-scroll scrollbar-hide flex flex-wrap xs:flex-row gap-2 my-2 xs:content-start">
        {tempIcons.map((p, i) => (
          <IconItem
            key={i}
            p={p}
            isSelected={selectedIcon === p.fileKey}
            handleIconOnClick={handleIcon}
          />
        ))}
      </div>
      <div className="w-full mt-auto xs:min-w-full flex ml-auto items-center justify-center gap-x-3">
        <MemoizedButton
          label={t("buttons:prev")}
          colorType="secondary-gray"
          onClick={handlePrevious}
        />
        <MemoizedButton
          type="submit"
          label={t("buttons:save")}
          colorType="primary-machine"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

const IconItem = React.memo(({ p, handleIconOnClick, isSelected }) => {
  const handleClick = useCallback(() => {
    handleIconOnClick(p.fileKey);
  }, [handleIconOnClick, p.fileKey]);

  return (
    <div
      className={`p-2 max-h-11 max-w-11 w-11 h-11 rounded flex items-center justify-center ${
        isSelected ? "bg-secondary-200" : ""
      }`}
      onClick={handleClick}
    >
      <img
        className="max-w-12 max-h-12 xs:h-8 xs:w-8"
        src={generateFileUrl(p.fileKey)}
        alt=""
      />
    </div>
  );
});

export default memo(OperationIcon);
