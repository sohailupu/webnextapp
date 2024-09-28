import React, { memo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";

const Layout = observer(({children}) => {
  const { auth } = useStore();
  const { pathname } = useRouter();

  const segmentColors = useCallback(() => {
    if (pathname?.includes("person")) {
      return {
        backgroundColor: "#107569",
        borderColor: "#0E9384",
        textColor: "#5FE9D0",
        buttonColor: "#0E9384",
        labelColor: "#CCFBEF",
        labelActiveColor: "#F0FDF9",
        segmentName: "person",
      };
    } else if (pathname?.includes("product")) {
      return {
        backgroundColor: "#B54708",
        borderColor: "#DC6803",
        textColor: "#FEC84B",
        buttonColor: "#DC6803",
        labelColor: "#FEF0C7",
        labelActiveColor: "#FFFAEB",
        segmentName: "product",
      };
    } else if (pathname?.includes("embedded-server")) {
      return {
        backgroundColor: "#363F72",
        borderColor: "#3E4784",
        textColor: "#FFFFFF",
        buttonColor: "#3E4784",
        labelColor: "#D5D9EB",
        labelActiveColor: "#EAECF5",
        segmentName: "embedded-server",
      };
    } else {
      return {
        backgroundColor: "#6941C6",
        borderColor: "#7F56D9",
        textColor: "#E9D7FE",
        buttonColor: "#7F56D9",
        labelColor: "#E9D7FE",
        labelActiveColor: "#F4EBFF",
        segmentName: "machine",
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (!pathname.includes("new-order")) {
      sessionStorage.removeItem("firstPageData");
      sessionStorage.removeItem("secondPageData");
    } else if (!pathname.includes("management")) {
      sessionStorage.removeItem("managementPlanningData");
    }
  }, [pathname]);

  return (
    <div className={`w-screen h-screen flex pl-[80px] md:pl-0 sm:pl-0 xs:pl-0`}>
      {/* <LeftMenu /> */}

      <div style={{ backgroundColor: segmentColors().backgroundColor }} className="flex-1 pt-3 flex relative transition-all duration-150 w-full">
        <div
          className={`rounded-tl-[36px] ${
            pathname?.includes("customer-detail") ? "" : "p-6 pr-[28px]"
          } pt-3 bg-white w-full h-full md:pr-6 sm:pr-6 xs:pr-6 md:rounded-tl-none sm:rounded-tl-none xs:rounded-tl-none overflow-hidden `}
        >
         {children}
        </div>
        {/* <AddManuelJunctionDrawer isOpen={consoleStore.isModalOpen} children={<AddManuelJunctionChildren />} /> */}
        {/* {auth?.user?.rolesKey === "ADMIN" && <RightMenu />} */}
      </div>
    </div>
  );
});

export default memo(Layout);
