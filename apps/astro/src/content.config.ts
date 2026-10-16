import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { worksSchema } from "./schema/works";

const works = defineCollection({
  loader: glob({ base: "./src/data", pattern: "**/*.json" }),
  schema: worksSchema,
});

export const collections = { works };
