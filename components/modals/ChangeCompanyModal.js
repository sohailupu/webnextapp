import React, { useState } from "react";
import generateFileUrl from "@/utils/generateFileUrl";
import Button from "../buttons/Button";
import { authService } from "@/services/auth.services";
import { Toast } from "@/utils/toastify/toast";
import { useTranslation } from "react-i18next";
import { authStore } from "@/stores/auth.store";
import { useStore } from "@/hooks/useStore";
import { LoadingOverlay } from "@/public/icons/login/loginIcons";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";



const ChangeCompanyModal = ({ setIsOpen }) => {
  const { t } = useTranslation();
  const { auth } = useStore();
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState();
  const e_mail = authStore.user.email;
  const password = authStore.user.password;
  const [selectedCompany, setSelectedCompany] = useState(
    auth?.user?.company?.id
  );

  const destinationPath =
    auth?.user?.rolesKey === "ADMIN"
      ? "/app/machine/digital-twin"
      : "/app/person/message";

  const handleChangeCompany = async () => {
    setLoading(true);
    await authService
      .loginWithCompanyId({
        email: e_mail,
        password,
        companyId: selectedCompany,
      })
      .then(({ data: { user, ...rest } }) => {
        Toast("success", t("addCompany:changeCompany"));
        localStorage.setItem("token", rest.access_token);
        // localStorage.removeItem("mapSettings");
        // localStorage.removeItem("selectedMap");
        localStorage.setItem("selectedMap", 1);
        queryClient.removeQueries("handleMap");
        authStore.setCompany(user?.company);
        authStore.setToken(rest);
        authStore.setUser({ ...user, password: password });
        authStore.setLogged(true);
        setIsOpen(false);
        navigate(destinationPath);
        window.location.reload(false);
      });
    setLoading(false);
  };

  // if we want to implement SSR then define fetchCompanyList then we can utilize it

  return (
    <div className="w-[482px] xs:max-w-[300px] h-fit flex flex-col items-start mt-6">
      <div className="h-[312px] xs:h-fit w-full flex overflow-y-auto scrollbar-hide gap-5 flex-col ">
        {loading && <LoadingOverlay />}
        {authStore?.companyList?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedCompany(item?.id);
              }}
              className="w-full  min-h-[72px] h-[72px] flex flex-row items-center cursor-pointer"
            >
              <div className="flex flex-row gap-6 items-center">
                <div className="w-[96px] h-[72px] min-w-[96px] min-h-[72px] border rounded-lg border-secondary-300 shadow-xs overflow-hidden flex items-center justify-center">
                  <img
                    src={generateFileUrl(item?.image)}
                    className="object-contain w-[96px] h-[72px] min-w-[96px] min-h-[72px]"
                  />
                </div>
                <p className="text-lg font-semibold text-secondary-700 w-[70%] truncate">
                  {item?.name}
                </p>
              </div>
              <div
                style={{
                  borderColor:
                    selectedCompany === item?.id ? "#7F56D9" : "#D0D5DD",
                }}
                className="ml-auto w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border flex items-center justify-center"
              >
                {selectedCompany == item?.id && (
                  <div
                    style={{ backgroundColor: "#7F56D9" }}
                    className="w-2 h-2 rounded-full"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full mt-6">
        <Button
          size={"lg"}
          colorType={"primary-machine"}
          label={t("addCompany:switchCompany")}
          onClick={() => {
            // setIsOpen(false);
            handleChangeCompany();
          }}
        />
      </div>
    </div>
  );
};

export default ChangeCompanyModal;
