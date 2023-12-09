"use client";

import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

const localUserRandomizer = Math.floor(Math.random() * 100);

export default function customUseUser() {
  const [localUser, setLocalUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setLocalUser({
      email: `localuser.${localUserRandomizer}@test.com`,
      email_verified: null,
      name: `localuser ${localUserRandomizer}`,
      nickname: "localuser",
      picture: null,
      sub: "",
      updated_at: "2023-12-08T19:19:48.186Z",
      org_id: null,
    });
  }, []);

  if (process.env.NODE_ENV === "production") {
    return useUser();
  }

  return {
    user: localUser,
    error: undefined,
    isLoading: isLoading,
  };
}
