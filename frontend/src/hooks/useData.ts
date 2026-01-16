import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/auth-client";
import type { MaterialClasses, ProjectDetails } from "../types/data";
import { useNavigate } from "react-router-dom";

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
          "id, project_number, project_name, classified, materials_count, classification_date_time, classified_by"
        )
        .eq("classified", true);

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
          "id, project_number, project_name, materials_count, classified, classified_materials_data_of_project( material_number, classification, classification_date_time, classified_by)"
        )
        .eq("project_number", number)
        .single();

      if (error) {
        console.log(error);
        throw error;
      }

      return data as ProjectDetails;
    },
    enabled: !!number,
  });
}

export function useSetClassifications() {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  return useMutation({
    mutationKey: dataKeys.lists(),
    mutationFn: async (payload: MaterialClasses) => {
      console.log("=== MUTATION PAYLOAD ===");
      console.log("Project ID:", payload.project_id);
      console.log("Project Number:", payload.project_number);
      console.log("Classified By:", payload.classified_by);
      console.log("Materials:", payload.materials);
      console.log(
        "Materials JSON:",
        JSON.stringify(payload.materials, null, 2)
      );
      console.log("mutationnnnn");
      const { data, error } = await supabase.rpc("classify_project_materials", {
        p_project_id: payload.project_id,
        p_project_number: payload.project_number,
        p_materials: payload.materials,
        p_classified_by: payload.classified_by,
      });

      console.log("Mutation response:", data);
      console.log("Mutation error:", error);
      /*payload.materials.map((material) =>
      .update({
            classification: material.classification,
            classfied_by: payload.classified_by,
            classification_date_time: classificatioDateTime,
          })
          .eq("project_id", payload.project_id)
          .eq("project_number", payload.project_number)
      );

      const materialResults = await Promise.all(materialUpdates);
      const materialError = materialResults.find((result) => result.error);
      if (materialError?.error) throw materialError.error;*/

      if (error) throw error;

      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: dataKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: dataKeys.detail(variables.project_number),
      });
      navigation("/classifyMaterials");
    },
    onError: (error) => {
      console.log("classification error:", error);
    },
  });
}
