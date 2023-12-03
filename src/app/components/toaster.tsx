"use client";

import {
  Toast,
  ToastTitle,
  useToastController,
} from "@fluentui/react-components";

export default function CustomToaster(props: CustomToasterProps) {
  return (
    <>
      <Toast>
        <ToastTitle>{props.text}</ToastTitle>
      </Toast>
    </>
  );
}
