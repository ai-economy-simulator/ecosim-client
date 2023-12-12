import {
  Link,
  Toast,
  ToastIntent,
  ToastTitle,
  ToastTrigger,
} from "@fluentui/react-components";

export const toast = (
  dispatchToast: any,
  text: string,
  intent: ToastIntent,
  timeout: number = 3000,
) => {
  dispatchToast(
    <>
      <Toast>
        <ToastTitle
          action={
            timeout <= 0 ? (
              <ToastTrigger>
                <Link>Dismiss</Link>
              </ToastTrigger>
            ) : (
              <></>
            )
          }
        >
          {text}
        </ToastTitle>
      </Toast>
    </>,
    {
      intent: intent,
      timeout: timeout,
    },
  );
};
