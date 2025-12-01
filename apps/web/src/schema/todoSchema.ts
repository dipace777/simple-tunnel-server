import * as z from "zod";

export const todoSchemaVersion1 = z.object({
  title: z.string(),
  done: z.boolean(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
});
