import React, { memo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LargeCard = ({ to, item, segmentColor, index }) => {
  const [isHover, setIsHover] = useState(null);
  const router = useRouter();
  const isActive = router.pathname === to;

  const SecondIcon = memo(({ children }) => {
    return <>{children}</>;
  });

  return (
    <>
      <Link href={to} passHref>
        <a
          onMouseEnter={() => setIsHover(index)}
          onMouseLeave={() => setIsHover(null)}
          className={"h-10 w-full px-3 py-2 flex items-center rounded-lg my-1 select-none"}
          style={{
            color: isActive ? segmentColor?.labelActiveColor : segmentColor?.labelColor,
            backgroundColor: isActive || isHover === index ? segmentColor?.buttonColor : "transparent",
          }}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <SecondIcon>
              <item.icon />
            </SecondIcon>
          </div>
          <p className="ml-2 font-codec truncate">{item?.name}</p>
        </a>
      </Link>
    </>
  );
};

export default memo(LargeCard);
