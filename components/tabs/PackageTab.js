import React from "react";
import moment from "moment";
import { authStore } from "@/stores/auth.store";
import { useRouter } from "next/router";
import { MachineActiveIcon, MachineIcon, PersonActiveIcon, PersonIcon, ProductActiveIcon, ProductIcon  } from "@/public/icons/component/tabIcons";


const PackageTab = ({ selected, setSelected, currentColor, closed, isAdmin, setSelectedMrpMes }) => {
const router = useRouter();

  const getNavigationPath = (value) => {
    switch (value) {
      case "machine":
        return "/machine/digital-twin";
      case "product":
        return "/product/mrp/work-in-process";
      case "person":
        return `/person/dashboard/${moment().format("YYYY-MM-DD")}`;
      default:
        return "/";
    }
  };

  const packages =
    authStore?.user?.rolesKey != "OPERATOR"
      ? [
          {
            name: "machine",
            value: "machine",
            icon: <MachineIcon />,
            activeIcon: <MachineActiveIcon />,
            borderColor: "#7F56D9",
          },
          {
            name: "product",
            value: "product",
            icon: <ProductIcon />,
            activeIcon: <ProductActiveIcon />,
            borderColor: "#DC6803",
          },
          {
            name: "person",
            value: "person",
            icon: <PersonIcon />,
            activeIcon: <PersonActiveIcon />,
            borderColor: "#0E9384",
          },
        ]
      : [
          {
            name: "person",
            value: "person",
            icon: <PersonIcon />,
            activeIcon: <PersonActiveIcon />,
            borderColor: "#0E9384",
          },
        ];


        const handleNavigation = (value) => {
          if (value === "product") {
            setSelectedMrpMes("mrp");
          }
          const path = getNavigationPath(value);
          router.push(path);
          setSelected(value);
        };
  if (closed) {
    const item = packages.find((item) => item?.value === selected);
    if (!item) return null;

    return (
      <div className="w-[56px] h-[58px] flex items-center justify-center">
        <button
          onClick={() => handleNavigation(item.value)}
          type="button"
          style={{
            borderColor: selected === item?.value ? "#fff" : currentColor.borderColor,
          }}
          className={`w-full flex items-center justify-center h-full border-b-[2px] flex-col pt-2`}
        >
          <span style={{ color: currentColor.textColor }} className="w-fit h-fit">
            {selected === item?.value ? item?.activeIcon : item?.icon}
          </span>

          <p
            className="font-codec text-xs mt-1"
            style={{
              color: selected === item?.value ? "#fff" : currentColor.textColor,
            }}
          >
            {item?.name}
          </p>
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-full h-[58px] flex items-center justify-between mt-3">
        {packages.map((item, index) => {
          return (
            <button
              onClick={() => handleNavigation(item.value)}
              key={item.value}
              type="button"
              style={{
                borderColor: selected === item?.value ? "#fff" : currentColor.borderColor,
              }}
              className={`${isAdmin ? "w-1/3" : "w-full"} flex items-center justify-center h-full border-b flex-col pt-2`}
            >
              <span style={{ color: currentColor.textColor }} className="w-fit h-fit">
                {selected === item?.value ? item?.activeIcon : item?.icon}
              </span>

              <p
                className="font-codec text-xs mt-1"
                style={{
                  color: selected === item?.value ? "#fff" : currentColor.textColor,
                }}
              >
                {item?.name}
              </p>
            </button>
          );
        })}
      </div>
    );
  }
}

export default PackageTab;