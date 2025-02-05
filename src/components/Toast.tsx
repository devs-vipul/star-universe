import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const Toast: React.FC = () => {
  const { toastMessage, isToastVisible, hideToast } = useToast();

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isToastVisible, hideToast]);

  if (!isToastVisible) return null;

  return (
    <div className="toast flex items-center gap-4 fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-background-active text-white font-medium px-4 py-2 rounded-lg shadow-lg animate-slide-up">
      {toastMessage}
      <X
        className="cursor-pointer"
        size={18}
        onClick={() => {
          hideToast();
        }}
      />
    </div>
  );
};

export default Toast;
