import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { processService } from "../../services/process.service";
import { DashboardPlusIcon } from "../../public/icons/component/modalIcons";
import DashboardCompanyInfo from "../machine/DashboardCompanyInfo";
import DashboardChartsLoading from "../chart/DashboardChartsLoading";
import CustomModal from "../modals/CustomModal";
import AddProcessModal from "../steps/AddProcessModal";
import CompanyDetailChart from "../machine/CompanyDetailChart";

// import { processService } from "../../services/process.service";
// import { useTranslation } from "react-i18next";
// // import { useQuery } from "@tanstack/react-query";
// import { DashboardPlusIcon } from "../../../assets/icons/machineIcons";
// import DashboardChartsLoading from "../Twin/chart/DashboardChartsLoading";
// import DashboardSwiperItem from "./DashboardSwiperItem";
// import DashboardCompanyInfo from "../Twin/components/DashboardCompanyInfo";
// import { CustomModal } from "../../../components";
// import { AddProcessModal } from "../../../steps/process";
// import CompanyDetailChart from "../CompanyDetailChart";

const DashboardSlider = memo(
  ({ enabled, selectedProcess, setSelectedProcess, initialData }) => {
    const data = initialData;
    const { t } = useTranslation();
    const navigate = useRouter();
    const [visibleButton, setVisibleButton] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isOpenCompanyDetail, setIsOpenCompanyDetail] = useState(false);
    const [visibleRightButton, setVisibleRightButton] = useState(false);
    const contentWrapper = useRef(null);
    const [items, setItems] = useState([]);
    const [operation, setOperation] = useState();
    const [openOperation, setOpenOperation] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    //   const { isLoading, data, refetch, isFetching } = useQuery({
    //     retry: 0,
    //     queryKey: ["getProcessUtilization"],
    //     queryFn: async () => await processService.getQueryProcessUtilization(),
    //   });

    const handleData = useCallback(async () => {
      await processService.activeProcesses().then((res) => {
        res?.data?.map((d) => {
          return {
            ...d,
            responsibleUser: d.responsibleUser.map((r) => r.id),
          };
        });
        setOperation(res?.data);
      });
    }, []);

    useEffect(() => {
      handleData();
    }, []);

    const handleEdit = useCallback(
      (id) => {
        if (operation?.length > 0) {
          const findOperation = operation?.find((a) => a?.id === id);
          setSelectedItem(findOperation);
        }
        setOpenOperation(true);
      },
      [operation]
    );

   


    useEffect(() => {
      setItems({
        ...data,
        operations: data?.operations?.sort((a, b) => b?.actual - a?.actual),
      });
      setIsLoading(false);
    }, [data]);

    useEffect(() => {
      if (!isLoading) {
        setTimeout(() => {
          const container = document.getElementById("container");
          if (container?.scrollWidth > container?.clientWidth) {
            setVisibleRightButton(true);
          } else {
            setVisibleRightButton(false);
          }
        }, 300);
      }
    }, [data]);

    const memoizedData = useMemo(() => data, [data]);

    return (
      <>
        <div
          onClick={() => {
            setOpenOperation(true);
            setSelectedItem(null);
          }}
          className="flex items-center cursor-pointer justify-center bg-white shadow-xs border-secondary-200 border rounded-md p-2 hover:bg-[#F9FAFB] active:shadow-ring-gray w-9 h-[158px]"
        >
          <DashboardPlusIcon />
        </div>
        <div className="flex items-center w-[250px]">
          <DashboardCompanyInfo
            onClick={() => {
              // setIsOpenCompanyDetail(true);
              navigate("/app/machine/digital-twin/company-details");
            }}
            // data={data}
            data={memoizedData}
          />
        </div>
        <div
          id="container"
          ref={contentWrapper}
          onScroll={(e) => {
            if (!isIntersecting) {
              setVisibleButton(true);
            }
          }}
          className="flex items-center w-[100%] overflow-x-auto gap-6 pb-3  h-[160px] min-h-[160px]"
        >
          {isLoading ? (
            <>
              <div className="flex gap-x-5">
                {[...new Array(10)].map((d, index) => (
                  <div
                    className="w-[166px] h-[134px] flex items-center"
                    key={index}
                  >
                    <DashboardChartsLoading />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="w-[166px] h-[138px] flex gap-5">
                {items?.operations?.map((process, j) => {
                  return (
                    process.type !== "planned" && (
                      <DashboardSwiperItem
                        key={j}
                        index={j}
                        process={process}
                        selectedProcess={selectedProcess}
                        setSelectedProcess={setSelectedProcess}
                        // onDoubleClickProcess={getOperationDetails}
                        enabled={enabled}
                        processId={process.id}
                        setVisibleButton={setVisibleButton}
                        setIsIntersecting={setIsIntersecting}
                        dataLength={items?.length}
                        setVisibleRightButton={setVisibleRightButton}
                        handleEdit={handleEdit}
                      />
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>

        <CustomModal
          children={
            <AddProcessModal
              data={operation}
              isOpen={openOperation}
              setIsOpen={setOpenOperation}
              selectedProcess={selectedItem}
              handleData={handleData}
            />
          }
          isOpen={openOperation}
          setIsOpen={setOpenOperation}
          width="fit-content"
          height="fit-content"
          modalTitle={
            selectedItem
              ? t("addProcess:updateProcess")
              : t("addProcess:addNewProcess")
          }
        />
        <CustomModal
          isOpen={isOpenCompanyDetail}
          setIsOpen={setIsOpenCompanyDetail}
          modalTitle={"Company Detail"}
          children={<CompanyDetailChart />}
        />
      </>
    );
  }
);

// Move getServerSideProps to the relevant page component
export async function getServerSideProps() {
    try {
      const initialData = await processService.getQueryProcessUtilization();
      
      return {
        props: {
          initialData: initialData || null, // Ensure it's null if no data is returned
        },
      };
    } catch (error) {
      console.error("Error fetching initialData:", error);
      return {
        props: {
          initialData: null, // Set to null on error
        },
      };
    }
  }

export default DashboardSlider;
