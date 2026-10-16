import { z } from "astro/zod";

const itemSchema = z.object({
  count: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  year: z.string(),
  code: z.string().optional(),
  url: z.string(),
});

export const worksSchema = z.object({
  label: z.string(),
  initial: z.string(),
  items: z.array(itemSchema),
});

const src = z.enum(["works", "labs"]);

export type WorkSrcType = z.infer<typeof src>;
export type WorksType = z.infer<typeof worksSchema>;
