import React from "react";
import moment from "moment";
import ReactECharts from "echarts-for-react";
import { reportService } from "@/services/report.service";
import { timeFormatter  } from "@/utils/timezoneFormatter";
import { Loading } from "@/public/icons/machine/machineIcons";

const CompanyDetailChart = ({data}) => {

  const newDates = data?.dates?.map((item) =>
    moment(item).format("DD-MM-YYYY")
  );

  const options = React.useMemo(() => {
    return {
      title: {},
      tooltip: {
        trigger: "axis",
        position: "top",
      },
      legend: {
        data: data?.legend,
        show: true,
        right: "5%",
        left: "4%",
        alignTicks: false,
        formatter: function (name) {
          let itemValue = data?.series?.filter((item) => item.name === name);
          const total = itemValue[0].data.reduce((a, b) => {
            return a + b;
          }, 0);
          return `{name|${name}}:{total|Avg: ${Number(
            (total / 30).toFixed(2)
          )}}`;
        },
        textStyle: {
          rich: {
            name: { fontWeight: "regular", align: "left", fontSize: 10 },
            total: {
              fontSize: 10,
              fontWeight: "regular",
            },
          },
        },
      },
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: newDates,
        axisLabel: {
          formatter: function (value, index) {
            return value?.slice(0, 2);
          },
          show: true,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "kVAh",
          position: "right",
          alignTicks: false,
          axisLine: {
            show: true,
            lineStyle: {
              color:
                localStorage.color_theme === "dark" ? "#D6D6D6" : "#3c3c3c",
            },
          },
          axisLabel: {
            formatter: "{value} kVAh",
            show: true,
            textStyle: {
              color:
                localStorage.color_theme === "dark" ? "#D6D6D6" : "#3c3c3c",
              right: "-20px",
            },
          },
        },
        {},
        {},
      ],
      series: data?.series,
    };
  }, [data]);

  return (
    <div className="relative h-[500px] w-[880px]">
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loading color={"#7F56D9"} secondary={"#fff"} size={32} />
        </div>
      ) : (
        <>
          <ReactECharts
            option={options}
            style={{
              height: "100%",
              width: "105%",
              top: "8px",
              marginLeft: "-20px",
              marginTop: "30px",
            }}
          />
          <div className={`absolute -top-5 font-normal gap-2 w-full gap-x-2`}>
            <p className="text-[12px] mt-0.5 font-semibold inline-block">
              Start :{" "}
              {moment(timeFormatter(data?.startDate).formatted).format(
                "DD-MM-YYYY"
              )}
            </p>
            <p className="text-[12px] ml-2 mt-0.5 font-semibold inline-block">
              End :{" "}
              {moment(timeFormatter(data?.endDate).formatted).format(
                "DD-MM-YYYY"
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(){
    try{
        const data =  await reportService.getCompanyConsoleData();
        return{
            props: {data}
        }
    } catch(error){
        console.error("Error while fetching company details:", error);
        return{
            props: {data: null}
        }
    }
}

export default React.memo(CompanyDetailChart);
