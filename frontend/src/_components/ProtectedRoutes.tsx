import { useEffect, type ReactNode } from "react";
import { useVerifySession } from "../hooks/useAuth";
import { IxSpinner } from "@siemens/ix-react";
import { useSmartNavigate } from "../hooks/useSmartNavigate";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useVerifySession();
  const navigation = useSmartNavigate();
  useEffect(() => {
    if (!isLoading && !session) {
      navigation("/login");
    }
  }, [session, isLoading, navigation]);

  if (isLoading) {
    return (
      <main>
        <IxSpinner />
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
