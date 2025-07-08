import { Notification } from "@mantine/core";

import { CheckSvg, XSvg } from "../../../assets/static/icons";

type ToastType = "success" | "error";

type ToastProps = {
  visible: boolean;
  title: string;
  message: string | string[];
  type?: ToastType;
  onClose: () => void;
};

export const Toast = ({ visible, title, message, type = "success", onClose }: ToastProps) => {
  if (!visible) return null;

  const isErrorType = type === "error";
  const messageArray = Array.isArray(message) ? message : [message];

  return (
    <Notification
      title={title}
      icon={isErrorType ? <XSvg /> : <CheckSvg />}
      color={isErrorType ? "red" : "yellow"}
      onClose={onClose}
      withCloseButton
      mt="md"
      styles={{
        root: {
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: 500,
        },
      }}
    >
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {messageArray.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </Notification>
  );
};
