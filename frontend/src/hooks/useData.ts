import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/auth-client";
import type {
  ClassifiedProjectData,
  MaterialClasses,
  MaterialJSON,
  ProjectDetails,
  ProjectJSON,
} from "../types/data";
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
      const response = await fetch("/data/Projects_data.json");

      if (!response.ok) {
        throw new Error("Failed to fetch projects data");
      }

      const data = await response.json();
      return data.map((project: ProjectJSON) => ({
        id: project.id,
        project_number: project.project_number,
        project_name: project.project_name,
        materials_count: project.materials_count,
        classified: project.classified,
      }));
    },
    staleTime: Infinity,
  });
}

export function useClassifiedProjectsData() {
  return useQuery({
    queryKey: dataKeys.classified(),
    queryFn: async () => {
      console.log("Fetch from JSON");
      const response = await fetch("/data/Projects_data.json");

      if (!response.ok) throw new Error("Could not fetch classified projects");
      const data = await response.json();

      return data
        .filter((project: ProjectJSON) => project.classified)
        .map((project: ClassifiedProjectData) => ({
          id: project.id,
          project_number: project.project_number,
          project_name: project.project_name,
          materials_count: project.materials_count,
          classification_date_time: project.classification_date_time,
          classified_by: project.classified_by,
        }));
    },
    staleTime: Infinity,
  });
}

export function useProjectDetails(number: string) {
  return useQuery({
    queryKey: dataKeys.detail(number),
    queryFn: async () => {
      console.log("Fetvhing details");
      const [projectResponse, materialsResponse] = await Promise.all([
        fetch("/data/Projects_data.json"),
        fetch("/data/Materials_data.json"),
      ]);

      if (!projectResponse.ok || !materialsResponse.ok) {
        console.log("Response not ok");

        throw new Error("Failed to get project details");
      }

      console.log("Grtting in json format");

      const projects = await projectResponse.json();
      const materials = await materialsResponse.json();

      const project = projects.find(
        (p: ProjectJSON) => p.project_number === number,
      );

      if (!project) {
        console.log(`Project ${number} not found`);

        throw new Error(`Project ${number} not found`);
      }

      const projectMaterials = materials
        .filter((m: MaterialJSON) => m.project_id === project.id)
        .map((m: MaterialJSON) => ({
          material_number: m.material_number,
          classification: m.classification,
          classification_date_time: m.classification_date_time,
          classified_by: m.classified_by,
        }));

      if (!projectMaterials) {
        console.log("materials not found");
      }
      console.log(project.project_id);
      return {
        id: project.project_id,
        project_number: project.project_number,
        project_name: project.project_name,
        materials_count: project.materials_count,
        classified: project.classified,
        classified_materials_data_of_project: projectMaterials,
      } as ProjectDetails;
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
      console.log("mutation");
      const { data, error } = await supabase.rpc("classify_project_materials", {
        p_project_id: payload.project_id,
        p_project_number: payload.project_number,
        p_materials: payload.materials,
        p_classified_by: payload.classified_by,
      });

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
      console.log("Mutation succeeded with data:", data);

      console.log(
        "Invalidating queries for project:",
        variables.project_number,
      );
      queryClient.invalidateQueries({
        queryKey: dataKeys.detail(variables.project_number),
      });
      queryClient.invalidateQueries({ queryKey: dataKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dataKeys.classified() });
      navigation("/classifyMaterials");
    },
    onError: (error) => {
      console.log("classification error:", error);
    },
  });
}
