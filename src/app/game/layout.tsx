"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import {
  FluentProvider,
  Spinner,
  Toaster,
  teamsLightTheme,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error: loginError, isLoading: authLoading } = useUser();
  const router = useRouter();

  // This will ensure that all nested routes are auth protected
  if (authLoading) {
    return (
      <FluentProvider theme={teamsLightTheme}>
        <Spinner />
      </FluentProvider>
    );
  }

  if (loginError || !user) {
    // add toast or some log
    router.push("/api/auth/login");
    // where will this redirect after login flow ends? I think to just /
    return;
  }

  if (user) {
    return (
      <FluentProvider theme={teamsLightTheme}>
        <Toaster toasterId="toaster" />
        {children}
      </FluentProvider>
    );
  }
  return;
}
