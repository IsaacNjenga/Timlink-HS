import { createContext, useContext, useState } from "react";

const PopContext = createContext(null);

export const PopProvider = ({ children }) => {
  const [openConfirm, setOpenConfirm] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const value = {
    openConfirm,
    setOpenConfirm,
    confirmLoading,
    setConfirmLoading,
  };

  return <PopContext.Provider value={value}>{children}</PopContext.Provider>;
};

export const usePop = () => useContext(PopContext);
