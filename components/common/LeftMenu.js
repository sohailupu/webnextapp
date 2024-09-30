import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import moment from "moment";
import { useStore } from "@/hooks/useStore";
import generateFileUrl from "@/utils/generateFileUrl";
import { instance } from "@/utils/client";
import CustomModal from "../modals/CustomModal";
import { Toast } from "@/utils/toastify/toast";
import PackageTab from "../tabs/PackageTab";
import ChangeCompanyModal from "../modals/ChangeCompanyModal";
import LoadingOverlay from "@/public/icons/loading/LoadingOverlay";
import ExpandableLargeCard from "../cards/ExpandableLargeCard";
import LargeCard from "../cards/LargeCard";
import Card from "../cards/Card";
import { UpuIoLogo, ChangeIcon, LogoutIcon, NodeListIcon, SettingsIcon, UpuHeaderIcon, PersonnelsIcon } from "@/public/icons/component/commonIcons";
import { useRouter } from "next/router";
import Link from "next/link";

// import { screens } from "../App";

const MemorizedTab = memo(PackageTab);

const LeftMenu = observer(({}) => {
    const router = useRouter();
  const { settings } = useStore();
  const { t } = useTranslation();
  const { auth } = useStore();
  const { pathname } = router;
  const isEmbeddedPage = pathname?.includes("embedded-server");
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(null);
  const [selectedTab, setSelectedTab] = useState(auth.user?.rolesKey !== "ADMIN" ? "person" : "machine");
  const [loading, setLoading] = useState(false);
  const [openSubHeader, setOpenSubHeader] = useState(null);
  const [selectedMrpMes, setSelectedMrpMes] = useState("mrp");
  const navigate = useRouter();
  async function logOut() {
    setLoading(true);
    await instance.post(`auth/logout`, { token: auth.token.access_token });
    auth?.logOut();
    navigate.push("/auth/login");
    setLoading(false);
  }

  const changeCompany = async () => {
    setLoading(true);

    await instance.get(`auth/me/${auth.user?.id}`).then((res) => {
      setLoading(true);
      if (res?.data?.company) {
        auth.setCompanyList(res?.data?.company);
        setLoading(false);
        setIsOpen(true);
      } else {
        setLoading(false);
      }
    });
  };

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      runInAction(() => {
        settings.setIsActive(false);
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const screens = [] //its for testing purpose and main routing file routes.js (equivalent to reactJs app.js)

  const segmentColor = useCallback(() => {
    if (pathname.includes("person")) {
      return {
        backgroundColor: "#107569",
        borderColor: "#0E9384",
        textColor: "#5FE9D0",
        buttonColor: "#0E9384",
        labelColor: "#CCFBEF",
        labelActiveColor: "#F0FDF9",
        segmentName: "person",
      };
    } else if (pathname.includes("product")) {
      return {
        backgroundColor: "#B54708",
        borderColor: "#DC6803",
        textColor: "#FEC84B",
        buttonColor: "#DC6803",
        labelColor: "#FEF0C7",
        labelActiveColor: "#FFFAEB",
        segmentName: "product",
      };
    } else if (pathname.includes("embedded-server")) {
      return {
        backgroundColor: "#363F72",
        borderColor: "#3E4784",
        textColor: "#FFFFFF",
        buttonColor: "#3E4784",
        labelColor: "#D5D9EB",
        labelActiveColor: "#EAECF5",
        segmentName: "machine",
      };
    } else {
      return {
        backgroundColor: "#6941C6",
        borderColor: "#7F56D9",
        textColor: "#E9D7FE",
        buttonColor: "#7F56D9",
        labelColor: "#E9D7FE",
        labelActiveColor: "#F4EBFF",
        segmentName: "machine",
      };
    }
  }, [selectedTab, setSelectedTab, pathname]);
  useEffect(() => {
    setSelectedTab(segmentColor().segmentName);
  }, [pathname]);

  return (
    <>
      <div
        ref={menuRef}
        onMouseEnter={() => {
          if (!isEmbeddedPage) {
            settings.setIsActive(true);
          }
        }}
        onMouseLeave={() => settings?.setIsActive(false)}
        style={{ backgroundColor: segmentColor().backgroundColor }}
        className={`${
          settings?.isActive
            ? "w-[280px] min-w-[280px] p-5 rounded-r-xl shadow-ring-gray"
            : "w-[80px] min-w-[80px] items-center py-5 md:hidden sm:hidden xs:hidden"
        } flex flex-col transition-all duration-150 ease-linear fixed left-0 top-0 bottom-0 z-[200] overflow-hidden`}
      >
        {isEmbeddedPage && (
          <div
            onClick={() => {
              Toast("warning", t("buttons:exitButton"));
            }}
            className="fixed left-0 top-0 bottom-0 w-[80px] min-w-[80px] z-[300] backdrop-blur-sm"
          />
        )}
        {loading && <LoadingOverlay />}
        {settings?.isActive ? (
          <>
            <div onClick={() => navigate("/app/machine/digital-twin")} className="ml-4 cursor-pointer">
              <UpuIoLogo />
            </div>

            <MemorizedTab
              currentColor={segmentColor()}
              selected={selectedTab}
              setSelected={setSelectedTab}
              isAdmin={auth?.user?.rolesKey === "ADMIN" ? true : false}
              setSelectedMrpMes={setSelectedMrpMes}
            />

            {selectedTab === "product" && (
              <div className="flex w-full min-h-[38px] max-h-[38px] h-[38px] mt-2 border border-[#DC6803] rounded-xl p-1 gap-x-2 items-center justify-center text-[#FDB022] font-semibold text-sm">
                <div
                  onClick={() => setSelectedMrpMes("mrp")}
                  className={`flex w-1/2 px-3 py-1  h-full rounded-lg items-center justify-center cursor-pointer  ${
                    selectedMrpMes === "mrp" ? "border border-[#DC6803] bg-[#FEDF89] text-[#B54708]" : "hover:bg-[#DC6803] hover:text-[#FEDF89]"
                  }`}
                >
                  MRP
                </div>
                <div
                  onClick={() => setSelectedMrpMes("mes")}
                  className={`flex w-1/2 px-3 py-1 h-full rounded-lg items-center justify-center cursor-pointer ${
                    selectedMrpMes === "mes" ? "border border-[#DC6803] bg-[#FEDF89] text-[#B54708]" : "hover:bg-[#DC6803] hover:text-[#FEDF89]"
                  }`}
                >
                  MES
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-col">
              {screens?.map(function (e, i) {
                if (e.content) {
                  return e.subRoutes.map((item, index) => {
                    if (item?.roles?.includes(String(auth?.user?.rolesKey))) {
                      if (item.isVisible) {
                        if (selectedTab === "machine") {
                          if (item.package === "machine") {
                            return <LargeCard to={item.path} index={index} item={item} segmentColor={segmentColor()} />;
                          }
                        } else if (selectedTab === "product") {
                          if (item.package === "product") {
                            if ((selectedMrpMes === "mrp" && item.mrpVisible) || (selectedMrpMes === "mes" && item.mesVisible)) {
                              // if (item?.isSubMenu && item?.path == "product/mrp/quality-control") {
                              //   return (
                              //     <ExpandableLargeCard
                              //       to={item.path}
                              //       index={index}
                              //       item={item}
                              //       segmentColor={segmentColor()}
                              //       pathname={pathname}
                              //       setOpenSubHeader={setOpenSubHeader}
                              //       openSubHeader={openSubHeader}
                              //       type="quality-control"
                              //       navigate={navigate}
                              //     />
                              //   );
                              // }
                              if (item?.isSubMenu && item?.path == "product/mrp/stock") {
                                return (
                                  <ExpandableLargeCard
                                    to={item.path}
                                    index={index}
                                    item={item}
                                    segmentColor={segmentColor()}
                                    pathname={pathname}
                                    setOpenSubHeader={setOpenSubHeader}
                                    openSubHeader={openSubHeader}
                                    type="product/mrp/stock"
                                    navigate={navigate}
                                  />
                                );
                              } else if (item?.isSubMenu) {
                                return (
                                  <ExpandableLargeCard
                                    to={item.path}
                                    index={index}
                                    item={item}
                                    segmentColor={segmentColor()}
                                    pathname={pathname}
                                    setOpenSubHeader={setOpenSubHeader}
                                    openSubHeader={openSubHeader}
                                    navigate={navigate}
                                  />
                                );
                              } else {
                                return <LargeCard to={item.path} index={index} item={item} segmentColor={segmentColor()} />;
                              }
                            }
                          }
                        } else if (selectedTab === "person") {
                          if (item.package === "person") {
                            return item?.subRoutes?.map((d, i) => {
                              if (d.isVisible) {
                                return (
                                  <LargeCard
                                    to={`person/${d.path == "dashboard/:dates" ? `dashboard/${moment().format("YYYY-MM-DD")}` : d.path}`}
                                    index={i}
                                    item={d}
                                    segmentColor={segmentColor()}
                                  />
                                );
                              }
                            });
                          }
                        }
                      }
                    }
                  });
                }
              })}
            </div>
            <div className="flex-1 flex-col justify-end flex">
              {selectedTab === "person" ? (
                <>
                  <Link
                    onMouseEnter={() => setIsHover("personnel-list")}
                    onMouseLeave={() => setIsHover(null)}
                    href={"/app/person/person/personnel-list"}
                    
                    
                         className={"h-10 w-full px-3 py-2 flex items-center rounded-lg my-1"}
                    style={({
                      color: pathname === "/app/person/person/personnel-list"  ? segmentColor().labelActiveColor : segmentColor().labelColor,
                      backgroundColor: pathname === "/app/person/person/personnel-list" || isHover === "personnel-list" ? segmentColor().buttonColor : "transparent",
                    })}>
                    <div className="w-7 h-7 flex items-center justify-center">
                      <PersonnelsIcon />
                    </div>
                    <p className="ml-2 font-codec line-clamp-1">User list</p>
                    
                  </Link>
                </>
              ) : selectedTab === "machine" ? (
                <>
                  <Link
                    onMouseEnter={() => setIsHover("node-list")}
                    onMouseLeave={() => setIsHover(null)}
                    href={"/app/machine/node-list"}

                     className={"h-10 w-full px-3 py-2 flex items-center rounded-lg my-1"}
                    style={({
                      color: pathname === "/app/machine/node-list" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                      backgroundColor: pathname === "/app/machine/node-list" || isHover === "node-list" ? segmentColor().buttonColor : "transparent",
                    })} >
                    <div className="w-7 h-7 flex items-center justify-center">
                      <NodeListIcon />
                    </div>
                    <p className="ml-2 font-codec line-clamp-1">Node list</p>  
                  </Link>
                </>
              ) : null}
              {auth?.user?.rolesKey === "OPERATOR" ? null : (
                <Link
                  onMouseEnter={() => setIsHover("settings")}
                  onMouseLeave={() => setIsHover(null)}
                  href={"settings/profile"}
                  passHref
                    className={"h-10 w-full px-3 py-2 flex items-center rounded-lg my-1 mb-4"}
                  style={({
                    color: pathname === "settings/profile" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                    backgroundColor: pathname === "settings/profile" || isHover === "settings" ? segmentColor().buttonColor : "transparent",
                  })}>
                  <div className="w-7 h-7 flex items-center justify-center">
                    <SettingsIcon />
                  </div>
                  <p className="ml-2 font-codec">Settings</p> 
                </Link>
              )}
              <div className="w-full h-16 pt-3 flex items-center pl-1 border-t mb-3" style={{ borderColor: segmentColor().borderColor }}>
                <div className="flex items-center w-full">
                  <img className="w-12 h-9 rounded bg-white" src={generateFileUrl(auth?.user?.company?.image)} />
                  <div className="flex flex-col ml-3">
                    <p className="text-sm font-semibold text-white  w-[140px] overflow-hidden truncate ">{auth?.user?.company?.name}</p>
                    <p className="text-xs text-white/70 mt-0.5 w-[140px] overflow-hidden truncate">{auth?.user?.company?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      changeCompany();
                    }}
                    type="button"
                    onMouseEnter={() => setIsHover("button")}
                    onMouseLeave={() => setIsHover(null)}
                    style={{
                      color: isHover === "button" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                      backgroundColor: isHover === "button" ? segmentColor().buttonColor : "transparent",
                    }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center ml-auto"
                  >
                    <ChangeIcon />
                  </button>
                </div>
              </div>

              <div className="w-full h-16 py-3 flex items-center pl-1 border-t" style={{ borderColor: segmentColor().borderColor }}>
                <div className="flex items-center w-full">
                  <img className="w-10 h-10 rounded-full bg-white" src={generateFileUrl(auth?.user?.avatar)} />
                  <div className="flex flex-col ml-3">
                    <p className="text-sm font-semibold text-white w-[140px] overflow-hidden truncate ">{auth?.user?.name + " " + auth?.user?.lastName}</p>
                    <p className="text-xs text-white/70 mt-0.5 w-[140px] overflow-hidden truncate">{auth?.user?.email}</p>
                  </div>
                  <button
                    onClick={logOut}
                    type="button"
                    onMouseEnter={() => setIsHover("leave")}
                    onMouseLeave={() => setIsHover(null)}
                    style={{
                      color: isHover === "leave" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                      backgroundColor: isHover === "leave" ? segmentColor().buttonColor : "transparent",
                    }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center ml-auto"
                  >
                    <LogoutIcon />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="px-2 flex flex-col items-center h-full">
            <div className="ml-1 mb-3.5">
              <UpuHeaderIcon />
            </div>
            <PackageTab
              closed={true}
              currentColor={segmentColor()}
              selected={selectedTab}
              setSelected={setSelectedTab}
              isAdmin={auth?.user?.rolesKey === "ADMIN" ? true : false}
            />
            {selectedTab === "product" && (
              <div className="flex w-full min-h-[28px] max-h-[28px] h-[28px] mt-2 px-1">
                <div className="flex w-full h-full border border-[#DC6803] rounded-lg bg-[#FEDF89] py-1 items-center justify-center text-[#B54708] font-semibold text-sm">
                  {selectedMrpMes === "mrp" ? "MRP" : "MES"}
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-col gap-2">
              {screens.map(function (e, i) {
                if (e.content) {
                  return e.subRoutes.map((item, index) => {
                    if (item?.roles?.includes(String(auth?.user?.rolesKey))) {
                      if (item.isVisible) {
                        if (selectedTab === "machine") {
                          if (item.package === "machine") {
                            return <Card key={index} to={item.path} item={item} segmentColor={segmentColor()} />;
                          }
                        } else if (selectedTab === "product") {
                          if (item.package === "product") {
                            if ((selectedMrpMes === "mrp" && item.mrpVisible) || (selectedMrpMes === "mes" && item.mesVisible)) {
                              return <Card key={index} to={item.path} item={item} segmentColor={segmentColor()} />;
                            }
                          }
                        } else if (selectedTab === "person") {
                          if (item.package === "person") {
                            return item?.subRoutes?.map((d, i) => {
                              if (d.isVisible) {
                                return <Card key={i} to={`person/${d.path}`} item={d} segmentColor={segmentColor()} />;
                              }
                            });
                          }
                        }
                      }
                    }
                  });
                }
              })}
            </div>
            <div className="flex-1 flex-col justify-end items-center flex">
              {selectedTab === "person" ? (
                <>
                  <Link
                    onMouseEnter={() => setIsHover("personnel-list")}
                    onMouseLeave={() => setIsHover(null)}
                    href={"/app/person/person/personnel-list"}
                     className={"h-10 w-10 flex items-center justify-center rounded-lg my-1"}
                    style={({
                      color: pathname === "/app/person/person/personnel-list" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                      backgroundColor: pathname === "/app/person/person/personnel-list" || isHover === "personnel-list" ? segmentColor().buttonColor : "transparent",
                    })}>
                    <div className="w-7 h-7 flex items-center justify-center">
                      <PersonnelsIcon />
                    </div>
                   
                  </Link>
                </>
              ) : selectedTab === "machine" ? (
                <>
                  <Link
                    onMouseEnter={() => setIsHover("node-list")}
                    onMouseLeave={() => setIsHover(null)}
                    href={"/app/machine/node-list"}
                    
                    className={"h-10 w-10 flex items-center justify-center rounded-lg my-1"}
                    style={({
                        color: pathname === "/app/machine/node-list" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                        backgroundColor: pathname === "/app/machine/node-list" || isHover === "node-list" ? segmentColor().buttonColor : "transparent",
                    })}
                        >
                  
                    <div className="w-7 h-7 flex items-center justify-center">
                      <NodeListIcon />
                    </div>
                    
                  </Link>
                </>
              ) : null}
              {auth?.user?.rolesKey === "OPERATOR" ? null : (
                <Link
                  onMouseEnter={() => setIsHover("settings")}
                  onMouseLeave={() => setIsHover(null)}
                  href={"settings"}
                

                  className={"h-10 w-10 flex items-center justify-center rounded-lg mb-4"}
                  style={({
                      color: pathname === "settings" ? segmentColor().labelActiveColor : segmentColor().labelColor,
                      backgroundColor: pathname === "settings" || isHover === "settings" ? segmentColor().buttonColor : "transparent",
                    })}
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <SettingsIcon />
                  </div>

                </Link>
              )}

              <div className="w-full h-16 pt-3 flex items-center border-t mb-3" style={{ borderColor: segmentColor().borderColor }}>
                <div className="flex items-center w-full">
                  <img className="w-12 h-9 rounded bg-white" src={generateFileUrl(auth?.user?.company?.image)} />
                </div>
              </div>

              <div className="w-full h-16 py-3 flex items-center pl-1 border-t" style={{ borderColor: segmentColor().borderColor }}>
                <div className="flex items-center w-full">
                  <img className="w-10 h-10 rounded-full bg-white" src={generateFileUrl(auth?.user?.avatar)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} modalTitle={t("addCompany:switchCompany")} children={<ChangeCompanyModal setIsOpen={setIsOpen} />} />
    </>
  );
});

export default memo(LeftMenu);
