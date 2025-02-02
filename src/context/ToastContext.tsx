import React, { createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string) => void;
  hideToast: () => void;
  toastMessage: string | null;
  isToastVisible: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
    setToastMessage(null);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, hideToast, toastMessage, isToastVisible }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast Error!");
  }
  return context;
};
