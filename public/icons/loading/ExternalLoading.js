import React from "react";
import { Loading } from "../../pages/machine/embeddedServer/svg/EmbeddedServerIcons";
import { useTranslation } from "react-i18next";

const ExternalLoading = ({ first, second }) => {
  const { t } = useTranslation();
  if (second !== undefined) {
    return (
      <div
        style={{
          height: "46px",
          borderWidth: first || second ? 1 : 0,
          top: first || second ? 18 : -100,
        }}
        className="rounded-xl z-[100] transition-all duration-300 border-black/60 backdrop-blur-sm bg-black/60 overflow-hidden absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center px-3"
      >
        <Loading color={"#fff"} secondary={"rgb(0 0 0 / 0.4)"} size={26} />
        <span className="text-lg font-semibold text-white ml-2">
          {t("embedded:pleaseWaitData")}
        </span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "46px",
          borderWidth: first ? 1 : 0,
          top: first ? 18 : -100,
        }}
        className="rounded-xl z-[100] transition-all duration-300 border-black/60 backdrop-blur-sm bg-black/60 overflow-hidden absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center px-3"
      >
        <Loading color={"#fff"} secondary={"rgb(0 0 0 / 0.4)"} size={26} />
        <span className="text-lg font-semibold text-white ml-2">
          {t("embedded:pleaseWaitData")}
        </span>
      </div>
    );
  }
};

export default ExternalLoading;
