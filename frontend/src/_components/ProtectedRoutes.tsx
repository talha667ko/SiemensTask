import { useEffect, type ReactNode } from "react";
import { useVerifySession } from "../hooks/useAuth";
import { IxSpinner } from "@siemens/ix-react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useVerifySession();
  const navigation = useNavigate();
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
