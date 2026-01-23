import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ClassifiedProjectData,
  MaterialClasses,
  MaterialJSON,
  ProjectDetails,
  ProjectJSON,
} from "../types/data";
import { useSmartNavigate } from "./useSmartNavigate";

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

      const cachedProjects = localStorage.getItem("projects_data");
      if (cachedProjects) {
        const data = JSON.parse(cachedProjects);
        return data.map((project: ProjectJSON) => ({
          id: project.id,
          project_number: project.project_number,
          project_name: project.project_name,
          materials_count: project.materials_count,
          classified: project.classified,
        }));
      }
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

      const cachedProjects = localStorage.getItem("projects_data");
      let data: ProjectJSON[];

      if (cachedProjects) {
        data = JSON.parse(cachedProjects);
      } else {
        const response = await fetch("/data/Projects_data.json");

        if (!response.ok)
          throw new Error("Could not fetch classified projects");
        data = await response.json();
        localStorage.setItem("projects_data", JSON.stringify(data));
      }

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

      let projects: ProjectJSON[];
      const cachedProjects = localStorage.getItem("projects_data");
      if (cachedProjects) {
        projects = JSON.parse(cachedProjects);
      } else {
        const response = await fetch(`/data/Projects_data.json`);
        if (!response.ok) throw new Error("Failed fetching projects");
        projects = await response.json();
        localStorage.setItem("projects_data", JSON.stringify(projects));
      }

      let materials: MaterialJSON[];
      const cachedMaterials = localStorage.getItem("materials_data");
      if (cachedMaterials) {
        materials = JSON.parse(cachedMaterials);
      } else {
        const response = await fetch(`/data/Materials_data.json`);
        if (!response.ok) throw new Error("Failed fetching materials");
        materials = await response.json();
        localStorage.setItem("materials_data", JSON.stringify(materials));
      }

      console.log("Grtting in json format");

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
      console.log(project.id);
      return {
        id: project.id,
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
  const navigation = useSmartNavigate();

  return useMutation({
    mutationKey: dataKeys.lists(),
    mutationFn: async (payload: MaterialClasses) => {
      console.log("mutation");

      const cachedProjects = localStorage.getItem("projects_data");
      const cachedMaterials = localStorage.getItem("materials_data");

      if (!cachedMaterials || !cachedProjects) {
        throw new Error("No cacjed data in localStorage");
      }
      const projects: ProjectJSON[] = JSON.parse(cachedProjects);
      const materials: MaterialJSON[] = JSON.parse(cachedMaterials);

      const classificationDateTime = new Date().toISOString();

      materials.forEach((material) => {
        if (material.project_id === payload.project_id) {
          const updatedMaterial = payload.materials.find(
            (m) => m.material_number === material.material_number,
          );
          if (updatedMaterial) {
            material.classification = updatedMaterial.classification;
            material.classified_by = payload.classified_by;
            material.classification_date_time = classificationDateTime;
          }
        }
      });

      const projectIndex = projects.findIndex(
        (p) => p.id === payload.project_id,
      );

      if (projectIndex !== -1) {
        projects[projectIndex].classified = true;
        projects[projectIndex].classification_date_time =
          classificationDateTime;
        projects[projectIndex].classified_by = payload.classified_by;
      }

      localStorage.setItem("projects_data", JSON.stringify(projects));
      localStorage.setItem("materials_data", JSON.stringify(materials));

      return {
        success: true,
        project_number: projects[projectIndex].project_number,
      };
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
