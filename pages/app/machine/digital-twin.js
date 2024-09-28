import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Toggle from "@/components/buttons/Toggle";
import { observer } from "mobx-react-lite";
import { TwinIcon, HumburgerIcon, GaugeIcons } from "@/public/icons/machine/machineIcons";
import DashboardSlider from "@/components/sliders/DashboardSlider";
import Button from "@/components/buttons/Button";
import { useStore } from "@/hooks/useStore";
import NoData from "@/components/noData/NoData";
import { processService } from "@/services/process.service";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import moment from "moment";
// import Planner from "./Twin/components/Planner";



const DigitalTwin = observer(({data}) => {
    console.log('data :', data);
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(true);
  const ref = useRef();
  const { settings, auth } = useStore();
  const navigate = useRouter();
  const { width, height } = useWindowDimensions();
  const [selectedProcess, setSelectedProcess] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(data){
            setIsLoading(false)
        }
    }, [data])

  useEffect(() => {
    if (
      auth.user?.rolesKey === "OPERATION_RESPONSIBLE" &&
      !isLoading &&
      data?.operations?.length > 0
    ) {
      navigate(
        `operation-detail/${data.operations[0].id}/${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`
      );
    }
  }, [auth?.user?.rolesKey, isLoading, data, navigate]);

  const handleHamburgerClick = useCallback(() => {
    settings.setIsActive(true);
  }, [settings]);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex items-center border-b border-secondary-100  max-h-[56px] min-h-[56px]">
          <span className="mr-3 md:flex sm:flex xs:flex hidden">
            <Button
              colorType={"tertiary-gray"}
              iconLeft={<HumburgerIcon />}
              size={"md"}
              // onClick={() => settings.setIsActive(true)}
              onClick={handleHamburgerClick}
            />
          </span>
          <TwinIcon className="w-6 h-6" />
          <div className="flex min-h-[44px] max-h-[44px] h-11 gap-x-3 ml-auto items-center border shadow-xs border-[#D0D5DD] px-3 py-[10px] rounded-lg">
            <div className="flex gap-x-2 items-center">
              <GaugeIcons />
              <p className="text-[#475467] font-normal text-sm">
                {t("dashboard:capacityUtilizationRate")}
              </p>
            </div>
            <Toggle enabled={enabled} setEnabled={setEnabled} />
          </div>
        </div>

        {enabled && (
          <div className="flex flex-row items-center w-full gap-3 h-[190px] max-h-[190px] ">
            <div className="flex items-center flex-row gap-5  flex-1 h-full overflow-x-auto scrollbar-hide pl-2">
              <DashboardSlider
                enabled={enabled}
                data={data}
                // refetch={refetch}
                isLoading={isLoading}
                setSelectedProcess={setSelectedProcess}
                selectedProcess={selectedProcess}
              />
            </div>
          </div>
        )}
        <div
          ref={ref}
          className="flex-1 flex rounded-lg border-[1px] border-secondary-300 overflow-hidden"
        >
          {/* {auth.user?.rolesKey === "ADMIN" ? (
            // <Planner
            //   // width={ref.current?.clientWidth}
            //   // height={ref.current?.clientHeight}
            //   width={width}
            //   height={height}
            //   selectedProcess={selectedProcess}
            //   setSelectedProcess={setSelectedProcess}
            // />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <NoData
                theme={"machine"}
                header={t("consoleModal:notAuthorization")}
                text={t("consoleModal:seeAuthorization")}
                button={false}
              />
            </div>
          )} */}
          {auth.user?.rolesKey === "ADMIN" ? (
            "Disabled due to webpack"
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <NoData
                  theme={"machine"}
                  header={t("consoleModal:notAuthorization")}
                  text={t("consoleModal:seeAuthorization")}
                  button={false}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
});


export const getServerSideProps = async () => {
    try {
      const data = await processService.getQueryProcessUtilization();
      return {
        props: {
          data: data || null,
        },
      };
    } catch (error) {
      console.error("Error while fetching processes: ", error);
      return {
        props: {
          data: null,
        },
      };
    }
  };
  
export default memo(DigitalTwin);
