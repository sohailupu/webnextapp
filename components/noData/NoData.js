import React from "react";
import Button from "../buttons/Button";
import { PlusIcon } from "../../public/icons/machine/machineIcons";
import { useTranslation } from "react-i18next";
import NoDataMachine from "/public/svg/NoDataMachine.svg"
import NoDataPerson from "/public/svg/NoDataPerson.svg"
import NoDataProduct from "/public/svg/NoDataProduct.svg"

const NoData = React.memo(({ theme, icon, header, text, button, addNew }) => {
  const { t } = useTranslation();

  return theme === "machine" ? (
    <div className="flex flex-col items-center h-fit max-w-[352px]">
      <div
        className="w-[172px] h-[132px] relative flex justify-center "
        style={{
          backgroundImage: `url(${NoDataMachine})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="text-white absolute bottom-6 ml-1.5 w-8 h-8 max-w-8 max-h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 w-[304px] justify-between text-center">
        <p className="font-semibold text-lg text-secondary-900 xs:text-base dark:text-[#D6D6D6]">
          {header}
        </p>
        <p className="text-sm font-normal text-secondary-500">{text}</p>
      </div>
      <div className="mt-8">
        {button === false ? null : (
          <Button
            colorType={"primary-machine"}
            size={"md"}
            label={t("buttons:add")}
            iconLeft={<PlusIcon />}
            onClick={addNew}
          />
        )}
      </div>
    </div>
  ) : theme === "person" ? (
    <div className="flex flex-col items-center h-fit max-w-[352px]">
      <div
        className="w-[172px] h-[132px] relative flex justify-center "
        style={{
          backgroundImage: `url(${NoDataPerson})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="text-white absolute bottom-6 ml-1.5 w-8 h-8 max-w-8 max-h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 w-[304px] justify-between text-center">
        <p className="font-semibold text-lg text-secondary-900 xs:text-base">
          {header}
        </p>
        <p className="text-sm font-normal text-secondary-500">{text}</p>
      </div>
      <div className="mt-8">
        {button === false ? null : (
          <Button
            colorType={"primary-person"}
            size={"md"}
            label={t("buttons:add")}
            iconLeft={<PlusIcon />}
            onClick={addNew}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center h-fit max-w-[352px]">
      <div
        className="w-[172px] h-[132px] relative flex justify-center "
        style={{
          backgroundImage: `url(${NoDataProduct})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="text-white absolute bottom-6 ml-1.5 w-8 h-8 max-w-8 max-h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 w-[304px] justify-between text-center">
        <p className="font-semibold text-lg text-secondary-900 xs:text-base">
          {header}
        </p>
        <p className="text-sm font-normal text-secondary-500">{text}</p>
      </div>
      <div className="mt-8">
        {button === false ? null : (
          <Button
            colorType={"primary-product"}
            size={"md"}
            label={t("buttons:add")}
            iconLeft={<PlusIcon />}
            onClick={addNew}
          />
        )}
      </div>
    </div>
  );
});

export default NoData;
