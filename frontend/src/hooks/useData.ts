import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/auth-client";

export const dataKeys = {
  all: ["projects"] as const,
  lists: () => [...dataKeys.all, "lists"] as const,
  classified: () => [...dataKeys.lists(), "classified"] as const,

  details: () => [...dataKeys.all, "details"] as const,
  detail: (id: string) => [...dataKeys.details(), id] as const,
};

export function useProjectsData() {
  return useQuery({
    queryKey: dataKeys.lists(),
    queryFn: async () => {
      console.log("Fetching projects...");
      const { data, error } = await supabase
        .from("latest_projects_data")
        .select(
          "id, project_number, project_name, classified, materials_count"
        );

      if (error) throw error;

      return data;
    },
  });
}

export function useClassifiedProjectsData() {
  return useQuery({
    queryKey: dataKeys.classified(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("latest_projects_data")
        .select(
          "id, project_number, project_name, classified, materials_count, classification_date_time"
        )
        .eq("classified", false);

      if (error) throw error;

      return data;
    },
  });
}

export function useProjectDetails(number: string) {
  return useQuery({
    queryKey: dataKeys.detail(number),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("latest_projects_data")
        .select(
          "id, project_number, project_name, materials_count, classified, classified_materials_data_of_project( material_number, classification, classification_date, classified_by)"
        )
        .eq("project_number", number)
        .single();

      if (error) throw error;

      return data;
    },
  });
}
