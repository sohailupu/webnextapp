import React, { memo } from "react";
import { MachineLoginIcon } from "../../public/icons/inputIcons/icons";
import ChevronLeft from "/public/svg/ChevronLeft.svg"
import UpuMachine from "/public/svg/UpuMachine.svg"
import MachineIllustrator from "/public/svg/MachineIllustrator.svg"
import { useTranslation } from "react-i18next";
import Image from "next/image";

const MachineSlider = ({ handleNext, handlePrev }) => {
  const {t} = useTranslation();

  return (
    <div
      style={{
        background: "linear-gradient(13.13deg, #7F56D9 9.64%, #42307D 90.99%)",
      }}
      className="w-full h-full flex flex-col items-center py-8 xs:py-2 xs:pt-5"
    >
        <MachineLoginIcon />
      <p className="text-2xl lg:text-base xs:text-xs font-extralight text-primary-100 mt-4 xs:mt-2 md:text-lg">
        Bird’s eye-view of manufacturing
      </p>
      <Image
        src={MachineIllustrator}
        // width={460}
        // height={460}
        alt="Machine Sketch"
        className="lg:w-[460px] w-[460px] lg:h-[460px] h-[460px] mt-4 xs:w-[225px] xs:h-[214px] xs:-translate-y-3 md:max-w-[380px]"
      />
      <div className="mt-auto lg:mt-0 w-full flex items-center flex-col">
        <Image
        // width={166}
        // height={26}
          src={UpuMachine}
          alt="Machine text icon"
          className="lg:w-[166px] lg:h-[26px] lg:mt-20  xs:h-[26px] xs:w-[166px] xs:mt-2"
        />
        <div className="my-3 w-[234px] xs:w-[178px] h-9 flex items-center justify-between">
          <div className="w-9 h-9 xs:w-7 xs:h-7 rounded-lg flex items-center justify-center">
            <Image
              src={ChevronLeft}
              color="#B692F6"
              width={24}
              height={24}
              alt="Left arrow button"
            />
          </div>

          <div className="h-full w-[86px] p-3 flex items-center justify-between">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
            <div
              onClick={handlePrev}
              className="w-2.5 h-2.5 rounded-full bg-primary-400 cursor-pointer hover:bg-white"
            />
            <div
              onClick={handleNext}
              className="w-2.5 h-2.5 rounded-full bg-primary-400 cursor-pointer hover:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 xs:w-7 xs:h-7 rounded-lg hover:bg-primary-500 flex items-center justify-center"
          >
            <Image
              src={ChevronLeft}
              color="#fff"
              width={24}
              height={24}
              className="rotate-180"
              alt="Right arrow button"
            />
          </button>
        </div>

        <div className="w-[62%] my-3 h-[72px] xs:hidden">
          <p className="text-sm leading-6 text-white text-center lg:text-xs md:text-xs">
            {t("login.machineQuote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(MachineSlider);
