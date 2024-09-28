import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Toggle = ({ enabled, setEnabled, color, size }) => {
  return (
    <>
      {size === "sm" ? (
        <div className="w-[36px] min-w-[36px] max-w-[36px] h-[20px] min-h-[20px] max-h-[20px] rounded-full flex items-center">
          <div
            checked={enabled}
            onClick={() => setEnabled(!enabled)}
            className={classNames(
              enabled ? `${color ? `bg-[${color}]` : "bg-primary-700"}` : "bg-[#F2F4F7]",
              "relative inline-flex flex-shrink-0 h-5 min-w-[36px] border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? "translate-x-[18px]" : "translate-x-[2px]",
                "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 my-auto"
              )}
            />
          </div>
        </div>
      ) : (
        <div className="w-[44px] min-w-[44px] max-w-[44px] h-[24px] min-h-[24px] max-h-[24px] rounded-full flex items-center">
          <div
            checked={enabled}
            onClick={() => setEnabled(!enabled)}
            className={classNames(
              enabled ? `${color ? `bg-[${color}]` : "bg-primary-700"}` : "bg-[#F2F4F7]",
              "relative inline-flex flex-shrink-0 h-6 min-w-[44px] border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? "translate-x-5" : "translate-x-1",
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 my-auto"
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Toggle;
