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
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  const navigation = useNavigate();

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
        <IxMenuItem
          onClick={() => navigation("/dashboard")}
          home
          icon={iconHome}
        >
          Dashboard
        </IxMenuItem>
        <IxMenuItem
          onClick={() => navigation("/classifymaterials")}
          icon={iconProject}
        >
          Projects
        </IxMenuItem>
        <IxMenuItem
          onClick={() => navigation("/viewclassifications")}
          icon={iconProjectHistory}
        >
          Classified projects
        </IxMenuItem>
        <IxMenuItem onClick={() => navigation("/dashboard")} icon={iconList}>
          Materials
        </IxMenuItem>
      </IxMenu>

      <IxContent>
        <Outlet />
      </IxContent>
    </IxApplication>
  );
}
