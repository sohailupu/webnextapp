import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Toast } from "../../utils/toastify/toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { processService } from "../../services/process.service";
import TabModal from "../modals/TabModal";
import ProcessInfo from "./ProcessInfo";
import OperationIcon from "./OperationIcon";
import ProcessResponsible from "./ProcessResponsible";

const AddProcessModal = observer(
  ({ data, setIsOpen, selectedProcess, handleData }) => {
    const { t } = useTranslation();
    const [icons, setIcons] = useState([]);
    const [tempIcons, setTempIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedTab, setSelectedTab] = useState("process");
    const [selectedPersonal, setSelectedPersonal] = useState([]);
    const [equipmentType, setEquipmentType] = useState("automatic_equipment");
    const schema = yup.object({
      name: yup
        .string()
        .required(`${t("validation:empty")}`)
        .typeError(`${t("validation:string")}`),
      iconKey: yup.string(),
      // ---------Kpi Values ---------
      utilization: yup
        .number()
        .min(0, `${t("validation:min0")}`)
        .max(30, `${t("validation:max30")}`)
        .required(`${t("validation:empty")}`)
        .typeError(`${t("validation:number")}`),

      measurable: yup
        .number()
        .min(0, `${t("validation:min0")}`)
        .max(30, `${t("validation:max30")}`)
        .required(`${t("validation:empty")}`)
        .typeError(`${t("validation:number")}`),
      performance: yup
        .number()
        .min(0, `${t("validation:min0")}`)
        .max(30, `${t("validation:max30")}`)
        .required(`${t("validation:empty")}`)
        .typeError(`${t("validation:number")}`),
      availability: yup
        .number()
        .min(0, `${t("validation:min0")}`)
        .max(30, `${t("validation:max30")}`)
        .required(`${t("validation:empty")}`)
        .typeError(`${t("validation:number")}`),
      // ---------Process Type ---------
      type: yup.string(),
      costOfMinute: yup
        .number()
        .required(`${t("validation:empty")}`)
        .typeError(`${t("validation:number")}`),
    });

    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const defaultValues = {
      id: "",
      name: "",
      workTolerance: "0",
      utilization: "10",
      availability: "10",
      measurable: "10",
      performance: "10",
      iconKey: "",
      responsibleUser: [],
    };

    const onSubmit = async (data) => {
      const sendData = {
        ...data,
        personals: selectedPersonal.map((item) => item?.id),
      };
      if (selectedProcess && selectedProcess?.id) {
        await processService
          .updateProcess(selectedProcess?.id, sendData)
          .then((response) => {
            handleData();
            setIsOpen(false);
            Toast("success", t("addProcess:updatedProcessMessage"));
          });
      } else {
        await processService.addProcess(sendData).then((response) => {
          if (response?.data?.code == 0) {
            handleData();
            setIsOpen(false);
            Toast("success", t("addProcess:addedNewProcessMessage"));
          } else if (response?.data?.code == 2) {
            setIsOpen(false);
            Toast("error", t("addProcess:noLimit"));
          } else if (response?.data?.code == 3) {
            handleData();
            setIsOpen(false);
            Toast("success", t("addProcess:processAddedButLimit"));
          } else {
            setIsOpen(false);
            Toast("error", t("product:errors"));
          }
        });
      }
    };

    const handleIcons = async () => {
      const { data } = await processService.getIcons();
      setIcons(data);
      setTempIcons(data);
    };

    useEffect(() => {
      handleIcons();
      if (selectedProcess && selectedProcess?.id) {
        //edit mode
        setValue("name", selectedProcess?.name);
        setValue("utilization", selectedProcess?.utilization);
        setValue("availability", selectedProcess?.availability);
        setValue("measurable", selectedProcess?.measurable);
        setValue("performance", selectedProcess?.performance);
        setValue("iconKey", selectedProcess?.iconKey);
        setSelectedIcon(selectedProcess?.iconKey);
        setValue("type", selectedProcess?.type);
        setValue("costOfMinute", selectedProcess?.costOfMinute);
        setEquipmentType(selectedProcess?.type);
        setSelectedPersonal(selectedProcess?.responsibleUser);
      } else {
        //new
        setValue("name", defaultValues?.name);
        setValue("utilization", defaultValues?.utilization);
        setValue("availability", defaultValues?.availability);
        setValue("measurable", defaultValues?.measurable);
        setValue("performance", defaultValues?.performance);
        setValue("iconKey", defaultValues?.iconKey);
        setValue("type", defaultValues?.type);
        setValue("costOfMinute", defaultValues?.costOfMinute);
        setEquipmentType(defaultValues?.type);
        setValue("personals", defaultValues?.responsibleUser);
      }
    }, [selectedProcess, setValue]);

    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-screen h-[542px] xs:w-[335px] xs:h-[656px] xs:overflow-hidden sm:w-[500px] md:w-[700px] sm:max-h-[500px] md:max-h-[520px] max-w-[800px] max-h-[570px] min-h-[450px]  xs:flex-col flex gap-x-4 scrollbar-hide"
        >
          <TabModal
            tabData={[
              {
                name: t("addProcess:processInfo"),
                value: "process",
                component: (
                  <ProcessInfo
                    t={t}
                    control={control}
                    setValue={setValue}
                    setIsOpen={setIsOpen}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    equipmentType={equipmentType}
                    setEquipmentType={setEquipmentType}
                    errors={errors}
                  />
                ),
              },
              {
                name: t("routes:processResponsible"),
                value: "processResponsible",
                component: (
                  <ProcessResponsible
                    t={t}
                    setIsOpen={setIsOpen}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    selectedPersonals={selectedPersonal}
                    setSelectedPersonals={setSelectedPersonal}
                    errors={errors}
                    handleData={handleData}
                    selectedProcess={selectedProcess}
                    responsible={true}
                  />
                ),
              },
              {
                name: t("addProcess:processIcon"),
                value: "processIcon",
                component: (
                  <OperationIcon
                    t={t}
                    icons={icons}
                    onSubmit={onSubmit}
                    setIcons={setIcons}
                    tempIcons={tempIcons}
                    setSelectedTab={setSelectedTab}
                    setValue={setValue}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                  />
                ),
              },
            ]}
            width="1/3"
            data={data}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </form>
      </>
    );
  }
);

export default AddProcessModal;
