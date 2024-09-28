import React, { memo, useCallback } from "react";
import { Controller } from "react-hook-form";
import Button from "../buttons/Button";
import Input from "../inputs/Input";
import Selector from "../inputs/Selector";
import KpiInput from "../inputs/KpiInput";


const ProcessInfo = ({
  control,
  t,
  setIsOpen,
  setValue,
  setSelectedTab,
  setEquipmentType,
  errors,
}) => {
  const options = [
    { value: "decomposition_operation", label: t("addProcess:decomposition") },
    { value: "assembly_operation", label: t("addProcess:assembly") },
    { value: "conversion_operation", label: t("addProcess:conversion") },
    { value: "supporter_operation", label: t("addProcess:supporter") },

    // { value: "automatic_equipment", label: t("equipmentTypes:automatic") },
    // { value: "manual_equipment", label: t("equipmentTypes:manuel") },
    // { value: "passive_equipment", label: t("equipmentTypes:passive") },
    // { value: "assembly_equipment", label: t("equipmentTypes:assembly") },
    // { value: "hand_tools_equipment", label: t("equipmentTypes:handTools") },
  ];

  const MemoizedButton = React.memo(Button, (prevProps, nextProps) => {
    return (
      prevProps.label === nextProps.label &&
      prevProps.colorType === nextProps.colorType &&
      prevProps.onClick === nextProps.onClick
    );
  });

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleNext = useCallback(() => {
    setSelectedTab("processResponsible");
  }, [setSelectedTab]);

  return (
    <>
      <div className="flex flex-col h-full w-full gap-6 pt-6">
        <div className="w-full h-full flex-row flex justify-between items-start gap-6 xs:flex-col xs:h-[415px] overflow-auto scrollbar-hide">
          {/*first container*/}
          <div className="flex flex-col items-start gap-4 w-full">
            <Controller
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  label={t("addProcess:processName")}
                  placeholder={t("addProcess:processName")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  height="200px"
                  disabled={false}
                  validate={errors.name ? "error" : ""}
                  errorMessage={errors.name ? errors.name.message : ""}
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              render={({ field: { onBlur, value } }) => (
                <Selector
                  items={options}
                  label={t("addProcess:type")}
                  lable={t("addProcess:type")}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    setValue("type", e);
                    setEquipmentType(e);
                  }}
                  height="200px"
                  validate={errors.type ? "error" : ""}
                  errorMessage={errors.type ? errors.type.message : ""}
                />
              )}
              name="type"
            />

            <Controller
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  label={t("product:costOfMinute")}
                  placeholder={t("product:costOfMinute")}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(
                      /[^0-9.]/g,
                      ""
                    );
                    const isValidInput = /^\d*\.?\d*$/.test(sanitizedValue);
                    if (isValidInput) {
                      onChange(sanitizedValue);
                    }
                  }}
                  onBlur={onBlur}
                  value={value}
                  height="200px"
                  disabled={false}
                  validate={errors.costOfMinute ? "error" : ""}
                  errorMessage={
                    errors.costOfMinute ? errors.costOfMinute.message : ""
                  }
                />
              )}
              name="costOfMinute"
            />
          </div>

          {/*act as divider*/}
          <div className=" h-full border border-solid border-[#EAECF0] xs:hidden dark:border-[#292929]" />

          {/*second container*/}
          <div className={`w-full h-full flex flex-col gap-y-4 `}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KpiInput
                  label={t("addProcess:utilization")}
                  // placeholder="10"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  validate={errors.utilization ? "error" : ""}
                  errorMessage={
                    errors.utilization ? errors.utilization.message : ""
                  }
                />
              )}
              name="utilization"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KpiInput
                  label={t("addProcess:measurable")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  validate={errors.measurable ? "error" : ""}
                  errorMessage={
                    errors.measurable ? errors.measurable.message : ""
                  }
                />
              )}
              name="measurable"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KpiInput
                  label={t("addProcess:performance")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  validate={errors.performance ? "error" : ""}
                  errorMessage={
                    errors.performance ? errors.performance.message : ""
                  }
                />
              )}
              name="performance"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <KpiInput
                  label={t("addProcess:avaibility")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  validate={errors.availability ? "error" : ""}
                  errorMessage={
                    errors.availability ? errors.availability.message : ""
                  }
                />
              )}
              name="availability"
            />
          </div>
        </div>

        <div className="w-full flex flex-row gap-3 items-center">
          <MemoizedButton
            label={t("buttons:stop")}
            colorType={"secondary-gray"}
            onClick={handleCancel}
          />
          <MemoizedButton
            label={t("buttons:next")}
            colorType={"primary-machine"}
            onClick={handleNext}
          />
        </div>
      </div>
    </>
  );
};

export default memo(ProcessInfo);
