import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginData } from "../types/auth";
import { supabase } from "../supabase/auth-client";
import { showToast } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
  userProfile: (userEmail: string) =>
    [...authKeys.all, "profile", userEmail] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => {
      return supabase.auth.getUser();
    },
    staleTime: Infinity,
    retry: false,
  });
}

export function useLogin() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (credential: LoginData) => {
      console.log("data arrived");
      const response = await supabase.auth.signInWithPassword({
        email: credential.email,
        password: credential.password,
      });

      if (response.error) {
        console.log("response error");

        throw response.error;
      }

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser(), data);
      navigation("/dashboard");
      console.log("success");
    },
    onError: (error: AuthError) => {
      showToast({
        title: t("project.toast.errorTitle"),
        message: error.message,
        type: "error",
      });
    },
  });
}
