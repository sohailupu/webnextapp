import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "../buttons/Button";
import { personalService } from "../../services/personal.services";
import generateFileUrl from "../../utils/generateFileUrl";
import SearchInput from "../inputs/SearchInput";

// import ResponsibleUserCard from "../components/ResponsibleUserCard";
// import UserCardSkeleton from "../../skeletons/UserCardSkeleton";

const MemoizedSearchInput = React.memo(SearchInput, (prevProps, nextProps) => {
  return prevProps.setSearchVal === nextProps.setSearchVal;
});

const ProcessResponsible = observer(
  ({
    t,
    setSelectedTab,
    setIsOpen,
    selectedPersonals,
    responsible,
    setSelectedPersonals,
  }) => {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const triggerUser = useCallback(
      (user) => {
        if (selectedPersonals.find((item) => item?.id === user?.id)) {
          setSelectedPersonals(
            selectedPersonals.filter((item) => item?.id !== user?.id)
          );
        } else {
          setSelectedPersonals([...selectedPersonals, user]);
        }
      },
      [selectedPersonals, setSelectedPersonals]
    );

    useEffect(() => {
      if (searchValue) {
        const filteredData = users?.filter((user) =>
          user?.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filteredData);
      } else {
        setFilteredUsers(users);
      }
    }, [searchValue, users]);

    const handlePersonals = async () => {
      const { data } = await personalService.activePersonals();
      const updatedUsers = data.map((d) => {
        return {
          id: d?.id,
          name: d?.name + " " + d?.lastName,
          avatar: generateFileUrl(d?.avatar),
          department: d?.metadata?.department?.name || "Tanimsiz",
        };
      });

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    };

    const MemoizedResponsibleUserCard = React.memo(
      ResponsibleUserCard,
      (prevProps, nextProps) => {
        return (
          prevProps?.selected === nextProps?.selected &&
          prevProps?.userName === nextProps?.userName &&
          prevProps?.avatar === nextProps?.avatar &&
          prevProps?.description === nextProps?.description
        );
      }
    );

    const MemoizedResponsibleUserCardResponsive = React.memo(
      ResponsibleUserCard,
      (prevProps, nextProps) => {
        return (
          prevProps?.selected === nextProps?.selected &&
          prevProps?.userName === nextProps?.userName &&
          prevProps?.avatar === nextProps?.avatar &&
          prevProps?.description === nextProps?.description
        );
      }
    );

    const MemoizedButton = React.memo(Button, (prevprops, nextProps) => {
      return (
        prevprops?.label === nextProps?.label &&
        prevprops?.colorType === nextProps?.colorType &&
        prevprops?.onClick === nextProps?.onClick
      );
    });

    const handlePrevious = useCallback(() => {
      setSelectedTab("process");
    }, [setSelectedTab]);

    const handleNext = useCallback(() => {
      setSelectedTab("processIcon");
    }, [setSelectedTab]);

    const handleCancel = useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    const handleSave = useCallback(() => {}, []);

    useEffect(() => {
      handlePersonals();
    }, []);

    const generateSkeleton = (length) => {
      return Array?.from({ length })?.map((_, index) => (
        <UserCardSkeleton key={index} />
      ));
    };

    const noData = filteredUsers?.length === 0;
    const isLoading = users?.length === 0;

    //setting users based on oddEven
    const memoizedEvenUsers = useMemo(() => {
      return filteredUsers.map((e, i) => {
        return i % 2 === 0 ? (
          <MemoizedResponsibleUserCardResponsive
            border
            key={e?.id}
            userName={e?.name}
            avatar={e?.avatar}
            description={e?.department}
            selected={selectedPersonals?.find((a) => e?.id === a?.id)}
            onClick={() => {
              triggerUser(e);
            }}
          />
        ) : null;
      });
    }, [
      selectedPersonals,
      filteredUsers,
      triggerUser,
      MemoizedResponsibleUserCardResponsive,
    ]);

    const memoizedOddUsers = useMemo(() => {
      return filteredUsers?.map((e, i) => {
        return i % 2 !== 0 ? (
          <MemoizedResponsibleUserCard
            key={e?.id}
            userName={e?.name}
            avatar={e?.avatar}
            description={e?.department}
            selected={selectedPersonals?.find((a) => e?.id === a?.id)}
            onClick={() => {
              triggerUser(e);
            }}
          />
        ) : null;
      });
    }, [
      selectedPersonals,
      filteredUsers,
      triggerUser,
      MemoizedResponsibleUserCard,
    ]);

    //prevent from overlaping on small sized screen
    const responsiveData = useMemo(() => {
      return filteredUsers?.map((e, i) => {
        return (
          <MemoizedResponsibleUserCard
            key={e?.id}
            userName={e?.name}
            avatar={e?.avatar}
            description={e?.department}
            selected={selectedPersonals?.find((a) => e?.id === a?.id)}
            onClick={() => {
              triggerUser(e);
            }}
          />
        );
      });
    }, [
      selectedPersonals,
      filteredUsers,
      triggerUser,
      MemoizedResponsibleUserCard,
    ]);

    return (
      <>
        <div className="flex flex-col w-full h-full gap-6 pt-6 sm:pt-3 xs:pt-3 xs:h-[480px]">
          <div className="h-full flex flex-col w-full gap-5 xs:gap-3">
            <MemoizedSearchInput
              placeholder={t("addPersonal:searchInput")}
              setSearchVal={setSearchValue}
            />
            <div className="h-[303px] w-full flex flex-row border-b items-center overflow-y-auto scrollbar-hide xs:hidden dark:border-[#292929]">
              <div className="flex flex-col w-full h-full">
                {isLoading ? (
                  generateSkeleton(6)
                ) : noData ? (
                  <UserCardSkeleton />
                ) : (
                  memoizedEvenUsers
                )}
              </div>
              <div className="flex flex-col w-full h-full ml-4">
                {isLoading ? (
                  generateSkeleton(6)
                ) : noData ? (
                  <UserCardSkeleton />
                ) : (
                  memoizedOddUsers
                )}
              </div>
            </div>
            {/*data visible on small screens*/}
            <div className="xs:flex flex-col w-full xs:h-[355px] hidden overflow-y-scroll">
              {isLoading ? (
                generateSkeleton(6)
              ) : noData ? (
                <UserCardSkeleton />
              ) : (
                responsiveData
              )}
            </div>
          </div>
          <div className="w-full h-11 flex flex-row gap-3 items-center mb-1">
            {responsible === true ? (
              <>
                <MemoizedButton
                  label={t("buttons:prev")}
                  colorType={"secondary-gray"}
                  onClick={handlePrevious}
                />
                <MemoizedButton
                  label={t("buttons:next")}
                  colorType={"primary-machine"}
                  onClick={handleNext}
                />
              </>
            ) : (
              <>
                <MemoizedButton
                  label={t("buttons:stop")}
                  colorType={"secondary-gray"}
                  onClick={handleCancel}
                />
                <MemoizedButton
                  label={t("buttons:save")}
                  colorType={"primary-machine"}
                  onClick={handleSave}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default memo(ProcessResponsible);
