import { useQueryClient } from "@tanstack/react-query";
import { createContext, type ReactNode, useEffect, useContext } from "react";
import { useCurrentUser, authKeys } from "../hooks/useAuth";
import type { AuthContextType } from "../types/auth";
import { supabase } from "../supabase/auth-client";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useCurrentUser();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      console.log("Auth Event:", event);

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      } else if (event === "SIGNED_OUT") {
        queryClient.setQueryData(authKeys.currentUser(), null);
        queryClient.removeQueries({ queryKey: authKeys.currentUser() });
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, [queryClient]);
  const user = data?.data?.user ?? null;

  return (
    <AuthContext.Provider value={{ user, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
