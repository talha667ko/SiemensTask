import "./Home.css";
import { IxContentHeader } from "@siemens/ix-react";

export default function Home() {
  return (
    <>
      <IxContentHeader slot="header" headerTitle="Dashboard"></IxContentHeader>
      <IxContentHeader
        lang="tr"
        slot="header"
        headerTitle="Kontrol paneli"
      ></IxContentHeader>
    </>
  );
}
