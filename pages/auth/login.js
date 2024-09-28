import React, { useCallback, useState } from "react";
import { authService } from "../../services/auth.services";
import { useRouter } from "next/router";
import { authStore } from "../../stores/auth.store";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/Input";
import secureLocalStorage from "react-secure-storage";
import machineSlider from "../../components/sliders/MachineSlider";
import productSlider from "../../components/sliders/ProductSlider";
import personSlider from "../../components/sliders/PersonSlider";
import { observer } from "mobx-react-lite";
import { Toast } from "../../utils/toastify/toast";
import generateFileUrl from "../../utils/generateFileUrl";
import { LoadingOverlay, EyeIcon } from "../../public/icons/login/loginIcons";
import ForgotPassword from "./forgot-password";
import {
  TableArrowLeft,
  UpuIoLoginIcon,
  Tick,
} from "../../public/icons/login/loginIcons";
import { useTranslation } from "react-i18next";
import MetaHead from "../../components/common/MetaHead";
import Image from "next/image";
import LoginBackGround from "/public/svg/loginBackGround.svg"
import AuthNavigation from "@/auth/AuthNavigation";
import withAuth from "@/components/withAuth";

const Login = observer(({ initialCompanyList, rememberedEmail, rememberedPassword }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(rememberedEmail || '');
  const [companyList, setCompanyList] = useState(initialCompanyList || []);
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(rememberedPassword || '');

  const packages = [
    { name: "Machine", component: machineSlider, value: "machine" },
    { name: "Product", component: productSlider, value: "product" },
    { name: "Person", component: personSlider, value: "person" },
  ];

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onLogin(event);
    }
  };

  const themeColor = useCallback((index) => {
    const colors = ["#7F57D9", "#DC6803", "#0E9384"];
    return colors[index];
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === packages.length - 1 ? 0 : prevIndex + 1
    );
  }, [packages.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? packages.length - 1 : prevIndex - 1
    );
  }, [packages.length]);

  const onLogin = useCallback(
    async (e) => {
      setLoading(true);
      if (email && password) {
        e.preventDefault();
        try {
          const { data: { user, ...rest } } = await authService.login({ email, password });
          if (user?.isRequiredChangePassword) {
            navigate.replace("/auth/login");
          }
          setCompanyList(user.company);
          if (rememberMe) {
            secureLocalStorage.setItem("newPass", password);
            secureLocalStorage.setItem("email", email);
          } else {
            secureLocalStorage.removeItem("newPass");
            secureLocalStorage.removeItem("email");
          }
        } catch {
          Toast("error", t("login:wrongCredentials"));
        }
        setLoading(false);
      }
    },
    [email, password, rememberMe, t]
  );

  const companyLogin = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user, ...rest } } = await authService.loginWithCompanyId({
        email,
        password,
        companyId: selectedCompany,
      });
      authStore.setToken(rest);
      authStore.setUser({ ...user, password });
      authStore.setLogged(true);
      localStorage.setItem("token", rest.access_token);
      localStorage.setItem("selectedMap", 1);

      const roleRoute = user.rolesKey === "OPERATION_RESPONSIBLE"
        ? "/app/machine/digital-twin"
        : user?.rolesKey !== "ADMIN"
        ? "/app/person/message"
        : parseInt(authStore.user.company.isSteps) >= 7 || parseInt(authStore.user.company.isSteps) < 0
        ? `/app/machine/digital-twin`
        // ? `/machine/digital-twin/area/${localStorage?.getItem("selectedMap")}`
        : "/step/language";

      navigate.replace(roleRoute);
    } catch {
      Toast("error", t("login:tryAgain"));
    }
    setLoading(false);
  }, [email, password, selectedCompany, t, navigate]);

  return (
    <>
    <AuthNavigation>
      <MetaHead title="Login" />
      <div className="w-full h-full flex overflow-hidden">
        {loading && <LoadingOverlay />}
        <div className="w-1/2 h-full sm:hidden xs:hidden">
          <div className="w-full h-full overflow-hidden">
            {packages.map((item, index) => (
              <div
                key={index}
                className={`w-full h-full ${
                  index === activeIndex ? "block" : "hidden"
                } transition-opacity duration-3000`}
              >
                <item.component
                  index={index}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full bg-white relative flex items-center justify-center sm:w-full xs:w-full">
          <span className="fixed xl:hidden lg:hidden md:hidden sm:left-12 sm:top-12 xs:top-10 xs:left-8">
            <UpuIoLoginIcon />
          </span>

          <Image
            src={LoginBackGround}
            width={300}
        height={300}
            className="absolute left-1/2 bottom-0 rotate-180"
          />
          <Image src={LoginBackGround}  width={300}
        height={300} className="absolute top-0 right-0" />

          {companyList.length ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute top-[5%] left-[5%]  xs:top-[10%]  xs:left-[2%]">
                <Button
                  iconLeft={<TableArrowLeft />}
                  size={"sm"}
                  colorType={"tertiary-gray"}
                  onClick={() => (window.location.href = "/auth/login")}
                />
              </div>

              <div className="w-[360px] xs:w-full xs:px-5 flex flex-col">
                <h1 key={1} className="text-4xl xs:text-2xl font-semibold text-gray-900">
                  {t("login:loginTitle")}
                </h1>
                <p key={2} className="text-gray-600 mt-3 xs:text-sm xs:mt-0.5">
                  {t("login.selectCompany")}
                </p>

                <div className="w-full max-h-[254px] xs:max-h-[200px] overflow-y-auto scrollbar-hide flex flex-col border-b border-secondary-200 mb-6 mt-10 xs:mt-4 xs:mb-3">
                  {companyList?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedCompany(item?.id);
                        }}
                        className="w-full min-h-[60px] xs:min-h-[54px] flex items-center mb-6 xs:mb-3 cursor-pointer"
                      >
                        <div className="w-[80px] xs:w-[60px] py-2 h-[60px] xs:h-[40px] border rounded-md border-secondary-300 overflow-hidden flex items-center justify-center bg-white">
                          <img
                            src={generateFileUrl(item?.image)}
                            className="object-contain w-[80px] xs:w-[60px] h-[60px] xs:h-[40px]"
                          />
                        </div>

                        <p className="text-xl xs:text-sm text-secondary-900 font-medium ml-3 w-[60%] truncate">
                          {item?.name}
                        </p>

                        <div
                          style={{
                            borderColor:
                              selectedCompany === item?.id
                                ? themeColor(activeIndex)
                                : "#D0D5DD",
                          }}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center ml-auto`}
                        >
                          {selectedCompany === item?.id && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: themeColor(activeIndex),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={(e) => {
                    companyLogin(e);
                  }}
                  style={{ background: themeColor(activeIndex) }}
                  className={`w-full h-11 rounded-lg flex items-center justify-center mt-6 z-50`}
                >
                  <p className="font-semibold text-white">
                    {t("login.title")}{" "}
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-[360px] flex flex-col relative z-20 xs:px-8 md:px-4">
              <h1 className="text-4xl font-semibold text-gray-900">
                {t("login.loginTitle")}{" "}
              </h1>
              <p className="text-gray-600 mt-3">{t("login.welcomeMessage")}</p>
              <div className="mt-8">
                <Input
                  onChange={(e) => setEmail(e?.target?.value)}
                  onKeyDown={handleKeyDown}
                  label={t("login.email")}
                  type={email}
                  value={email}
                />
              </div>

              <div className="mt-6">
                <Input
                  type={"password"}
                  onKeyDown={handleKeyDown}
                  label={t("login.password")}
                  onChange={(e) => setPassword(e?.target?.value)}
                  value={password}
                  icon={<EyeIcon currentColor={"#98A2B3"} />}
                  iconPosition={"right"}
                />
              </div>
              <div className="flex items-center gap-x-2 my-3">
                <div
                  onClick={() => {
                    setRememberMe(!rememberMe);
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <button
                    className="w-4 h-4 rounded flex items-center justify-center border"
                    style={{
                      borderColor: rememberMe
                        ? themeColor(activeIndex)
                        : "#D0D5DD",
                    }}
                  >
                    {rememberMe && (
                      <Tick color={themeColor(activeIndex)} type="button" />
                    )}
                  </button>
                  <p className="ml-2 text-sm font-medium text-gray-700 select-none">
                    {t("login.rememberMe")}
                  </p>
                </div>
                <p
                  onClick={() => setIsOpenForgotPassword(true)}
                  className="text-sm font-semibold hover:underline cursor-pointer ml-auto"
                  style={{ color: themeColor(activeIndex) }}
                >
                  {t("login.forgotPassword")}
                </p>
              </div>

              <button
                onClick={(e) => {
                  onLogin(e);
                }}
                className="w-full h-11 rounded-lg flex items-center justify-center mt-6"
                style={{ backgroundColor: themeColor(activeIndex) }}
              >
                <p className="font-semibold text-white">{t("login.title")}</p>
              </button>

              <div className="w-full mt-5 flex items-center justify-center">
                <p className="text-md">
                  {t("login.dontHaveAccount")}
                  <a
                    style={{ color: themeColor(activeIndex) }}
                    className="ml-1"
                    target={"blank"}
                    href="https://www.upu.io/"
                  >
                    upu.io
                  </a>
                </p>
              </div>
            </div>
          )}
          {isOpenForgotPassword && (
            
            <div
              className={`${
                isOpenForgotPassword
                  ? "left-0 min-w-full"
                  : "min-w-full left-[100%]"
              } absolute z-20 bottom-0 w-full overflow-hidden top-0 right-0 bg-white p-0 transition-all duration-500`}
            >
              <ForgotPassword
                color={themeColor(activeIndex)}
                goBack={() => setIsOpenForgotPassword(false)}
              />
            </div>
          )}
          <div className="absolute bottom-9 right-9 text-sm text-gray-600">
            © upu.io 2024
          </div>
        </div>
      </div>

      </AuthNavigation>
    </>
  );
});

// ssr
export async function getServerSideProps(context) {
  let initialCompanyList = [];
  let rememberedEmail = secureLocalStorage.getItem("email") || '';
  let rememberedPassword = secureLocalStorage.getItem("newPass") || '';

  return {
    props: {
      initialCompanyList,
      rememberedEmail,
      rememberedPassword,
    },
  };
}


export default Login;
