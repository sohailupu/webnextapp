import React, { memo } from "react";
import ChevronLeft from "../../public/svg/ChevronLeft.svg"
import PersonIllustrator from "../../public/svg/PersonIllustrator.svg"
import UpuPerson from "../../public/svg/UpuPerson.svg"
import { PersonLoginIcon } from "../../public/icons/login/loginIcons";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const PersonSlider = ({ handleNext, handlePrev }) => {
  const {t} = useTranslation();

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(13.13deg, #0E9384 9.64%, #134E48 90.99%)",
        }}
        className="w-full h-full flex flex-col items-center py-8 xs:py-2 xs:pt-5"
      >
        <PersonLoginIcon />

        <p className="text-2xl lg:text-base xs:text-xs font-extralight text-primary-100 mt-4 xs:mt-2 md:text-lg">
          Bird’s eye-view of manufacturing
        </p>

        <Image
          src={PersonIllustrator}
        //   width={460}
        // height={460}
          alt="Person Sketch"
          className="mt-4 lg:w-[460px] w-[460px] lg:h-[460px] h-[460px] xs:w-[225px] xs:h-[214px] xs:-translate-y-3 md:max-w-[380px]"
        />
        <div className="mt-auto lg:mt-0 w-full flex items-center flex-col">
          <Image
            src={UpuPerson}
            width={166}
        height={26}
            alt="Person text icon"
            className="lg:w-[166px] lg:h-[26px] lg:mt-20 xs:h-[26px] xs:max-w-[166px] xs:mt-2"
          />
          <div className="my-3 w-[234px] xs:w-[178px] h-9 flex items-center justify-between">
            <button
              type="button"
              // onClick={() => {
              //   index.slidePrev();
              // }}
              onClick={handlePrev}
              className="w-9 h-9 xs:w-7 xs:h-7 rounded-lg hover:bg-teal-600 flex items-center justify-center"
            >
              <Image
                src={ChevronLeft}
                color="#fff"
                width={24}
                height={24}
                alt="Left arrow button"
              />
            </button>

            <div className="h-full w-[86px] p-3 flex items-center justify-between">
              <div
                // onClick={() => {
                //   index.slidePrev();
                //   index.slidePrev();
                // }}

                onClick={handlePrev}
                className="w-2.5 h-2.5 rounded-full bg-teal-400 cursor-pointer hover:bg-white"
              />
              <div
                // onClick={() => {
                //   index.slidePrev();
                // }}
                onClick={handlePrev}
                className="w-2.5 h-2.5 rounded-full bg-teal-400 cursor-pointer hover:bg-white"
              />
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>

            <div className="w-9 h-9 xs:w-7 xs:h-7 rounded-lg flex items-center justify-center">
              <Image
                src={ChevronLeft}
                color="#2ED3B7"
                width={24}
                height={24}
                className="rotate-180"
                alt="Right arrow button"
              />
            </div>
          </div>

          <div className="w-[62%] my-3 h-[72px] xs:hidden">
            <p className="text-sm leading-6 text-white text-center lg:text-xs md:text-xs">
              {t("login.personQuote")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PersonSlider);
