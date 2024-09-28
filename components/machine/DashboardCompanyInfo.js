import React from "react";
import { useTranslation } from "react-i18next";
import { CompanyIcon, Cost3TIcon, CostTIcon, KwhIcon, CcountIcon } from "@/public/icons/machine/machineIcons";

const DashboardCompanyInfo = ({ data, onClick }) => {
  const { t } = useTranslation();
  
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-[250px] max-w-[250px] shadow-md h-[158px] border hover:bg-secondary-50 border-secondary-200  cursor-pointer rounded-lg"
    >
      <div className="flex items-center justify-center flex-row gap-2 w-full p-2 ">
        <div className="text-secondary-600">
          <CompanyIcon />
        </div>
        <p className="text-xs text-secondary-700 font-medium">
          {t("routes:company")}
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-col px-3 w-[50%] border-r border-t  h-[60px]">
            <div className="flex items-center gap-2 w-full h-full">
              <KwhIcon width={20} height={20} />
              <div className="flex flex-col ">
                <p className="text-xs font-normal text-grayBlue-700">kVAh</p>
                <p className="text-xs font-medium text-grayBlue-700">
                  {data?.company?.kwh?.toFixed(2) || "---"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-3 w-[50%]  border-t  h-[60px]">
            <div className="flex items-center gap-2 w-full h-full">
              <div className="text-warning-700">
                <CcountIcon width={20} height={20} />
              </div>
              <div className="flex flex-col ">
                <p className="text-xs font-normal text-warning-700">c-count</p>
                <p className="text-xs font-medium text-warning-700">
                  {data?.company?.cCount?.toFixed(2) || "---"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-col px-3 w-[50%] border-r border-t  h-[60px]">
            <div className="flex items-center gap-2 w-full h-full">
              <CostTIcon width={20} height={20} />
              <div className="flex flex-col ">
                <p className="text-xs font-normal text-grayBlue-700">
                  {t("settingTab:costNew")}
                </p>
                <p className="text-xs font-medium text-grayBlue-700">
                  {data?.company?.kwhCostForStandard?.toFixed(2) || "---"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-3 w-[50%] border-t  h-[60px]">
            <div className="flex items-center gap-2 w-full h-full">
              <Cost3TIcon width={20} height={20} />
              <div className="flex flex-col ">
                <p className="text-xs font-normal text-grayBlue-700">
                  {t("settingTab:costThreeNew")}
                </p>
                <p className="text-xs font-medium text-grayBlue-700">
                  {data?.company?.kwhCostForThreeTime?.toFixed(2) || "---"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompanyInfo;
