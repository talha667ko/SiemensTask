export interface ProjectsRow {
  classified: boolean;
  project_number: string;
  project_name: string;
  materials_count: number;
}

export interface ClassifiedRow {
  project_number: string;
  project_name: string;
  materials_count: number;
  classification_date_time: string;
  classified_by: string;
}

export interface MaterialsRow {
  material_number: string;
  classification: string;
  classified_by: string;
  classification_date_time: string;
}
