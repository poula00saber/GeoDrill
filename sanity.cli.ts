import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  // In this Sanity version the project ID and dataset live under `api`
  // (CliApiConfig); there are no top-level `projectId`/`dataset` fields.
  api: {
    projectId: projectId || "",
    dataset: dataset || "production",
  },
});
