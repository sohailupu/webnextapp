import { useRouter } from "next/router";
import Link from "next/link";
import React, { memo } from "react";

const Card = ({ to, item, segmentColor }) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  const SecondIcon = memo(({ children }) => {
    return <>{children}</>;
  });

  return (
    <>
      <Link href={to} passHref>
        <a
          className={"h-10 w-10 flex items-center justify-center rounded-lg"}
          style={{
            color: isActive ? segmentColor?.labelActiveColor : segmentColor?.labelColor,
            backgroundColor: isActive ? segmentColor?.buttonColor : "transparent",
          }}
        >
          <div className="w-7 min-w-[28px] h-7 flex items-center justify-center">
            <SecondIcon>
              <item.icon />
            </SecondIcon>
          </div>
        </a>
      </Link>
    </>
  );
};

export default memo(Card);
