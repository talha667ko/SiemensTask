export interface ProjectsRow {
  classified: boolean;
  project_number: string;
  project_name: string;
  materials_count: number;
}

export interface ClassifiedRow {
  projectNumber: string;
  projectName: string;
  materialsCount: number;
  date: string;
  classifiedBy: string;
}

export interface MaterialsRow {
  materialNumber: string;
  classification: string;
  classifiedBy: string;
  classificationDate: string;
}
