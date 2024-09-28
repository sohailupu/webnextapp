import React from "react";
import Skeleton from "react-loading-skeleton";

const DashboardChartsLoading = () => {
  return (
    <div>
      <Skeleton
        baseColor={"#d1d5db"}
        className={`h-[135px] w-[166px] rounded-lg`}
      />
    </div>
  );
};

export default DashboardChartsLoading;
