import React, { memo, useState } from "react";
import Link from "next/link";
import { ArrowDownIcon } from "@/public/icons/component/modalIcons";

const ExpandableLargeCard = ({ item, segmentColor, pathname, index, openSubHeader, setOpenSubHeader, type, navigate }) => {
  const [isHover, setIsHover] = useState(null);

  const handleOpen = () => {
    if (type === "quality-control") {
      navigate("/app/product/mrp/quality-control/dashboard");
    } else if (type === "product/mrp/stock") {
      navigate("/app/product/mrp/stock");
    }
    setOpenSubHeader(openSubHeader === index ? null : index);
  };

  const handleClick = (currentIndex) => {
    if (openSubHeader === currentIndex) {
      setOpenSubHeader(null);
    } else {
      setOpenSubHeader(currentIndex);
    }
  };

  const SecondIcon = memo(({ children }) => {
    return <>{children}</>;
  });

  const isOpen = openSubHeader === index;

  return (
    <>
      <div className="flex-col flex justify-center items-center select-none">
        <div
          onMouseEnter={() => setIsHover(index)}
          onMouseLeave={() => setIsHover(null)}
          onClick={handleOpen}
          className="h-10 w-full px-3 py-2 flex flex-col items-center rounded-lg my-1 relative cursor-pointer"
          style={{
            color: pathname.includes(item?.path) ? segmentColor?.labelActiveColor : segmentColor?.labelColor,
            backgroundColor: pathname.includes(item?.path) || isHover === index ? segmentColor?.buttonColor : "transparent",
          }}
        >
          <div className="h-full w-full flex items-center">
            <div className="w-7 h-7 flex items-center justify-center">
              <SecondIcon>
                <item.icon />
              </SecondIcon>
            </div>
            <p className="ml-2 font-codec truncate">{item?.name}</p>
            <div className={`ml-auto flex items-center rounded p-0.5 duration-300 transition-transform ${isOpen && "transform rotate-180"}`}>
              <ArrowDownIcon />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col items-center justify-center ml-auto w-[85%]">
            {item?.subRoutes?.map((d, i) => {
              if (d?.isSubItem) {
                return (
                <Link
                  key={i}
                  href={`${item?.path}/${d?.path}`}
                  passHref
                >
                  <a
                    onMouseEnter={() => setIsHover(i)}
                    onMouseLeave={() => setIsHover(null)}
                    className={"h-10 w-full px-4 py-2 flex items-center rounded-lg my-1"}
                    style={{
                      color: pathname.includes(`${item?.path}/${d?.path}`) ? segmentColor?.labelActiveColor : segmentColor?.labelColor,
                      backgroundColor: pathname.includes(`${item?.path}/${d?.path}`) || isHover === i ? segmentColor?.buttonColor : "transparent",
                    }}
                    onClick={() => handleClick(index)}
                  >
                    <p className="font-codec truncate">{d?.name}</p>
                  </a>
                </Link>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(ExpandableLargeCard);
