export interface ProjectsRow {
  classified: boolean;
  projectNumber: string;
  projectName: string;
  materialsCount: number;
}

export interface ClassifiedRow {
  projectNumber: string;
  projectName: string;
  materialsCount: number;
  date: string;
  classifiedBy: string;
}
