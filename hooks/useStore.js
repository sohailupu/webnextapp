import { useContext } from "react";
import { StoreContext } from "../context/storeContext";

export const useStore = () => useContext(StoreContext);
