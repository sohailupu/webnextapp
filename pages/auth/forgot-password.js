import React, { useState } from "react";
import { Toast } from "../../utils/toastify/toast";
import { personalService } from "../../services/personal.services";
import { KeyIcons, TableArrowLeft } from "../../public/icons/login/loginIcons";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/Input";
import { useTranslation } from "react-i18next";
import LoginBackGround from "/public/svg/loginBackGround.svg"
import Image from "next/image";

const ForgotPassword = ({ goBack, color }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const forgotPassword = async (email) => {
    const data = {
      email: email,
    };
    await personalService.forgotPassword(data).then((res) => {
      if (res?.data?.code == 0) {
        Toast("success", t("login.mailSent"));
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 3000);
      } else {
        Toast("error", t("login.usernotFound"));
      }
    });
  };

  const sendMail = () => {
    forgotPassword(email);
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative xs:justify-start xs:flex-col">
      <Image
        src={LoginBackGround}
        className="absolute left-1/2 bottom-0 rotate-180"
      />
      <div className="w-[360px] flex flex-col relative z-20 items-center">
        <div className="w-14 h-14 rounded-xl border border-secondary-200 shadow-xs bg-white flex items-center justify-center">
          <KeyIcons />
        </div>
        <h1 className="text-displaySm font-semibold text-secondary-900 mt-4">
          {t("login.forgotPassword")}?
        </h1>
        <p className="text-secondary-600 font-normal text-md mt-3">
          {t("login.noWorries")}
        </p>
        <div className="mt-8 mb-6 w-full">
          <Input
            onChange={(e) => setEmail(e?.target?.value)}
            label={t("login.email")}
          />
        </div>
        <Button
          colorType={
            color === "#0E9384"
              ? "primary-person"
              : color === "#7F57D9"
              ? "primary-machine"
              : "primary-product"
          }
          label={"Reset Password"}
          size={"sm"}
          onClick={(e) => {
            sendMail();
          }}
        />
        <div
          onClick={goBack}
          className={`w-full mt-5 flex items-center justify-center gap-1 text-sm font-semibold text-secondary-600 select-none cursor-pointer`}
        >
          <TableArrowLeft />
          {t("login.backToLogin")}
        </div>
      </div>
      <div className="absolute bottom-9 right-9 text-sm text-gray-600">
        © upu.io 2024
      </div>
    </div>
  );
};

export default ForgotPassword;
