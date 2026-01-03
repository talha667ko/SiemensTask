import "./App.css";
import {
  IxApplication,
  IxApplicationHeader,
  IxMenu,
  IxMenuItem,
  IxContent,
  IxContentHeader,
} from "@siemens/ix-react";

function App() {
  return (
    <IxApplication>
      <IxApplicationHeader name="My Application">
        <div className="placeholder-logo" slot="logo"></div>
      </IxApplicationHeader>

      <IxMenu>
        <IxMenuItem>Item 1</IxMenuItem>
        <IxMenuItem>Item 2</IxMenuItem>
      </IxMenu>

      <IxContent>
        <IxContentHeader
          slot="header"
          headerTitle="My Content Page"
        ></IxContentHeader>
      </IxContent>
    </IxApplication>
  );
}

export default App;
