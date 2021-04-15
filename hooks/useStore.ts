import { useContext } from "react";
import { RootStore, StoreContext } from "../stores";

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};

export default useStore;
