import { createClient } from "@supabase/supabase-js";
import { writeFile } from "node:fs/promises";

const supabase = createClient("", "");

/*async function main() {
  console.log("Fetching data...");
  const { data, error, count } = await supabase
    .from("latest_projects_data")
    .select("*", { count: "exact" }); // Ask for the count explicitly

  await writeFile("Projects_data.json", JSON.stringify(data, null, 2), "utf8");
  console.log("File sync complete.");
}*/

async function main() {
  const { data, error, count } = await supabase
    .from("classified_materials_data_of_project")
    .select("*", { count: "exact" });

  if (error) throw error;

  if (count === 0 || count == null) console.log("No rows came");

  await writeFile("Materials_data.json", JSON.stringify(data, null, 2), "utf8");
  console.log("File written rows: ", data.length);
}

main().catch(console.error);
