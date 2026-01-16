import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { getIxTheme } from "@siemens/ix-aggrid";
import * as agGrid from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export const ixThemeSpecial = getIxTheme(agGrid);
