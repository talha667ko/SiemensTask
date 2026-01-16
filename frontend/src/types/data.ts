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

export interface ProjectDetails {
  id: number;
  project_number: string;
  project_name: string;
  materials_count: number;
  classified: number;
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
