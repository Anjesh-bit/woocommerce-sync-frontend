import { useState, useCallback } from "react";

type ToastType = "success" | "error";

type ToastOptions = {
  title: string;
  message: string | string[];
  type?: ToastType;
};

type ErrorLike = {
  response?: {
    data?: {
      message?: string;
      errors?: string[];
    };
  };
  message?: string;
};

export const useToastManager = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string | string[]>([]);
  const [type, setType] = useState<ToastType>("success");

  const extractErrorInfo = useCallback(
    (error: unknown, fallbackTitle = "Error"): { title: string; message: string | string[] } => {
      const err = error as ErrorLike;
      const { response, message: fallbackMessage } = err;
      const { message = "Something went wrong", errors = [] } = response?.data || {};

      return {
        title: message || fallbackTitle,
        message: errors.length ? errors : message || fallbackMessage || "Unknown error",
      };
    },
    []
  );

  const showToast = useCallback(({ title, message, type = "success" }: ToastOptions) => {
    setTitle(title);
    setMessage(message);
    setType(type);
    setVisible(true);
  }, []);

  const showError = useCallback(
    (error: unknown, fallbackTitle = "Error") => {
      const { title, message } = extractErrorInfo(error, fallbackTitle);
      showToast({ title, message, type: "error" });
    },
    [extractErrorInfo, showToast]
  );

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    toastProps: {
      visible,
      title,
      message,
      type,
      onClose: hideToast,
    },

    showToast,
    showError,
    hideToast,
  };
};
