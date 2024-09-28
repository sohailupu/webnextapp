import React, { memo, useEffect } from "react";
import Modal from "react-modal";
import Button from "../buttons/Button";
import { settingsStore } from "../../stores/settings.store";
import CloseButton from "../buttons/CloseButton";
import Badgets from "../buttons/Badgets";
import { ArrowLeft } from "../../public/icons/component/modalIcons";

const CustomModal = ({
  children,
  isOpen,
  setIsOpen,
  modalTitle,
  width,
  onClose,
  height,
  isPreventShutdown = false,
  isBadges = false,
  badgesValue = "",
  badgesColor = "fill-warning",
  badgesSize = "md",
  subTitle,
  navigateButton,
  navigateOnClick,
  titleButton,
  buttonColorType,
  buttonLabel,
  buttonSize,
  buttonIcon,
  buttonClassName,
  buttonOnClick,
}) => {
    
  useEffect(() => {
    Modal.setAppElement('#__next'); // main app element id
  }, []);

  function closeModal() {
    if (!isPreventShutdown) {
      setIsOpen(false);
    }
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 24,
      zIndex: 99999,
      borderRadius: "12px",
      width: width || "fit-content",
      height: height || "auto",
      backgroundColor: settingsStore.theme === "light" ? "#FFF" : "#0F0F0F",
      borderColor: settingsStore.theme === "light" ? "#FFF" : "#424242",
      overflow: "hidden",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose ? onClose : closeModal}
      style={customStyles}
      overlayClassName="fixed inset-0 flex items-center justify-center bg-[#0F0F0F] bg-opacity-50 backdrop-blur-[4px] z-[999]"
    >
      <div className="w-full h-full relative flex flex-col ">
        <div className="flex w-full items-center justify-center">
          <div className={`flex flex-row relative items-center w-full ${isBadges && "gap-x-4"}`}>
            {subTitle ? (
              <div className="flex w-full justify-between pr-[40px] flex-col gap-y-1">
                <p className="text-xl font-semibold text-secondary-900 dark:text-[#FAFAFA]">{modalTitle}</p>
                <p className="text-[#475467] text-sm font-normal">{subTitle}</p>
              </div>
            ) : (
              <>
                {navigateButton === true ? (
                  <div className="flex flex-row items-center gap-x-1">
                    <Button iconLeft={<ArrowLeft />} colorType={"tertiary-gray"} onClick={navigateOnClick} />
                    <p className="text-xl font-semibold text-secondary-900 dark:text-[#FAFAFA]">{modalTitle}</p>
                  </div>
                ) : (
                  <p className="text-xl font-semibold text-secondary-900 dark:text-[#FAFAFA]">{modalTitle}</p>
                )}
              </>
            )}

            {isBadges && <Badgets size={badgesSize} label={badgesValue} colorType={badgesColor} />}
          </div>
          {titleButton && (
            <div className="flex pr-[30px] items-center justify-center">
              <Button
                colorType={buttonColorType}
                size={buttonSize}
                iconLeft={buttonIcon}
                label={buttonLabel}
                className={buttonClassName}
                onClick={buttonOnClick}
              />
            </div>
          )}
        </div>

        <div className="w-full h-full"> {children}</div>
        {!isPreventShutdown && (
          <div className="absolute -right-4 -top-2">
            <CloseButton onClick={onClose ? onClose : closeModal} size={"lg"} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default memo(CustomModal);
