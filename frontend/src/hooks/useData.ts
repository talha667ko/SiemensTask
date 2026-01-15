import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/auth-client";

export const dataKeys = {
  all: ["projects"] as const,
  lists: () => [...dataKeys.all, "lists"] as const,
  classified: () => [...dataKeys.lists(), "classified"] as const,
};

export function useProjectsData() {
  return useQuery({
    queryKey: dataKeys.lists(),
    queryFn: async () => {
      console.log("Fetching projects...");
      const { data, error } = await supabase
        .from("latest_projects_data")
        .select("*");

      if (error) throw error;

      return data;
    },
    staleTime: 0,
    gcTime: 0,
  });
}
