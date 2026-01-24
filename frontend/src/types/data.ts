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

export interface ProjectJSON {
  id: number;
  classified: boolean;
  project_number: string;
  project_name: string;
  materials_count: number;
  classification_date_time: string;
  classified_by: string;
}

export interface MaterialJSON {
  id: number;
  created_at: string;
  material_number: string;
  classification: string;
  classified_by: string;
  classification_date_time: string;
  project_id: number;
}

export interface ProjectData {
  id: number;
  classified: boolean;
  project_number: string;
  project_name: string;
  materials_count: number;
}

export interface ClassifiedProjectData {
  id: number;
  classified: boolean;
  project_number: string;
  project_name: string;
  materials_count: number;
  classification_date_time: string;
  classified_by: string;
}

export interface ProjectDetails {
  id: number;
  project_number: string;
  project_name: string;
  materials_count: number;
  classified: boolean;
  classified_materials_data_of_project: {
    material_number: string;
    classification: string;
    classification_date_time: string;
    classified_by: string;
  }[];
}

export interface MaterialClasses {
  project_id: number;
  project_number: string;
  materials: Array<{
    material_number: string;
    classification: string;
  }>;
  classified_by: string;
}
