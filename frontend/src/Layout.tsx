import {
  IxApplication,
  IxApplicationHeader,
  IxMenu,
  IxMenuItem,
  IxContent,
  IxDropdownItem,
  IxAvatar,
  IxDropdownButton,
} from "@siemens/ix-react";
import {
  iconGlobe,
  iconHome,
  iconList,
  iconProject,
  iconProjectHistory,
} from "@siemens/ix-icons/icons";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <IxApplication>
      <IxApplicationHeader
        className="ix-header"
        name="Project materials management"
      >
        <div className="logo" slot="logo">
          <img className="image" src="./siemensBig.png" alt="" />
        </div>

        <IxDropdownButton
          variant="subtle-tertiary"
          label="Languages"
          icon={iconGlobe}
        >
          <IxDropdownItem label="Turkish"></IxDropdownItem>
          <IxDropdownItem label="English"></IxDropdownItem>
        </IxDropdownButton>
        <IxAvatar username="Talha Korkmaz" extra="User">
          <IxDropdownItem label="Settings"></IxDropdownItem>
        </IxAvatar>
      </IxApplicationHeader>

      <IxMenu>
        <IxMenuItem home icon={iconHome}>
          Dashboard
        </IxMenuItem>
        <IxMenuItem icon={iconProject}>Projects</IxMenuItem>
        <IxMenuItem icon={iconProjectHistory}>Classified projects</IxMenuItem>
        <IxMenuItem icon={iconList}>Materials</IxMenuItem>
      </IxMenu>

      <IxContent>
        <Outlet />
      </IxContent>
    </IxApplication>
  );
}
